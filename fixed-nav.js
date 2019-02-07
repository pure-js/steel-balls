'use strict';

function fixedNav() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$linkEl = _ref.linkEl,
      linkEl = _ref$linkEl === undefined ? document.querySelectorAll('.nav__item') : _ref$linkEl,
      _ref$navEl = _ref.navEl,
      navEl = _ref$navEl === undefined ? document.querySelector('.header') : _ref$navEl,
      _ref$bodyEl = _ref.bodyEl,
      bodyEl = _ref$bodyEl === undefined ? document.querySelector('.under-fixed') : _ref$bodyEl;

  var linkLength = linkEl.length,
      navLength = navEl.offsetHeight;

  for (var i = 0; i < linkLength; i++) {
    linkEl[i].addEventListener('click', function (e) {
      e.preventDefault();
      anchorClick(this, navLength);
      toggleEl(navContainer, 'hidden-sm-down');
    });
  }

  // console.log(navEl.offsetHeight);
  function addMarginTop(addTo, getFrom) {
    addTo.style.marginTop = getFrom.offsetHeight + 'px';
  }

  addMarginTop(bodyEl, navEl);

  window.onresize = function () {
    addMarginTop(bodyEl, navEl);
  };
}