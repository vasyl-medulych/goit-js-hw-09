let formData = { email: '', message: '' };

const formElem = document.querySelector('.feedback-form');

formElem.addEventListener('input', e => {
  formData.email = e.currentTarget.email.value;
  formData.message = e.currentTarget.message.value;
  saveToLS('feedback-form-state', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback-form-state');
  try {
    formData = lsData;
    formElem.elements.email.value = lsData.email;
    formElem.elements.message.value = lsData.message;
  } catch {}
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
