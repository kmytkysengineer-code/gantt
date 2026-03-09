from fastapi import HTTPException, status

from app.repositories.project_repository import ProjectRepository
from app.schemas.project import ProjectDetail, ProjectGantt, ProjectSummary


class ProjectService:
    def __init__(self, repo: ProjectRepository):
        self.repo = repo

    def list_projects(self) -> list[ProjectSummary]:
        return self.repo.list_projects()

    def get_project(self, project_id: str) -> ProjectDetail:
        project = self.repo.get_project(project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        return project

    def get_gantt(self, project_id: str) -> ProjectGantt:
        gantt = self.repo.get_project_gantt(project_id)
        if not gantt:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        return gantt
