

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
  
  intervalId = setInterval(updateCounter, 30000);
}

function updateCounter() {
  const now = new Date();
  const t = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

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
  
  targetDate = new Date(now.getFullYear(), 11, 25);
  startCounter();
});


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
