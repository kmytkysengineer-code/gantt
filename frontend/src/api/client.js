const API_BASE_URL = window.__API_BASE_URL__ || 'http://localhost:8000/api/v1';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = payload.detail || `API request failed (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

export async function listProjects() {
  return request('/projects');
}

export async function getProject(projectId) {
  return request(`/projects/${projectId}`);
}

export async function getProjectTasks(projectId) {
  return request(`/projects/${projectId}/tasks`);
}

export async function getProjectGantt(projectId) {
  return request(`/projects/${projectId}/gantt`);
}

export async function createTask(payload) {
  return request('/tasks', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateTask(taskId, payload) {
  return request(`/tasks/${taskId}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export async function fetchProjectScreenData(projectId) {
  const [project, tasks, gantt] = await Promise.all([
    getProject(projectId),
    getProjectTasks(projectId),
    getProjectGantt(projectId)
  ]);

  return { project, tasks, gantt };
}
