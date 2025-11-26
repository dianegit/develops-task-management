# GitHub Secrets Auto-Upload Script
# This script uses GitHub CLI to automatically add secrets

Write-Host "=== GitHub Secrets Upload ===" -ForegroundColor Cyan
Write-Host ""

# Check if GitHub CLI is installed
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: GitHub CLI (gh) is not installed!" -ForegroundColor Red
    Write-Host "Install it from: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host "Or run: winget install --id GitHub.cli" -ForegroundColor Yellow
    exit 1
}

# Check if authenticated
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "You need to login to GitHub CLI first" -ForegroundColor Yellow
    Write-Host "Run: gh auth login" -ForegroundColor Cyan
    exit 1
}

Write-Host "✓ GitHub CLI is authenticated" -ForegroundColor Green
Write-Host ""

# Repository
$REPO = "dianegit/develops-task-management"

# Read secrets from file
$SECRETS_FILE = Join-Path $PSScriptRoot "github-secrets.txt"
if (-not (Test-Path $SECRETS_FILE)) {
    Write-Host "ERROR: github-secrets.txt not found!" -ForegroundColor Red
    Write-Host "Run .\setup-github-secrets.ps1 first" -ForegroundColor Yellow
    exit 1
}

# Extract values from secrets file
$content = Get-Content $SECRETS_FILE -Raw

# Function to extract secret value
function Get-SecretValue {
    param($content, $name)
    
    if ($name -eq "SSH_PRIVATE_KEY") {
        # Extract entire SSH key
        if ($content -match "(?s)SSH_PRIVATE_KEY=\s*(-----BEGIN.*?-----END[^-]*-----\s*)") {
            return $matches[1].Trim()
        }
    } else {
        # Extract single-line value
        if ($content -match "$name=([^\r\n]+)") {
            return $matches[1].Trim()
        }
    }
    return $null
}

# Secrets to add
$secrets = @{
    "SECRET_KEY" = Get-SecretValue $content "SECRET_KEY"
    "DB_USER" = Get-SecretValue $content "DB_USER"
    "DB_PASSWORD" = Get-SecretValue $content "DB_PASSWORD"
    "DB_NAME" = Get-SecretValue $content "DB_NAME"
    "SSH_PRIVATE_KEY" = Get-SecretValue $content "SSH_PRIVATE_KEY"
}

Write-Host "Secrets to upload:" -ForegroundColor Yellow
foreach ($key in $secrets.Keys) {
    if ($secrets[$key]) {
        $preview = if ($key -eq "SSH_PRIVATE_KEY") { 
            "SSH key ($(($secrets[$key] -split "`n").Count) lines)"
        } else {
            $secrets[$key].Substring(0, [Math]::Min(20, $secrets[$key].Length)) + "..."
        }
        Write-Host "  $key = $preview" -ForegroundColor White
    } else {
        Write-Host "  $key = NOT FOUND!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "This will upload secrets to: $REPO" -ForegroundColor Cyan
Write-Host "Continue? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -ne 'Y' -and $response -ne 'y') {
    Write-Host "Cancelled" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Uploading secrets..." -ForegroundColor Cyan

$success = 0
$failed = 0

foreach ($secretName in $secrets.Keys) {
    $value = $secrets[$secretName]
    
    if (-not $value) {
        Write-Host "  ✗ $secretName - Value not found" -ForegroundColor Red
        $failed++
        continue
    }
    
    Write-Host "  Uploading $secretName..." -ForegroundColor White
    
    try {
        # Use gh secret set command
        $value | gh secret set $secretName --repo $REPO
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ $secretName uploaded" -ForegroundColor Green
            $success++
        } else {
            Write-Host "  ✗ $secretName failed" -ForegroundColor Red
            $failed++
        }
    } catch {
        Write-Host "  ✗ $secretName error: $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "=== Upload Complete ===" -ForegroundColor Cyan
Write-Host "Success: $success" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })

if ($success -gt 0) {
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Verify secrets in GitHub: https://github.com/$REPO/settings/secrets/actions" -ForegroundColor White
    Write-Host "2. Run deployment script" -ForegroundColor White
}
