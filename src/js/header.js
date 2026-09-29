const openMenuBtn = document.querySelector('.open-menu-btn');
const header = document.querySelector('.header');
const body = document.body;

openMenuBtn.addEventListener('click', handlerClick);
function handlerClick(event) {
  header.classList.toggle('menu-open');
  body.classList.toggle('menu-is-open');
}

const mobileMenuLinks = document.querySelectorAll(
  '.mobile-menu-link, .mobile-menu .button, .nav-logo'
);
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    body.classList.remove('menu-is-open');
  });
});
