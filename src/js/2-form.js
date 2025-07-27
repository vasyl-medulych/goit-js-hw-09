let formData = { email: '', message: '' };

document.addEventListener('DOMContentLoaded', () => {
  const formElem = document.querySelector('.feedback-form');

  formElem.addEventListener('input', e => {
    formData.email = e.currentTarget.elements.email.value.trim();
    formData.message = e.currentTarget.elements.message.value.trim();
    saveToLS('feedback-form-state', formData);
  });

  const lsData = getFromLS('feedback-form-state');

  formData = { ...formData, ...lsData };
  formElem.elements.email.value = lsData.email || '';
  formElem.elements.message.value = lsData.message || '';

  formElem.addEventListener('submit', e => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const message = e.currentTarget.elements.message.value;
    if (!email || !message) {
      alert('Не заповнені дані');
      return;
    }
    console.log(email, message);
    localStorage.removeItem('feedback-form-state');
    formElem.reset();
    formData = { email: '', message: '' };
  });
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}
