from fastapi import APIRouter, Depends

from app.api.deps import get_gantt_service, get_project_service, get_task_service
from app.schemas.project import ProjectDetail, ProjectGantt, ProjectSummary
from app.schemas.task import TaskRead
from app.services.gantt_service import GanttResponse, GanttService
from app.services.project_service import ProjectService
from app.services.task_service import TaskService

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[ProjectSummary])
def list_projects(service: ProjectService = Depends(get_project_service)) -> list[ProjectSummary]:
    return service.list_projects()


@router.get("/{project_id}", response_model=ProjectDetail)
def get_project(project_id: str, service: ProjectService = Depends(get_project_service)) -> ProjectDetail:
    return service.get_project(project_id)


@router.get("/{project_id}/tasks", response_model=list[TaskRead])
def list_project_tasks(project_id: str, service: TaskService = Depends(get_task_service)) -> list[TaskRead]:
    return service.list_by_project(project_id)


@router.get("/{project_id}/gantt", response_model=GanttResponse)
def get_project_gantt(project_id: str, service: GanttService = Depends(get_gantt_service)) -> GanttResponse:
    return service.get_project_gantt_payload(project_id)
