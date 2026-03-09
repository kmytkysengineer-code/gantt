from datetime import date
from pydantic import BaseModel


class ProjectSummary(BaseModel):
    id: str
    name: str


class ProjectDetail(ProjectSummary):
    description: str | None = None


class GanttDateRange(BaseModel):
    start: date
    end: date
    today: date


class ProjectGantt(BaseModel):
    project_id: str
    view_name: str = "Gantt View"
    date_range: GanttDateRange
