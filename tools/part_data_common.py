"""
Shared utilities for parts_data editing and index generation.

Source of truth:
  parts_data/<Category>/<Part>.json

Generated (do not edit by hand):
  src/data/parts_index.json

Translation fields live inside each part JSON (nameJa, descriptionJa, ...).
Additional editor modes can reuse the helpers here without inventing a second
storage format.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Callable, Iterable

REPO_ROOT = Path(__file__).resolve().parent.parent
PARTS_DATA_DIR = REPO_ROOT / "parts_data"
INDEX_FILE = PARTS_DATA_DIR / "_index.json"
OUTPUT_INDEX_FILE = REPO_ROOT / "src" / "data" / "parts_index.json"

# Legacy file — kept only for one-time migration.
LEGACY_TRANSLATIONS_FILE = REPO_ROOT / "src" / "data" / "parts_translations_ja.json"

# Top-level English field -> Japanese counterpart.
PART_TEXT_FIELDS = (
    ("name", "nameJa"),
    ("description", "descriptionJa"),
    ("shortDescription", "shortDescriptionJa"),
)

LOGIC_NODE_TEXT_FIELDS = (
    ("label", "labelJa"),
    ("description", "descriptionJa"),
)

PROPERTY_TEXT_FIELDS = (
    ("name", "nameJa"),
    ("description", "descriptionJa"),
)

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


def replace_keybind(match: re.Match[str]) -> str:
    return KEYBIND_MAP[match.group(0)]


def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    return KEYBIND_RE.sub(replace_keybind, text)


def read_json(filepath: Path) -> Any:
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


def write_json(filepath: Path, data: Any) -> None:
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def get_category_dirs() -> list[str]:
    if not PARTS_DATA_DIR.exists():
        return []
    return sorted(
        d.name
        for d in PARTS_DATA_DIR.iterdir()
        if d.is_dir() and d.name != ".git"
    )


def load_index() -> dict[str, list[dict[str, str]]]:
    if not INDEX_FILE.exists():
        raise FileNotFoundError(f"_index.json not found: {INDEX_FILE}")
    return read_json(INDEX_FILE)


def iter_parts_from_index(
    index_data: dict[str, list[dict[str, str]]] | None = None,
) -> Iterable[tuple[str, str, Path]]:
    """Yield (category_name, part_id, filepath) for every indexed part file."""
    if index_data is None:
        index_data = load_index()

    for category_name, part_list in index_data.items():
        seen: set[str] = set()
        for entry in part_list:
            file_ref = entry["file"]
            if file_ref in seen:
                continue
            seen.add(file_ref)
            filepath = PARTS_DATA_DIR / file_ref
            yield category_name, filepath.stem, filepath


def ensure_list(value: Any) -> list:
    return value if isinstance(value, list) else []


def ensure_translation_fields(data: dict[str, Any]) -> dict[str, Any]:
    """
    Ensure Japanese fields exist on a part dict (in-place) without wiping values.
    Safe to call before editing or when normalizing imported data.
    """
    for _en_key, ja_key in PART_TEXT_FIELDS:
        data.setdefault(ja_key, "")

    logic_nodes = ensure_list(data.get("logicNodes"))
    data["logicNodes"] = logic_nodes
    for node in logic_nodes:
        if not isinstance(node, dict):
            continue
        for _en_key, ja_key in LOGIC_NODE_TEXT_FIELDS:
            node.setdefault(ja_key, "")

    properties = ensure_list(data.get("properties"))
    data["properties"] = properties
    for prop in properties:
        if not isinstance(prop, dict):
            continue
        for _en_key, ja_key in PROPERTY_TEXT_FIELDS:
            prop.setdefault(ja_key, "")

    return data


def _order_keys(source: dict[str, Any], preferred: list[str]) -> dict[str, Any]:
    ordered: dict[str, Any] = {}
    for key in preferred:
        if key in source:
            ordered[key] = source[key]
    for key, value in source.items():
        if key not in ordered:
            ordered[key] = value
    return ordered


def normalize_part_shape(data: dict[str, Any]) -> dict[str, Any]:
    """
    Ensure JA fields exist and reorder keys for stable, readable JSON.
    Returns a new dict suitable for write_json.
    """
    ensure_translation_fields(data)

    logic_nodes = []
    for node in ensure_list(data.get("logicNodes")):
        if not isinstance(node, dict):
            continue
        logic_nodes.append(
            _order_keys(
                node,
                [
                    "label",
                    "labelJa",
                    "mode",
                    "type",
                    "description",
                    "descriptionJa",
                ],
            )
        )

    properties = []
    for prop in ensure_list(data.get("properties")):
        if not isinstance(prop, dict):
            continue
        properties.append(
            _order_keys(
                prop,
                ["name", "nameJa", "description", "descriptionJa"],
            )
        )

    shaped = dict(data)
    shaped["logicNodes"] = logic_nodes
    shaped["properties"] = properties
    return _order_keys(
        shaped,
        [
            "name",
            "nameJa",
            "category",
            "dlc",
            "description",
            "descriptionJa",
            "shortDescription",
            "shortDescriptionJa",
            "value",
            "mass",
            "logicNodes",
            "properties",
        ],
    )


def apply_translation_overlay(
    data: dict[str, Any],
    translation: dict[str, Any] | None,
) -> dict[str, Any]:
    """
    Merge a legacy translation overlay into a part dict (in-place).
    Only non-empty Japanese values from the overlay win.
    """
    ensure_translation_fields(data)
    if not translation:
        return data

    for _en_key, ja_key in PART_TEXT_FIELDS:
        value = translation.get(ja_key, "")
        if value:
            data[ja_key] = value

    node_translations = ensure_list(translation.get("logicNodes"))
    for i, node in enumerate(ensure_list(data.get("logicNodes"))):
        if i >= len(node_translations) or not isinstance(node, dict):
            continue
        src = node_translations[i] or {}
        for _en_key, ja_key in LOGIC_NODE_TEXT_FIELDS:
            value = src.get(ja_key, "")
            if value:
                node[ja_key] = value

    prop_translations = ensure_list(translation.get("properties"))
    for i, prop in enumerate(ensure_list(data.get("properties"))):
        if i >= len(prop_translations) or not isinstance(prop, dict):
            continue
        src = prop_translations[i] or {}
        for _en_key, ja_key in PROPERTY_TEXT_FIELDS:
            value = src.get(ja_key, "")
            if value:
                prop[ja_key] = value

    return data


def preserve_translation_fields(
    new_data: dict[str, Any],
    old_data: dict[str, Any] | None,
) -> dict[str, Any]:
    """
    When regenerating English fields from game data, keep existing Japanese text.
    Matches nested nodes/properties by index (same order as game definitions).
    """
    if not old_data:
        return ensure_translation_fields(new_data)

    ensure_translation_fields(new_data)
    ensure_translation_fields(old_data)

    for _en_key, ja_key in PART_TEXT_FIELDS:
        if old_data.get(ja_key):
            new_data[ja_key] = old_data[ja_key]

    old_nodes = ensure_list(old_data.get("logicNodes"))
    for i, node in enumerate(ensure_list(new_data.get("logicNodes"))):
        if i >= len(old_nodes) or not isinstance(node, dict):
            continue
        old_node = old_nodes[i]
        if not isinstance(old_node, dict):
            continue
        for _en_key, ja_key in LOGIC_NODE_TEXT_FIELDS:
            if old_node.get(ja_key):
                node[ja_key] = old_node[ja_key]

    old_props = ensure_list(old_data.get("properties"))
    for i, prop in enumerate(ensure_list(new_data.get("properties"))):
        if i >= len(old_props) or not isinstance(prop, dict):
            continue
        old_prop = old_props[i]
        if not isinstance(old_prop, dict):
            continue
        for _en_key, ja_key in PROPERTY_TEXT_FIELDS:
            if old_prop.get(ja_key):
                prop[ja_key] = old_prop[ja_key]

    return new_data


def prompt(text: str, default: str = "") -> str:
    value = input(text).rstrip()
    return value if value != "" else default


def choose_from_list(items: list[str], title: str) -> int | None:
    while True:
        print(f"\n=== {title} ===")
        for index, item in enumerate(items, start=1):
            print(f"  [{index}] {item}")
        print("  [q] 終了 / 戻る")
        choice = input("> ").strip().lower()
        if choice == "q":
            return None
        if choice.isdigit():
            index = int(choice) - 1
            if 0 <= index < len(items):
                return index
        print("無効な入力です。")


def translation_progress(data: dict[str, Any]) -> tuple[int, int]:
    """Return (filled, total) counts for Japanese fields on one part."""
    ensure_translation_fields(data)
    filled = 0
    total = 0

    for en_key, ja_key in PART_TEXT_FIELDS:
        en_value = data.get(en_key, "")
        if not en_value:
            continue
        total += 1
        if data.get(ja_key):
            filled += 1

    for node in ensure_list(data.get("logicNodes")):
        if not isinstance(node, dict):
            continue
        for en_key, ja_key in LOGIC_NODE_TEXT_FIELDS:
            if not node.get(en_key):
                continue
            total += 1
            if node.get(ja_key):
                filled += 1

    for prop in ensure_list(data.get("properties")):
        if not isinstance(prop, dict):
            continue
        if prop.get("name") == "__none__":
            continue
        for en_key, ja_key in PROPERTY_TEXT_FIELDS:
            if not prop.get(en_key):
                continue
            total += 1
            if prop.get(ja_key):
                filled += 1

    return filled, total


def build_part_index_entry(filepath: Path, category_name: str) -> dict[str, Any]:
    """Build one site-facing part entry from a parts_data JSON file."""
    data = ensure_translation_fields(read_json(filepath))

    logic_nodes = []
    for node in ensure_list(data.get("logicNodes")):
        if not isinstance(node, dict):
            continue
        logic_nodes.append(
            {
                "label": clean_text(node.get("label", "")),
                "labelJa": clean_text(node.get("labelJa", "")),
                "mode": node.get("mode", "output"),
                "type": node.get("type", ""),
                "description": clean_text(node.get("description", "")),
                "descriptionJa": clean_text(node.get("descriptionJa", "")),
            }
        )

    properties = []
    for prop in ensure_list(data.get("properties")):
        if not isinstance(prop, dict):
            continue
        properties.append(
            {
                "name": prop.get("name", ""),
                "nameJa": prop.get("nameJa", ""),
                "description": prop.get("description", ""),
                "descriptionJa": prop.get("descriptionJa", ""),
            }
        )

    return {
        "id": filepath.stem,
        "name": data.get("name", filepath.stem),
        "nameJa": data.get("nameJa", ""),
        "category": category_name,
        "dlc": data.get("dlc", ""),
        "description": clean_text(data.get("description", "")),
        "descriptionJa": clean_text(data.get("descriptionJa", "")),
        "shortDescription": clean_text(data.get("shortDescription", "")),
        "shortDescriptionJa": clean_text(data.get("shortDescriptionJa", "")),
        "value": data.get("value", 0),
        "mass": data.get("mass", 0.0),
        "logicNodes": logic_nodes,
        "properties": properties,
    }


# ---------------------------------------------------------------------------
# Extensible editor mode registry
# ---------------------------------------------------------------------------

ModeHandler = Callable[[], None]

_MODE_REGISTRY: dict[str, tuple[str, ModeHandler]] = {}


def register_mode(key: str, label: str, handler: ModeHandler) -> None:
    """Register an editor mode. key is the menu number / CLI flag base."""
    _MODE_REGISTRY[key] = (label, handler)


def list_modes() -> list[tuple[str, str]]:
    return [(key, label) for key, (label, _) in sorted(_MODE_REGISTRY.items())]


def get_mode_handler(key: str) -> ModeHandler | None:
    entry = _MODE_REGISTRY.get(key)
    return entry[1] if entry else None
