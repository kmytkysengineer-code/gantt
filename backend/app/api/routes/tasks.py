from fastapi import APIRouter, Depends

from app.api.deps import get_task_service
from app.schemas.task import TaskCreate, TaskRead, TaskUpdate
from app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("", response_model=TaskRead, status_code=201)
def create_task(payload: TaskCreate, service: TaskService = Depends(get_task_service)) -> TaskRead:
    return service.create(payload)


@router.patch("/{task_id}", response_model=TaskRead)
def patch_task(task_id: str, payload: TaskUpdate, service: TaskService = Depends(get_task_service)) -> TaskRead:
    return service.update(task_id, payload)
