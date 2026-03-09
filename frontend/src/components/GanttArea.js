import { dateDiffInDays, enumerateDays, formatShortDate } from '../utils/date.js';
import { statusStyle } from '../data/status.js';

const DAY_WIDTH = 160;

export function GanttArea({ project, visibleTasks, selectedTaskId }) {
  const days = enumerateDays(project.dateRange.start, project.dateRange.end);

  const headers = days
    .map((date) => {
      const shortDate = formatShortDate(date);
      const isToday = shortDate === formatShortDate(project.dateRange.today);
      return `<div class="flex text-[10px] items-center justify-center w-40 flex-shrink-0 border-r border-gray-100 ${
        isToday ? 'text-blue-600 font-bold bg-blue-50/30' : 'text-gray-400'
      }">${shortDate}${isToday ? ' (Today)' : ''}</div>`;
    })
    .join('');

  const rows = visibleTasks
    .map((task, index) => {
      const left = dateDiffInDays(project.dateRange.start, task.startDate) * DAY_WIDTH + 10;
      const width = (dateDiffInDays(task.startDate, task.endDate) + 1) * DAY_WIDTH - 20;
      const style = statusStyle[task.status] || statusStyle.pending;
      const isSelected = task.id === selectedTaskId;

      return `
        <div class="h-10 flex items-center relative ${index > 0 ? 'border-t border-gray-50' : ''} ${isSelected ? 'task-row-highlight' : ''}" data-task-id="${task.id}" data-role="gantt-row">
          <div class="absolute h-6 rounded-md flex items-center px-2 ${style.barClass}" style="left:${left}px; width:${width}px;">
            <span class="text-[10px] font-medium truncate">${style.label}</span>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <section class="flex-1 overflow-x-auto relative scrollbar-hide">
      <div class="h-10 flex border-b border-gray-200 bg-white sticky top-0 z-10 gantt-grid">
        ${headers}
      </div>
      <div class="relative gantt-grid h-full min-w-max">
        ${rows}
      </div>
    </section>
  `;
}
