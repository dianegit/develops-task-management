# Contributing to Task Manager

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Security Guidelines](#security-guidelines)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or derogatory comments
- Publishing others' private information
- Any conduct that could be considered inappropriate in a professional setting

## Getting Started

### Prerequisites

1. **Fork the Repository**
   ```bash
   # Click "Fork" button on GitHub
   git clone https://github.com/YOUR_USERNAME/develops-task-management.git
   cd develops-task-management
   ```

2. **Set Up Development Environment**
   ```bash
   # Add upstream remote
   git remote add upstream https://github.com/ORIGINAL_OWNER/develops-task-management.git

   # Start local environment
   docker-compose up --build
   ```

3. **Install Development Tools**
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   pip install flake8 bandit pytest

   # Frontend
   cd frontend
   npm install
   ```

## Development Workflow

### Branch Strategy

We use **Git Flow** branching model:

```
main         # Production-ready code
  ↓
develop      # Integration branch for features
  ↓
feature/*    # New features
hotfix/*     # Critical fixes for production
release/*    # Release preparation
```

### Creating a Feature

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following [Coding Standards](#coding-standards)
   - Add tests for new functionality
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   **Commit Message Format**:
   ```
   type(scope): subject

   body (optional)

   footer (optional)
   ```

   **Types**:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting)
   - `refactor`: Code refactoring
   - `test`: Adding or updating tests
   - `chore`: Build process or auxiliary tool changes

4. **Push Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

## Pull Request Process

### Before Creating PR

1. **Update from Develop**
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout feature/your-feature-name
   git rebase develop
   ```

2. **Run Tests Locally**
   ```bash
   # Backend tests
   cd backend
   pytest

   # Frontend tests
   cd frontend
   npm test

   # Linting
   npm run lint
   ```

3. **Check Security**
   ```bash
   # Backend
   bandit -r backend/
   safety check

   # Frontend
   npm audit
   ```

### Creating Pull Request

1. **Go to GitHub**
   - Navigate to your fork
   - Click "New Pull Request"
   - Base: `develop`, Compare: `feature/your-feature-name`

2. **Fill PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests added/updated
   - [ ] Integration tests added/updated
   - [ ] Manual testing performed

   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No new warnings generated
   - [ ] Tests pass locally
   ```

3. **Link Related Issues**
   ```markdown
   Closes #123
   Relates to #456
   ```

### PR Review Process

**Automatic Checks** (must pass):
- ✅ CI Pipeline (linting, tests, build)
- ✅ Security scans (no critical vulnerabilities)
- ✅ Code quality checks

**Required Reviews**:
- At least 1 approval from code owners
- Specific approvals for certain paths (see CODEOWNERS)

**Review Criteria**:
- Code quality and readability
- Test coverage
- Documentation completeness
- Security considerations
- Performance impact

### After PR Approval

1. **Merge Strategy**
   - Use "Squash and merge" for features
   - Use "Rebase and merge" for small fixes
   - Delete branch after merge

2. **Post-Merge**
   - Verify CI/CD pipelines pass
   - Monitor deployment
   - Update related documentation

## Coding Standards

### Python (Backend)

**Style Guide**: PEP 8

```python
# Good
def calculate_task_priority(
    task: Task,
    user: User
) -> int:
    """
    Calculate task priority score.
    
    Args:
        task: The task to calculate priority for
        user: The user requesting the calculation
        
    Returns:
        Priority score (0-100)
    """
    return task.priority * user.priority_weight

# Bad
def calc(t, u):
    return t.p*u.w
```

**Linting**:
```bash
flake8 . --max-line-length=127
```

**Type Hints**: Required for all functions

**Docstrings**: Google style for all public functions

### JavaScript/React (Frontend)

**Style Guide**: Airbnb React/JSX Style Guide

```javascript
// Good
const TaskCard = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = async () => {
    try {
      await onUpdate(task.id, updatedData);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };
  
  return (
    <div className="task-card">
      {/* ... */}
    </div>
  );
};

// Bad
function task(t) {
  return <div onClick={()=>alert(t.name)}>{t.name}</div>
}
```

**Linting**:
```bash
npm run lint
```

**Component Structure**:
1. Imports
2. Type definitions/PropTypes
3. Component definition
4. Hooks
5. Event handlers
6. Render logic
7. Export

### File Naming

- **Python**: `snake_case.py`
- **JavaScript**: `PascalCase.jsx` (components), `camelCase.js` (utils)
- **CSS**: `kebab-case.css`

### Comments

```python
# Good: Explain WHY, not WHAT
# Using exponential backoff to handle rate limiting
retry_delay = base_delay * (2 ** attempt)

# Bad: Obvious comment
# Increment counter
counter += 1
```

## Testing Requirements

### Backend Testing

**Required Coverage**: Minimum 80%

```python
# Example test
def test_create_task_success(client, auth_headers):
    """Test successful task creation."""
    response = client.post(
        "/api/tasks",
        json={"title": "Test Task", "priority": "high"},
        headers=auth_headers
    )
    assert response.status_code == 201
    assert response.json()["title"] == "Test Task"
```

**Run Tests**:
```bash
pytest --cov=. --cov-report=html
```

### Frontend Testing

**Test Types**:
- Unit tests for utilities
- Component tests with React Testing Library
- Integration tests for user flows

```javascript
// Example test
describe('TaskCard', () => {
  it('should display task title', () => {
    const task = { id: 1, title: 'Test Task' };
    render(<TaskCard task={task} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});
```

**Run Tests**:
```bash
npm test
```

## Security Guidelines

### Security Requirements

1. **Never commit secrets**
   - Use environment variables
   - Check `.gitignore` is up to date
   - Run `git secrets` before pushing

2. **Input Validation**
   - Validate all user inputs
   - Use Pydantic models (backend)
   - Sanitize data before display

3. **Authentication**
   - Use JWT tokens
   - Never store passwords in plain text
   - Implement rate limiting

4. **Dependencies**
   - Keep dependencies updated
   - Review security advisories
   - Run security scans before PR

### Reporting Security Issues

**DO NOT** create public GitHub issues for security vulnerabilities.

Email: security@example.com

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Project Management

### Issue Templates

Use appropriate template when creating issues:
- Bug Report
- Feature Request
- Security Vulnerability
- Documentation Improvement

### Labels

Common labels:
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `security`: Security-related issues
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed

### Milestones

Work is organized into milestones representing releases:
- `v1.0.0` - Initial release
- `v1.1.0` - Feature additions
- `v2.0.0` - Major changes

## Code Owners

Certain paths require approval from specific team members:

```
# Backend
/backend/              @backend-team
/backend/auth/         @security-team

# Frontend
/frontend/             @frontend-team

# Infrastructure
/terraform/            @infrastructure-team
/ansible/              @devops-team

# CI/CD
/.github/workflows/    @devops-team

# Security
/docs/SECURITY.md      @security-team
```

## Additional Resources

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [API Documentation](http://localhost:8000/api/docs)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## Questions?

- Check existing [GitHub Discussions](https://github.com/YOUR_REPO/discussions)
- Ask in team chat
- Email: contact@example.com

---

Thank you for contributing to Task Manager! 🎉
