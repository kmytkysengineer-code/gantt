import { formatShortDate } from '../utils/date.js';
import { statusStyle } from '../data/mockProject.js';

function renderAssignees(task) {
  if (!task.assignees?.length) {
    return '<span class="text-sm text-gray-400">Unassigned</span>';
  }

  return task.assignees
    .map(
      (assignee) => `
      <div class="w-6 h-6 rounded-full ${assignee.color} border-2 border-white flex items-center justify-center text-[10px] text-white" title="${assignee.name}">
        ${assignee.initials}
      </div>
    `
    )
    .join('');
}

export function TaskDetailPanel({ task, isOpen }) {
  const style = statusStyle[task.status] || statusStyle.pending;

  return `
    <aside class="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-30 border-l border-gray-200" id="task-detail-panel">
      <div class="p-6 h-full flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <button data-role="panel-close" class="text-gray-400 hover:text-gray-600"><i class="fa-solid fa-xmark text-xl"></i></button>
          <div class="flex items-center space-x-3 text-gray-400 text-sm"><i class="fa-solid fa-ellipsis"></i></div>
        </div>

        <div class="flex-1">
          <input type="text" value="${task.title}" class="text-3xl font-bold w-full border-none focus:ring-0 mb-6 placeholder-gray-300" placeholder="Untitled" readonly>

          <div class="space-y-4">
            <div class="grid grid-cols-3 gap-4 items-center">
              <span class="text-sm text-gray-400"><i class="fa-regular fa-calendar mr-2"></i> Date</span>
              <div class="col-span-2 text-sm text-gray-700 p-1 rounded">${formatShortDate(task.startDate)}, 2026 → ${formatShortDate(task.endDate)}, 2026</div>
            </div>
            <div class="grid grid-cols-3 gap-4 items-center">
              <span class="text-sm text-gray-400"><i class="fa-solid fa-circle-half-stroke mr-2"></i> Status</span>
              <div class="col-span-2"><span class="${style.badgeClass} px-2 py-0.5 rounded text-xs font-medium">${style.label}</span></div>
            </div>
            <div class="grid grid-cols-3 gap-4 items-center">
              <span class="text-sm text-gray-400"><i class="fa-solid fa-user-group mr-2"></i> Assignee</span>
              <div class="col-span-2 flex -space-x-2">${renderAssignees(task)}</div>
            </div>
          </div>

          <hr class="my-8 border-gray-100" />

          <textarea class="w-full h-40 text-sm text-gray-600 border-none focus:ring-0 resize-none p-0" readonly>${task.notes || ''}</textarea>
        </div>
      </div>
    </aside>
  `;
}
