@echo off
echo Starting Online Test App...
echo.

set NPM_PATH="C:\Program Files\nodejs\npm.cmd"

echo Checking for Node.js...
if not exist %NPM_PATH% (
    echo Error: Node.js not found at %NPM_PATH%
    echo Please install Node.js manually.
    pause
    exit
)

echo Starting Server...
start "Server" cmd /k "cd server && %NPM_PATH% start"

echo Starting Client...
start "Client" cmd /k "cd client && %NPM_PATH% run dev"

echo.
echo App launching...
echo When the Client window says "Local: http://localhost:5173", open that link in Chrome.
pause
