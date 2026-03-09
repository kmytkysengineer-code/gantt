/**
 * @typedef {{id:string,name:string}} ApiProject
 * @typedef {{id:string,name:string,description?:string|null}} ApiProjectDetail
 * @typedef {{start:string,end:string,today:string}} ApiDateRange
 * @typedef {{project_id:string,view_name:string,date_range:ApiDateRange,tasks:ApiTask[],dependencies:ApiDependency[]}} ApiGanttResponse
 * @typedef {{id:string,project_id:string,parent_task_id:string|null,title:string,status:'pending'|'in_progress'|'done',start_date:string,end_date:string,position:number,depth:number,path:string,notes:string}} ApiTask
 * @typedef {{id:string,project_id:string,predecessor_task_id:string,successor_task_id:string,dependency_type:string}} ApiDependency
 *
 * @typedef {{id:string,name:string,viewName:string,dateRange:ApiDateRange}} ProjectViewModel
 * @typedef {{id:string,title:string,status:'pending'|'in_progress'|'done',startDate:string,endDate:string,parentId:string|null,depth:number,assignees:Array<{id:string,name:string,initials:string,color:string}>,notes:string}} TaskViewModel
 */

export {};
