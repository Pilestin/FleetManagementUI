// Initialize inventory trend chart
function initializeInventoryTrend() {
  const ctx = document.getElementById('inventoryTrendChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Stock Level',
          data: [1200, 1150, 1300, 1250, 1400, 1350],
          borderColor: '#0d6efd',
          tension: 0.4
        },
        {
          label: 'Capacity',
          data: [1500, 1500, 1500, 1500, 1500, 1500],
          borderColor: '#dc3545',
          borderDash: [5, 5],
          tension: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Items'
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
  initializeInventoryTrend();
});