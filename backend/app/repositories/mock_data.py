from datetime import date

from app.schemas.dependency import TaskDependency
from app.schemas.project import GanttDateRange, ProjectDetail
from app.schemas.task import TaskRead

USERS = [
    {"id": "u1", "name": "Aki Kato"},
    {"id": "u2", "name": "Suzu"},
]

PROJECTS = [
    ProjectDetail(id="project-product-launch-2026", name="Product Launch 2026", description="MVP launch plan"),
    ProjectDetail(id="project-web-renewal", name="Web Renewal", description="Website refresh project"),
]

TASKS = [
    TaskRead(
        id="t-phase-1",
        project_id="project-product-launch-2026",
        parent_task_id=None,
        title="Phase 1: Research",
        status="in_progress",
        start_date=date(2026, 3, 9),
        end_date=date(2026, 3, 13),
        position=1000,
        depth=0,
        path="/t-phase-1",
        notes="調査結果をまとめる",
    ),
    TaskRead(
        id="t-market-analysis",
        project_id="project-product-launch-2026",
        parent_task_id="t-phase-1",
        title="Market Analysis",
        status="in_progress",
        start_date=date(2026, 3, 9),
        end_date=date(2026, 3, 10),
        position=1100,
        depth=1,
        path="/t-phase-1/t-market-analysis",
        notes="市場規模を確認",
    ),
    TaskRead(
        id="t-competitor-audit",
        project_id="project-product-launch-2026",
        parent_task_id="t-phase-1",
        title="Competitor Audit",
        status="pending",
        start_date=date(2026, 3, 11),
        end_date=date(2026, 3, 12),
        position=1200,
        depth=1,
        path="/t-phase-1/t-competitor-audit",
        notes="競合比較",
    ),
]

TASK_DEPENDENCIES = [
    TaskDependency(
        id="d1",
        project_id="project-product-launch-2026",
        predecessor_task_id="t-market-analysis",
        successor_task_id="t-competitor-audit",
        dependency_type="finish_to_start",
    )
]

GANTT_RANGES = {
    "project-product-launch-2026": GanttDateRange(start=date(2026, 3, 9), end=date(2026, 3, 14), today=date(2026, 3, 12)),
    "project-web-renewal": GanttDateRange(start=date(2026, 4, 1), end=date(2026, 4, 30), today=date(2026, 4, 10)),
}
