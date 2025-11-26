# Troubleshooting Guide

This guide covers common issues and their solutions.

## Common Issues

### Terraform Apply Fails

#### Issue: Authentication Errors
```
Error: Error building AzureRM Client: obtain subscription...
```

**Solution**:
1. Verify Azure credentials in Terraform Cloud workspace
2. Check that all ARM_ environment variables are set:
   ```bash
   ARM_CLIENT_ID
   ARM_CLIENT_SECRET
   ARM_SUBSCRIPTION_ID
   ARM_TENANT_ID
   ```
3. Test Azure CLI login:
   ```bash
   az login --service-principal \
     -u $ARM_CLIENT_ID \
     -p $ARM_CLIENT_SECRET \
     --tenant $ARM_TENANT_ID
   ```

#### Issue: Resource Already Exists
```
Error: A resource with the ID ... already exists
```

**Solution**:
1. Check Azure Portal for existing resources
2. Either delete the existing resource or change resource names in `terraform/variables.tf`
3. Ensure uniqueness for:
   - Container Registry name (globally unique)
   - Public IP names
   - VM names

#### Issue: Quota EXceeded
```
Error: Compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request
```

**Solution**:
1. Check your Azure subscription quotas
2. Request quota increase in Azure Portal
3. Or choose a smaller VM size in `terraform/variables.tf`

### Ansible Deployment Fails

#### Issue: SSH Connection Refused
```
fatal: [azure-vm]: UNREACHABLE! => {"changed": false, "msg": "Failed to connect"}
```

**Solution**:
1. Verify VM public IP is correct:
   ```bash
   terraform output vm_public_ip
   ```

2. Test SSH connection manually:
   ```bash
   ssh -i ~/.ssh/devops-pipeline azureuser@<VM_PUBLIC_IP>
   ```

3. Check NSG rules allow SSH (port 22):
   - Go to Azure Portal → Network Security Group
   - Verify inbound rule for port 22

4. Verify SSH key in GitHub Secrets matches:
   ```bash
   cat ~/.ssh/devops-pipeline.pub   # Public key
   cat ~/.ssh/devops-pipeline       # Private key
   ```

#### Issue: Permission Denied (publickey)
```
Permission denied (publickey)
```

**Solution**:
1. Ensure SSH private key is correctly formatted in GitHub Secrets
2. Key should include headers:
   ```
   -----BEGIN OPENSSH PRIVATE KEY-----
   ...
   -----END OPENSSH PRIVATE KEY-----
   ```

3. Test key authentication:
   ```bash
   ssh -i ~/.ssh/devops-pipeline -v azureuser@<VM_PUBLIC_IP>
   ```

#### Issue: ACR Login Fails
```
Error: az acr login failed
```

**Solution**:
1. Verify ACR credentials in GitHub Secrets:
   ```bash
   ACR_NAME
   ACR_LOGIN_SERVER
   ACR_USERNAME
   ACR_PASSWORD
   ```

2. Test ACR login manually:
   ```bash
   az acr login --name <ACR_NAME> \
     --username <ACR_USERNAME> \
     --password <ACR_PASSWORD>
   ```

3. Check ACR admin user is enabled:
   - Azure Portal → Container Registry → Access keys
   - Enable "Admin user"

#### Issue: Docker Compose Fails to Pull Images
```
Error: pull access denied, repository does not exist or may require 'docker login'
```

**Solution**:
1. Verify images exist in ACR:
   ```bash
   az acr repository list --name <ACR_NAME>
   ```

2. Check image tags:
   ```bash
   az acr repository show-tags \
     --name <ACR_NAME> \
     --repository taskmanager-backend
   ```

3. Ensure Ansible has logged into ACR before pulling

### Application Not Accessible

#### Issue: Cannot Connect to Frontend
```
curl: (7) Failed to connect to <IP> port 3000: Connection refused
```

**Solution**:
1. SSH into VM and check containers:
   ```bash
   ssh azureuser@<VM_PUBLIC_IP>
   docker ps
   ```

2. Check if frontend container is running:
   ```bash
   docker ps | grep frontend
   ```

3. If not running, check logs:
   ```bash
   cd /opt/taskmanager-app
   docker-compose logs frontend
   ```

4. Restart containers:
   ```bash
   docker-compose restart frontend
   ```

5. Verify firewall allows port 3000:
   ```bash
   sudo ufw status
   ```

#### Issue: Backend API Returns 500 Error
```
{"detail": "Internal Server Error"}
```

**Solution**:
1. Check backend logs:
   ```bash
   docker-compose logs backend
   ```

2. Verify database connection:
   ```bash
   docker-compose logs database
   ```

3. Check environment variables:
   ```bash
   docker-compose exec backend env | grep DATABASE_URL
   ```

4. Restart backend:
   ```bash
   docker-compose restart backend
   ```

#### Issue: Database Connection Failed
```
sqlalchemy.exc.OperationalError: could not connect to server
```

**Solution**:
1. Verify PostgreSQL container is running:
   ```bash
   docker ps | grep postgres
   ```

2. Check database logs:
   ```bash
   docker-compose logs database
   ```

3. Test database connection:
   ```bash
   docker-compose exec database psql -U taskuser -d taskmanager
   ```

4. Verify DATABASE_URL format:
   ```
   postgresql://user:password@database:5432/dbname
   ```

### CI/CD Pipeline Failures

#### Issue: GitHub Actions Workflow Fails
```
Error: Process completed with exit code 1
```

**Solution**:
1. Check workflow logs in GitHub Actions
2. Verify all required secrets are set
3. Common missing secrets:
   ```
   TF_API_TOKEN
   SSH_PRIVATE_KEY
   VM_PUBLIC_IP
   ACR_*
   DB_*
   SECRET_KEY
   ```

4. Test commands locally:
   ```bash
   # Test Terraform
   cd terraform
   terraform validate

   # Test Ansible
   cd ansible
   ansible-playbook playbooks/setup-server.yml --syntax-check
   ```

#### Issue: Docker Build Fails
```
Error: failed to solve: process "/bin/sh -c ..." did not complete successfully
```

**Solution**:
1. Test build locally:
   ```bash
   docker build -f Dockerfile.backend -t test:latest .
   docker build -f Dockerfile.frontend -t test:latest .
   ```

2. Check Dockerfile syntax
3. Verify all COPY paths exist
4. Check for errors in requirements.txt or package.json

#### Issue: Trivy Scan Fails with Vulnerabilities
```
Total: X (CRITICAL: Y, HIGH: Z)
```

**Solution**:
1. Review vulnerability report in Actions artifacts
2. Update dependencies:
   ```bash
   # Backend
   cd backend
   pip install --upgrade <package>

   # Frontend
   cd frontend
   npm update
   ```

3. If critical, consider delaying deployment until fixed
4. For false positives, add to `.trivyignore`:
   ```
   CVE-XXXX-YYYY
   ```

### Performance Issues

#### Issue: Application Slow to Respond
**Solution**:
1. Check system resources:
   ```bash
   ssh azureuser@<VM_PUBLIC_IP>
   /usr/local/bin/system-status.sh
   ```

2. Monitor Docker stats:
   ```bash
   docker stats
   ```

3. Check nginx logs:
   ```bash
   docker-compose logs frontend | grep nginx
   ```

4. Increase VM size if needed:
   - Update `terraform/variables.tf`
   - Run `terraform apply`

#### Issue: Database Performance Degradation
**Solution**:
1. Check database size:
   ```bash
   docker-compose exec database psql -U taskuser -d taskmanager \
     -c "SELECT pg_size_pretty(pg_database_size('taskmanager'));"
   ```

2. Analyze query performance:
   ```bash
   # Enable logging in PostgreSQL
   docker-compose exec database psql -U taskuser -d taskmanager \
     -c "ALTER SYSTEM SET log_statement = 'all';"
   ```

3. Create indexes if needed
4. Consider database maintenance:
   ```bash
   docker-compose exec database psql -U taskuser -d taskmanager \
     -c "VACUUM ANALYZE;"
   ```

### Security Issues

#### Issue: Failed Secret Scan
```
TruffleHog found X potential secrets
```

**Solution**:
1. Review detected secrets in workflow logs
2. Remove any real secrets from code
3. Update secrets in GitHub Secrets
4. Rotate compromised credentials immediately
5. Use `.gitignore` to prevent future leaks

#### Issue: Security Headers Missing
```
Missing security headers detected
```

**Solution**:
1. Check nginx configuration in frontend
2. Verify headers in `frontend/nginx.conf`:
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-Content-Type-Options "nosniff";
   add_header X-XSS-Protection "1; mode=block";
   add_header Content-Security-Policy "default-src 'self'";
   ```

3. Rebuild and redeploy frontend

## Debugging Tips

### Enable Verbose Logging

**Ansible**:
```bash
ansible-playbook playbooks/setup-server.yml -i inventory/hosts -vvv
```

**Docker Compose**:
```bash
docker-compose --verbose up
```

**Terraform**:
```bash
export TF_LOG=DEBUG
terraform apply
```

### Access Container Shell

```bash
# Backend
docker-compose exec backend bash

# Frontend (if needed)
docker-compose exec frontend sh

# Database
docker-compose exec database psql -U taskuser -d taskmanager
```

### View Live Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Network Debugging

```bash
# Check if ports are open
nc -zv <VM_PUBLIC_IP> 3000
nc -zv <VM_PUBLIC_IP> 8000

# Test from within container
docker-compose exec backend curl http://database:5432

# Check DNS resolution
docker-compose exec backend nslookup database
```

## Getting Help

Still having issues?

1. **Check Logs**:
   - GitHub Actions workflow logs
   - Docker container logs
   - System logs: `/var/log/syslog`

2. **Review Documentation**:
   - [README.md](../README.md)
   - [DEPLOYMENT.md](DEPLOYMENT.md)
   - [SECURITY.md](SECURITY.md)

3. **Search Issues**:
   - Check existing GitHub Issues
   - Search for error messages

4. **Create Issue**:
   - Use issue template
   - Include error logs
   - Describe steps to reproduce

5. **Contact Team**:
   - DevOps Engineer for CI/CD issues
   - Infrastructure Engineer for Terraform/Azure issues
   - Security Engineer for security concerns
