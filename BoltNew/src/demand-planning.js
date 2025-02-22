// Initialize demand forecast chart
function initializeDemandForecast() {
  const ctx = document.getElementById('demandForecastChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [
        {
          label: 'Actual Demand',
          data: [120, 135, 125, 140, 145, 150],
          borderColor: '#0d6efd',
          tension: 0.4
        },
        {
          label: 'Forecast',
          data: [125, 130, 135, 140, 145, 155],
          borderColor: '#198754',
          borderDash: [5, 5],
          tension: 0.4
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
            text: 'Demand Units'
          }
        }
      }
    }
  });
}

// Initialize seasonal pattern chart
function initializeSeasonalPattern() {
  const ctx = document.getElementById('seasonalPatternChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Seasonal Index',
        data: [0.8, 0.9, 1.1, 1.2, 1.3, 1.1],
        backgroundColor: '#0d6efd'
      }]
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
            text: 'Index'
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
  initializeDemandForecast();
  initializeSeasonalPattern();
});