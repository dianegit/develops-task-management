# Deployment Checklist

## Pre-Deployment Steps

### 1. Add GitHub Secrets (REQUIRED)
Go to: https://github.com/dianegit/develops-task-management/settings/secrets/actions

**Add these secrets from `scripts/github-secrets.txt`**:
- [ ] `SECRET_KEY` (generated)
- [ ] `SSH_PRIVATE_KEY` (entire key with headers)
- [ ] `DB_USER` = taskuser
- [ ] `DB_PASSWORD` (generated)
- [ ] `DB_NAME` = taskmanager

**Verify these exist (from earlier)**:
- [ ] `TF_API_TOKEN`
- [ ] `SSH_PUBLIC_KEY`
- [ ] `ARM_CLIENT_ID`
- [ ] `ARM_CLIENT_SECRET`
- [ ] `ARM_TENANT_ID`
- [ ] `ARM_SUBSCRIPTION_ID`

### 2. Terraform Cloud Workspace
- [ ] Workspace `devops-pipeline-infrastructure` exists in `dianeee` org
- [ ] Azure credentials configured as environment variables

## Deployment Phase 1: Infrastructure

1. Push code to GitHub
2. Terraform workflow runs automatically
3. Infrastructure provisioned (~10-15 minutes):
   - Resource Group
   - Virtual Machine
   - Virtual Network & NSG
   - Public IP
   - Azure Container Registry

4. Extract Terraform outputs:
   ```powershell
   .\scripts\extract-terraform-outputs.ps1
   ```

5. Add remaining secrets to GitHub:
   - [ ] `VM_PUBLIC_IP`
   - [ ] `ACR_NAME`
   - [ ] `ACR_LOGIN_SERVER`
   - [ ] `ACR_USERNAME`
   - [ ] `ACR_PASSWORD`

## Deployment Phase 2: Application

1. CI/CD pipeline runs automatically
2. Docker images built and pushed to ACR
3. Ansible deploys to Azure VM
4. Application deployed (~5-10 minutes)

## Post-Deployment Verification

- [ ] Frontend accessible: http://<VM_IP>:3000
- [ ] Backend API: http://<VM_IP>:8000
- [ ] API Docs: http://<VM_IP>:8000/api/docs
- [ ] Health check: http://<VM_IP>:8000/health

## Troubleshooting

If issues occur, check:
- GitHub Actions workflow logs
- Terraform Cloud run logs
- SSH to VM: `ssh azureuser@<VM_IP>`
- Check containers: `docker ps`
- View logs: `docker-compose logs`

---
**Current Status**: Ready to deploy after secrets are added to GitHub
