'use strict';

function anchorClick(el, offset) {
  var id = el.getAttribute('href').substring(1);
  var target = document.getElementById(id);
  target.scrollIntoView();
  window.scrollTo(0, window.scrollY - offset);
}

function anchorListen() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$linkEl = _ref.linkEl,
      linkEl = _ref$linkEl === undefined ? document.querySelectorAll('.work-area-btn') : _ref$linkEl,
      _ref$navEl = _ref.navEl,
      navEl = _ref$navEl === undefined ? document.querySelector('.header') : _ref$navEl;

  var linkLength = linkEl.length,
      navLength = navEl.offsetHeight;

  for (var i = 0; i < linkLength; i++) {
    linkEl[i].addEventListener('click', function (e) {
      e.preventDefault();
      anchorClick(this, navLength);
    });
  }
}