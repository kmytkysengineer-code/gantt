import { Header } from './components/Header.js';
import { TaskTree } from './components/TaskTree.js';
import { GanttArea } from './components/GanttArea.js';
import { TaskDetailPanel } from './components/TaskDetailPanel.js';
import { mockProjectDetailResponse } from './data/mockProject.js';
import { projectDetailToViewModel } from './data/adapters.js';

const app = document.getElementById('app');

const state = {
  expandedTaskIds: new Set(['phase-1']),
  selectedTaskId: 'market-analysis',
  isDetailPanelOpen: true
};

const screenModel = projectDetailToViewModel(mockProjectDetailResponse);
const { project: mockProject, tasks: mockTasks } = screenModel;

const taskMap = new Map(mockTasks.map((task) => [task.id, task]));

function collectVisibleTasks(tasks, expandedTaskIds) {
  const childMap = tasks.reduce((acc, task) => {
    const key = task.parentId || '__root__';
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(task);
    return acc;
  }, new Map());

  const result = [];

  const walk = (parentId = '__root__') => {
    const children = childMap.get(parentId) || [];
    children.forEach((task) => {
      result.push(task);
      if (expandedTaskIds.has(task.id)) {
        walk(task.id);
      }
    });
  };

  walk();
  return result;
}

function render() {
  const visibleTasks = collectVisibleTasks(mockTasks, state.expandedTaskIds);
  const selectedTask = taskMap.get(state.selectedTaskId) || visibleTasks[0] || mockTasks[0];

  app.innerHTML = `
    ${Header({ project: mockProject })}
    <main class="flex h-[calc(100vh-48px)] overflow-hidden">
      ${TaskTree({
        tasks: mockTasks,
        expandedTaskIds: state.expandedTaskIds,
        selectedTaskId: state.selectedTaskId
      })}
      ${GanttArea({
        project: mockProject,
        visibleTasks,
        selectedTaskId: state.selectedTaskId
      })}
      ${TaskDetailPanel({
        task: selectedTask,
        isOpen: state.isDetailPanelOpen
      })}
    </main>
  `;

  bindEvents();
}

function bindEvents() {
  app.querySelectorAll('[data-role="task-row"]').forEach((element) => {
    element.addEventListener('click', () => {
      const taskId = element.dataset.taskId;
      const task = taskMap.get(taskId);
      if (!task) {
        return;
      }

      const hasChildren = mockTasks.some((candidate) => candidate.parentId === taskId);
      if (hasChildren) {
        if (state.expandedTaskIds.has(taskId)) {
          state.expandedTaskIds.delete(taskId);
        } else {
          state.expandedTaskIds.add(taskId);
        }
      }

      state.selectedTaskId = taskId;
      state.isDetailPanelOpen = true;
      render();
    });
  });

  app.querySelectorAll('[data-role="gantt-row"]').forEach((element) => {
    element.addEventListener('click', () => {
      state.selectedTaskId = element.dataset.taskId;
      state.isDetailPanelOpen = true;
      render();
    });
  });

  const closeButton = app.querySelector('[data-role="panel-close"]');
  closeButton?.addEventListener('click', () => {
    state.isDetailPanelOpen = false;
    render();
  });
}

render();
