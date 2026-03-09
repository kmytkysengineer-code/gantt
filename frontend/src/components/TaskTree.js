export function TaskTree({ tasks, expandedTaskIds, selectedTaskId }) {
  const childMap = tasks.reduce((acc, task) => {
    const key = task.parentId || '__root__';
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(task);
    return acc;
  }, new Map());

  const renderTaskNode = (task) => {
    const children = childMap.get(task.id) || [];
    const isExpanded = expandedTaskIds.has(task.id);
    const hasChildren = children.length > 0;
    const activeClass = selectedTaskId === task.id ? 'task-row-highlight border-l-2 border-blue-400' : 'border-l-2 border-transparent';
    const paddingLeft = `${8 + task.depth * 16}px`;

    return `
      <div class="group border-b border-gray-100 bg-white">
        <button
          class="w-full flex items-center h-10 px-2 hover:bg-gray-50 cursor-pointer text-left transition-colors ${activeClass}"
          style="padding-left: ${paddingLeft};"
          data-task-id="${task.id}"
          data-role="task-row"
        >
          ${hasChildren
            ? `<i class="fa-solid ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} text-[10px] w-4 text-gray-400"></i>`
            : '<span class="w-4"></span>'}
          <span class="text-sm ${task.depth === 0 ? 'font-medium' : 'text-gray-600'} ml-1">${task.title}</span>
        </button>
        ${hasChildren && isExpanded ? `<div>${children.map(renderTaskNode).join('')}</div>` : ''}
      </div>
    `;
  };

  const roots = childMap.get('__root__') || [];

  return `
    <aside class="w-80 border-r border-gray-200 flex-shrink-0 flex flex-col bg-gray-50/30">
      <div class="h-10 flex items-center px-4 border-b border-gray-200 font-medium text-xs text-gray-400 uppercase tracking-wider">
        Task Name
      </div>
      <div class="flex-1 overflow-y-auto scrollbar-hide">
        ${roots.map(renderTaskNode).join('')}
      </div>
    </aside>
  `;
}
