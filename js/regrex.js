const patterns = {
  
  phone: /^\+?(\d{1,3}[- ]?)?(\d{7,14})$/,
  
  url: /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i,
  
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

function validate(type, value) {
  const re = patterns[type];
  return re.test(value.trim());
}


let lastPhone = "";
let lastUrl = "";
let lastPass = "";


document.getElementById('phoneBtn').addEventListener('click', () => {
  const v = document.getElementById('phoneInput').value;
  const ok = validate('phone', v);
  const el = document.getElementById('phoneResult');
  el.textContent = ok ? 'Teléfono válido' : 'Teléfono inválido. Formatos: 3001234567 o +57 3001234567';
  if (ok) lastPhone = v; 
});

document.getElementById('urlBtn').addEventListener('click', () => {
  const v = document.getElementById('urlInput').value;
  const ok = validate('url', v);
  const el = document.getElementById('urlResult');
  el.textContent = ok ? 'URL válida' : 'URL inválida. Incluya dominio y TLD.';
  if (ok) lastUrl = v; 
});

document.getElementById('passBtn').addEventListener('click', () => {
  const v = document.getElementById('passInput').value;
  const ok = validate('password', v);
  const el = document.getElementById('passResult');
  if (ok) {
    el.textContent = 'Contraseña segura';
    lastPass = v; 
  } else {
    el.textContent = 'Contraseña débil. Requisitos: >=8 caracteres, 1 mayúscula, 1 número';
  }
});


const liveInput = document.getElementById('liveInput');
const liveType = document.getElementById('liveType');
const liveResult = document.getElementById('liveResult');


let liveTouched = false;

liveType.addEventListener('change', () => {
  if (liveType.value === 'phone' && lastPhone) {
    liveInput.value = lastPhone;
    liveTouched = true;
  } else if (liveType.value === 'url' && lastUrl) {
    liveInput.value = lastUrl;
    liveTouched = true;
  } else if (liveType.value === 'password' && lastPass) {
    liveInput.value = lastPass;
    liveTouched = true;
  } else {
    liveInput.value = '';
    liveTouched = false;
  }
  updateLiveValidation();
});


liveInput.addEventListener('input', () => {
  if (!liveTouched && liveInput.value !== '') {
    liveTouched = true;
  }
  updateLiveValidation();
});

function updateLiveValidation() {
  const type = liveType.value;
  const value = liveInput.value;
  const ok = validate(type, value);

  
  if (!liveTouched && value === '') {
    liveResult.textContent = '';
    liveInput.style.borderColor = '';
    liveResult.style.color = '';
    return;
  }

  liveResult.textContent = ok ? `Válido (${type})` : `Inválido (${type})`;
  liveInput.style.borderColor = ok ? '#16a34a' : '#ef4444';
  liveResult.style.color = ok ? '#16a34a' : '#ef4444';
}


updateLiveValidation();
