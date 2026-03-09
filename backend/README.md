# backend

MVP用 FastAPI バックエンド雛形です。

## 起動
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## API（MVP）
- `GET /api/v1/projects`
- `GET /api/v1/projects/{project_id}`
- `GET /api/v1/projects/{project_id}/tasks`
- `GET /api/v1/projects/{project_id}/gantt`
- `POST /api/v1/tasks`
- `PATCH /api/v1/tasks/{task_id}`

Swagger: `http://localhost:8000/docs`
