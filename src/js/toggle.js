let navBtn = document.querySelector('.nav-btn');
let nav = document.querySelector('.nav');
let navContainer = nav.parentElement;

navBtn.addEventListener('click', function (e) {
  e.preventDefault();
  toggleEl(navContainer, 'hidden-sm-down');
});

function toggleEl(el, cssClass) {
  el.classList.toggle(cssClass);
}