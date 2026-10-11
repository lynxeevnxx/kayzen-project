@echo off
title Kayzen Academia - Dev Server
cd /d "%~dp0"
echo [1/2] Memasang dependency (npm install)...
call npm install
if errorlevel 1 (
  echo.
  echo npm install GAGAL. Cek pesan error di atas.
  pause
  exit /b 1
)
echo.
echo [2/2] Menjalankan website di http://localhost:3000 ...
echo Tutup jendela ini untuk mematikan server.
call npm run dev
pause
