# Manual Deployment Guide - Complete the Setup

## ✅ What's Done
- ✅ Azure VM deployed: **158.158.101.98**
- ✅ Container Registry: **taskappdevacr.azurecr.io**
- ✅ All infrastructure provisioned

## 🔧 Final Steps (SSH Deployment)

### Step 1: SSH into Your VM
```bash
ssh -i C:\Users\User\.ssh\id_rsa azureuser@158.158.101.98
```

**Note**: If SSH fails, you may need to:
1. Check if the private key has correct permissions
2. Use PuTTY (Windows) or try: `ssh -i ~/.ssh/id_rsa azureuser@158.158.101.98`

### Step 2: Install Docker on the VM
```bash
# Update package list
sudo apt-get update

# Install Docker
sudo apt-get install -y docker.io docker-compose

# Start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Add yourself to docker group
sudo user mod -aG docker $USER
newgrp docker
```

### Step 3: Log into Azure Container Registry
```bash
# Get ACR credentials from Azure CLI (run on your LOCAL machine):
# az acr credential show --name taskappdevacr

# Then on the VM:
docker login taskappdevacr.azurecr.io
# Username: taskappdevacr
# Password: [get from the command above]
```

### Step 4: Create docker-compose.yml on the VM
```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=taskuser
      - POSTGRES_PASSWORD=taskpass123
      - POSTGRES_DB=taskmanager
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  backend:
    image: taskappdevacr.azurecr.io/taskapp-backend:latest
    environment:
      - DATABASE_URL=postgresql://taskuser:taskpass123@postgres:5432/taskmanager
      - SECRET_KEY=your-secret-key-here
      - CORS_ORIGINS=http://158.158.101.98:3000
    depends_on:
      - postgres
    networks:
      - app-network
    ports:
      - "8000:8000"

  frontend:
    image: taskappdevacr.azurecr.io/taskapp-frontend:latest
    depends_on:
      - backend
    networks:
      - app-network
    ports:
      - "3000:80"

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
EOF
```

### Step 5: Start the Application
```bash
# Pull the images
docker-compose pull

# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Step 6: Configure Firewall (Optional but Recommended)
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 8000/tcp
sudo ufw enable
```

## 🌐 Access Your Application
- **Frontend**: http://158.158.101.98:3000
- **Backend API**: http://158.158.101.98:8000/docs
- **Health Check**: http://158.158.101.98:8000/health

## 🔐 Get ACR Password
Run this on your LOCAL machine:
```powershell
az acr credential show --name taskappdevacr
```

Or use Terraform outputs:
```powershell
cd terraform
terraform output acr_admin_password
```

## ⚠️ Troubleshooting

### Images Already in ACR?
If the images aren't in ACR yet, build and push them from your LOCAL machine:

```powershell
# Login to ACR
az acr login --name taskappdevacr

# Build and push backend
docker build -t taskappdevacr.azurecr.io/taskapp-backend:latest -f Dockerfile.backend .
docker push taskappdevacr.azurecr.io/taskapp-backend:latest

# Build and push frontend  
docker build -t taskappdevacr.azurecr.io/taskapp-frontend:latest -f Dockerfile.frontend .
docker push taskappdevacr.azurecr.io/taskapp-frontend:latest
```

Then SSH back to the VM and run `docker-compose pull` and `docker-compose up -d`.
