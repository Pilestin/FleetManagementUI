import"./style-7c0ff7ee.js";let r=null,a=null,n=1e3;const l=[{id:1,name:"EV-001",location:[41.0092,28.9744],heading:45,status:"active",battery:85,driver:{name:"John Doe",shift:"08:00 - 16:00",totalDeliveries:12,completedDeliveries:8},deliveries:[{id:1,status:"delivered",location:[41.0082,28.9784],time:"09:15"},{id:2,status:"in-progress",location:[41.0122,28.9764],time:"10:30"},{id:3,status:"pending",location:[41.0152,28.9744],time:"11:45"}],route:{planned:[[41.0092,28.9744],[41.0122,28.9764],[41.0152,28.9744]],actual:[[41.0092,28.9744],[41.0102,28.9754],[41.0122,28.9764]]},performance:{routeDeviation:5.2,energyEfficiency:92,timeAdherence:95}}],d={critical:{class:"bg-danger text-white",icon:"bi-exclamation-triangle-fill"},warning:{class:"bg-warning",icon:"bi-exclamation-triangle"},info:{class:"bg-info text-white",icon:"bi-info-circle"}};function c(){const e=L.map("trackingMap").setView([41.0082,28.9784],13);return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(e),e}function g(e){const i=e.status==="active"?"#28a745":e.status==="charging"?"#ffc107":e.status==="maintenance"?"#dc3545":"#6c757d";return L.divIcon({html:`
      <div class="vehicle-marker" style="transform: rotate(${e.heading}deg);">
        <i class="bi bi-truck" style="color: ${i};"></i>
        ${e.battery<20?'<span class="battery-warning">!</span>':""}
      </div>
    `,className:"vehicle-icon",iconSize:[30,30]})}function u(e,i){i.forEach(t=>{const m=g(t);L.marker(t.location,{icon:m}).bindPopup(p(t)).addTo(e),t.id===r&&(L.polyline(t.route.planned,{color:"#0d6efd",dashArray:"5, 10",weight:2}).addTo(e),L.polyline(t.route.actual,{color:"#198754",weight:3}).addTo(e),t.deliveries.forEach(s=>{const v=L.divIcon({html:`<i class="bi bi-box-seam ${s.status}"></i>`,className:"delivery-marker"});L.marker(s.location,{icon:v}).bindPopup(`Delivery #${s.id}<br>Status: ${s.status}<br>Time: ${s.time}`).addTo(e)}))})}function p(e){return`
    <div class="vehicle-popup">
      <h6>${e.name}</h6>
      <div class="mb-2">
        <small class="text-muted">Driver:</small> ${e.driver.name}
      </div>
      <div class="mb-2">
        <div class="progress" style="height: 20px;">
          <div class="progress-bar ${e.battery<20?"bg-danger":"bg-success"}" 
               role="progressbar" 
               style="width: ${e.battery}%">
            ${e.battery}%
          </div>
        </div>
      </div>
      <div class="mt-2">
        <button class="btn btn-sm btn-primary" onclick="selectVehicle(${e.id})">
          View Details
        </button>
      </div>
    </div>
  `}function b(e){const i=document.getElementById("vehicleDetails");if(!e){i.innerHTML='<div class="p-3">Select a vehicle to view details</div>';return}i.innerHTML=`
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="mb-0">${e.name}</h6>
        <span class="badge ${e.status==="active"?"bg-success":e.status==="charging"?"bg-warning":"bg-danger"}">
          ${e.status}
        </span>
      </div>

      <div class="mb-3">
        <small class="text-muted">Battery Status</small>
        <div class="progress">
          <div class="progress-bar ${e.battery<20?"bg-danger":"bg-success"}" 
               role="progressbar" 
               style="width: ${e.battery}%">
            ${e.battery}%
          </div>
        </div>
      </div>

      <div class="mb-3">
        <small class="text-muted">Driver Information</small>
        <div class="card bg-light">
          <div class="card-body p-2">
            <div>Name: ${e.driver.name}</div>
            <div>Shift: ${e.driver.shift}</div>
            <div>Deliveries: ${e.driver.completedDeliveries}/${e.driver.totalDeliveries}</div>
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
                <h6 class="mb-0">${e.performance.routeDeviation}%</h6>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card bg-light">
              <div class="card-body p-2 text-center">
                <small>Energy Efficiency</small>
                <h6 class="mb-0">${e.performance.energyEfficiency}%</h6>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card bg-light">
              <div class="card-body p-2 text-center">
                <small>Time Adherence</small>
                <h6 class="mb-0">${e.performance.timeAdherence}%</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <small class="text-muted">Deliveries</small>
        <div class="list-group">
          ${e.deliveries.map(t=>`
            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div>
                <div>Delivery #${t.id}</div>
                <small class="text-muted">${t.time}</small>
              </div>
              <span class="badge ${t.status==="delivered"?"bg-success":t.status==="in-progress"?"bg-primary":"bg-secondary"}">
                ${t.status}
              </span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `}function f(){const e=document.getElementById("alertsList"),i=[{type:"critical",message:"Vehicle EV-002 battery critical (10%)",time:"2 mins ago"},{type:"warning",message:"Route deviation detected for EV-001",time:"5 mins ago"},{type:"info",message:"EV-003 completed all deliveries",time:"10 mins ago"}];e.innerHTML=i.map(t=>`
    <div class="alert-item ${d[t.type].class} border-0 rounded-0 mb-0 p-3">
      <div class="d-flex align-items-center">
        <i class="bi ${d[t.type].icon} me-2"></i>
        <div>
          <div>${t.message}</div>
          <small>${t.time}</small>
        </div>
      </div>
    </div>
  `).join("")}function y(){document.getElementById("updateInterval").addEventListener("input",e=>{n=e.target.value*1e3,a&&(clearInterval(a),a=setInterval(o,n))}),document.querySelectorAll("[data-filter]").forEach(e=>{e.addEventListener("click",i=>{i.target.dataset.filter})}),document.querySelectorAll(".form-check-input").forEach(e=>{e.addEventListener("change",i=>{})})}function o(){console.log("Updating data...")}function $(e){r=e;const i=l.find(t=>t.id===e);b(i),c()}document.addEventListener("DOMContentLoaded",()=>{const e=c();u(e,l),f(),y(),a=setInterval(o,n)});window.selectVehicle=$;
