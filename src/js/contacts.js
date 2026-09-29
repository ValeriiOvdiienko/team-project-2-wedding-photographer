import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.contacts-form');

const nameInput = form.querySelector('#name');
const phoneInput = form.querySelector('#phone');
const messageInput = form.querySelector('#message');
const submitBtn = form.querySelector('.form-button');

const successModal = document.querySelector('#modal');
const closeModalBtn = successModal.querySelector('.close-modal-btn');

// Базовий URL
axios.defaults.baseURL = 'https://wedding-photographer.b.goit.study/api';

// Валідація полів
function validateForm(name, phone, message) {
  const errors = {};

  if (!name || name.length < 2 || name.length > 64) {
    errors.name = 'Name must be between 2 and 64 characters';
  }

  if (!phone || !/^\+?[0-9]{10,14}$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number (10-14 digits)';
  }

  if (message && (message.length < 5 || message.length > 256)) {
    errors.message = 'Message must be between 5 and 256 characters';
  }

  return errors;
}

// Відображення та очищення помилок (.on-error)
function showError(input, message) {
  input.classList.add('on-error');
  const errorMessageEl = input.parentElement.querySelector('.error-message');

  if (errorMessageEl) {
    errorMessageEl.textContent = message;
  }
}

function clearError(input) {
  input.classList.remove('on-error');
  const errorMessageEl = input.parentElement.querySelector('.error-message');

  if (errorMessageEl) {
    errorMessageEl.textContent = 'This field is required';
  }
}

function clearAllErrors() {
  clearError(nameInput);
  clearError(phoneInput);
  clearError(messageInput);
}

// Прибирання помилок під час введення
[nameInput, phoneInput, messageInput].forEach(input => {
  if (input) {
    input.addEventListener('input', () => clearError(input));
  }
});

// Керування лоадером
function toggleLoading(isLoading) {
  submitBtn.disabled = isLoading;
  if (isLoading) {
    submitBtn.classList.add('is-loading');
  } else {
    submitBtn.classList.remove('is-loading');
  }
}

// Модальне вікно
function openSuccessModal() {
  successModal.classList.add('is-open');
  document.body.classList.add('is-scroll-disabled');
  window.addEventListener('keydown', onEscKeyPress);
}

function closeSuccessModal() {
  successModal.classList.remove('is-open');
  document.body.classList.remove('is-scroll-disabled');
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeSuccessModal();
  }
}

// Події закриття модалки
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeSuccessModal);
}

successModal.addEventListener('click', event => {
  if (!event.target.closest('.modal-wrap')) {
    closeSuccessModal();
  }
});

// Обробка відправки форми
form.addEventListener('submit', async event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  clearAllErrors();

  const errors = validateForm(name, phone, message);

  // Якщо є помилки - "підсічуємо" відповідні поля
  if (Object.keys(errors).length > 0) {
    if (errors.name) showError(nameInput, errors.name);
    if (errors.phone) showError(phoneInput, errors.phone);
    if (errors.message) showError(messageInput, errors.message);
    return;
  }

  toggleLoading(true);

  try {
    const payload = { name, phone };
    if (message) payload.message = message;

    const response = await axios.post('/orders', payload);

    if (response.status === 200 || response.status === 201) {
      form.reset();
      clearAllErrors();
      openSuccessModal();
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Something went wrong. Please try again later.';

    iziToast.error({
      title: 'Error',
      message: errorMessage,
      position: 'topRight',
    });
  } finally {
    toggleLoading(false);
  }
});
