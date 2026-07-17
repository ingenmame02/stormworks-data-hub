import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PARTS_DATA_DIR = REPO_ROOT / "parts_data"

DLC_NAMES = ["Search and Destroy", "Industrial Frontier", "Space"]
PROPS_NONE_SENTINEL = {"name": "__none__", "description": ""}


def read_json(filepath):
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


def write_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_category_dirs():
    return sorted(d.name for d in PARTS_DATA_DIR.iterdir() if d.is_dir() and d.name != ".git")


def dlc_status_str(dlc):
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


def category_menu(category_name, file_count):
    while True:
        print(f"\n=== {category_name} ({file_count} ファイル) ===")
        print("  [1] 一括DLC設定")
        print("  [2] 個別編集")
        print("  [r] 戻る")
        print("  [q] 終了")
        inp = input("  > ").strip().lower()

        if inp == "q":
            return "quit"
        if inp == "r":
            return "back"
        if inp in ("1", "2"):
            return inp


def pick_dlc(prompt, current):
    while True:
        print(f"\n[{prompt}] 現在: {dlc_status_str(current)}")
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


def batch_set_dlc(files):
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


def edit_properties(current_props):
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
                props.append({"name": name, "description": desc})
        elif inp == "2":
            if is_empty:
                return [PROPS_NONE_SENTINEL]
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


def run_category(category_name):
    cat_dir = PARTS_DATA_DIR / category_name
    files = sorted(cat_dir.glob("*.json"))
    if not files:
        print(f"'{category_name}' にJSONファイルがありません")
        return True

    while True:
        cmd = category_menu(category_name, len(files))
        if cmd == "quit":
            return False
        if cmd == "back":
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


def main():
    print("パーツJSON 編集ツール")
    print("-" * 40)

    while True:
        categories = get_category_dirs()
        cat = select_category(categories)
        if cat is None:
            break
        run_category(cat)

    print("終了します")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n中断しました")
