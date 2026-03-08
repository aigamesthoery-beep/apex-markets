@echo off
title Apex Markets Dashboard
echo.
echo  =============================================
echo   Apex Markets Dashboard
echo   Server: http://localhost:3000/dashboard.html
echo  =============================================
echo.

REM ใช้ Node.js serve static files (เร็ว เสถียร ไม่ต้องใช้ Python)
REM ข้อมูลหุ้นดึงตรงจาก Yahoo Finance ใน browser อัตโนมัติ

node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting Node.js server on port 3000...
    start "" http://localhost:3000/dashboard.html
    node server.js
    goto :end
)

REM Fallback: Python http.server ถ้าไม่มี Node.js
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting Python server on port 8080...
    start "" http://localhost:8080/dashboard.html
    python -m http.server 8080
    goto :end
)

echo ERROR: Node.js or Python not found.
echo Please install Node.js from https://nodejs.org
pause

:end
