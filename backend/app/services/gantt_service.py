from pydantic import BaseModel

from app.repositories.dependency_repository import DependencyRepository
from app.repositories.project_repository import ProjectRepository
from app.repositories.task_repository import TaskRepository
from app.schemas.dependency import TaskDependency
from app.schemas.project import GanttDateRange
from app.schemas.task import TaskRead


class GanttResponse(BaseModel):
    project_id: str
    view_name: str
    date_range: GanttDateRange
    tasks: list[TaskRead]
    dependencies: list[TaskDependency]


class GanttService:
    def __init__(self, project_repo: ProjectRepository, task_repo: TaskRepository, dependency_repo: DependencyRepository):
        self.project_repo = project_repo
        self.task_repo = task_repo
        self.dependency_repo = dependency_repo

    def get_project_gantt_payload(self, project_id: str) -> GanttResponse:
        gantt = self.project_repo.get_project_gantt(project_id)
        if not gantt:
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

        tasks = self.task_repo.list_by_project(project_id)
        dependencies = self.dependency_repo.list_by_project(project_id)

        return GanttResponse(
            project_id=project_id,
            view_name=gantt.view_name,
            date_range=gantt.date_range,
            tasks=tasks,
            dependencies=dependencies,
        )
