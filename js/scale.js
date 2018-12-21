'use strict';

(function () {
  var STEP_CHANGE_EFFECT = 25;
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var DIVIDLER = 100;

  var scaleElement = document.querySelector('.img-upload__scale');
  var smallerElement = scaleElement.querySelector('.scale__control--smaller');
  var biggerElement = scaleElement.querySelector('.scale__control--bigger');
  var inputValueElement = scaleElement.querySelector('.scale__control--value');
  var valueEffect;

  var getValue = function (value) {
    return parseInt(value, 10);
  };

  var setValue = function (value) {
    value = value.toString();
    value += '%';
    return value;
  };

  var setScaleEffect = function (value) {
    return 'scale(' + (value / DIVIDLER) + ')';
  };

  var smallerClickHandler = function (evt) {
    evt.preventDefault();

    valueEffect = inputValueElement.value;
    valueEffect = getValue(valueEffect);

    if (valueEffect > MIN_VALUE) {
      valueEffect -= STEP_CHANGE_EFFECT;
      inputValueElement.value = setValue(valueEffect);
      window.util.uploadPhoto.style.transform = setScaleEffect(valueEffect);
    }
  };

  var biggerClickHandler = function (evt) {
    evt.preventDefault();

    valueEffect = inputValueElement.value;
    valueEffect = getValue(valueEffect);

    if (valueEffect < MAX_VALUE) {
      valueEffect += STEP_CHANGE_EFFECT;
      inputValueElement.value = setValue(valueEffect);
      window.util.uploadPhoto.style.transform = setScaleEffect(valueEffect);
    }
  };

  window.scale = {
    inputValueElement: inputValueElement,
    smallerElement: smallerElement,
    biggerElement: biggerElement,
    smallerClickHandler: smallerClickHandler,
    biggerClickHandler: biggerClickHandler
  };
})();
