/** @typedef {'pending'|'in_progress'|'done'} TaskStatus */

/** @type {Record<TaskStatus, {label: string, badgeClass: string, barClass: string}>} */
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
