import { initializeTheme, toggleTheme } from './utils/theme.js';
import { initializeLayout } from './utils/layout.js';

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeLayout();
  
  // Add theme toggle listener
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
});