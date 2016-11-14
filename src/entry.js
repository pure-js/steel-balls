require('smoothscroll-polyfill').polyfill();

document.querySelectorAll('.nav__item').addEventListener('click', scroll);

function scroll() {
  .scrollIntoView({
    behavior: 'smooth'
  });
}
