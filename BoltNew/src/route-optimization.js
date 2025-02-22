// Mock data for customer tasks
const mockTasks = [
  {
    id: 1,
    customer: 'Endüstri Mühendisliği',
    location: [39.749081, 30.4745729], // Güncellendi
    timeWindow: '09:00 - 10:00',
    priority: 'high',
    status: 'pending',
    details: {
      contact: 'Prof. Dr. Ahmet Yılmaz (Bölüm Başkanı)',
      phone: '0222 123 4567',
      notes: 'Bölüm sekreterliğinde teslim edilecek'
    }
  },
  {
    id: 2,
    customer: 'Fen Edebiyat Fakültesi',
    location: [39.7513058, 30.484667], // Güncellendi
    timeWindow: '10:30 - 11:30',
    priority: 'medium',
    status: 'pending',
    details: {
      contact: 'Doç. Dr. Ayşe Kaya (Dekan Yardımcısı)',
      phone: '0222 123 4568',
      notes: 'Ana bina girişinde teslim edilecek'
    }
  },
  {
    id: 3,
    customer: 'Merkez Kütüphane',
    location: [39.7507028, 30.4854958], // Güncellendi
    timeWindow: '11:00 - 12:00',
    priority: 'medium',
    status: 'pending',
    details: {
      contact: 'Mehmet Demir (Kütüphane Müdürü)',
      phone: '0222 123 4569',
      notes: 'Giriş katta resepsiyona teslim edilecek'
    }
  },
  {
    id: 4,
    customer: 'Spor Salonu',
    location: [39.7503215, 30.4800783], // Güncellendi
    timeWindow: '13:00 - 14:00',
    priority: 'low',
    status: 'pending',
    details: {
      contact: 'Ali Yıldız (Antrenör)',
      phone: '0222 123 4570',
      notes: 'Spor salonu malzeme odasına bırakılacak'
    }
  },
  {
    id: 5,
    customer: 'Rektörlük Binası',
    location: [39.7505605, 30.4855774], // Güncellendi
    timeWindow: '14:30 - 15:30',
    priority: 'high',
    status: 'pending',
    details: {
      contact: 'Fatma Şahin (Rektörlük Sekreteri)',
      phone: '0222 123 4571',
      notes: 'Makam katına özel evrak teslim edilecek'
    }
  }
];


let map = null;
let selectedTasks = [];
let optimizationInProgress = false;

// Initialize map centered on ESOGU
function initializeMap() {
  map = L.map('map').setView([39.7503547668457, 30.48531150817871], 16); // Centered on ESOGU with closer zoom
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add ESOGU campus boundary or markers for main buildings
  addCampusMarkers();

  return map;
}

// Add campus markers for main buildings
function addCampusMarkers() {
  const campusBuildings = [
    {
      name: 'Endüstri Mühendisliği',
      location: [39.749081, 30.4745729],
      icon: 'building'
    },
    {
      name: 'Bilgisayar Mühendisliği',
      location: [39.7503788, 30.4737074],
      icon: 'cpu'
    },
    {
      name: 'Fen Edebiyat Fakültesi',
      location: [39.7513058, 30.484667],
      icon: 'building'
    },
    {
      name: 'Merkez Kütüphane',
      location: [39.7507028, 30.4854958],
      icon: 'book'
    },
    {
      name: 'Teknoloji İnovasyon Merkezi',
      location: [39.7492663, 30.4795761],
      icon: 'tools'
    },
    {
      name: 'Spor Salonu',
      location: [39.7503215, 30.4800783],
      icon: 'bicycle'
    },
    {
      name: 'Rektörlük Binası',
      location: [39.7505605, 30.4855774],
      icon: 'bank'
    }
  ];

  campusBuildings.forEach(building => {
    L.marker(building.location, {
      icon: L.divIcon({
        className: 'building-marker',
        html: `<i class="bi bi-${building.icon}"></i>`,
        iconSize: [24, 24]
      })
    })
    .bindPopup(`<b>${building.name}</b>`)
    .addTo(map);
  });
}

// Initialize task pool
function initializeTaskPool() {
  const taskList = document.getElementById('taskList');
  if (!taskList) return;

  taskList.innerHTML = mockTasks.map(task => createTaskItem(task)).join('');

  // Add click event listeners to task items
  document.querySelectorAll('.task-item').forEach(item => {
    item.addEventListener('click', () => {
      const taskId = parseInt(item.dataset.taskId);
      toggleTaskSelection(taskId);
    });
  });
}

// Create task item HTML
function createTaskItem(task) {
  const priorityClass = task.priority === 'high' ? 'text-danger' :
                       task.priority === 'medium' ? 'text-warning' : 'text-success';
  
  return `
    <div class="task-item card mb-2" data-task-id="${task.id}">
      <div class="card-body p-2">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1">
              <i class="bi bi-building me-2"></i>
              ${task.customer}
            </h6>
            <small class="text-muted">${task.timeWindow}</small>
          </div>
          <span class="badge ${priorityClass}">${task.priority}</span>
        </div>
        <div class="mt-2">
          <small class="d-block"><strong>İletişim:</strong> ${task.details.contact}</small>
          <small class="d-block"><strong>Telefon:</strong> ${task.details.phone}</small>
          <small class="d-block"><strong>Notlar:</strong> ${task.details.notes}</small>
        </div>
      </div>
    </div>
  `;
}

// Toggle task selection
function toggleTaskSelection(taskId) {
  const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
  const taskIndex = selectedTasks.indexOf(taskId);
  
  if (taskIndex === -1) {
    selectedTasks.push(taskId);
    taskElement.classList.add('selected', 'border-primary');
  } else {
    selectedTasks.splice(taskIndex, 1);
    taskElement.classList.remove('selected', 'border-primary');
  }

  updateMap();
  updateOptimizationButton();
}

// Update map with selected tasks
function updateMap() {
  if (!map) return;
  
  // Clear existing route markers and lines
  map.eachLayer(layer => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      if (!layer.isBaseMarker) { // Don't remove campus building markers
        map.removeLayer(layer);
      }
    }
  });

  // Add markers for selected tasks
  const selectedPoints = [];
  selectedTasks.forEach(taskId => {
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) return;

    const icon = L.divIcon({
      className: 'task-marker',
      html: `<i class="bi bi-geo-alt-fill"></i>`,
      iconSize: [30, 30]
    });

    L.marker(task.location, { icon })
      .bindPopup(`
        <div>
          <strong>${task.customer}</strong><br>
          Saat: ${task.timeWindow}<br>
          İletişim: ${task.details.contact}<br>
          Notlar: ${task.details.notes}
        </div>
      `)
      .addTo(map);

    selectedPoints.push(task.location);
  });

  // Draw lines between selected points if there are at least 2 points
  if (selectedPoints.length >= 2) {
    L.polyline(selectedPoints, {
      color: '#0d6efd',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(map);
  }
}

// Update optimization button state
function updateOptimizationButton() {
  const button = document.getElementById('startOptimization');
  if (!button) return;

  button.disabled = selectedTasks.length < 2 || optimizationInProgress;
}

// Start optimization process
function startOptimization() {
  if (selectedTasks.length < 2 || optimizationInProgress) return;

  optimizationInProgress = true;
  updateOptimizationButton();

  const button = document.getElementById('startOptimization');
  const originalText = button.innerHTML;
  button.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    Rota Optimize Ediliyor...
  `;
  

  // Simulate optimization process
  setTimeout(() => {
    optimizationInProgress = false;
    button.innerHTML = originalText;
    updateOptimizationButton();
    
    // Update metrics after optimization
    updateMetrics({
      distance: 2.4,
      energy: 1.2,
      time: 45,
      tardiness: 0
    });

    // Draw optimized route
    drawOptimizedRoute();
  }, 2000);
}

// Draw optimized route
function drawOptimizedRoute() {
  const optimizedPoints = selectedTasks.map(taskId => {
    const task = mockTasks.find(t => t.id === taskId);
    return task.location;
  });

  // Clear existing routes
  map.eachLayer(layer => {
    if (layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });

  // Draw optimized route
  L.polyline(optimizedPoints, {
    color: '#198754',
    weight: 4,
    opacity: 0.8
  }).addTo(map);
}

// Update metrics display
function updateMetrics(metrics) {
  document.getElementById('totalDistance').textContent = `${metrics.distance} km`;
  document.getElementById('energyUsage').textContent = `${metrics.energy} kWh`;
  document.getElementById('totalTime').textContent = `${metrics.time} dk`;
  document.getElementById('tardiness').textContent = `${metrics.tardiness} dk`;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeMap();
  initializeTaskPool();
  
  // Add event listener for optimization button
  document.getElementById('startOptimization')?.addEventListener('click', startOptimization);

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
});