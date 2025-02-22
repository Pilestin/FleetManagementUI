// Initialize all charts
function initializeCharts() {
  initializeDeliveryPerformance();
  initializeVehiclePerformance();
  initializeEnvironmentalImpact();
}

// Delivery Performance Chart
function initializeDeliveryPerformance() {
  const ctx = document.getElementById('deliveryPerformanceChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
      datasets: [
        {
          label: 'On-Time Deliveries',
          data: [92, 95, 88, 94, 96, 93],
          borderColor: '#198754',
          tension: 0.4
        },
        {
          label: 'Customer Satisfaction',
          data: [4.5, 4.8, 4.6, 4.7, 4.9, 4.8],
          borderColor: '#ffc107',
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
            text: 'Performance Score'
          }
        }
      }
    }
  });
}

// Vehicle Performance Chart
function initializeVehiclePerformance() {
  const ctx = document.getElementById('vehiclePerformanceChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['EV-001', 'EV-002', 'EV-003', 'EV-004', 'EV-005'],
      datasets: [
        {
          label: 'Battery Efficiency',
          data: [85, 78, 92, 88, 90],
          backgroundColor: '#0d6efd'
        },
        {
          label: 'Distance Covered (km)',
          data: [120, 95, 145, 110, 130],
          backgroundColor: '#20c997'
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
            text: 'Performance Metrics'
          }
        }
      }
    }
  });
}

// Environmental Impact Chart
function initializeEnvironmentalImpact() {
  const ctx = document.getElementById('environmentalImpactChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Carbon Emissions Saved (tons)',
        data: [1.8, 2.0, 1.9, 2.2, 2.3, 2.4],
        borderColor: '#198754',
        backgroundColor: 'rgba(25, 135, 84, 0.1)',
        fill: true,
        tension: 0.4
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
            text: 'Carbon Emissions (tons)'
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
  initializeCharts();
});