let formData = { email: '', message: '' };

document.addEventListener('DOMContentLoaded', () => {
  const formElem = document.querySelector('.feedback-form');

  console.log('--- Input event fired ---');
  console.log('e.currentTarget:', e.currentTarget);
  console.log('e.currentTarget.elements:', e.currentTarget.elements);
  console.log(
    'e.currentTarget.elements.email:',
    e.currentTarget.elements.email
  ); // Це буде null
  console.log(
    'e.currentTarget.elements.message:',
    e.currentTarget.elements.message
  ); // Це теж може бути null

  // Перевірка на існування елементів перед використанням
  if (e.currentTarget.elements.email && e.currentTarget.elements.message) {
    formData.email = e.currentTarget.elements.email.value;
    formData.message = e.currentTarget.elements.message.value;
    saveToLS('feedback-form-state', formData);
  } else {
    console.error(
      "Input fields 'email' or 'message' not found in form.elements!"
    );
  }
  // });
  //   formElem.addEventListener('input', e => {
  //     formData.email = e.currentTarget.elements.email.value;
  //     formData.message = e.currentTarget.elements.message.value;
  //     saveToLS('feedback-form-state', formData);
  //   });

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
