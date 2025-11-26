# GitHub Secrets Setup Helper Script
# This script helps you extract and prepare all required GitHub secrets

Write-Host "=== GitHub Secrets Setup Helper ===" -ForegroundColor Cyan
Write-Host ""

# 1. Generate SECRET_KEY
Write-Host "[1/7] Generating SECRET_KEY..." -ForegroundColor Yellow
$SECRET_KEY = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
Write-Host "SECRET_KEY generated successfully!" -ForegroundColor Green
Write-Host ""

# 2. Read SSH Private Key
Write-Host "[2/7] Reading SSH_PRIVATE_KEY..." -ForegroundColor Yellow
$SSH_PRIVATE_KEY_PATH = "$env:USERPROFILE\.ssh\devops-pipeline"
if (Test-Path $SSH_PRIVATE_KEY_PATH) {
    $SSH_PRIVATE_KEY = Get-Content $SSH_PRIVATE_KEY_PATH -Raw
    Write-Host "SSH_PRIVATE_KEY found!" -ForegroundColor Green
} else {
    Write-Host "ERROR: SSH private key not found at $SSH_PRIVATE_KEY_PATH" -ForegroundColor Red
    $SSH_PRIVATE_KEY = "NOT_FOUND"
}
Write-Host ""

# 3. Database credentials
Write-Host "[3/7] Generating Database Credentials..." -ForegroundColor Yellow
$DB_USER = "taskuser"
$DB_NAME = "taskmanager"
$DB_PASSWORD = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Host "Database credentials generated!" -ForegroundColor Green
Write-Host ""

# 4. Extract Terraform Outputs (if available)
Write-Host "[4/7] Checking Terraform Outputs..." -ForegroundColor Yellow
$TERRAFORM_DIR = Join-Path $PSScriptRoot "terraform"
if (Test-Path $TERRAFORM_DIR) {
    Push-Location $TERRAFORM_DIR
    
    try {
        $VM_PUBLIC_IP = terraform output -raw vm_public_ip 2>$null
        $ACR_NAME = terraform output -raw acr_name 2>$null
        $ACR_LOGIN_SERVER = terraform output -raw acr_login_server 2>$null
        $ACR_USERNAME = terraform output -raw acr_admin_username 2>$null
        $ACR_PASSWORD = terraform output -raw acr_admin_password 2>$null
        
        if ($VM_PUBLIC_IP) {
            Write-Host "Terraform outputs extracted successfully!" -ForegroundColor Green
        } else {
            Write-Host "WARNING: Terraform not applied yet. Run 'terraform apply' first." -ForegroundColor Yellow
            $VM_PUBLIC_IP = "PENDING_TERRAFORM_APPLY"
            $ACR_NAME = "PENDING_TERRAFORM_APPLY"
            $ACR_LOGIN_SERVER = "PENDING_TERRAFORM_APPLY"
            $ACR_USERNAME = "PENDING_TERRAFORM_APPLY"
            $ACR_PASSWORD = "PENDING_TERRAFORM_APPLY"
        }
    } catch {
        Write-Host "WARNING: Could not extract Terraform outputs. Apply Terraform first." -ForegroundColor Yellow
        $VM_PUBLIC_IP = "PENDING_TERRAFORM_APPLY"
        $ACR_NAME = "PENDING_TERRAFORM_APPLY"
        $ACR_LOGIN_SERVER = "PENDING_TERRAFORM_APPLY"
        $ACR_USERNAME = "PENDING_TERRAFORM_APPLY"
        $ACR_PASSWORD = "PENDING_TERRAFORM_APPLY"
    }
    
    Pop-Location
} else {
    Write-Host "ERROR: Terraform directory not found" -ForegroundColor Red
}
Write-Host ""

# 5. Create secrets file
Write-Host "[5/7] Creating secrets reference file..." -ForegroundColor Yellow
$SECRETS_FILE = Join-Path $PSScriptRoot "github-secrets.txt"

$secretsContent = @"
=================================
GitHub Secrets Configuration
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
=================================

IMPORTANT: Add these secrets to GitHub Repository Settings > Secrets and variables > Actions

--- GENERATED SECRETS ---

SECRET_KEY=$SECRET_KEY

DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME

--- SSH KEYS ---

SSH_PRIVATE_KEY=
$SSH_PRIVATE_KEY

--- TERRAFORM OUTPUTS (Run terraform apply first if these show PENDING) ---

VM_PUBLIC_IP=$VM_PUBLIC_IP
ACR_NAME=$ACR_NAME
ACR_LOGIN_SERVER=$ACR_LOGIN_SERVER
ACR_USERNAME=$ACR_USERNAME
ACR_PASSWORD=$ACR_PASSWORD

=================================
NEXT STEPS:
=================================

1. If Terraform outputs show "PENDING_TERRAFORM_APPLY":
   - Run: cd terraform
   - Run: terraform apply
   - Re-run this script to get actual values

2. Add ALL secrets above to GitHub:
   - Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
   - Click "New repository secret"
   - Copy each NAME=VALUE pair above

3. Mark these as SENSITIVE in GitHub:
   - SSH_PRIVATE_KEY
   - DB_PASSWORD
   - SECRET_KEY
   - ACR_PASSWORD

=================================
"@

Set-Content -Path $SECRETS_FILE -Value $secretsContent
Write-Host "Secrets saved to: $SECRETS_FILE" -ForegroundColor Green
Write-Host ""

# 6. Display summary
Write-Host "[6/7] Secrets Summary:" -ForegroundColor Yellow
Write-Host "  ✓ SECRET_KEY: Generated" -ForegroundColor Green
Write-Host "  ✓ DB Credentials: Generated" -ForegroundColor Green
if ($SSH_PRIVATE_KEY -ne "NOT_FOUND") {
    Write-Host "  ✓ SSH_PRIVATE_KEY: Found" -ForegroundColor Green
} else {
    Write-Host "  ✗ SSH_PRIVATE_KEY: Not found" -ForegroundColor Red
}
if ($VM_PUBLIC_IP -ne "PENDING_TERRAFORM_APPLY") {
    Write-Host "  ✓ Terraform Outputs: Extracted" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Terraform Outputs: Pending (run terraform apply)" -ForegroundColor Yellow
}
Write-Host ""

# 7. Offer to copy to clipboard
Write-Host "[7/7] Quick Actions:" -ForegroundColor Yellow
Write-Host "  File saved at: $SECRETS_FILE"
Write-Host "  Open file to copy secrets to GitHub"
Write-Host ""
Write-Host "Would you like to open the secrets file now? (Y/N)" -ForegroundColor Cyan
$response = Read-Host
if ($response -eq 'Y' -or $response -eq 'y') {
    notepad $SECRETS_FILE
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green
Write-Host "Add the secrets from $SECRETS_FILE to GitHub Actions secrets" -ForegroundColor Cyan
