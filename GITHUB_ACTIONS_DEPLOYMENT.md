# GitHub Actions Deployment - Step-by-Step Guide

## Step 1: Add GitHub Secrets

### Navigate to Secrets Page
1. Open your browser and go to: `https://github.com/dianegit/develops-task-management/settings/secrets/actions`
2. Click **"New repository secret"**

### Add Secret #1: VM_PUBLIC_IP
- **Name**: `VM_PUBLIC_IP`
- **Value**: `158.158.101.98`
- Click **"Add secret"**

### Add Secret #2: SSH_PRIVATE_KEY
- **Name**: `SSH_PRIVATE_KEY`
- **Value**: Copy the ENTIRE content from `C:\Users\User\.ssh\id_rsa`
  - Open the file in Notepad
  - Select All (Ctrl+A)
  - Copy (Ctrl+C)
  - Paste into the GitHub secret value field
  - **IMPORTANT**: Make sure you include the `-----BEGIN` and `-----END` lines
- Click **"Add secret"**

## Step 2: Trigger the Workflow

1. Go to: `https://github.com/dianegit/develops-task-management/actions`
2. Click on **"CD Pipeline"** in the left sidebar
3. Click the **"Run workflow"** dropdown button (top right)
4. Click **"Run workflow"** button (green)

## Step 3: Monitor Progress

- Watch the workflow run in real-time
- It will take approximately **5-10 minutes**
- You'll see these steps:
  1. ✅ Build and push images to GitHub Container Registry
  2. ✅ Deploy to VM via SSH
  3. ✅ Verify deployment

## Step 4: Access Your Application

Once the workflow completes successfully:

**🌐 Your App URL**: `http://158.158.101.98:3000`

**API Documentation**: `http://158.158.101.98:8000/docs`

**Health Check**: `http://158.158.101.98:8000/health`

---

## Troubleshooting

If the workflow fails:
1. Check the workflow logs in the Actions tab
2. Verify both secrets were added correctly
3. Ensure your SSH key doesn't have a passphrase
4. Check that the VM is running: `ssh -i C:\Users\User\.ssh\id_rsa azureuser@158.158.101.98`

## Alternative: Manual Secret Verification

To verify your SSH key is correct, run:
```powershell
ssh -i C:\Users\User\.ssh\id_rsa azureuser@158.158.101.98 "whoami"
```
Expected output: `azureuser`
