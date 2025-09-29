// date.js - contador de días usando Date nativo

const dateInput = document.getElementById('dateInput');
const setDateBtn = document.getElementById('setDate');
const christmasBtn = document.getElementById('christmasBtn');
const countResult = document.getElementById('countResult');
const nowResult = document.getElementById('nowResult');

let targetDate = null;
let intervalId = null;

function startCounter() {
  if (!targetDate) return;
  if (intervalId) clearInterval(intervalId);
  updateCounter();
  // actualiza cada 30 segundos (no hace falta cada segundo)
  intervalId = setInterval(updateCounter, 30000);
}

function updateCounter() {
  const now = new Date();
  const t = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  // Si la fecha objetivo ya pasó en este año, considerar la del próximo año
  if (t < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    t.setFullYear(now.getFullYear() + 1);
  }
  const diffMs = t - now;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

  if (diffMs >= 0) {
    countResult.textContent = `Faltan ${days} días, ${hours} horas y ${minutes} minutos para ${t.toLocaleDateString('es-CO')}.`;
  } else {
    countResult.textContent = `La fecha ${t.toLocaleDateString('es-CO')} ya pasó.`;
  }
}

// manejo de botones
setDateBtn.addEventListener('click', () => {
  const v = dateInput.value;
  if (!v) {
    countResult.textContent = 'Selecciona primero una fecha válida.';
    return;
  }
  targetDate = new Date(v);
  startCounter();
});

christmasBtn.addEventListener('click', () => {
  const now = new Date();
  // Navidad: 25 diciembre del año actual (si ya pasó, the logic en updateCounter ajusta)
  targetDate = new Date(now.getFullYear(), 11, 25);
  startCounter();
});

// Mostrar fecha actual formateada y componentes usando Date methods (getFullYear/getMonth/getDate)
function showNow() {
  const n = new Date();
  const year = n.getFullYear();
  const month = n.getMonth() + 1;
  const day = n.getDate();
  const hours = n.getHours();
  const minutes = String(n.getMinutes()).padStart(2,'0');
  const seconds = String(n.getSeconds()).padStart(2,'0');
  nowResult.textContent = `Ahora: ${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')} ${hours}:${minutes}:${seconds}`;
}
showNow();
setInterval(showNow,1000);
