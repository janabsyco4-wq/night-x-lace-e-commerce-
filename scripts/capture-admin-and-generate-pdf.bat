@echo off
echo ========================================
echo Night x Lace - Admin Panel PDF Generator
echo ========================================
echo.

echo Step 1: Capturing Admin Screenshots...
echo Make sure:
echo   1. Dev server is running (npm run dev)
echo   2. You are logged in as admin in browser
echo.
pause

node scripts/capture-admin-screenshots.js

echo.
echo ========================================
echo.
echo Step 2: Generating PDF from screenshots...
echo.
pause

node scripts/generate-admin-pdf.js

echo.
echo ========================================
echo Done! Check ADMIN-PANEL-SCREENSHOTS.pdf
echo ========================================
pause
