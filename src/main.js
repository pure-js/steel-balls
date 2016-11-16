let navBtn = document.querySelector('.nav-btn');
let nav = document.querySelector('.nav');

navBtn.addEventListener('click', function (e) {
  e.preventDefault();
  toggleEl(nav, 'hidden-sm-down');
});

function toggleEl(el, cssClass) {
  el.classList.toggle(cssClass);
}