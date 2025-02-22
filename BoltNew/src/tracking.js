// Vehicle tracking state
let selectedVehicleId = null;
let updateIntervalId = null;
let updateIntervalTime = 1000; // 1 second default

// Mock vehicle data with extended information
const mockVehicles = [
  {
    id: 1,
    name: "EV-001",
    location: [41.0092, 28.9744],
    heading: 45, // degrees
    status: "active",
    battery: 85,
    driver: {
      name: "John Doe",
      shift: "08:00 - 16:00",
      totalDeliveries: 12,
      completedDeliveries: 8
    },
    deliveries: [
      { id: 1, status: "delivered", location: [41.0082, 28.9784], time: "09:15" },
      { id: 2, status: "in-progress", location: [41.0122, 28.9764], time: "10:30" },
      { id: 3, status: "pending", location: [41.0152, 28.9744], time: "11:45" }
    ],
    route: {
      planned: [[41.0092, 28.9744], [41.0122, 28.9764], [41.0152, 28.9744]],
      actual: [[41.0092, 28.9744], [41.0102, 28.9754], [41.0122, 28.9764]]
    },
    performance: {
      routeDeviation: 5.2, // percentage
      energyEfficiency: 92, // percentage
      timeAdherence: 95 // percentage
    }
  },
  // Add more vehicles here...
];

// Mock charging stations
const mockChargingStations = [
  { id: 1, name: "Station A", location: [41.0102, 28.9774], available: true, power: 150 },
  { id: 2, name: "Station B", location: [41.0162, 28.9674], available: false, power: 150 },
  { id: 3, name: "Station C", location: [41.0142, 28.9724], available: true, power: 50 }
];

// Alert types and their corresponding classes/icons
const alertTypes = {
  critical: { class: 'bg-danger text-white', icon: 'bi-exclamation-triangle-fill' },
  warning: { class: 'bg-warning', icon: 'bi-exclamation-triangle' },
  info: { class: 'bg-info text-white', icon: 'bi-info-circle' }
};

// Initialize map
function initializeMap() {
  const map = L.map('trackingMap').setView([41.0082, 28.9784], 13);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  return map;
}

// Create custom vehicle icon
function createVehicleIcon(vehicle) {
  const color = vehicle.status === 'active' ? '#28a745' : 
                vehicle.status === 'charging' ? '#ffc107' : 
                vehicle.status === 'maintenance' ? '#dc3545' : '#6c757d';

  // Create an SVG icon with rotation
  const svgIcon = L.divIcon({
    html: `
      <div class="vehicle-marker" style="transform: rotate(${vehicle.heading}deg);">
        <i class="bi bi-truck" style="color: ${color};"></i>
        ${vehicle.battery < 20 ? '<span class="battery-warning">!</span>' : ''}
      </div>
    `,
    className: 'vehicle-icon',
    iconSize: [30, 30]
  });

  return svgIcon;
}

// Update vehicle markers
function updateVehicleMarkers(map, vehicles) {
  vehicles.forEach(vehicle => {
    const icon = createVehicleIcon(vehicle);
    
    const marker = L.marker(vehicle.location, { icon })
      .bindPopup(createVehiclePopup(vehicle))
      .addTo(map);

    // Draw route if vehicle is selected
    if (vehicle.id === selectedVehicleId) {
      // Draw planned route
      L.polyline(vehicle.route.planned, {
        color: '#0d6efd',
        dashArray: '5, 10',
        weight: 2
      }).addTo(map);

      // Draw actual route
      L.polyline(vehicle.route.actual, {
        color: '#198754',
        weight: 3
      }).addTo(map);

      // Add delivery markers
      vehicle.deliveries.forEach(delivery => {
        const deliveryIcon = L.divIcon({
          html: `<i class="bi bi-box-seam ${delivery.status}"></i>`,
          className: 'delivery-marker'
        });

        L.marker(delivery.location, { icon: deliveryIcon })
          .bindPopup(`Delivery #${delivery.id}<br>Status: ${delivery.status}<br>Time: ${delivery.time}`)
          .addTo(map);
      });
    }
  });
}

// Create vehicle popup content
function createVehiclePopup(vehicle) {
  return `
    <div class="vehicle-popup">
      <h6>${vehicle.name}</h6>
      <div class="mb-2">
        <small class="text-muted">Driver:</small> ${vehicle.driver.name}
      </div>
      <div class="mb-2">
        <div class="progress" style="height: 20px;">
          <div class="progress-bar ${vehicle.battery < 20 ? 'bg-danger' : 'bg-success'}" 
               role="progressbar" 
               style="width: ${vehicle.battery}%">
            ${vehicle.battery}%
          </div>
        </div>
      </div>
      <div class="mt-2">
        <button class="btn btn-sm btn-primary" onclick="selectVehicle(${vehicle.id})">
          View Details
        </button>
      </div>
    </div>
  `;
}

// Update vehicle details panel
function updateVehicleDetails(vehicle) {
  const detailsContainer = document.getElementById('vehicleDetails');
  if (!vehicle) {
    detailsContainer.innerHTML = '<div class="p-3">Select a vehicle to view details</div>';
    return;
  }

  detailsContainer.innerHTML = `
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="mb-0">${vehicle.name}</h6>
        <span class="badge ${vehicle.status === 'active' ? 'bg-success' : 
                           vehicle.status === 'charging' ? 'bg-warning' : 
                           'bg-danger'}">
          ${vehicle.status}
        </span>
      </div>

      <div class="mb-3">
        <small class="text-muted">Battery Status</small>
        <div class="progress">
          <div class="progress-bar ${vehicle.battery < 20 ? 'bg-danger' : 'bg-success'}" 
               role="progressbar" 
               style="width: ${vehicle.battery}%">
            ${vehicle.battery}%
          </div>
        </div>
      </div>

      <div class="mb-3">
        <small class="text-muted">Driver Information</small>
        <div class="card bg-light">
          <div class="card-body p-2">
            <div>Name: ${vehicle.driver.name}</div>
            <div>Shift: ${vehicle.driver.shift}</div>
            <div>Deliveries: ${vehicle.driver.completedDeliveries}/${vehicle.driver.totalDeliveries}</div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <small class="text-muted">Performance Metrics</small>
        <div class="row g-2">
          <div class="col-4">
            <div class="card bg-light">
              <div class="card-body p-2 text-center">
                <small>Route Deviation</small>
                <h6 class="mb-0">${vehicle.performance.routeDeviation}%</h6>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card bg-light">
              <div class="card-body p-2 text-center">
                <small>Energy Efficiency</small>
                <h6 class="mb-0">${vehicle.performance.energyEfficiency}%</h6>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card bg-light">
              <div class="card-body p-2 text-center">
                <small>Time Adherence</small>
                <h6 class="mb-0">${vehicle.performance.timeAdherence}%</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <small class="text-muted">Deliveries</small>
        <div class="list-group">
          ${vehicle.deliveries.map(delivery => `
            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div>
                <div>Delivery #${delivery.id}</div>
                <small class="text-muted">${delivery.time}</small>
              </div>
              <span class="badge ${delivery.status === 'delivered' ? 'bg-success' : 
                                 delivery.status === 'in-progress' ? 'bg-primary' : 
                                 'bg-secondary'}">
                ${delivery.status}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Initialize alerts
function initializeAlerts() {
  const alertsList = document.getElementById('alertsList');
  
  // Mock alerts
  const alerts = [
    { type: 'critical', message: 'Vehicle EV-002 battery critical (10%)', time: '2 mins ago' },
    { type: 'warning', message: 'Route deviation detected for EV-001', time: '5 mins ago' },
    { type: 'info', message: 'EV-003 completed all deliveries', time: '10 mins ago' }
  ];

  alertsList.innerHTML = alerts.map(alert => `
    <div class="alert-item ${alertTypes[alert.type].class} border-0 rounded-0 mb-0 p-3">
      <div class="d-flex align-items-center">
        <i class="bi ${alertTypes[alert.type].icon} me-2"></i>
        <div>
          <div>${alert.message}</div>
          <small>${alert.time}</small>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize event listeners
function initializeEventListeners() {
  // Update interval slider
  document.getElementById('updateInterval').addEventListener('input', (e) => {
    updateIntervalTime = e.target.value * 1000;
    if (updateIntervalId) {
      clearInterval(updateIntervalId);
      updateIntervalId = setInterval(updateData, updateIntervalTime);
    }
  });

  // Alert filters
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', (e) => {
      const filter = e.target.dataset.filter;
      // Implement alert filtering logic here
    });
  });

  // Layer toggles
  document.querySelectorAll('.form-check-input').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      // Implement layer toggle logic here
    });
  });
}

// Update data periodically
function updateData() {
  // Implement real-time data update logic here
  console.log('Updating data...');
}

// Select vehicle
function selectVehicle(vehicleId) {
  selectedVehicleId = vehicleId;
  const vehicle = mockVehicles.find(v => v.id === vehicleId);
  updateVehicleDetails(vehicle);
  // Refresh map with new selection
  initializeMap();
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  const map = initializeMap();
  updateVehicleMarkers(map, mockVehicles);
  initializeAlerts();
  initializeEventListeners();
  
  // Start periodic updates
  updateIntervalId = setInterval(updateData, updateIntervalTime);
});

// Make selectVehicle available globally
window.selectVehicle = selectVehicle;