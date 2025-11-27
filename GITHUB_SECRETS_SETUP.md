# GitHub Secrets Required for CD Pipeline

## Add these secrets to your GitHub repository:

### Settings → Secrets and variables → Actions → New repository secret

1. **VM_PUBLIC_IP**
   ```
   158.158.101.98
   ```

2. **SSH_PRIVATE_KEY**
   - Copy the ENTIRE content of `C:\Users\User\.ssh\id_rsa`
   - Include the `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` lines
   - Paste as-is into GitHub Secrets

## Already Added Secrets:
- ✅ SECRET_KEY
- ✅ DB_USER
- ✅ DB_PASSWORD
- ✅ DB_NAME
- ✅ ARM_CLIENT_ID
- ✅ ARM_CLIENT_SECRET
- ✅ ARM_TENANT_ID
- ✅ ARM_SUBSCRIPTION_ID
- ✅ TF_API_TOKEN

## After Adding Secrets:
1. Go to GitHub Actions tab
2. Click on "CD Pipeline" workflow
3. Click "Run workflow" → "Run workflow"
4. Wait 5-10 minutes for deployment
5. Access your app at: **http://158.158.101.98:3000**
