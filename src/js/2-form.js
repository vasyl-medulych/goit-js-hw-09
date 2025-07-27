let formData = { email: '', message: '' };

document.addEventListener('DOMContentLoaded', () => {
  const formElem = document.querySelector('.feedback-form');

  formElem.addEventListener('input', e => {
    if (
      lsData &&
      typeof lsData === 'object' &&
      lsData.email !== undefined &&
      lsData.message !== undefined
    ) {
      saveToLS('feedback-form-state', formData);
    }

    formData.email = e.currentTarget.elements.email.value;
    formData.message = e.currentTarget.elements.message.value;
    saveToLS('feedback-form-state', formData);
  });

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
