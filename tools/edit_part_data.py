import argparse
import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PARTS_DATA_DIR = REPO_ROOT / "parts_data"

DLC_CANDIDATES = {
    "1": ("Search and Destroy", "武器・爆発物関連"),
    "2": ("Industrial Frontier", "採掘・精製・動物関連"),
    "3": ("Space", "宇宙関連"),
}


def read_json(filepath):
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


def write_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def select_dlc(current):
    print("\n[DLC 選択]")
    print(f"  現在の値: {current or '(未設定)'}")
    print("  候補:")
    for key, (name, desc) in DLC_CANDIDATES.items():
        print(f"    [{key}] {name} ({desc})")
    print("  [c] クリア（未設定にする）")
    print("  [Enter] 変更しない")
    print("  [q] 終了")
    inp = input("  > ").strip().lower()
    if inp == "q":
        return None
    if inp == "c":
        return ""
    if inp in DLC_CANDIDATES:
        return DLC_CANDIDATES[inp][0]
    if inp == "":
        return current
    return inp

def input_dlc_batch():
    """全DLC未設定ファイルに一括適用するDLC名を返す。空文字なら一括設定しない"""
    print("\n[DLC 一括設定]")
    print("  全ファイルに同じDLCを一括設定しますか？")
    for key, (name, desc) in DLC_CANDIDATES.items():
        print(f"    [{key}] {name} ({desc})")
    print("  [c] クリア（全ファイルのDLCを未設定にする）")
    print("  [Enter] 一括設定しない（1ファイルずつ個別設定）")
    inp = input("  > ").strip().lower()
    if inp == "":
        return None
    if inp == "c":
        return ""
    if inp in DLC_CANDIDATES:
        return DLC_CANDIDATES[inp][0]
    return inp


def edit_properties(current_props):
    props = list(current_props)
    print(f"\n[プロパティ編集] 現在 {len(props)} 件")
    for i, p in enumerate(props, 1):
        print(f"  {i}. {p.get('name', '')} - {p.get('description', '')}")

    while True:
        print("\n  操作選択:")
        print("    [a] プロパティを追加")
        if props:
            print("    [d] プロパティを削除")
            print("    [c] 全削除")
        print("    [Enter] 保存して次へ")
        print("    [q] 終了")
        inp = input("  > ").strip().lower()

        if inp == "q":
            return None
        if inp == "":
            return props
        if inp == "a":
            name = input("    プロパティ名: ").strip()
            desc = input("    説明: ").strip()
            if name or desc:
                props.append({"name": name, "description": desc})
                print(f"    -> 追加: {name or '(名無し)'}")
        elif inp == "d" and props:
            try:
                idx = int(input(f"    削除する番号 (1-{len(props)}): ").strip())
                if 1 <= idx <= len(props):
                    removed = props.pop(idx - 1)
                    print(f"    -> 削除: {removed.get('name', '')}")
            except (ValueError, IndexError):
                print("    無効な番号")
        elif inp == "c" and props:
            confirm = input(f"    {len(props)}件全て削除しますか？ (y/N): ").strip().lower()
            if confirm == "y":
                props.clear()
                print("    全削除しました")

    return props


def get_category_dirs():
    return sorted(d.name for d in PARTS_DATA_DIR.iterdir() if d.is_dir() and d.name != ".git")


def main():
    parser = argparse.ArgumentParser(description="パーツJSONのDLC・プロパティを編集します")
    parser.add_argument("--category", "-c", help=f"カテゴリを指定 (例: Weapons, Logic)")
    args = parser.parse_args()

    all_files = sorted(Path(PARTS_DATA_DIR).rglob("*.json"))
    all_files = [f for f in all_files if f.name != "_index.json"]

    if args.category:
        cat_dir = PARTS_DATA_DIR / args.category
        if not cat_dir.is_dir():
            cats = ", ".join(get_category_dirs())
            print(f"エラー: カテゴリ '{args.category}' が見つかりません")
            print(f"利用可能: {cats}")
            return
        all_files = sorted(cat_dir.glob("*.json"))
        print(f"カテゴリ '{args.category}' を編集します ({len(all_files)} ファイル)")
    else:
        print(f"全カテゴリを編集します ({len(all_files)} ファイル)")

    total = len(all_files)
    edited_count = 0

    print("1ファイルずつ編集する前に、一括DLC設定が可能です")
    print("-" * 50)

    batch_dlc = input_dlc_batch()

    if batch_dlc is not None:
        applied = 0
        for filepath in all_files:
            data = read_json(filepath)
            if not data.get("dlc"):
                data["dlc"] = batch_dlc
                write_json(filepath, data)
                applied += 1
        print(f"一括DLC設定完了: {applied} ファイルに '{batch_dlc or '(未設定)'}' を適用")

    print("\n個別編集（プロパティ）を開始します")
    print("Enter: スキップ / q: 終了")
    print("-" * 50)

    try:
        for i, filepath in enumerate(all_files, 1):
            data = read_json(filepath)
            rel_path = filepath.relative_to(PARTS_DATA_DIR)

            dlc = data.get("dlc", "")
            props = data.get("properties", [])

            if props:
                continue

            print(f"\n=== {i}/{total} ===")
            print(f"  ファイル: {rel_path}")
            print(f"  名前: {data.get('name', '')}")
            print(f"  カテゴリ: {data.get('category', '')}")
            print(f"  DLC: {dlc or '(未設定)'}")
            print(f"  プロパティ: {len(props)} 件")

            result = edit_properties(props)
            if result is None:
                print("\n終了します")
                break
            new_props = result

            if new_props != props:
                data["properties"] = new_props
                write_json(filepath, data)
                edited_count += 1
                print(f"  -> 保存しました")

    except KeyboardInterrupt:
        print("\n中断しました")

    print(f"\n完了: {edited_count}/{total} ファイルを編集しました")


if __name__ == "__main__":
    main()
