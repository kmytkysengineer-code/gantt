from fastapi import HTTPException, status

from app.repositories.task_repository import TaskRepository
from app.schemas.task import TaskCreate, TaskRead, TaskUpdate


class TaskService:
    def __init__(self, repo: TaskRepository):
        self.repo = repo

    def list_by_project(self, project_id: str) -> list[TaskRead]:
        return self.repo.list_by_project(project_id)

    def create(self, payload: TaskCreate) -> TaskRead:
        if payload.end_date < payload.start_date:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Invalid date range")
        return self.repo.create(payload)

    def update(self, task_id: str, patch: TaskUpdate) -> TaskRead:
        current = self.repo.get_by_id(task_id)
        if not current:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

        try:
            return self.repo.update(current, patch)
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)) from exc
