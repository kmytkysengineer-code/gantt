export function projectDetailToViewModel(response) {
  const memberMap = new Map(response.members.map((member) => [member.id, member]));

  const taskMap = new Map(
    response.tasks.map((task) => [
      task.id,
      {
        id: task.id,
        title: task.title,
        status: task.status,
        startDate: task.startDate,
        endDate: task.endDate,
        parentId: task.parentTaskId,
        assignees: task.assigneeIds.map((id) => memberMap.get(id)).filter(Boolean),
        notes: task.notes || ''
      }
    ])
  );

  const childMap = response.tasks.reduce((acc, task) => {
    const key = task.parentTaskId || '__root__';
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(task.id);
    return acc;
  }, new Map());

  const tasksWithDepth = [];
  const walk = (parentId = '__root__', depth = 0) => {
    const children = childMap.get(parentId) || [];
    children.forEach((taskId) => {
      const task = taskMap.get(taskId);
      if (!task) {
        return;
      }
      tasksWithDepth.push({ ...task, depth });
      walk(taskId, depth + 1);
    });
  };

  walk();

  return {
    project: {
      id: response.project.id,
      name: response.project.name,
      viewName: response.gantt.viewName,
      dateRange: response.gantt.dateRange
    },
    tasks: tasksWithDepth
  };
}
