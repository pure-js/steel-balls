function fixedNav({
  linkEl = document.querySelectorAll('.nav__item'),
  offset = 39
} = {}) {

  const linkLength = linkEl.length;

  for(let i = 0; i < linkLength; i++) {
    linkEl[i].addEventListener('click', function (e) {
      e.preventDefault();
      anchorClick(this, offset);
      toggleEl(navContainer, 'hidden-sm-down');
    })
  }
}
