import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PARTS_DATA_DIR = REPO_ROOT / "parts_data"
OUTPUT_FILE = REPO_ROOT / "src" / "data" / "parts_index.json"

KEYBIND_MAP = {
    "[$[action_interact_left]]": "[Q]",
    "[$[action_interact_right]]": "[E]",
    "[$[action_up]]": "[W]",
    "[$[action_down]]": "[S]",
    "[$[action_left]]": "[A]",
    "[$[action_right]]": "[D]",
    "[$[action_throttle_up]]": "[↑]",
    "[$[action_throttle_down]]": "[↓]",
    "[$[action_pedal_left]]": "[←]",
    "[$[action_pedal_right]]": "[→]",
    "[$[action_equipment_use]]": "[LMB]",
    "[$[action_equipment_secondary]]": "[R]",
    "[$[action_trigger]]": "[Space]",
    "[$[action_use_seat]]": "[F]",
    "[$[action_jump]]": "[Space]",
    "[$[action_hotkey_1]]": "[1]",
    "[$[action_hotkey_2]]": "[2]",
    "[$[action_hotkey_3]]": "[3]",
    "[$[action_hotkey_4]]": "[4]",
    "[$[action_hotkey_5]]": "[5]",
    "[$[action_hotkey_6]]": "[6]",
}

KEYBIND_RE = re.compile("|".join(re.escape(k) for k in KEYBIND_MAP))


def replace_keybind(match):
    return KEYBIND_MAP[match.group(0)]


def clean_text(text):
    return KEYBIND_RE.sub(replace_keybind, text)


def read_json(filepath):
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


def build_part(filepath, category_name):
    data = read_json(filepath)

    logic_nodes = []
    for node in data.get("logicNodes", []):
        entry = {
            "label": clean_text(node.get("label", "")),
            "labelJa": "",
            "mode": node.get("mode", "output"),
            "type": node.get("type", ""),
            "description": clean_text(node.get("description", "")),
            "descriptionJa": "",
        }
        logic_nodes.append(entry)

    properties = []
    for prop in data.get("properties", []):
        entry = {
            "name": prop.get("name", ""),
            "nameJa": "",
            "description": prop.get("description", ""),
            "descriptionJa": "",
        }
        properties.append(entry)

    return {
        "id": filepath.stem,
        "name": data.get("name", filepath.stem),
        "nameJa": "",
        "category": category_name,
        "dlc": data.get("dlc", ""),
        "description": clean_text(data.get("description", "")),
        "descriptionJa": "",
        "shortDescription": clean_text(data.get("shortDescription", "")),
        "shortDescriptionJa": "",
        "value": data.get("value", 0),
        "mass": data.get("mass", 0.0),
        "logicNodes": logic_nodes,
        "properties": properties,
    }


def main():
    index_path = PARTS_DATA_DIR / "_index.json"
    if not index_path.exists():
        raise FileNotFoundError(f"_index.json not found: {index_path}")

    index_data = read_json(index_path)

    categories = []
    missing_files = []
    for category_name, part_list in index_data.items():
        parts = []
        seen_files = set()
        for entry in part_list:
            file_ref = entry["file"]
            if file_ref in seen_files:
                continue
            seen_files.add(file_ref)

            filepath = PARTS_DATA_DIR / file_ref
            if not filepath.exists():
                missing_files.append(str(filepath.relative_to(PARTS_DATA_DIR)))
                continue

            parts.append(build_part(filepath, category_name))

        categories.append({
            "name": category_name,
            "parts": parts,
        })

    if missing_files:
        missing = "\n".join(f"  - {path}" for path in missing_files)
        raise FileNotFoundError(f"Missing part JSON files listed in _index.json:\n{missing}")

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(categories, f, indent=2, ensure_ascii=False)

    total_parts = sum(len(c["parts"]) for c in categories)
    print(f"Generated {OUTPUT_FILE}")
    print(f"  {len(categories)} categories, {total_parts} parts")


if __name__ == "__main__":
    main()
