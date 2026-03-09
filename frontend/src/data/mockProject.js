export const mockProjectDetailResponse = {
  project: {
    id: 'project-product-launch-2026',
    name: 'Product Launch 2026'
  },
  members: [
    { id: 'ak', name: 'Aki Kato', initials: 'AK', color: 'bg-indigo-500' },
    { id: 'su', name: 'Suzu', initials: 'S', color: 'bg-emerald-500' }
  ],
  gantt: {
    viewName: 'Gantt View',
    dateRange: {
      start: '2026-03-09',
      end: '2026-03-14',
      today: '2026-03-12'
    }
  },
  tasks: [
    {
      id: 'phase-1',
      projectId: 'project-product-launch-2026',
      parentTaskId: null,
      title: 'Phase 1: Research',
      status: 'in_progress',
      startDate: '2026-03-09',
      endDate: '2026-03-13',
      assigneeIds: ['ak', 'su'],
      notes: '調査結果をまとめて次フェーズへ接続する。'
    },
    {
      id: 'market-analysis',
      projectId: 'project-product-launch-2026',
      parentTaskId: 'phase-1',
      title: 'Market Analysis',
      status: 'in_progress',
      startDate: '2026-03-09',
      endDate: '2026-03-10',
      assigneeIds: ['ak'],
      notes: '既存市場の規模とセグメントを整理。'
    },
    {
      id: 'competitor-audit',
      projectId: 'project-product-launch-2026',
      parentTaskId: 'phase-1',
      title: 'Competitor Audit',
      status: 'pending',
      startDate: '2026-03-11',
      endDate: '2026-03-12',
      assigneeIds: [],
      notes: '主要競合の差別化要因を抽出。'
    },
    {
      id: 'phase-2',
      projectId: 'project-product-launch-2026',
      parentTaskId: null,
      title: 'Phase 2: Design',
      status: 'pending',
      startDate: '2026-03-12',
      endDate: '2026-03-14',
      assigneeIds: [],
      notes: 'リサーチ結果に基づいて仕様設計。'
    }
  ]
};

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
