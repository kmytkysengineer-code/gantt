from app.repositories.mock_data import TASK_DEPENDENCIES
from app.schemas.dependency import TaskDependency


class DependencyRepository:
    def list_by_project(self, project_id: str) -> list[TaskDependency]:
        return [dependency for dependency in TASK_DEPENDENCIES if dependency.project_id == project_id]
