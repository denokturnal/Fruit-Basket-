@echo off
echo ========================================
echo E-Commerce Cart Setup Script
echo ========================================
echo.

echo [1/4] Setting up Backend...
cd backend
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)
echo Installing backend dependencies...
call npm install
echo.

echo [2/4] Seeding Database...
echo Adding sample products to MongoDB...
call npm run seed
echo.

echo [3/4] Setting up Frontend...
cd ..\frontend
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)
echo Installing frontend dependencies...
call npm install
echo.

echo [4/4] Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Backend:  cd backend  ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npm start
echo.
echo ========================================
pause
