function fixedNav({
  linkEl = document.querySelectorAll('.nav__item'),
  navEl = document.querySelector('.header'),
  bodyEl = document.querySelector('.under-fixed')
} = {}) {

  const linkLength = linkEl.length,
    navLength = navEl.offsetHeight;

  for(let i = 0; i < linkLength; i++) {
    linkEl[i].addEventListener('click', function (e) {
      e.preventDefault();
      anchorClick(this, navLength);
      toggleEl(navContainer, 'hidden-sm-down');
    })
  }

  // console.log(navEl.offsetHeight);
  function addMarginTop(addTo, getFrom) {
    addTo.style.marginTop = getFrom.offsetHeight + 'px';
  }

  addMarginTop(bodyEl, navEl);

  window.onresize = function() {
    addMarginTop(bodyEl, navEl);
  }
}
