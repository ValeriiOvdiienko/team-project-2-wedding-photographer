import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'https://wedding-photographer.b.goit.study/api/feedbacks?limit=10&page=1';
  const wrapper = document.querySelector('#feedbacks-wrapper');

  async function fetchFeedbacks() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Помилка запиту: ${response.status}`);
      }
      const data = await response.json();
      return data.feedbacks;
    } catch (error) {
      console.error('Не вдалося завантажити відгуки:', error);
      return [];
    }
  }

  function renderFeedbacks(feedbacks) {
    if (feedbacks.length === 0) {
      wrapper.innerHTML = '<li class="swiper-slide"><p>Відгуків поки немає.</p></li>';
      return;
    }

    const markup = feedbacks.map(({ descr, name }) => {
      return `
        <li class="swiper-slide feedback-item">
          <p>"${descr}"</p>
          <p>${name}</p>
        </li>
      `;
    }).join('');

    wrapper.innerHTML = markup;
  }

  function setEqualHeights(slides) {
    let maxHeight = 0;
    slides.forEach(slide => {
      slide.style.height = 'auto';
    });

    slides.forEach(slide => {
      if (slide.offsetHeight > maxHeight) {
        maxHeight = slide.offsetHeight;
      }
    });

    slides.forEach(slide => {
      slide.style.height = `${maxHeight}px`;
    });
  }

  function initSwiper() {
    new Swiper('.feedbacks-slider', {
      modules: [Navigation, Pagination, Keyboard, A11y],
      direction: 'horizontal',
      grabCursor: true,
      
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      },

      pagination: {
        el: '.swiper-pagination-custom',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          const activeIndex = (current - 1) % 3;
          let html = '';
          for (let i = 0; i < 3; i++) {
            const activeClass = i === activeIndex ? ' swiper-pagination-bullet-active' : '';
            html += `<span class="swiper-pagination-bullet${activeClass}"></span>`;
          }
          return html;
        }
      },

      breakpoints: {
        320: { 
          slidesPerView: 1, 
          spaceBetween: 24 
        },
        768: { 
          slidesPerView: 3,
          spaceBetween: 24 
        },
        1200: { 
          slidesPerView: 3, 
          spaceBetween: 24 
        }
      },
      
      a11y: {
        prevSlideMessage: 'Попередній відгук',
        nextSlideMessage: 'Наступний відгук',
      },

      on: {
        init: function () {
          setEqualHeights(this.slides);
        },
        resize: function () {
          setEqualHeights(this.slides);
        }
      }
    });
  }

  async function init() {
    const feedbacks = await fetchFeedbacks();
    renderFeedbacks(feedbacks);

    if (feedbacks.length > 0) {
      setTimeout(() => {
        initSwiper();
      }, 0);
    }
  }

  init();
});