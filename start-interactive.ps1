# Start Interactive Hero Dev Server
Write-Host "Starting Interactive Hero Development Server..." -ForegroundColor Cyan
Write-Host "This will take a moment..." -ForegroundColor Yellow

# Kill any existing node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

# Start the dev server
Write-Host "Running: pnpm dev" -ForegroundColor Green
pnpm dev
