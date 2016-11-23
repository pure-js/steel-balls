loadCSS( 'main.css' );
loadCSS( 'https://fonts.googleapis.com/css?family=Lobster|PT+Sans&amp;subset=cyrillic' );

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