"""
Interactive parts_data editor.

Modes are registered through part_data_common so new workflows
(e.g. tags, validation, bulk renames) can be added without changing
the storage format. All writes go to parts_data/<Category>/<Part>.json.
"""

from __future__ import annotations

import sys
from pathlib import Path

from part_data_common import (
    PARTS_DATA_DIR,
    PROPERTY_TEXT_FIELDS,
    PART_TEXT_FIELDS,
    LOGIC_NODE_TEXT_FIELDS,
    choose_from_list,
    ensure_translation_fields,
    get_category_dirs,
    get_mode_handler,
    iter_parts_from_index,
    list_modes,
    load_index,
    normalize_part_shape,
    prompt,
    read_json,
    register_mode,
    translation_progress,
    write_json,
)

DLC_NAMES = ["Search and Destroy", "Industrial Frontier", "Space"]
PROPS_NONE_SENTINEL = {"name": "__none__", "description": "", "nameJa": "", "descriptionJa": ""}


# ---------------------------------------------------------------------------
# Shared UI helpers (normal edit mode)
# ---------------------------------------------------------------------------

def dlc_status_str(dlc: str) -> str:
    if dlc == "__none__":
        return "なし（確認済み）"
    if not dlc:
        return "未登録"
    return dlc


def props_status_str(props):
    if not props:
        return "未登録"
    if len(props) == 1 and props[0].get("name") == "__none__":
        return "なし（確認済み）"
    return f"{len(props)} 件"


def is_props_none(props):
    return len(props) == 1 and props[0].get("name") == "__none__"


def select_category(categories):
    while True:
        print("\nカテゴリを選択:")
        for i, cat in enumerate(categories, 1):
            cat_dir = PARTS_DATA_DIR / cat
            count = len(list(cat_dir.glob("*.json")))
            print(f"  [{i}] {cat} ({count})")
        print("  [q] 終了")
        inp = input("  > ").strip().lower()

        if inp == "q":
            return None
        try:
            idx = int(inp) - 1
            if 0 <= idx < len(categories):
                return categories[idx]
        except ValueError:
            pass
        print("無効な入力")


def category_menu(category_name: str, file_count: int) -> str:
    while True:
        print(f"\n=== {category_name} ({file_count} ファイル) ===")
        print("  [1] 一括DLC設定")
        print("  [2] 個別編集")
        print("  [r] 戻る")
        print("  [q] 終了")
        inp = input("  > ").strip().lower()

        if inp in ("q", "r", "1", "2"):
            return inp


def pick_dlc(prompt_label: str, current: str):
    while True:
        print(f"\n[{prompt_label}] 現在: {dlc_status_str(current)}")
        for i, name in enumerate(DLC_NAMES, 1):
            print(f"  [{i}] {name}")
        print(f"  [{len(DLC_NAMES) + 1}] DLCなし（確認済み）")
        print("  [c] 未登録に戻す")
        print("  [Enter] 変更しない")
        print("  [q] 終了")
        inp = input("  > ").strip().lower()

        if inp == "q":
            return None
        if inp == "c":
            return ""
        if inp == "":
            return "__skip__"
        try:
            n = int(inp)
            if 1 <= n <= len(DLC_NAMES):
                return DLC_NAMES[n - 1]
            if n == len(DLC_NAMES) + 1:
                return "__none__"
        except ValueError:
            pass
        print("無効な入力")


def batch_set_dlc(files: list[Path]) -> int:
    result = pick_dlc("一括DLC設定", "")
    if result is None or result == "__skip__":
        return 0
    applied = 0
    for fp in files:
        data = read_json(fp)
        if not data.get("dlc"):
            data["dlc"] = result
            write_json(fp, data)
            applied += 1
    label = result if result else "未登録"
    print(f"  -> {applied} ファイルに '{label}' を設定しました")
    return applied


def edit_properties(current_props: list):
    props = list(current_props)
    if is_props_none(props):
        props = []

    while True:
        is_empty = not props
        print(f"\n[プロパティ編集] 現在 {props_status_str(props)}")

        for i, p in enumerate(props, 1):
            print(f"  {i}. {p.get('name', '')} - {p.get('description', '')}")

        if is_empty:
            print("  [1] 追加")
            print("  [2] プロパティなし（確認済み）")
        else:
            print("  [1] 追加")
            print("  [2] 削除")
            print("  [3] 全削除")
        print("  [c] 未登録に戻す")
        print("  [Enter] 決定")
        print("  [q] 終了")
        inp = input("  > ").strip().lower()

        if inp == "q":
            return None
        if inp == "c":
            return "__unset__"
        if inp == "":
            return props if not is_empty else current_props

        if inp == "1":
            name = input("    プロパティ名: ").strip()
            desc = input("    説明: ").strip()
            if name or desc:
                props.append(
                    {
                        "name": name,
                        "nameJa": "",
                        "description": desc,
                        "descriptionJa": "",
                    }
                )
        elif inp == "2":
            if is_empty:
                return [dict(PROPS_NONE_SENTINEL)]
            try:
                idx = int(input(f"    削除する番号 (1-{len(props)}): ").strip())
                if 1 <= idx <= len(props):
                    props.pop(idx - 1)
            except (ValueError, IndexError):
                print("    無効な番号")
        elif inp == "3" and not is_empty:
            confirm = input(f"    {len(props)}件全て削除しますか？ (y/N): ").strip().lower()
            if confirm == "y":
                props.clear()

    return props


def edit_single_part(filepath, i, total):
    data = read_json(filepath)
    rel_path = filepath.relative_to(PARTS_DATA_DIR)
    dlc = data.get("dlc", "")
    props = data.get("properties", [])

    while True:
        print(f"\n=== {i}/{total} ===")
        print(f"  ファイル: {rel_path}")
        print(f"  名前: {data.get('name', '')}")
        print(f"  DLC: {dlc_status_str(dlc)}")
        print(f"  プロパティ: {props_status_str(props)}")
        print("  [1] DLCを編集")
        print("  [2] プロパティを編集")
        print("  [Enter] 次へ")
        print("  [q] 終了")
        inp = input("  > ").strip().lower()

        if inp == "q":
            return None
        if inp == "":
            break
        if inp == "1":
            result = pick_dlc("DLC編集", dlc)
            if result is None:
                return None
            if result != "__skip__":
                dlc = result
                data["dlc"] = dlc
                write_json(filepath, data)
        elif inp == "2":
            new_props = edit_properties(props)
            if new_props is None:
                return None
            if new_props == "__unset__":
                props = []
                data["properties"] = props
                write_json(filepath, data)
            elif new_props != props:
                props = new_props
                data["properties"] = props
                write_json(filepath, data)

    return True


def run_category(category_name: str) -> bool:
    cat_dir = PARTS_DATA_DIR / category_name
    files = sorted(cat_dir.glob("*.json"))
    if not files:
        print(f"'{category_name}' にJSONファイルがありません")
        return True

    while True:
        cmd = category_menu(category_name, len(files))
        if cmd == "q":
            return False
        if cmd == "r":
            return True
        if cmd == "1":
            batch_set_dlc(files)
        elif cmd == "2":
            edited = 0
            for idx, fp in enumerate(files, 1):
                result = edit_single_part(fp, idx, len(files))
                if result is None:
                    print("\n中断しました")
                    break
                if result is True:
                    edited += 1
            print(f"\n  個別編集完了: {edited}/{len(files)} ファイルを編集")


def run_edit_mode() -> None:
    print("パーツJSON 編集ツール（通常編集）")
    print("-" * 40)
    print("保存先: parts_data/<カテゴリ>/<パーツ>.json")

    while True:
        categories = get_category_dirs()
        cat = select_category(categories)
        if cat is None:
            break
        cont = run_category(cat)
        if not cont:
            break

    print("通常編集を終了します。")


# ---------------------------------------------------------------------------
# Translation mode — writes Japanese fields into parts_data JSON
# ---------------------------------------------------------------------------

def _prompt_ja_field(label: str, en_value: str, current_ja: str) -> str:
    current = current_ja or "<未設定>"
    return prompt(
        f"{label} [現在: {current}]\n英語: {en_value}\n新しい翻訳: ",
        current_ja,
    )


def edit_translation_on_part(filepath: Path, category_name: str) -> bool:
    """
    Edit Japanese fields on a single parts_data file.
    Returns True if saved, False if cancelled without save intent.
    """
    data = ensure_translation_fields(read_json(filepath))
    part_id = filepath.stem
    filled, total = translation_progress(data)

    print(f"\n--- 翻訳編集: {part_id} ---")
    print(f"カテゴリ: {category_name}")
    print(f"進捗: {filled}/{total} フィールド")
    print(f"保存先: {filepath.relative_to(PARTS_DATA_DIR)}")

    labels = {
        "name": "名前翻訳",
        "shortDescription": "短い説明翻訳",
        "description": "説明翻訳",
    }
    for en_key, ja_key in PART_TEXT_FIELDS:
        en_value = data.get(en_key, "")
        # Always edit name; skip other empty English fields.
        if en_key != "name" and not en_value:
            continue
        data[ja_key] = _prompt_ja_field(
            labels.get(en_key, ja_key),
            en_value,
            data.get(ja_key, ""),
        )

    logic_nodes = data.get("logicNodes") or []
    if logic_nodes:
        print("\n論理ノード翻訳")
        for idx, node in enumerate(logic_nodes, start=1):
            if not isinstance(node, dict):
                continue
            print(f"\n  [{idx}] {node.get('label', '')}")
            for en_key, ja_key in LOGIC_NODE_TEXT_FIELDS:
                en_value = node.get(en_key, "")
                labels = {
                    "label": "    ラベル翻訳",
                    "description": "    説明翻訳",
                }
                # Always prompt for label; for description only if EN exists or JA exists
                if en_key == "description" and not en_value and not node.get(ja_key):
                    continue
                node[ja_key] = _prompt_ja_field(
                    labels.get(en_key, ja_key),
                    en_value,
                    node.get(ja_key, ""),
                )

    properties = [
        p
        for p in (data.get("properties") or [])
        if isinstance(p, dict) and p.get("name") != "__none__"
    ]
    if properties:
        print("\nプロパティ翻訳")
        for idx, prop in enumerate(properties, start=1):
            print(f"\n  [{idx}] {prop.get('name', '')}")
            for en_key, ja_key in PROPERTY_TEXT_FIELDS:
                en_value = prop.get(en_key, "")
                labels = {
                    "name": "    名前翻訳",
                    "description": "    説明翻訳",
                }
                if en_key == "description" and not en_value and not prop.get(ja_key):
                    continue
                prop[ja_key] = _prompt_ja_field(
                    labels.get(en_key, ja_key),
                    en_value,
                    prop.get(ja_key, ""),
                )

    write_json(filepath, normalize_part_shape(data))
    filled, total = translation_progress(data)
    print(f"\n保存しました -> {filepath.relative_to(PARTS_DATA_DIR)} ({filled}/{total})")
    return True


def run_translation_mode() -> None:
    print("パーツ翻訳編集ツール")
    print("-" * 40)
    print("日本語フィールドを parts_data の各 JSON に直接書き込みます。")

    try:
        index_data = load_index()
    except FileNotFoundError as exc:
        print(exc)
        return

    categories: list[str] = []
    file_map: dict[str, list[tuple[str, Path]]] = {}
    for category_name, part_id, filepath in iter_parts_from_index(index_data):
        if not filepath.exists():
            continue
        if category_name not in file_map:
            categories.append(category_name)
            file_map[category_name] = []
        file_map[category_name].append((part_id, filepath))

    while True:
        category_idx = choose_from_list(categories, "翻訳したいカテゴリを選択")
        if category_idx is None:
            break

        category_name = categories[category_idx]
        entries = file_map[category_name]

        # Show progress next to each part name
        choices = []
        for part_id, filepath in entries:
            data = ensure_translation_fields(read_json(filepath))
            filled, total = translation_progress(data)
            mark = "✓" if total > 0 and filled == total else f"{filled}/{total}"
            choices.append(f"{part_id}  [{mark}]")

        part_idx = choose_from_list(choices, f"{category_name} のパーツを選択")
        if part_idx is None:
            continue

        part_id, filepath = entries[part_idx]
        edit_translation_on_part(filepath, category_name)

    print("翻訳編集を終了します。")


# ---------------------------------------------------------------------------
# Mode registration & entry point
# ---------------------------------------------------------------------------

def register_builtin_modes() -> None:
    # Clear is not needed; re-registering is fine for reloads.
    register_mode("1", "通常編集（DLC / プロパティ）", run_edit_mode)
    register_mode("2", "翻訳編集（parts_data に日本語を保存）", run_translation_mode)
    # Future modes:
    # register_mode("3", "タグ編集", run_tags_mode)
    # register_mode("4", "整合性チェック", run_validate_mode)


def choose_main_mode() -> str | None:
    modes = list_modes()
    while True:
        print("パーツ編集モードを選択してください:")
        for key, label in modes:
            print(f"  [{key}] {label}")
        print("  [q] 終了")
        choice = input("> ").strip().lower()
        if choice == "q":
            return None
        if get_mode_handler(choice):
            return choice
        # CLI-style aliases
        if choice in ("--translate", "-t", "translate"):
            return "2"
        if choice in ("--edit", "-e", "edit"):
            return "1"
        print("無効な入力です。")


def resolve_cli_mode(argv: list[str]) -> str | None:
    if any(arg in ("--translate", "-t", "translate") for arg in argv):
        return "2"
    if any(arg in ("--edit", "-e", "edit") for arg in argv):
        return "1"
    # Generic: --mode=N or --mode N
    for i, arg in enumerate(argv):
        if arg.startswith("--mode="):
            return arg.split("=", 1)[1]
        if arg == "--mode" and i + 1 < len(argv):
            return argv[i + 1]
    return None


def main() -> None:
    register_builtin_modes()

    mode_key = resolve_cli_mode(sys.argv[1:])
    if mode_key is None:
        mode_key = choose_main_mode()

    if mode_key is None:
        print("終了します")
        return

    handler = get_mode_handler(mode_key)
    if handler is None:
        print(f"不明なモード: {mode_key}")
        print("利用可能:", ", ".join(f"{k}={label}" for k, label in list_modes()))
        return

    handler()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n中断しました")
    except Exception as exc:
        print(f"\nエラー: {exc}")
        raise
