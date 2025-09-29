// regex.js - validaciones

// Expresiones regulares usadas (explicación abajo)
const patterns = {
  // teléfono: permite +código opcional y entre 7 y 14 dígitos (espacios/guiones opcionales)
  phone: /^\+?(\d{1,3}[- ]?)?(\d{7,14})$/,
  // url simple: protocolo opcional, dominio con TLD y ruta opcional
  url: /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i,
  // contraseña segura: al menos 8 chars, 1 mayúscula, 1 número (otros permitidos)
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

function validate(type, value) {
  const re = patterns[type];
  return re.test(value.trim());
}

// UI wiring
document.getElementById('phoneBtn').addEventListener('click', () => {
  const v = document.getElementById('phoneInput').value;
  const ok = validate('phone', v);
  const el = document.getElementById('phoneResult');
  el.textContent = ok ? 'Teléfono válido' : 'Teléfono inválido. Formatos: 3001234567 o +57 3001234567';
});

document.getElementById('urlBtn').addEventListener('click', () => {
  const v = document.getElementById('urlInput').value;
  const ok = validate('url', v);
  const el = document.getElementById('urlResult');
  el.textContent = ok ? 'URL válida' : 'URL inválida. Incluya dominio y TLD.';
});

document.getElementById('passBtn').addEventListener('click', () => {
  const v = document.getElementById('passInput').value;
  const ok = validate('password', v);
  const el = document.getElementById('passResult');
  if (ok) {
    el.textContent = 'Contraseña segura';
  } else {
    el.textContent = 'Contraseña débil. Requisitos: >=8 caracteres, 1 mayúscula, 1 número';
  }
});

// Live validation
const liveInput = document.getElementById('liveInput');
const liveType = document.getElementById('liveType');
const liveResult = document.getElementById('liveResult');

liveInput.addEventListener('input', () => {
  const type = liveType.value;
  const ok = validate(type, liveInput.value);
  liveResult.textContent = ok ? `Válido (${type})` : `Inválido (${type})`;
});
liveType.addEventListener('change', () => liveInput.dispatchEvent(new Event('input')));
