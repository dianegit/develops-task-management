# ⚡ Quick Setup: GitHub Secrets

## 🔑 Secrets to Add

### 1. VM_PUBLIC_IP
```
158.158.101.98
```

### 2. SSH_PRIVATE_KEY
**Location**: `C:\Users\User\.ssh\id_rsa`

**How to copy**:
1. Open PowerShell and run:
   ```powershell
   notepad C:\Users\User\.ssh\id_rsa
   ```
2. In Notepad: Ctrl+A (Select All), then Ctrl+C (Copy)
3. Paste into GitHub Secret value field

**The file looks like**:
```
-----BEGIN OPENSSH PRIVATE KEY-----
[many lines of text]
-----END OPENSSH PRIVATE KEY-----
```
Make sure to copy EVERYTHING including the BEGIN and END lines.

---

## 📝 Where to Add Them

1. **Login to GitHub** (if not already logged in)
2. Go to: https://github.com/dianegit/develops-task-management/settings/secrets/actions
3. Click **"New repository secret"** button
4. Add first secret:
   - Name: `VM_PUBLIC_IP`
   - Value: `158.158.101.98`
   - Click "Add secret"
5. Click **"New repository secret"** again
6. Add second secret:
   - Name: `SSH_PRIVATE_KEY`
   - Value: [paste the key from notepad]
   - Click "Add secret"

---

## ▶️ Run the Deployment

After adding both secrets:

1. Go to: https://github.com/dianegit/develops-task-management/actions
2. Click **"CD Pipeline"** workflow
3. Click **"Run workflow"** dropdown
4. Click **"Run workflow"** button

⏱️ Wait 5-10 minutes

🌐 **Your app will be at**: http://158.158.101.98:3000
