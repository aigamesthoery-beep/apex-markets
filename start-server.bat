@echo off
title Apex Markets Live Dashboard
echo.
echo ============================================
echo   APEX Markets Dashboard - Live Server
echo ============================================
echo.
echo Starting Node.js server (Live Yahoo Proxy) on port 3000...
echo The dashboard will open automatically...
echo Press Ctrl+C to stop the server.
echo.

node --version >nul 2>&1
if %errorlevel% == 0 (
    start "" http://localhost:3000/dashboard.html
    node server.js
    goto :end
)

echo ERROR: Node.js is not installed or not found in PATH!
echo You MUST install Node.js from https://nodejs.org to get live prices.
echo The old python fallback has been disabled because it cannot fetch live Yahoo data.
pause

:end
