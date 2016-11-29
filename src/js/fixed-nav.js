function fixedNav({
  linkEl = document.querySelectorAll('.nav__item')
} = {}) {

  const linkLength = linkEl.length;

  for(let i = 0; i < linkLength; i++) {
    linkEl[i].addEventListener('click', function (e) {
      e.preventDefault();
      let id = this.getAttribute('href').substring(1);
      console.log(id);
      let el = document.getElementById(id);
      console.log(el);
      let elTop = el.getBoundingClientRect().top;
      console.log(el.scrollTop, el.offsetTop, el.clientTop, window.scrollY, el.getBoundingClientRect());
      el.scrollIntoView();
      window.scrollTo(0, window.scrollY - 39);
      console.log(window.scrollY);
      toggleEl(navContainer, 'hidden-sm-down');
    })
  }
}
