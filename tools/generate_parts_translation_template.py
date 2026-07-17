import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PARTS_DATA_DIR = REPO_ROOT / "parts_data"
TRANSLATION_FILE = REPO_ROOT / "src" / "data" / "parts_translations_ja.json"
INDEX_FILE = PARTS_DATA_DIR / "_index.json"


def read_json(filepath):
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


def build_template_part(filepath, category_name):
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


def main():
    if not INDEX_FILE.exists():
        raise FileNotFoundError(f"_index.json not found: {INDEX_FILE}")

    index_data = read_json(INDEX_FILE)
    translations = {}

    for category_name, part_list in index_data.items():
        for entry in part_list:
            filepath = PARTS_DATA_DIR / entry["file"]
            if not filepath.exists():
                print(f"Skipping missing file: {filepath}")
                continue

            translations[filepath.stem] = build_template_part(filepath, category_name)

    TRANSLATION_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(TRANSLATION_FILE, "w", encoding="utf-8") as f:
        json.dump(translations, f, indent=2, ensure_ascii=False)

    print(f"Generated translation template: {TRANSLATION_FILE}")
    print(f"  {len(translations)} part entries")


if __name__ == "__main__":
    main()
