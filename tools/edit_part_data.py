import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PARTS_DATA_DIR = REPO_ROOT / "parts_data"

DLC_NAMES = {
    "1": "Search and Destroy",
    "2": "Industrial Frontier",
    "3": "Space",
}


def read_json(filepath):
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


def write_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_category_dirs():
    return sorted(d.name for d in PARTS_DATA_DIR.iterdir() if d.is_dir() and d.name != ".git")


def show_dlc_menu(label="DLC"):
    print(f"  [{label}]")
    print("    候補:")
    for key, name in DLC_NAMES.items():
        print(f"      [{key}] {name}")
    print("    [c] クリア（未設定にする）")
    print("    [Enter] 変更しない")
    print("    [q] 終了")
    inp = input("    > ").strip().lower()
    if inp == "q":
        return None
    if inp == "c":
        return ""
    if inp in DLC_NAMES:
        return DLC_NAMES[inp]
    if inp == "":
        return "__skip__"
    return inp


def batch_set_dlc(category_name, files):
    print(f"\n--- 一括DLC設定: {category_name} ({len(files)} ファイル) ---")
    result = show_dlc_menu("一括DLC")
    if result is None:
        return 0
    if result == "__skip__":
        return 0

    applied = 0
    for fp in files:
        data = read_json(fp)
        if not data.get("dlc"):
            data["dlc"] = result
            write_json(fp, data)
            applied += 1
    print(f"  -> {applied} ファイルに '{result}' を設定しました")
    return applied


def edit_properties(current_props):
    props = list(current_props)
    while True:
        print(f"\n  [プロパティ編集] 現在 {len(props)} 件")
        for i, p in enumerate(props, 1):
            print(f"    {i}. {p.get('name', '')} - {p.get('description', '')}")
        print("    [a] 追加")
        if props:
            print("    [d] 削除")
            print("    [c] 全削除")
        print("    [Enter] 決定")
        inp = input("    > ").strip().lower()

        if inp == "":
            return props
        if inp == "a":
            name = input("      プロパティ名: ").strip()
            desc = input("      説明: ").strip()
            if name or desc:
                props.append({"name": name, "description": desc})
        elif inp == "d" and props:
            try:
                idx = int(input(f"      削除する番号 (1-{len(props)}): ").strip())
                if 1 <= idx <= len(props):
                    props.pop(idx - 1)
            except (ValueError, IndexError):
                print("      無効な番号")
        elif inp == "c" and props:
            confirm = input(f"      {len(props)}件全て削除しますか？ (y/N): ").strip().lower()
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
        print(f"  DLC: {dlc or '(未設定)'}  [d]で編集")
        print(f"  プロパティ: {len(props)} 件  [p]で編集")
        print("  [Enter] 保存して次へ")
        print("  [q] 終了")
        inp = input("  > ").strip().lower()

        if inp == "q":
            return None
        if inp == "":
            break
        if inp == "d":
            result = show_dlc_menu("DLC編集")
            if result is None:
                return None
            if result != "__skip__":
                dlc = result
                data["dlc"] = dlc
                write_json(filepath, data)
                print(f"    -> DLC: {dlc or '(未設定)'}")
        elif inp == "p":
            new_props = edit_properties(props)
            if new_props is None:
                return None
            if new_props != props:
                props = new_props
                data["properties"] = props
                write_json(filepath, data)
                print(f"    -> 保存: {len(props)} 件")

    return True


def run_category(category_name):
    cat_dir = PARTS_DATA_DIR / category_name
    files = sorted(cat_dir.glob("*.json"))
    if not files:
        print(f"\n'{category_name}' にJSONファイルがありません")
        return True

    print(f"\n=== カテゴリ: {category_name} ({len(files)} ファイル) ===")

    while True:
        print("\n操作選択:")
        print("  [a] 一括DLC設定（未設定ファイルのみ）")
        print("  [i] 個別編集（1ファイルずつ）")
        print("  [r] カテゴリ選択に戻る")
        print("  [q] 終了")
        inp = input("  > ").strip().lower()

        if inp == "q":
            return False
        if inp == "r":
            return True
        if inp == "a":
            batch_set_dlc(category_name, files)
        elif inp == "i":
            edited = 0
            total = len(files)
            for idx, fp in enumerate(files, 1):
                result = edit_single_part(fp, idx, total)
                if result is None:
                    print("\n中断しました")
                    break
                if result is True:
                    edited += 1
            print(f"\n  個別編集完了: {edited}/{total} ファイルを編集")


def main():
    print("パーツJSON 編集ツール")
    print("-" * 40)

    while True:
        categories = get_category_dirs()
        print("\nカテゴリを選択:")
        for i, cat in enumerate(categories, 1):
            cat_dir = PARTS_DATA_DIR / cat
            count = len(list(cat_dir.glob("*.json")))
            print(f"  [{i}] {cat} ({count} ファイル)")
        print("  [q] 終了")

        inp = input("  > ").strip().lower()
        if inp == "q":
            break

        try:
            idx = int(inp) - 1
            if 0 <= idx < len(categories):
                continue_run = run_category(categories[idx])
                if not continue_run:
                    break
            else:
                print("無効な番号")
        except ValueError:
            print("無効な入力")

    print("終了します")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n中断しました")
