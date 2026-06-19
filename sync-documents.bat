@echo off
cd /d "%~dp0"
node scripts\generate-manifest.js
echo.
echo Done. Refresh or reopen index.html to see the changes.
pause
