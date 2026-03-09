# gantt

軽量なガントチャート型プロジェクト管理ツール

## コンセプト
- Backlogより深いタスク階層を扱える
- 小規模チーム向け
- ガント中心の操作性
- 将来的にテーマ切替あり

## MVP
- Project
- Task
- Subtask (無限階層前提)
- Gantt
- Task detail panel

## 現在の作業
- `frontend/ui-mock/index.html` を元に MVP のフロント土台を構造化
- `frontend/index.html` からモックデータで画面表示可能
- `backend/` に FastAPI の最小雛形を追加（インメモリ実装）

## frontend 起動方法
```bash
cd frontend
python3 -m http.server 4173
=======

## 起動方法
```bash
cd frontend
python -m http.server 4173

```

`http://localhost:4173` を開くとプロジェクト詳細画面が表示されます。

## backend 起動方法
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

`http://localhost:8000/docs` で Swagger UI を確認できます。

## API設計メモ
- MVP向け最小API定義: `docs/api-mvp.md`


## frontend API接続メモ
- フロントは `http://localhost:8000/api/v1` をデフォルトのAPIベースURLとして使用します。
- 変更したい場合は `frontend/index.html` 読み込み前に `window.__API_BASE_URL__` を設定してください。
- 初回表示時に `GET /projects` で先頭プロジェクトを取得し、
  `GET /projects/{project_id}` / `GET /projects/{project_id}/tasks` / `GET /projects/{project_id}/gantt` を読み込みます。
=======
=======

## API設計メモ
- MVP向け最小API定義: `docs/api-mvp.md`
