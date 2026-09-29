import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.faq-list');

  if (!container) return;

  new Accordion(container, {
    elementClass: 'faq-item',
    triggerClass: 'faq-question',
    panelClass: 'faq-answer',
    duration: 400,
    showMultiple: false,
    onOpen: currentElement => {
      const button = currentElement.querySelector('.faq-question');
      if (button) {
        button.setAttribute('aria-expanded', 'true');
      }
    },
    onClose: currentElement => {
      const button = currentElement.querySelector('.faq-question');
      if (button) {
        button.setAttribute('aria-expanded', 'false');
      }
    },
  });
});
