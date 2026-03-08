@echo off
echo ============================================
echo   APEX Markets Dashboard - Local Server
echo ============================================
echo.
echo Starting local server on http://localhost:8080
echo The dashboard will open automatically...
echo Press Ctrl+C to stop the server.
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    start "" http://localhost:8080/dashboard.html
    python -m http.server 8080
    goto :end
)

REM Try Python launcher
py --version >nul 2>&1
if %errorlevel% == 0 (
    start "" http://localhost:8080/dashboard.html
    py -m http.server 8080
    goto :end
)

REM Try Node.js http-server
npx --version >nul 2>&1
if %errorlevel% == 0 (
    start "" http://localhost:8080/dashboard.html
    npx http-server . -p 8080 --cors
    goto :end
)

echo ERROR: Python or Node.js not found.
echo Please install Python from https://python.org
echo Or run manually: python -m http.server 8080
pause

:end
