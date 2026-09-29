export function createGallery(images, newGallery = false) {
  const gallery = document.querySelector('.portfolio-gallery');

  const markup = images
    .map(
      ({ img, desc }) =>
        `<li class="gallery-item">
            <img class="gallery-img"
            src="${img}" alt="${desc} 
            loading="lazy" 
            decoding="async"
            />
        </li>`
    )
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
