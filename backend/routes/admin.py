from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User, UserRole, ActivityLog, SecurityEvent
from schemas import UserResponse
from auth import require_admin
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["Admin"])


class UserRoleUpdate(BaseModel):
    """Schema for updating user role."""
    role: UserRole


class UserStatusUpdate(BaseModel):
    """Schema for updating user status."""
    is_active: bool


@router.get("/users", response_model=List[UserResponse])
async def list_users(
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """List all users (admin only)."""
    users = db.query(User).all()
    return users


@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: str,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get user details (admin only)."""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user


@router.patch("/users/{user_id}/role", response_model=UserResponse)
async def update_user_role(
    user_id: str,
    role_data: UserRoleUpdate,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Update user role (admin only)."""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.role = role_data.role
    db.commit()
    db.refresh(user)
    
    return user


@router.patch("/users/{user_id}/status", response_model=UserResponse)
async def update_user_status(
    user_id: str,
    status_data: UserStatusUpdate,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Activate or deactivate user (admin only)."""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.is_active = status_data.is_active
    db.commit()
    db.refresh(user)
    
    return user


@router.get("/audit-logs")
async def get_audit_logs(
    limit: int = 100,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get audit logs (admin only)."""
    logs = db.query(ActivityLog).order_by(ActivityLog.created_at.desc()).limit(limit).all()
    return logs


@router.get("/security-events")
async def get_security_events(
    limit: int = 100,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get security events (admin only)."""
    events = db.query(SecurityEvent).order_by(SecurityEvent.created_at.desc()).limit(limit).all()
    return events


@router.get("/analytics")
async def get_analytics(
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get system analytics (admin only)."""
    from models import Task
    
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.is_active == True).count()
    total_tasks = db.query(Task).count()
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "inactive_users": total_users - active_users,
        "total_tasks": total_tasks
    }
