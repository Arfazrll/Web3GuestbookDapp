@echo off
setlocal
echo ========================================================
echo   GIT RE-INITIALIZATION (The "Nuclear" Option)
echo ========================================================
echo.
echo This script will:
echo 1. Delete the corrupted/bloated .git folder completely.
echo 2. Create a fresh git repository.
echo 3. Add all your current files (minus the large ones ignored by .gitignore).
echo 4. Force push to GitHub (Please backup your remote history if you need it!)
echo.
pause

echo.
echo [1/6] Removing old .git folder...
rmdir /s /q .git
if %errorlevel% neq 0 (
    echo [ERROR] Could not delete .git folder. Make sure no other apps are using it.
    pause
    exit /b
)

echo.
echo [2/6] Initializing new git repository...
git init
git branch -M main

echo.
echo [3/6] Adding remote origin...
git remote add origin https://github.com/Arfazrll/Web3GuestbookDapp.git

echo.
echo [4/6] Adding files (This will respect your new .gitignore)...
git add .

echo.
echo [5/6] Committing clean state...
git commit -m "chore: re-init project with clean gitignore"

echo.
echo [6/6] Force Pushing to GitHub...
git push -u --force origin main

echo.
echo ========================================================
echo   Process Complete!
echo ========================================================
pause
