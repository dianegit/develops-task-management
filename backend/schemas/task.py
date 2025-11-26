from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict
from models.task import TaskPriority, TaskStatus


class TaskBase(BaseModel):
    """Base task schema."""
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    priority: TaskPriority = TaskPriority.MEDIUM
    status: TaskStatus = TaskStatus.TODO
    category: Optional[str] = Field(None, max_length=100)
    tags: List[str] = Field(default_factory=list)
    due_date: Optional[datetime] = None


class TaskCreate(TaskBase):
    """Schema for task creation."""
    pass


class TaskUpdate(BaseModel):
    """Schema for task update."""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    priority: Optional[TaskPriority] = None
    status: Optional[TaskStatus] = None
    category: Optional[str] = Field(None, max_length=100)
    tags: Optional[List[str]] = None
    due_date: Optional[datetime] = None


class TaskStatusUpdate(BaseModel):
    """Schema for task status update only."""
    status: TaskStatus


class TaskResponse(TaskBase):
    """Schema for task response."""
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class TaskListResponse(BaseModel):
    """Schema for paginated task list response."""
    tasks: List[TaskResponse]
    total: int
    page: int
    page_size: int
