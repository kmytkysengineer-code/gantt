from pydantic import BaseModel


class TaskDependency(BaseModel):
    id: str
    project_id: str
    predecessor_task_id: str
    successor_task_id: str
    dependency_type: str = "finish_to_start"
