@echo off
setlocal
cd /d "%~dp0"
echo Starting part data editor...
echo.
echo  Save target: parts_data\^<Category^>\^<Part^>.json
echo  Modes: [1] normal edit  [2] translation edit
echo  Example: edit_part_data.bat --translate
echo.
python "%~dp0edit_part_data.py" %*
set EXITCODE=%ERRORLEVEL%
echo.
if %EXITCODE% neq 0 (
  echo Python exited with code %EXITCODE%.
  echo If python was not found, install Python and add it to PATH.
)
echo Press any key to exit...
pause >nul
exit /b %EXITCODE%