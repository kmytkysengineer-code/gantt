# MVP API設計（Project / Task / Gantt）

このドキュメントは、現行フロント（Project Detail画面: Header / TaskTree / GanttArea / TaskDetailPanel）を動かすための**最小API**を定義する。

## 1. 画面要件から見た最小データ

- プロジェクト表示: `project.id`, `project.name`
- ガント表示: `gantt.viewName`, `gantt.dateRange(start/end/today)`
- タスクツリー（無限階層）: `task.id`, `task.parentTaskId`, `task.title`
- ガントバー表示: `task.startDate`, `task.endDate`, `task.status`
- 詳細パネル表示: `task.notes`, `task.assigneeIds` + `members`

---

## 2. MVP最小エンドポイント（FastAPI）

## 2.1 Project詳細（画面初期表示）
- `GET /api/v1/projects/{project_id}/detail`
- 用途: 1回の取得でProject詳細画面を描画

### レスポンス例
```json
{
  "project": {
    "id": "project-product-launch-2026",
    "name": "Product Launch 2026"
  },
  "members": [
    { "id": "ak", "name": "Aki Kato", "initials": "AK", "color": "bg-indigo-500" },
    { "id": "su", "name": "Suzu", "initials": "S", "color": "bg-emerald-500" }
  ],
  "gantt": {
    "viewName": "Gantt View",
    "dateRange": {
      "start": "2026-03-09",
      "end": "2026-03-14",
      "today": "2026-03-12"
    }
  },
  "tasks": [
    {
      "id": "phase-1",
      "projectId": "project-product-launch-2026",
      "parentTaskId": null,
      "title": "Phase 1: Research",
      "status": "in_progress",
      "startDate": "2026-03-09",
      "endDate": "2026-03-13",
      "assigneeIds": ["ak", "su"],
      "notes": "調査結果をまとめて次フェーズへ接続する。"
    }
  ]
}
```

## 2.2 Task作成
- `POST /api/v1/projects/{project_id}/tasks`
- 用途: 親子関係つきでタスク作成（root/child両対応）

### リクエスト（例）
```json
{
  "parentTaskId": "phase-1",
  "title": "User Interview",
  "status": "pending",
  "startDate": "2026-03-10",
  "endDate": "2026-03-11",
  "assigneeIds": ["ak"],
  "notes": ""
}
```

## 2.3 Task更新（詳細編集 / ガント移動）
- `PATCH /api/v1/tasks/{task_id}`
- 用途: タイトル・日付・status・assignees・notes・parentTaskId 更新

### リクエスト（例）
```json
{
  "title": "Market Analysis",
  "status": "in_progress",
  "startDate": "2026-03-09",
  "endDate": "2026-03-12",
  "assigneeIds": ["ak", "su"],
  "notes": "更新メモ"
}
```

## 2.4 Task削除
- `DELETE /api/v1/tasks/{task_id}`
- 用途: タスク削除（MVPでは配下タスクも一括削除か、事前チェックで拒否のどちらかを実装時に固定）

---

## 3. データモデル最小定義

## 3.1 Project
- `id: str`
- `name: str`

## 3.2 Task（無限階層対応）
- `id: str`
- `projectId: str`
- `parentTaskId: str | null` ← 階層の核
- `title: str`
- `status: "pending" | "in_progress" | "done"`
- `startDate: date`
- `endDate: date`
- `assigneeIds: str[]`
- `notes: str`

## 3.3 Gantt
- `viewName: str`
- `dateRange.start: date`
- `dateRange.end: date`
- `dateRange.today: date`

---

## 4. FastAPI 実装順（最小）

1. `GET /api/v1/projects/{project_id}/detail` を先に実装（フロント接続開始点）
2. `PATCH /api/v1/tasks/{task_id}` を実装（詳細編集/ガント更新の核）
3. `POST /api/v1/projects/{project_id}/tasks` を実装（階層追加）
4. `DELETE /api/v1/tasks/{task_id}` を実装

MVPでは上記4本で、Project Detail画面の主要操作をカバーできる。
