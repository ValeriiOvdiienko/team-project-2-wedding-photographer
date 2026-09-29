export function createGallery(images, newGallery = false) {
  const gallery = document.querySelector('.portfolio-gallery');

  // Перевіряємо, де саме запущено сайт
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  const markup = images
    .map(({ img, desc }) => {
      // Для локальної роботи та візуалізації використовуємо зображення із АРІ
      // Якщо сайт уже на GitHub Pages - виконується стиснення через wsrv.nl для покращення LCP
      const finalUrl = isLocalhost
        ? img
        : `https://wsrv.nl{encodeURIComponent(img)}&w=600&output=webp&q=75`;

      return `<li class="gallery-item">
            <img class="gallery-img" src="${finalUrl}" alt="${desc}" loading="lazy" width="360" height="240" />
        </li>`;
    })
    .join('');

  if (newGallery) {
    gallery.innerHTML = markup;
  } else {
    gallery.insertAdjacentHTML('beforeend', markup);
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.portfolio-gallery');
  gallery.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('is-active');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('is-active');
}

const showMoreBtn = document.querySelector('.show-more');

export function makeShowMoreButtonActive() {
  showMoreBtn.disabled = false;
}

export function makeShowMoreButtonDisabled() {
  showMoreBtn.disabled = true;
}
