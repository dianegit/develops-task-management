# GitHub Secrets Setup - README

## Overview
This directory contains helper scripts to generate and extract secrets for GitHub Actions.

## Scripts

### 1. `setup-github-secrets.ps1`
**Purpose**: Generate all required secrets and extract values

**What it does**:
- Generates a secure `SECRET_KEY` for the backend
- Generates database credentials (`DB_USER`, `DB_PASSWORD`, `DB_NAME`)
- Reads your SSH private key
- Attempts to extract Terraform outputs (if applied)
- Creates a `github-secrets.txt` file with all values

**Usage**:
```powershell
.\scripts\setup-github-secrets.ps1
```

**Output**: Creates `github-secrets.txt` with all secret values

---

### 2. `extract-terraform-outputs.ps1`
**Purpose**: Extract Terraform outputs after infrastructure is deployed

**When to run**: After `terraform apply` completes successfully

**Usage**:
```powershell
.\scripts\extract-terraform-outputs.ps1
```

**Output**: Creates `terraform-secrets.txt` with ACR and VM details

---

## Complete Setup Workflow

### Step 1: Generate Initial Secrets
```powershell
# Run this script first
.\scripts\setup-github-secrets.ps1
```

This creates `github-secrets.txt` with:
- SECRET_KEY (generated)
- DB credentials (generated)
- SSH_PRIVATE_KEY (if exists)
- Placeholders for Terraform outputs

### Step 2: Deploy Infrastructure
```powershell
# Deploy infrastructure with Terraform
cd terraform
terraform init
terraform apply
cd ..
```

### Step 3: Extract Terraform Outputs
```powershell
# Extract ACR and VM information
.\scripts\extract-terraform-outputs.ps1
```

This creates `terraform-secrets.txt` with:
- VM_PUBLIC_IP
- ACR_NAME
- ACR_LOGIN_SERVER
- ACR_USERNAME
- ACR_PASSWORD

### Step 4: Add to GitHub
Go to your repository on GitHub:
1. Navigate to: **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Copy each `NAME=VALUE` from the generated files
4. Mark these as **SENSITIVE**:
   - `SSH_PRIVATE_KEY`
   - `DB_PASSWORD`
   - `SECRET_KEY`
   - `ACR_PASSWORD`

---

## Required GitHub Secrets Checklist

### Already Configured (from earlier steps):
- ✅ `TF_API_TOKEN`
- ✅ `SSH_PUBLIC_KEY`
- ✅ `ARM_CLIENT_ID`
- ✅ `ARM_CLIENT_SECRET`
- ✅ `ARM_SUBSCRIPTION_ID`
- ✅ `ARM_TENANT_ID`

### To Be Added (from scripts):
- ⏳ `SECRET_KEY` (from setup-github-secrets.ps1)
- ⏳ `SSH_PRIVATE_KEY` (from setup-github-secrets.ps1)
- ⏳ `DB_USER` (from setup-github-secrets.ps1)
- ⏳ `DB_PASSWORD` (from setup-github-secrets.ps1)
- ⏳ `DB_NAME` (from setup-github-secrets.ps1)
- ⏳ `VM_PUBLIC_IP` (from extract-terraform-outputs.ps1)
- ⏳ `ACR_NAME` (from extract-terraform-outputs.ps1)
- ⏳ `ACR_LOGIN_SERVER` (from extract-terraform-outputs.ps1)
- ⏳ `ACR_USERNAME` (from extract-terraform-outputs.ps1)
- ⏳ `ACR_PASSWORD` (from extract-terraform-outputs.ps1)

---

## Troubleshooting

### "SSH private key not found"
- Ensure you've generated the SSH key pair:
  ```powershell
  ssh-keygen -t rsa -b 4096 -f "$env:USERPROFILE\.ssh\devops-pipeline"
  ```

### "Terraform outputs pending"
- Run `terraform apply` first
- Then re-run the extraction script

### "Could not extract Terraform outputs"
- Ensure you're in the project root directory
- Verify Terraform has been initialized and applied
- Check that `terraform/` directory exists

---

## Security Notes

⚠️ **IMPORTANT**:
- Files `github-secrets.txt` and `terraform-secrets.txt` contain sensitive information
- These files are in `.gitignore` and should **NEVER** be committed
- Delete them after adding secrets to GitHub
- Keep your SSH private key secure

---

## Quick Reference

```powershell
# Generate all secrets
.\scripts\setup-github-secrets.ps1

# After Terraform apply
.\scripts\extract-terraform-outputs.ps1

# View generated secrets
notepad github-secrets.txt
notepad terraform-secrets.txt
```
