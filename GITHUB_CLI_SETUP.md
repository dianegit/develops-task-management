# GitHub CLI Setup and Secret Upload Instructions

## Step 1: Restart PowerShell

1. **Close this PowerShell window**
2. **Open a new PowerShell window**
3. **Navigate to project directory**:
   ```powershell
   cd C:\Users\User\OneDrive\Documents\develops-task-management
   ```

## Step 2: Authenticate GitHub CLI

Run this command:
```powershell
gh auth login
```

Follow the prompts:
- What account do you want to log into? → **GitHub.com**
- What is your preferred protocol? → **HTTPS**
- Authenticate Git with GitHub credentials? → **Yes**
- How would you like to authenticate? → **Login with a web browser**

Then:
1. Copy the one-time code shown
2. Press Enter to open browser
3. Paste the code
4. Authorize GitHub CLI

## Step 3: Upload Secrets

Once authenticated, run:
```powershell
.\scripts\upload-github-secrets.ps1
```

This will:
- Read secrets from `scripts/github-secrets.txt`
- Upload all 5 secrets to GitHub
- Confirm success

## Step 4: Verify

Check secrets were added:
https://github.com/dianegit/develops-task-management/settings/secrets/actions

You should see:
- SECRET_KEY
- SSH_PRIVATE_KEY
- DB_USER
- DB_PASSWORD
- DB_NAME

## Step 5: Ready to Deploy!

Once secrets are uploaded, return to this chat and type:
**"secrets uploaded"**

I will then:
1. Commit all changes
2. Push to GitHub
3. Monitor deployment progress
4. Extract Terraform outputs
5. Add remaining secrets (VM_PUBLIC_IP, ACR credentials)
6. Complete deployment

---

**RESTART POWERSHELL NOW AND RUN THE COMMANDS ABOVE**
