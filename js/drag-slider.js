'use strict';

(function () {
  var lineEffectSliderElement = document.querySelector('.effect-level__line');
  var pinEffectSliderElement = lineEffectSliderElement.querySelector('.effect-level__pin');
  var levelEffectSliderElement = lineEffectSliderElement.querySelector('.effect-level__depth');

  var mouseDownHandler = function (evt) {
    evt.preventDefault();
    var startPositionX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startPositionX - pinEffectSliderElement.offsetLeft;
      var stylesLineEffectSlider = getComputedStyle(lineEffectSliderElement);
      var maxWidth = parseInt(stylesLineEffectSlider.width, 10);

      var getPositionInnerMinMaxValues = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
      };

      startPositionX = moveEvt.clientX;

      var newX = getPositionInnerMinMaxValues(startPositionX - shiftX, 0, maxWidth);

      pinEffectSliderElement.style.left = newX + 'px';
      levelEffectSliderElement.style.width = newX + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  pinEffectSliderElement.addEventListener('mousedown', mouseDownHandler);
})();
