# Extract Terraform Outputs After Apply
# Run this script AFTER terraform apply completes

Write-Host "=== Terraform Outputs Extractor ===" -ForegroundColor Cyan
Write-Host ""

$TERRAFORM_DIR = Join-Path $PSScriptRoot "..\terraform"

if (-not (Test-Path $TERRAFORM_DIR)) {
    Write-Host "ERROR: Terraform directory not found at $TERRAFORM_DIR" -ForegroundColor Red
    exit 1
}

Push-Location $TERRAFORM_DIR

Write-Host "Extracting Terraform outputs..." -ForegroundColor Yellow
Write-Host ""

try {
    $outputs = @{
        "VM_PUBLIC_IP" = terraform output -raw vm_public_ip
        "ACR_NAME" = terraform output -raw acr_name
        "ACR_LOGIN_SERVER" = terraform output -raw acr_login_server
        "ACR_USERNAME" = terraform output -raw acr_admin_username
        "ACR_PASSWORD" = terraform output -raw acr_admin_password
    }
    
    Write-Host "✓ Terraform outputs extracted successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Copy these values to GitHub Secrets:" -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
    
    foreach ($key in $outputs.Keys) {
        Write-Host "$key=$($outputs[$key])" -ForegroundColor White
    }
    
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Save to file
    $outputFile = Join-Path $PSScriptRoot "..\terraform-secrets.txt"
    $content = @"
Terraform Outputs - $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
=================================

Add these to GitHub Secrets:

VM_PUBLIC_IP=$($outputs["VM_PUBLIC_IP"])
ACR_NAME=$($outputs["ACR_NAME"])
ACR_LOGIN_SERVER=$($outputs["ACR_LOGIN_SERVER"])
ACR_USERNAME=$($outputs["ACR_USERNAME"])
ACR_PASSWORD=$($outputs["ACR_PASSWORD"])

=================================
"@
    
    Set-Content -Path $outputFile -Value $content
    Write-Host "Saved to: $outputFile" -ForegroundColor Green
    
} catch {
    Write-Host "ERROR: Could not extract Terraform outputs" -ForegroundColor Red
    Write-Host "Make sure 'terraform apply' has been run successfully" -ForegroundColor Yellow
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

Pop-Location
