export const mockProject = {
  id: 'project-product-launch-2026',
  name: 'Product Launch 2026',
  viewName: 'Gantt View',
  dateRange: {
    start: '2026-03-09',
    end: '2026-03-14',
    today: '2026-03-12'
  }
};

export const mockTasks = [
  {
    id: 'phase-1',
    title: 'Phase 1: Research',
    status: 'in_progress',
    startDate: '2026-03-09',
    endDate: '2026-03-13',
    parentId: null,
    depth: 0,
    assignees: [
      { id: 'ak', name: 'Aki Kato', initials: 'AK', color: 'bg-indigo-500' },
      { id: 'su', name: 'Suzu', initials: 'S', color: 'bg-emerald-500' }
    ],
    notes: '調査結果をまとめて次フェーズへ接続する。'
  },
  {
    id: 'market-analysis',
    title: 'Market Analysis',
    status: 'in_progress',
    startDate: '2026-03-09',
    endDate: '2026-03-10',
    parentId: 'phase-1',
    depth: 1,
    assignees: [
      { id: 'ak', name: 'Aki Kato', initials: 'AK', color: 'bg-indigo-500' }
    ],
    notes: '既存市場の規模とセグメントを整理。'
  },
  {
    id: 'competitor-audit',
    title: 'Competitor Audit',
    status: 'pending',
    startDate: '2026-03-11',
    endDate: '2026-03-12',
    parentId: 'phase-1',
    depth: 1,
    assignees: [],
    notes: '主要競合の差別化要因を抽出。'
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Design',
    status: 'pending',
    startDate: '2026-03-12',
    endDate: '2026-03-14',
    parentId: null,
    depth: 0,
    assignees: [],
    notes: 'リサーチ結果に基づいて仕様設計。'
  }
];

export const statusStyle = {
  in_progress: {
    label: 'In Progress',
    badgeClass: 'bg-blue-100 text-blue-700',
    barClass: 'bg-indigo-500 text-white'
  },
  pending: {
    label: 'Pending',
    badgeClass: 'bg-gray-100 text-gray-500',
    barClass: 'bg-gray-100 text-gray-500 border border-gray-300'
  },
  done: {
    label: 'Done',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    barClass: 'bg-emerald-500 text-white'
  }
};
