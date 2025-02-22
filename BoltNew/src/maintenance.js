// Maintenance history chart
function initializeMaintenanceHistory() {
  const ctx = document.getElementById('maintenanceHistory');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Scheduled Maintenance',
          data: [12, 15, 10, 8, 14, 11],
          backgroundColor: '#0d6efd'
        },
        {
          label: 'Repairs',
          data: [5, 3, 6, 4, 2, 4],
          backgroundColor: '#dc3545'
        },
        {
          label: 'Predictive Maintenance',
          data: [8, 7, 9, 6, 8, 7],
          backgroundColor: '#ffc107'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Maintenance Activities Over Time'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Maintenance Activities'
          }
        }
      }
    }
  });
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  let isDarkMode = false;
  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeToggle.innerHTML = `<i class="bi bi-${isDarkMode ? 'sun' : 'moon'}"></i>`;
  });
}

// Sidebar toggle
document.getElementById('sidebarCollapse')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('content').classList.toggle('expanded');
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeMaintenanceHistory();
});