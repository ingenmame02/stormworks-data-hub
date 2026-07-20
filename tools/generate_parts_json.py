import os
import sys
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path


def safe_filename(name):
    safe = name.replace(" ", "_").replace("/", "_").replace("\\", "_")
    safe = safe.replace(":", "_").replace("*", "_").replace("?", "_")
    safe = safe.replace('"', "_").replace("<", "_").replace(">", "_").replace("|", "_")
    return safe

CATEGORY_ORDER = [
    "Blocks",
    "Vehicle Control",
    "Mechanics",
    "Propulsion",
    "Specialist Equipment",
    "Logic",
    "Displays",
    "Sensors",
    "Fluid",
    "Electric",
    "Jet Engines",
    "Weapons",
    "Modular Engines",
    "Industry",
]

CATEGORY_MAP = {
    0: "Blocks",
    1: "Vehicle Control",
    2: "Mechanics",
    3: "Propulsion",
    4: "Specialist Equipment",
    5: "Logic",
    6: "Displays",
    7: "Sensors",
    8: "Misc",
    9: "Fluid",
    10: "Electric",
    11: "Jet Engines",
    12: "Weapons",
    13: "Modular Engines",
    14: "Industry",
    15: "Windows",
}

NODE_TYPES = [
    ("0", "onoff"),
    ("1", "number"),
    ("2", "torque"),
    ("3", "fluid"),
    ("4", "electric"),
    ("5", "composite"),
    ("6", "video"),
    ("7", "audio"),
    ("8", "rope"),
]
NODE_TYPE_MAP = dict(NODE_TYPES)
NODE_TYPE_ORDER = {name: i for i, (_, name) in enumerate(NODE_TYPES)}


def fix_xml_attrs(text):
    """Rename XML attributes starting with digits (e.g. 00=, 01=) to m00=, m01="""
    return re.sub(r' (\d{2})="', r' m\1="', text)


def parse_definitions(definitions_dir):
    parts = []
    xml_dir = Path(definitions_dir)
    for xml_file in sorted(xml_dir.glob("*.xml")):
        try:
            raw = xml_file.read_text(encoding="utf-8")
            fixed = fix_xml_attrs(raw)
            root = ET.fromstring(fixed)
            if root.tag != "definition":
                continue

            name = root.get("name", "")
            category_id = int(root.get("category", "0"))
            category = CATEGORY_MAP.get(category_id, f"Category_{category_id}")

            value = root.get("value", "0")
            mass = root.get("mass", "0")

            try:
                value = int(value)
            except ValueError:
                try:
                    value = float(value)
                except ValueError:
                    value = 0

            try:
                mass = float(mass)
            except ValueError:
                mass = 0.0

            description = ""
            short_description = ""
            tooltip = root.find("tooltip_properties")
            if tooltip is not None:
                description = tooltip.get("description", "")
                short_description = tooltip.get("short_description", "")

            logic_nodes = []
            nodes_elem = root.find("logic_nodes")
            if nodes_elem is not None:
                for node in nodes_elem.findall("logic_node"):
                    label = node.get("label", "")
                    mode = node.get("mode", "")
                    node_type = node.get("type", "0")
                    node_desc = node.get("description", "")

                    if mode == "1":
                        io_mode = "input"
                    else:
                        io_mode = "output"

                    signal_type = NODE_TYPE_MAP.get(node_type, f"type_{node_type}")

                    logic_node = {
                        "label": label,
                        "labelJa": "",
                        "mode": io_mode,
                        "type": signal_type,
                        "description": node_desc,
                        "descriptionJa": "",
                    }
                    logic_nodes.append(logic_node)

            IO_ORDER = {"input": 0, "output": 1}
            logic_nodes.sort(key=lambda n: (NODE_TYPE_ORDER.get(n["type"], 99), IO_ORDER.get(n["mode"], 2)))

            part = {
                "name": name,
                "nameJa": "",
                "category": category,
                "dlc": "",
                "description": description,
                "descriptionJa": "",
                "shortDescription": short_description,
                "shortDescriptionJa": "",
                "value": value,
                "mass": mass,
                "logicNodes": logic_nodes,
                "properties": [],
            }
            parts.append(part)
        except ET.ParseError as e:
            print(f"Parse error in {xml_file.name}: {e}", file=sys.stderr)
        except Exception as e:
            print(f"Error processing {xml_file.name}: {e}", file=sys.stderr)

    return parts


def output_parts(parts, output_dir):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Group parts by category
    grouped = {}
    for part in parts:
        cat = part["category"]
        if cat not in grouped:
            grouped[cat] = []
        grouped[cat].append(part)

    # Sort categories by configured order
    def category_sort_key(item):
        cat_name, _ = item
        if cat_name in CATEGORY_ORDER:
            return CATEGORY_ORDER.index(cat_name)
        return len(CATEGORY_ORDER) + 1

    sorted_categories = sorted(grouped.items(), key=category_sort_key)

    for cat_name, cat_parts in sorted_categories:
        cat_dir = output_dir / cat_name
        cat_dir.mkdir(parents=True, exist_ok=True)

        for part in cat_parts:
            safe_name = safe_filename(part["name"])
            file_path = cat_dir / f"{safe_name}.json"

            # Preserve Japanese fields / DLC / properties already curated in parts_data.
            if file_path.exists():
                try:
                    with open(file_path, encoding="utf-8") as existing_f:
                        old_data = json.load(existing_f)
                    part = merge_preserved_fields(part, old_data)
                except (OSError, json.JSONDecodeError) as e:
                    print(f"Warning: could not merge existing {file_path}: {e}", file=sys.stderr)

            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(part, f, ensure_ascii=False, indent=2)
                f.write("\n")

    print(f"\nTotal: {len(parts)} parts in {len(sorted_categories)} categories")


def merge_preserved_fields(new_part, old_part):
    """Keep curated fields when regenerating from game definitions."""
    for key in ("nameJa", "descriptionJa", "shortDescriptionJa", "dlc"):
        if key in old_part and old_part[key] is not None:
            new_part[key] = old_part[key]

    # properties are curated manually (not in XML definitions)
    if "properties" in old_part and old_part["properties"] is not None:
        new_part["properties"] = old_part["properties"]

    old_nodes = old_part.get("logicNodes") or []
    new_nodes = new_part.get("logicNodes") or []
    for i, node in enumerate(new_nodes):
        if i >= len(old_nodes):
            break
        old_node = old_nodes[i] or {}
        for key in ("labelJa", "descriptionJa"):
            if key in old_node and old_node[key] is not None:
                node[key] = old_node[key]

    return new_part


def main():
    if len(sys.argv) < 2:
        print("Usage: python generate_parts_json.py <definitions_dir> [output_dir]")
        print("Example: python generate_parts_json.py \"C:/Program Files (x86)/Steam/steamapps/common/Stormworks/rom/data/definitions\" output")
        sys.exit(1)

    definitions_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "parts_data"

    if not os.path.isdir(definitions_dir):
        print(f"Error: definitions directory not found: {definitions_dir}", file=sys.stderr)
        sys.exit(1)

    print(f"Reading definitions from: {definitions_dir}")
    parts = parse_definitions(definitions_dir)
    print(f"Parsed {len(parts)} parts")

    print(f"\nOutputting to: {output_dir}")
    output_parts(parts, output_dir)


if __name__ == "__main__":
    main()
