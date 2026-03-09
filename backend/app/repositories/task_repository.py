from datetime import date
import uuid

from app.repositories.mock_data import TASKS
from app.schemas.task import TaskCreate, TaskRead, TaskUpdate


class TaskRepository:
    """In-memory repository. Replace with PostgreSQL implementation later."""

    def list_by_project(self, project_id: str) -> list[TaskRead]:
        return [task for task in TASKS if task.project_id == project_id]

    def get_by_id(self, task_id: str) -> TaskRead | None:
        return next((task for task in TASKS if task.id == task_id), None)

    def create(self, payload: TaskCreate) -> TaskRead:
        parent = self.get_by_id(payload.parent_task_id) if payload.parent_task_id else None
        depth = parent.depth + 1 if parent else 0
        new_id = f"t-{uuid.uuid4().hex[:8]}"
        path = f"{parent.path}/{new_id}" if parent else f"/{new_id}"
        created = TaskRead(
            id=new_id,
            project_id=payload.project_id,
            parent_task_id=payload.parent_task_id,
            title=payload.title,
            status=payload.status,
            start_date=payload.start_date,
            end_date=payload.end_date,
            position=payload.position,
            depth=depth,
            path=path,
            notes=payload.notes,
        )
        TASKS.append(created)
        return created

    def update(self, task: TaskRead, patch: TaskUpdate) -> TaskRead:
        updated_data = task.model_dump()
        incoming = patch.model_dump(exclude_unset=True)
        updated_data.update(incoming)

        parent_id = updated_data.get("parent_task_id")
        parent = self.get_by_id(parent_id) if parent_id else None

        if "depth" not in incoming:
            updated_data["depth"] = parent.depth + 1 if parent else 0
        if "path" not in incoming:
            updated_data["path"] = f"{parent.path}/{task.id}" if parent else f"/{task.id}"

        # keep minimal date validation
        if updated_data["end_date"] < updated_data["start_date"]:
            raise ValueError("end_date must be greater than or equal to start_date")

        updated_task = TaskRead(**updated_data)
        index = TASKS.index(task)
        TASKS[index] = updated_task
        return updated_task
