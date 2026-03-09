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

## 起動方法
```bash
cd frontend
python3 -m http.server 4173
```

`http://localhost:4173` を開くとプロジェクト詳細画面が表示されます。


## API設計メモ
- MVP向け最小API定義: `docs/api-mvp.md`
