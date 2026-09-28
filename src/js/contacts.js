// Елементи форми
const form = document.querySelector('.contacts-form');

const nameInput = form.querySelector('.contacts-input[name="name"]');
const phoneInput = form.querySelector('.contacts-input[name="phone"]');
const messageInput = form.querySelector(
  '.contacts-textarea[name="message"]'
);

const successBackdrop = document.querySelector('.success-backdrop');
const successModalClose = document.querySelector('.success-modal-close');

// Валідація даних форми
function validateForm(name, phone, message) {
  const errors = {};

  if (name.length < 2 || name.length > 64) {
    errors.name = 'Name must be between 2 and 64 characters';
  }

  if (!/^[0-9]{12}$/.test(phone)) {
    errors.phone = 'Phone must contain exactly 12 digits';
  }

  if (
    message.length > 0 &&
    (message.length < 5 || message.length > 256)
  ) {
    errors.message = 'Message must be between 5 and 256 characters';
  }

  return errors;
}

// Відображення помилки біля поля
function showError(input, message) {
  let error = input.parentElement.querySelector('.contacts-error');

  if (!error) {
    error = document.createElement('p');
    error.classList.add('contacts-error');
    input.parentElement.append(error);
  }

  error.textContent = message;
}

// Очищення помилки
function clearError(input) {
  const error = input.parentElement.querySelector('.contacts-error');

  if (error) {
    error.remove();
  }
}

// Відображення повідомлення про помилку запиту
function showNotification(message) {
  const notification = document.createElement('div');

  notification.classList.add('contacts-notification');
  notification.textContent = message;

  document.body.append(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// Керування модальним вікном
function openSuccessModal() {
  successBackdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function closeSuccessModal() {
  successBackdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}

// Створення індикатора завантаження
const loader = document.createElement('div');
loader.classList.add('loader');
document.body.append(loader);

// Закриття модального вікна
successModalClose.addEventListener('click', closeSuccessModal);

successBackdrop.addEventListener('click', event => {
  if (event.target === successBackdrop) {
    closeSuccessModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeSuccessModal();
  }
});

//  Обробка відправки форми
form.addEventListener('submit', async event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  const errors = validateForm(name, phone, message);

  clearError(nameInput);
  clearError(phoneInput);
  clearError(messageInput);

  if (errors.name) {
    showError(nameInput, errors.name);
  }

  if (errors.phone) {
    showError(phoneInput, errors.phone);
  }

  if (errors.message) {
    showError(messageInput, errors.message);
  }

  if (Object.keys(errors).length > 0) {
    return;
  }

  try {
    loader.classList.add('is-active');

    const response = await fetch(
      'https://wedding-photographer.b.goit.study/api/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong. Please try again.');
    }

    openSuccessModal();
    form.reset();
  } catch (error) {
    showNotification(error.message);
  } finally {
    loader.classList.remove('is-active');
  }
});