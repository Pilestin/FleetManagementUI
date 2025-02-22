// Layout management utilities
export function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('collapsed');
  document.getElementById('content')?.classList.toggle('expanded');
}

export function initializeLayout() {
  document.getElementById('sidebarCollapse')?.addEventListener('click', toggleSidebar);
}