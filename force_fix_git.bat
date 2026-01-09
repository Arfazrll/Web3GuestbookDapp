@echo off
setlocal
echo ========================================================
echo   AGGRESSIVE GIT FIXER - REMOVING LARGE FILES FROM HISTORY
echo ========================================================

echo.
echo [1/6] Stopping background git processes...
taskkill /F /IM git.exe /T 2>nul

echo.
echo [2/6] Resetting last 5 commits (Safety Buffer)...
:: This keeps your file changes but removes the commit history that contains the large file
git reset --soft HEAD~5
if %errorlevel% neq 0 (
    echo [WARNING] Could not reset 5 commits. Trying to reset 1...
    git reset --soft HEAD~1
)

echo.
echo [3/6] Clearing Git Index (Unstaging everything)...
:: This forces git to re-evaluate all files against .gitignore
git rm -r -q --cached .

echo.
echo [4/6] Re-adding files (Respecting .gitignore)...
:: This might take a while for large projects
git add .

echo.
echo [5/6] Committing clean state...
git commit -m "refactor: clean build and remove large files"

echo.
echo [6/6] Pushing to GitHub...
git push --force
:: Using --force because we rewrote local history (reset)

echo.
if %errorlevel% equ 0 (
    echo [SUCCESS] Successfully pushed to GitHub!
) else (
    echo [ERROR] Push failed. Check the error message above.
)

pause
