"""
One-time migration: merge legacy src/data/parts_translations_ja.json
into parts_data/<Category>/<Part>.json.

Safe to re-run: only non-empty Japanese fields are written, and existing
non-empty values in parts_data are kept unless --force is passed.
"""

from __future__ import annotations

import argparse
import sys

from part_data_common import (
    LEGACY_TRANSLATIONS_FILE,
    PARTS_DATA_DIR,
    apply_translation_overlay,
    ensure_translation_fields,
    iter_parts_from_index,
    load_index,
    normalize_part_shape,
    read_json,
    write_json,
)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing Japanese fields in parts_data with legacy values",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would change without writing files",
    )
    args = parser.parse_args(argv)

    if not LEGACY_TRANSLATIONS_FILE.exists():
        print(f"Legacy translation file not found: {LEGACY_TRANSLATIONS_FILE}")
        print("Nothing to migrate.")
        return 0

    translations = read_json(LEGACY_TRANSLATIONS_FILE)
    if not isinstance(translations, dict):
        print("Legacy translation file is not an object; aborting.")
        return 1

    index_data = load_index()
    updated = 0
    skipped_missing = 0
    unchanged = 0

    for category_name, part_id, filepath in iter_parts_from_index(index_data):
        if not filepath.exists():
            skipped_missing += 1
            continue

        overlay = translations.get(part_id)
        if not overlay:
            unchanged += 1
            continue

        data = ensure_translation_fields(read_json(filepath))
        before = json_snapshot(data)

        if args.force:
            # Force: write overlay values even if empty? Keep non-empty only.
            apply_translation_overlay(data, overlay)
            # With force, also allow empty overlay to clear? No — only non-empty.
        else:
            # Default: only fill blanks
            apply_translation_overlay_fill_blanks(data, overlay)

        after = json_snapshot(data)
        if before == after:
            unchanged += 1
            continue

        rel = filepath.relative_to(PARTS_DATA_DIR)
        if args.dry_run:
            print(f"[dry-run] would update {rel}")
        else:
            write_json(filepath, normalize_part_shape(data))
            print(f"updated {rel}")
        updated += 1

    print(
        f"Done. updated={updated} unchanged={unchanged} missing_files={skipped_missing}"
    )
    if not args.dry_run and updated:
        print(
            "Japanese fields now live in parts_data. "
            "You can keep the legacy file for backup, or delete it later."
        )
    return 0


def json_snapshot(data: dict) -> str:
    import json

    return json.dumps(data, sort_keys=True, ensure_ascii=False)


def apply_translation_overlay_fill_blanks(data: dict, translation: dict) -> dict:
    """Like apply_translation_overlay, but never overwrites non-empty JA fields."""
    from part_data_common import (
        LOGIC_NODE_TEXT_FIELDS,
        PART_TEXT_FIELDS,
        PROPERTY_TEXT_FIELDS,
        ensure_list,
    )

    ensure_translation_fields(data)
    if not translation:
        return data

    for _en_key, ja_key in PART_TEXT_FIELDS:
        value = translation.get(ja_key, "")
        if value and not data.get(ja_key):
            data[ja_key] = value

    node_translations = ensure_list(translation.get("logicNodes"))
    for i, node in enumerate(ensure_list(data.get("logicNodes"))):
        if i >= len(node_translations) or not isinstance(node, dict):
            continue
        src = node_translations[i] or {}
        for _en_key, ja_key in LOGIC_NODE_TEXT_FIELDS:
            value = src.get(ja_key, "")
            if value and not node.get(ja_key):
                node[ja_key] = value

    prop_translations = ensure_list(translation.get("properties"))
    for i, prop in enumerate(ensure_list(data.get("properties"))):
        if i >= len(prop_translations) or not isinstance(prop, dict):
            continue
        src = prop_translations[i] or {}
        for _en_key, ja_key in PROPERTY_TEXT_FIELDS:
            value = src.get(ja_key, "")
            if value and not prop.get(ja_key):
                prop[ja_key] = value

    return data


if __name__ == "__main__":
    sys.exit(main())
