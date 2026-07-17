import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PARTS_DATA_DIR = REPO_ROOT / "parts_data"
INDEX_FILE = PARTS_DATA_DIR / "_index.json"
TRANSLATION_FILE = REPO_ROOT / "src" / "data" / "parts_translations_ja.json"


def read_json(filepath):
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


def write_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def build_translation_skeleton(filepath, category_name):
    data = read_json(filepath)
    return {
        "id": filepath.stem,
        "category": category_name,
        "name": data.get("name", filepath.stem),
        "nameJa": "",
        "description": data.get("description", ""),
        "descriptionJa": "",
        "shortDescription": data.get("shortDescription", ""),
        "shortDescriptionJa": "",
        "logicNodes": [
            {
                "label": node.get("label", ""),
                "labelJa": "",
                "description": node.get("description", ""),
                "descriptionJa": "",
            }
            for node in data.get("logicNodes", [])
        ],
        "properties": [
            {
                "name": prop.get("name", ""),
                "nameJa": "",
                "description": prop.get("description", ""),
                "descriptionJa": "",
            }
            for prop in data.get("properties", [])
        ],
    }


def load_index_data():
    if not INDEX_FILE.exists():
        raise FileNotFoundError(f"_index.json not found: {INDEX_FILE}")
    return read_json(INDEX_FILE)


def load_translations():
    if TRANSLATION_FILE.exists():
        return read_json(TRANSLATION_FILE)
    return {}


def save_translations(translations):
    TRANSLATION_FILE.parent.mkdir(parents=True, exist_ok=True)
    write_json(TRANSLATION_FILE, translations)


def prompt(message, default=""):
    text = input(message).rstrip()
    if text == "":
        return default
    return text


def choose_from_list(items, title):
    while True:
        print(f"\n=== {title} ===")
        for index, item in enumerate(items, start=1):
            print(f"  [{index}] {item}")
        print("  [q] Exit")
        choice = input("> ").strip().lower()
        if choice == "q":
            return None
        if choice.isdigit():
            index = int(choice) - 1
            if 0 <= index < len(items):
                return index
        print("無効な入力です。数値を入力してください。")


def edit_part_translation(part_id, src, translation):
    print(f"\n--- 編集: {part_id} ---")
    print(f"カテゴリ: {translation.get('category', src['category'])}")

    translation["nameJa"] = prompt(
        f"名前翻訳 [現在: {translation.get('nameJa', '') or '<未設定>'}]\n英語: {src['name']}\n新しい翻訳: ",
        translation.get("nameJa", ""),
    )
    translation["shortDescriptionJa"] = prompt(
        f"短い説明翻訳 [現在: {translation.get('shortDescriptionJa', '') or '<未設定>'}]\n英語: {src.get('shortDescription', '')}\n新しい翻訳: ",
        translation.get("shortDescriptionJa", ""),
    )
    translation["descriptionJa"] = prompt(
        f"説明翻訳 [現在: {translation.get('descriptionJa', '') or '<未設定>'}]\n英語: {src.get('description', '')}\n新しい翻訳: ",
        translation.get("descriptionJa", ""),
    )

    if src.get("logicNodes"):
        print("\n論理ノード翻訳")
        translation.setdefault("logicNodes", [])
        for idx, node in enumerate(src["logicNodes"], start=1):
            if not node.get("label") and not node.get("description"):
                continue
            while len(translation["logicNodes"]) < idx:
                translation["logicNodes"].append({"labelJa": "", "descriptionJa": ""})
            trans_node = translation["logicNodes"][idx - 1]
            print(f"\n  [{idx}] {node.get('label', '')}")
            trans_node["labelJa"] = prompt(
                f"    ラベル翻訳 [現在: {trans_node.get('labelJa', '') or '<未設定>'}]\n    新しい翻訳: ",
                trans_node.get("labelJa", ""),
            )
            trans_node["descriptionJa"] = prompt(
                f"    説明翻訳 [現在: {trans_node.get('descriptionJa', '') or '<未設定>'}]\n    英語: {node.get('description', '')}\n    新しい翻訳: ",
                trans_node.get("descriptionJa", ""),
            )

    """if src.get("properties"):
        print("\nプロパティ翻訳")
        translation.setdefault("properties", [])
        for idx, prop in enumerate(src["properties"], start=1):
            if not prop.get("name") and not prop.get("description"):
                continue
            while len(translation["properties"]) < idx:
                translation["properties"].append({"nameJa": "", "descriptionJa": ""})
            trans_prop = translation["properties"][idx - 1]
            print(f"\n  [{idx}] {prop.get('name', '')}")
            trans_prop["nameJa"] = prompt(
                f"    名前翻訳 [現在: {trans_prop.get('nameJa', '') or '<未設定>'}]\n    新しい翻訳: ",
                trans_prop.get("nameJa", ""),
            )
            trans_prop["descriptionJa"] = prompt(
                f"    説明翻訳 [現在: {trans_prop.get('descriptionJa', '') or '<未設定>'}]\n    英語: {prop.get('description', '')}\n    新しい翻訳: ",
                trans_prop.get("descriptionJa", ""),
            )"""

    print("\n保存しました。次のパーツを選択するか、q で終了してください。")
    return translation


def main():
    index_data = load_index_data()
    translations = load_translations()

    file_map = {}
    category_list = []
    for category_name, part_list in index_data.items():
        category_list.append(category_name)
        for part in part_list:
            filepath = PARTS_DATA_DIR / part["file"]
            part_id = filepath.stem
            if not filepath.exists():
                continue
            if part_id not in translations:
                translations[part_id] = build_translation_skeleton(filepath, category_name)
            file_map.setdefault(category_name, []).append((part_id, filepath))

    while True:
        selection = choose_from_list(category_list, "カテゴリを選択")
        if selection is None:
            break

        category_name = category_list[selection]
        items = file_map.get(category_name, [])
        choices = [f"{part_id}" for part_id, _ in items]
        part_selection = choose_from_list(choices, f"{category_name} のパーツを選択")
        if part_selection is None:
            continue

        part_id, filepath = items[part_selection]
        src = read_json(filepath)
        translation = translations[part_id]
        translation = edit_part_translation(part_id, src, translation)
        translations[part_id] = translation
        save_translations(translations)

    print("終了します。")


if __name__ == "__main__":
    main()
