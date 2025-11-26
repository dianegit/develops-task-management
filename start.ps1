# Quick Start Script for Windows PowerShell

Write-Host "🚀 Starting DevSecOps Task Manager..." -ForegroundColor Green

# Check if Docker is running
Write-Host "`n📦 Checking Docker..." -ForegroundColor Cyan
docker --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not installed or not running!" -ForegroundColor Red
    Write-Host "Please install Docker Desktop and try again." -ForegroundColor Yellow
    exit 1
}

# Check if .env exists
Write-Host "`n🔧 Checking environment configuration..." -ForegroundColor Cyan
if (-not (Test-Path "backend\.env")) {
    Write-Host "Creating backend/.env from template..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "⚠️  Please edit backend/.env with your settings before continuing!" -ForegroundColor Yellow
    Write-Host "Press any key to continue after editing .env file..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Start Docker Compose
Write-Host "`n🐳 Starting Docker containers..." -ForegroundColor Cyan
docker-compose up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Application started successfully!" -ForegroundColor Green
    Write-Host "`n📍 Access points:" -ForegroundColor Cyan
    Write-Host "   Frontend:  http://localhost:3000" -ForegroundColor White
    Write-Host "   Backend:   http://localhost:8000" -ForegroundColor White
    Write-Host "   API Docs:  http://localhost:8000/api/docs" -ForegroundColor White
    
    Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Open http://localhost:3000 in your browser" -ForegroundColor White
    Write-Host "   2. Register a new account" -ForegroundColor White
    Write-Host "   3. Start managing your tasks!" -ForegroundColor White
    
    Write-Host "`n🛠️  Useful commands:" -ForegroundColor Cyan
    Write-Host "   View logs:        docker-compose logs -f" -ForegroundColor White
    Write-Host "   Stop services:    docker-compose down" -ForegroundColor White
    Write-Host "   Restart services: docker-compose restart" -ForegroundColor White
} else {
    Write-Host "`n❌ Failed to start application!" -ForegroundColor Red
    Write-Host "Check the error messages above and try again." -ForegroundColor Yellow
    exit 1
}
