"""
Deprecated entry point.

Translations are now edited with edit_part_data.py (mode 2 / --translate)
and saved directly into parts_data/*.json.
"""

from __future__ import annotations

import sys
from pathlib import Path

# Ensure tools/ is importable when launched as a script.
TOOLS_DIR = Path(__file__).resolve().parent
if str(TOOLS_DIR) not in sys.path:
    sys.path.insert(0, str(TOOLS_DIR))


def main() -> None:
    print(
        "注意: edit_parts_translations.py は非推奨です。\n"
        "      edit_part_data.py の翻訳編集モードを起動します。\n"
        "      保存先は parts_data/<カテゴリ>/<パーツ>.json です。\n"
    )
    # Re-dispatch to the unified editor in translation mode.
    sys.argv = [str(TOOLS_DIR / "edit_part_data.py"), "--translate", *sys.argv[1:]]
    import edit_part_data

    edit_part_data.main()


if __name__ == "__main__":
    main()
