"""
Build src/data/parts_index.json from parts_data.

Japanese fields are read from each parts_data JSON file itself.
Do not edit parts_index.json by hand — regenerate with this script
(or via npm prestart / prebuild).
"""

from __future__ import annotations

from part_data_common import (
    OUTPUT_INDEX_FILE,
    PARTS_DATA_DIR,
    build_part_index_entry,
    iter_parts_from_index,
    load_index,
    write_json,
)


def main() -> None:
    index_data = load_index()

    categories = []
    missing_files: list[str] = []

    # Preserve category order from _index.json
    for category_name in index_data.keys():
        parts = []
        for cat, _part_id, filepath in iter_parts_from_index({category_name: index_data[category_name]}):
            if not filepath.exists():
                missing_files.append(str(filepath.relative_to(PARTS_DATA_DIR)))
                continue
            parts.append(build_part_index_entry(filepath, cat))

        categories.append(
            {
                "name": category_name,
                "parts": parts,
            }
        )

    if missing_files:
        missing = "\n".join(f"  - {path}" for path in missing_files)
        raise FileNotFoundError(
            f"Missing part JSON files listed in _index.json:\n{missing}"
        )

    write_json(OUTPUT_INDEX_FILE, categories)

    total_parts = sum(len(c["parts"]) for c in categories)
    print(f"Generated {OUTPUT_INDEX_FILE}")
    print(f"  {len(categories)} categories, {total_parts} parts")
    print("  (Japanese fields sourced from parts_data/*.json)")


if __name__ == "__main__":
    main()
