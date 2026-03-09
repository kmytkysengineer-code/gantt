export function Header({ project }) {
  return `
    <header class="h-12 border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 bg-white z-20">
      <div class="flex items-center space-x-3">
        <i class="fa-solid fa-layer-group text-blue-600"></i>
        <span class="font-semibold text-sm">${project.name}</span>
        <span class="text-gray-400">/</span>
        <span class="text-gray-500 text-sm">${project.viewName}</span>
      </div>
      <div class="flex items-center space-x-4">
        <button class="text-xs font-medium text-gray-500 hover:bg-gray-100 px-2 py-1 rounded">Share</button>
        <button class="text-xs font-medium bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">New Task</button>
      </div>
    </header>
  `;
}
