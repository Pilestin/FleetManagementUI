// Mock data for charging stations
const mockChargingStations = [
  { 
    id: 1, 
    name: "Station A", 
    location: [41.0102, 28.9774], 
    type: "DC Fast",
    power: 150,
    status: "available",
    energySource: "solar",
    currentLoad: 0
  },
  { 
    id: 2, 
    name: "Station B", 
    location: [41.0162, 28.9674], 
    type: "DC Fast",
    power: 150,
    status: "in-use",
    energySource: "grid",
    currentLoad: 75
  },
  { 
    id: 3, 
    name: "Station C", 
    location: [41.0142, 28.9724], 
    type: "DC",
    power: 50,
    status: "maintenance",
    energySource: "wind",
    currentLoad: 0
  }
];

// Initialize charging stations map
function initializeChargingMap() {
  const map = L.map('chargingMap').setView([41.0082, 28.9784], 13);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add charging station markers
  mockChargingStations.forEach(station => {
    const statusColor = station.status === 'available' ? 'success' : 
                       station.status === 'in-use' ? 'primary' : 'danger';
    
    const icon = L.divIcon({
      className: `charging-station-marker bg-${statusColor}`,
      html: `<i class="bi bi-plug-fill"></i>`,
      iconSize: [30, 30]
    });

    L.marker(station.location, { icon })
      .bindPopup(`
        <div class="station-popup">
          <h6>${station.name}</h6>
          <div class="mb-2">
            <small class="text-muted">Type:</small> ${station.type} (${station.power}kW)
          </div>
          <div class="mb-2">
            <small class="text-muted">Status:</small> 
            <span class="badge bg-${statusColor}">${station.status}</span>
          </div>
          <div class="mb-2">
            <small class="text-muted">Energy Source:</small> ${station.energySource}
          </div>
          <div class="progress" style="height: 5px;">
            <div class="progress-bar bg-${statusColor}" style="width: ${station.currentLoad}%"></div>
          </div>
        </div>
      `)
      .addTo(map);
  });

  return map;
}

// Initialize energy consumption chart
function initializeEnergyConsumption() {
  const ctx = document.getElementById('energyConsumptionChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [
        {
          label: 'Energy Consumption (kWh)',
          data: [25, 15, 35, 45, 40, 30],
          borderColor: '#0d6efd',
          tension: 0.4
        },
        {
          label: 'Green Energy Usage (kWh)',
          data: [20, 12, 30, 38, 35, 25],
          borderColor: '#198754',
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
            text: 'Energy (kWh)'
          }
        }
      }
    }
  });
}

// Initialize energy tariff chart
function initializeEnergyTariff() {
  const ctx = document.getElementById('energyTariffChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['00-06', '06-12', '12-18', '18-24'],
      datasets: [{
        label: 'Energy Cost ($/kWh)',
        data: [0.08, 0.12, 0.15, 0.10],
        backgroundColor: '#ffc107'
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
            text: 'Cost ($/kWh)'
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
  initializeChargingMap();
  initializeEnergyConsumption();
  initializeEnergyTariff();
});