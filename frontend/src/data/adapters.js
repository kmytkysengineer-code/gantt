/**
 * @param {{project:{id:string,name:string}, tasks:Array<any>, gantt:{view_name:string,date_range:{start:string,end:string,today:string}}}} response
 */
export function apiToProjectScreenViewModel(response) {
  const childMap = response.tasks.reduce((acc, task) => {
    const key = task.parent_task_id || '__root__';
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(task);
    return acc;
  }, new Map());

  childMap.forEach((tasks) => {
    tasks.sort((a, b) => a.position - b.position);
  });

  const tasksWithDepth = [];

  const walk = (parentId = '__root__', depth = 0) => {
    const children = childMap.get(parentId) || [];
    children.forEach((task) => {
      tasksWithDepth.push({
        id: task.id,
        title: task.title,
        status: task.status,
        startDate: task.start_date,
        endDate: task.end_date,
        parentId: task.parent_task_id,
        depth,
        assignees: [],
        notes: task.notes || ''
      });
      walk(task.id, depth + 1);
    });
  };

  walk();

  return {
    project: {
      id: response.project.id,
      name: response.project.name,
      viewName: response.gantt.view_name,
      dateRange: response.gantt.date_range
    },
    tasks: tasksWithDepth
  };
}
