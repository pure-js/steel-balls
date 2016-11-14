let navBtn = document.querySelector('.nav-btn');
let nav = document.querySelector('.nav');

navBtn.addEventListener('click', function (e) {
  e.preventDefault();
  toggleEl(nav);
});

function toggleEl(el) {
  el.classList.toggle('hidden');
}