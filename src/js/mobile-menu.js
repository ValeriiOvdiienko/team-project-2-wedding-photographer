document.addEventListener('DOMContentLoaded', () => {
  const openMenuBtn = document.querySelector('.open-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (openMenuBtn && mobileMenu) {
    // Toggle classes
    openMenuBtn.addEventListener('click', () => {
      openMenuBtn.classList.toggle('is-visible');
      mobileMenu.classList.toggle('is-visible');
    });

    // Close the menu if any link is clicked
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        openMenuBtn.classList.remove('is-visible');
        mobileMenu.classList.remove('is-visible');
      });
    });
  }
});