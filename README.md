# Task Manager - DevSecOps Full-Stack Application

[![CI Pipeline](https://github.com/YOUR_USERNAME/develops-task-management/workflows/CI%20Pipeline/badge.svg)](https://github.com/YOUR_USERNAME/develops-task-management/actions)
[![Security Scanning](https://github.com/YOUR_USERNAME/develops-task-management/workflows/Security%20Scanning/badge.svg)](https://github.com/YOUR_USERNAME/develops-task-management/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A comprehensive task management application showcasing DevSecOps best practices with full CI/CD automation, infrastructure as code, and security scanning.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)

## 🎯 Overview

This project demonstrates a production-ready task management application with enterprise-level DevSecOps practices including automated testing, security scanning, infrastructure provisioning, and continuous deployment.

### Key Highlights

- 🔒 **Security First**: SAST, DAST, dependency scanning, secret detection
- 🚀 **Full Automation**: Complete CI/CD pipeline with GitHub Actions
- ☁️ **Cloud Native**: Deployed on Azure with IaC (Terraform)
- 📦 **Containerized**: Docker with multi-stage builds
- 🎨 **Modern UI**: React with TailwindCSS and premium design
- 🔐 **Role-Based Access**: JWT authentication with RBAC
- 📊 **Monitoring**: Prometheus metrics and health checks

## ✨ Features

### Application Features
- ✅ User authentication & authorization (JWT + RBAC)
- ✅ Task CRUD operations with filtering & search
- ✅ Priority levels (Low, Medium, High, Critical)
- ✅ Task status tracking (To Do, In Progress, Done)
- ✅ Admin dashboard with analytics
- ✅ Dark/Light theme support
- ✅ Responsive design (mobile-friendly)
- ✅ Real-time task statistics with charts

### DevSecOps Features
- ✅ Automated CI/CD pipelines
- ✅ Infrastructure as Code (Terraform)
- ✅ Configuration Management (Ansible)
- ✅ Container Security Scanning (Trivy)
- ✅ Static Application Security Testing (CodeQL, Semgrep)
- ✅ Dependency Vulnerability Scanning (Safety, npm audit)
- ✅ Dynamic Application Security Testing (OWASP ZAP)
- ✅ Secret Scanning (TruffleHog)
- ✅ Infrastructure Security (tfsec, Checkov)
- ✅ Automated Deployment to Azure

## 🏗️ Architecture

### Application Stack
```
┌─────────────────┐
│   React + Vite  │ ← Frontend (Port 3000)
│   TailwindCSS   │
└────────┬────────┘
         │
    ┌────▼─────┐
    │  Nginx   │ ← Web Server
    └────┬─────┘
         │
┌────────▼────────┐
│  FastAPI + Uvicorn │ ← Backend API (Port 8000)
│   Python 3.11    │
└────────┬─────────┘
         │
┌────────▼────────┐
│   PostgreSQL    │ ← Database
│     15-alpine   │
└─────────────────┘
```

### Infrastructure
- **Cloud Provider**: Microsoft Azure
- **IaC Tool**: Terraform with Terraform Cloud backend
- **Configuration Management**: Ansible
- **Container Registry**: Azure Container Registry (ACR)
- **Compute**: Azure Virtual Machine (Standard_B2s, Ubuntu 22.04)
- **Networking**: Virtual Network with NSG, Public IP

### CI/CD Pipeline
```
GitHub Push
    ↓
┌───────────────────────────┐
│   CI Pipeline (Linting,   │
│   Testing, Security Scans)│
└───────────┬───────────────┘
            ↓
┌───────────────────────────┐
│ Build Docker Images       │
│ Push to ACR               │
└───────────┬───────────────┘
            ↓
┌───────────────────────────┐
│ Deploy with Ansible       │
│ (Docker Compose on VM)    │
└───────────┬───────────────┘
            ↓
┌───────────────────────────┐
│ Post-Deployment Tests     │
│ Health Checks             │
└───────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Server**: Uvicorn (ASGI)
- **Database**: PostgreSQL 15
- **ORM**: SQLAlchemy
- **Authentication**: JWT with python-jose
- **Validation**: Pydantic

### DevOps & Infrastructure
- **IaC**: Terraform 1.5+
- **Config Management**: Ansible
- **CI/CD**: GitHub Actions
- **Containers**: Docker, Docker Compose
- **Cloud**: Microsoft Azure
- **Monitoring**: Prometheus Node Exporter

### Security Tools
- **SAST**: CodeQL, Semgrep, Bandit
- **DAST**: OWASP ZAP
- **Container Scanning**: Trivy
- **Dependency Scanning**: Safety (Python), npm audit
- **Secret Scanning**: TruffleHog
- **IaC Security**: tfsec, Checkov, ansible-lint

## 🚀 Getting Started

### Prerequisites
- Git
- Docker Desktop
- Node.js 18+ and npm
- Python 3.11+
- Azure CLI (for deployment)
- Terraform CLI 1.5+
- Ansible (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/develops-task-management.git
cd develops-task-management
```

2. **Start with Docker Compose**
```bash
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/api/docs

4. **Default Admin User**
- The first registered user automatically gets admin role
- Or register via: http://localhost:3000/register

### Manual Setup (Without Docker)

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL="postgresql://user:pass@localhost:5432/taskmanager"
export SECRET_KEY="your-secret-key"

# Run migrations and start server
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment

### Infrastructure Provisioning

1. **Configure Terraform Cloud**
```bash
cd terraform
terraform login
# Update backend.tf with your organization name
```

2. **Deploy Infrastructure**
```bash
terraform init
terraform plan
terraform apply
```

3. **Extract Outputs**
```bash
# Run helper script
.\scripts\extract-terraform-outputs.ps1
```

### Application Deployment

Deployment is automated via GitHub Actions when you push to `main`.

**Required GitHub Secrets:**
- `TF_API_TOKEN` - Terraform Cloud API token
- `SSH_PUBLIC_KEY` / `SSH_PRIVATE_KEY` - SSH key pair
- `VM_PUBLIC_IP` - Azure VM public IP (from Terraform)
- `ACR_NAME`, `ACR_LOGIN_SERVER`, `ACR_USERNAME`, `ACR_PASSWORD` - Azure Container Registry credentials
- `SECRET_KEY` - Backend secret key
- `DB_USER`, `DB_PASSWORD`, `DB_NAME` - Database credentials
- `ARM_CLIENT_ID`, `ARM_CLIENT_SECRET`, `ARM_TENANT_ID`, `ARM_SUBSCRIPTION_ID` - Azure credentials

**Automated Workflows:**
- `ci.yml` - Linting, security scans, Docker builds
- `cd-pipeline.yml` - Build images, deploy to Azure VM
- `terraform.yml` - Infrastructure provisioning
- `security.yml` - Comprehensive security scanning
- `dast.yml` - OWASP ZAP dynamic security testing

### Manual Deployment with Ansible

```bash
cd ansible
ansible-playbook playbooks/setup-server.yml -i inventory/azure_rm.yml
```

## 🔒 Security

### Implemented Security Measures

- ✅ **Authentication**: JWT tokens with secure password hashing (bcrypt)
- ✅ **Authorization**: Role-Based Access Control (RBAC)
- ✅ **Input Validation**: Pydantic schemas
- ✅ **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- ✅ **Rate Limiting**: API request throttling
- ✅ **Dependency Scanning**: Automated vulnerability checks
- ✅ **Container Scanning**: Image vulnerability analysis
- ✅ **Secret Management**: No hardcoded secrets, environment variables
- ✅ **Network Security**: Azure NSG with restricted ports
- ✅ **Firewall**: UFW configured on VM
- ✅ **Intrusion Detection**: fail2ban
- ✅ **Audit Logging**: Complete activity trail

### Security Scanning Results

All security scans run automatically on push and can be viewed in GitHub Actions.

## 📁 Repository Structure

```
develops-task-management/
├── .github/
│   └── workflows/          # CI/CD pipelines
│       ├── ci.yml          # Continuous Integration
│       ├── cd-pipeline.yml # Continuous Deployment
│       ├── security.yml    # Security scanning
│       ├── terraform.yml   # Infrastructure deployment
│       └── dast.yml        # Dynamic security testing
├── ansible/                # Configuration management
│   ├── ansible.cfg
│   ├── inventory/
│   ├── playbooks/
│   └── roles/
│       ├── docker/         # Docker installation
│       ├── security/       # System hardening
│       ├── app-deploy/     # Application deployment
│       └── monitoring/     # Monitoring setup
├── backend/                # FastAPI application
│   ├── auth/               # Authentication modules
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   ├── schemas/            # Pydantic schemas
│   └── main.py
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── services/       # API services
│   └── package.json
├── terraform/              # Infrastructure as Code
│   ├── backend.tf
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── scripts/                # Helper scripts
│   ├── setup-github-secrets.ps1
│   └── extract-terraform-outputs.ps1
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- DevOps Engineer - CI/CD & GitHub Actions
- Infrastructure Engineer - Terraform & Azure
- Configuration Manager - Ansible
- Security Engineer - DevSecOps

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [API Documentation](http://localhost:8000/api/docs)
- Review security scan results in GitHub Actions

---

**Built with ❤️ using DevSecOps best practices**