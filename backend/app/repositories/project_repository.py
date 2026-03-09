from app.repositories.mock_data import GANTT_RANGES, PROJECTS
from app.schemas.project import ProjectDetail, ProjectGantt, ProjectSummary


class ProjectRepository:
    """In-memory repository. Replace with PostgreSQL implementation later."""

    def list_projects(self) -> list[ProjectSummary]:
        return [ProjectSummary(id=p.id, name=p.name) for p in PROJECTS]

    def get_project(self, project_id: str) -> ProjectDetail | None:
        return next((project for project in PROJECTS if project.id == project_id), None)

    def get_project_gantt(self, project_id: str) -> ProjectGantt | None:
        date_range = GANTT_RANGES.get(project_id)
        if not date_range:
            return None
        return ProjectGantt(project_id=project_id, view_name="Gantt View", date_range=date_range)
