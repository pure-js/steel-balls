function anchorClick(el, offset) {
  let id = el.getAttribute('href').substring(1);
  let target = document.getElementById(id);
  target.scrollIntoView();
  window.scrollTo(0, window.scrollY - offset);
}

function anchorListen({
  linkEl = document.querySelectorAll('.work-area-btn'),
  navEl = document.querySelector('.header')
} = {}) {

  const linkLength = linkEl.length,
    navLength = navEl.offsetHeight;

  for(let i = 0; i < linkLength; i++) {
    linkEl[i].addEventListener('click', function (e) {
      e.preventDefault();
      anchorClick(this, navLength);
    })
  }
}
