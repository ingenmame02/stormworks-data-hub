"""
Deprecated.

Japanese fields now live inside parts_data JSON files.
Use edit_part_data.py --translate to fill them, or ensure_translation_fields
via migrate_translations_to_parts_data.py for legacy imports.

This script remains as a thin helper that ensures every parts_data file
has empty Japanese fields (nameJa, descriptionJa, ...) without wiping data.
"""

from __future__ import annotations

from part_data_common import (
    PARTS_DATA_DIR,
    ensure_translation_fields,
    iter_parts_from_index,
    load_index,
    read_json,
    write_json,
)


def main() -> None:
    index_data = load_index()
    updated = 0
    total = 0

    for _category_name, _part_id, filepath in iter_parts_from_index(index_data):
        if not filepath.exists():
            print(f"Skipping missing file: {filepath}")
            continue
        total += 1
        data = read_json(filepath)
        before = data
        ensure_translation_fields(data)
        # ensure_translation_fields mutates; always write normalized shape
        write_json(filepath, data)
        updated += 1

    print(f"Normalized translation fields on {updated}/{total} parts in {PARTS_DATA_DIR}")
    print("Edit translations with: python tools/edit_part_data.py --translate")


if __name__ == "__main__":
    main()
