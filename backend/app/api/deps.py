from app.repositories.dependency_repository import DependencyRepository
from app.repositories.project_repository import ProjectRepository
from app.repositories.task_repository import TaskRepository
from app.services.gantt_service import GanttService
from app.services.project_service import ProjectService
from app.services.task_service import TaskService

project_repo = ProjectRepository()
task_repo = TaskRepository()
dependency_repo = DependencyRepository()


def get_project_service() -> ProjectService:
    return ProjectService(project_repo)


def get_task_service() -> TaskService:
    return TaskService(task_repo)


def get_gantt_service() -> GanttService:
    return GanttService(project_repo, task_repo, dependency_repo)
