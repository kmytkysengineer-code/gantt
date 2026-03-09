from datetime import date
from pydantic import BaseModel, Field

from app.schemas.common import TaskStatus


class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    status: TaskStatus = "pending"
    start_date: date
    end_date: date
    position: int = 0
    notes: str = ""


class TaskRead(TaskBase):
    id: str
    project_id: str
    parent_task_id: str | None = None
    depth: int = 0
    path: str


class TaskCreate(TaskBase):
    project_id: str
    parent_task_id: str | None = None


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    status: TaskStatus | None = None
    start_date: date | None = None
    end_date: date | None = None
    parent_task_id: str | None = None
    position: int | None = None
    depth: int | None = None
    path: str | None = None
    notes: str | None = None
