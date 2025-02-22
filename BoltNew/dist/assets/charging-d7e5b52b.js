import"./style-7c0ff7ee.js";const o=[{id:1,name:"Station A",location:[41.0102,28.9774],type:"DC Fast",power:150,status:"available",energySource:"solar",currentLoad:0},{id:2,name:"Station B",location:[41.0162,28.9674],type:"DC Fast",power:150,status:"in-use",energySource:"grid",currentLoad:75},{id:3,name:"Station C",location:[41.0142,28.9724],type:"DC",power:50,status:"maintenance",energySource:"wind",currentLoad:0}];function r(){const e=L.map("chargingMap").setView([41.0082,28.9784],13);return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(e),o.forEach(t=>{const a=t.status==="available"?"success":t.status==="in-use"?"primary":"danger",i=L.divIcon({className:`charging-station-marker bg-${a}`,html:'<i class="bi bi-plug-fill"></i>',iconSize:[30,30]});L.marker(t.location,{icon:i}).bindPopup(`
        <div class="station-popup">
          <h6>${t.name}</h6>
          <div class="mb-2">
            <small class="text-muted">Type:</small> ${t.type} (${t.power}kW)
          </div>
          <div class="mb-2">
            <small class="text-muted">Status:</small> 
            <span class="badge bg-${a}">${t.status}</span>
          </div>
          <div class="mb-2">
            <small class="text-muted">Energy Source:</small> ${t.energySource}
          </div>
          <div class="progress" style="height: 5px;">
            <div class="progress-bar bg-${a}" style="width: ${t.currentLoad}%"></div>
          </div>
        </div>
      `).addTo(e)}),e}function l(){const e=document.getElementById("energyConsumptionChart");e&&new Chart(e,{type:"line",data:{labels:["00:00","04:00","08:00","12:00","16:00","20:00"],datasets:[{label:"Energy Consumption (kWh)",data:[25,15,35,45,40,30],borderColor:"#0d6efd",tension:.4},{label:"Green Energy Usage (kWh)",data:[20,12,30,38,35,25],borderColor:"#198754",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{beginAtZero:!0,title:{display:!0,text:"Energy (kWh)"}}}}})}function d(){const e=document.getElementById("energyTariffChart");e&&new Chart(e,{type:"bar",data:{labels:["00-06","06-12","12-18","18-24"],datasets:[{label:"Energy Cost ($/kWh)",data:[.08,.12,.15,.1],backgroundColor:"#ffc107"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"}},scales:{y:{beginAtZero:!0,title:{display:!0,text:"Cost ($/kWh)"}}}}})}const n=document.getElementById("themeToggle");if(n){let e=!1;n.addEventListener("click",()=>{e=!e,document.body.classList.toggle("dark-mode",e),n.innerHTML=`<i class="bi bi-${e?"sun":"moon"}"></i>`})}var s;(s=document.getElementById("sidebarCollapse"))==null||s.addEventListener("click",()=>{document.getElementById("sidebar").classList.toggle("collapsed"),document.getElementById("content").classList.toggle("expanded")});document.addEventListener("DOMContentLoaded",()=>{r(),l(),d()});
