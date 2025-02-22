// Theme management utility
export function initializeTheme() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  updateTheme(isDarkMode);
}

export function toggleTheme() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', !isDarkMode);
  updateTheme(!isDarkMode);
}

function updateTheme(isDarkMode) {
  document.body.classList.toggle('dark-mode', isDarkMode);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.innerHTML = `<i class="bi bi-${isDarkMode ? 'sun' : 'moon'}"></i>`;
  }
}