import { Header } from './components/Header.js';
import { TaskTree } from './components/TaskTree.js';
import { GanttArea } from './components/GanttArea.js';
import { TaskDetailPanel } from './components/TaskDetailPanel.js';
import { apiToProjectScreenViewModel } from './data/adapters.js';
import { fetchProjectScreenData, listProjects } from './api/client.js';

const app = document.getElementById('app');

const state = {
  expandedTaskIds: new Set(),
  selectedTaskId: null,
  isDetailPanelOpen: true,
  isLoading: true,
  error: null,
  project: null,
  tasks: []
};

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

function renderLoading() {
  app.innerHTML = `
    <div class="h-screen flex items-center justify-center text-sm text-gray-500">Loading project data...</div>
  `;
}

function renderError() {
  app.innerHTML = `
    <div class="h-screen flex items-center justify-center">
      <div class="text-center">
        <p class="text-sm text-red-600 mb-3">${state.error || 'Failed to load project data.'}</p>
        <button data-role="retry-load" class="text-xs font-medium bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700">Retry</button>
      </div>
    </div>
  `;

  const retry = app.querySelector('[data-role="retry-load"]');
  retry?.addEventListener('click', () => {
    loadScreenData();
  });
}

function renderApp() {
  const taskMap = new Map(state.tasks.map((task) => [task.id, task]));
  const visibleTasks = collectVisibleTasks(state.tasks, state.expandedTaskIds);
  const selectedTask = taskMap.get(state.selectedTaskId) || visibleTasks[0] || state.tasks[0] || null;

  app.innerHTML = `
    ${Header({ project: state.project })}
    <main class="flex h-[calc(100vh-48px)] overflow-hidden">
      ${TaskTree({ tasks: state.tasks, expandedTaskIds: state.expandedTaskIds, selectedTaskId: state.selectedTaskId })}
      ${GanttArea({ project: state.project, visibleTasks, selectedTaskId: state.selectedTaskId })}
      ${selectedTask ? TaskDetailPanel({ task: selectedTask, isOpen: state.isDetailPanelOpen }) : ''}
    </main>
  `;

  bindEvents(taskMap);
}

function bindEvents(taskMap) {
  app.querySelectorAll('[data-role="task-row"]').forEach((element) => {
    element.addEventListener('click', () => {
      const taskId = element.dataset.taskId;
      const task = taskMap.get(taskId);
      if (!task) return;

      const hasChildren = state.tasks.some((candidate) => candidate.parentId === taskId);
      if (hasChildren) {
        if (state.expandedTaskIds.has(taskId)) state.expandedTaskIds.delete(taskId);
        else state.expandedTaskIds.add(taskId);
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

function render() {
  if (state.isLoading) {
    renderLoading();
    return;
  }

  if (state.error) {
    renderError();
    return;
  }

  renderApp();
}

async function loadScreenData() {
  state.isLoading = true;
  state.error = null;
  render();

  try {
    const projects = await listProjects();
    if (!projects.length) {
      throw new Error('No projects found.');
    }

    const projectId = projects[0].id;
    const payload = await fetchProjectScreenData(projectId);
    const viewModel = apiToProjectScreenViewModel(payload);

    state.project = viewModel.project;
    state.tasks = viewModel.tasks;

    const rootTasks = state.tasks.filter((task) => !task.parentId);
    state.expandedTaskIds = new Set(rootTasks.map((task) => task.id));
    state.selectedTaskId = state.tasks[0]?.id || null;
    state.isDetailPanelOpen = true;
    state.isLoading = false;
    render();
  } catch (error) {
    state.isLoading = false;
    state.error = error instanceof Error ? error.message : 'Unknown error occurred.';
    render();
  }
}

loadScreenData();
