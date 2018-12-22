'use strict';

(function () {
  var effects = [
    {
      name: 'chrome',
      filter: 'grayscale',
      minValue: 0,
      maxValue: 100,
      measuringUnit: '%',
      getProperty: function (value) {
        return this.filter + '(' + value + this.measuringUnit + ')';
      }
    },
    {
      name: 'sepia',
      filter: 'sepia',
      minValue: 0,
      maxValue: 100,
      measuringUnit: '%',
      getProperty: function (value) {
        return this.filter + '(' + value + this.measuringUnit + ')';
      }
    },
    {
      name: 'marvin',
      filter: 'invert',
      minValue: 0,
      maxValue: 100,
      measuringUnit: '%',
      getProperty: function (value) {
        return this.filter + '(' + value + this.measuringUnit + ')';
      }
    },
    {
      name: 'phobos',
      filter: 'blur',
      minValue: 0,
      maxValue: 3,
      measuringUnit: 'px',
      getProperty: function (value) {
        return this.filter + '(' + value + this.measuringUnit + ')';
      }
    },
    {
      name: 'heat',
      filter: 'brightness',
      minValue: 100,
      maxValue: 300,
      measuringUnit: '%',
      getProperty: function (value) {
        return this.filter + '(' + value + this.measuringUnit + ')';
      }
    }
  ];

  var defaultPositon = '100%';
  var lineEffectSliderElement = document.querySelector('.effect-level__line');
  var pinEffectSliderElement = lineEffectSliderElement.querySelector('.effect-level__pin');
  var levelEffectSliderElement = lineEffectSliderElement.querySelector('.effect-level__depth');

  var resolveProportion = function (numeratorX, denominatorX, denominatorYMin, denominatorYMax) {
    if (!denominatorYMin) {
      return numeratorX * denominatorYMax / denominatorX;
    }

    var diff = denominatorYMax - denominatorYMin;
    return (numeratorX * diff / denominatorX) + denominatorYMin;
  };

  var getFilterName = function (nodeElement) {
    for (var i = 0; i < effects.length; i++) {
      var result = nodeElement.className.indexOf('--' + effects[i].name);
      if (result > -1) {
        return effects[i];
      }
    }
    return null;
  };

  var setValueOfEffect = function (nodeElement, filerName, value) {
    for (var i = 0; i < effects.length; i++) {
      if (filerName === effects[i].name) {
        nodeElement.style.filter = effects[i].getProperty(value);
      }
    }
  };

  var mouseDownHandler = function (evt) {
    evt.preventDefault();
    var startPositionX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startPositionX - pinEffectSliderElement.offsetLeft;
      var stylesLineEffectSlider = getComputedStyle(lineEffectSliderElement);
      var maxWidth = parseInt(stylesLineEffectSlider.width, 10);
      var effect;
      var valueEffect;
      var inputValueElement = document.querySelector('.effect-level__value');

      var getPositionInnerMinMaxValues = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
      };

      startPositionX = moveEvt.clientX;

      var newX = getPositionInnerMinMaxValues(startPositionX - shiftX, 0, maxWidth);

      pinEffectSliderElement.style.left = newX + 'px';
      levelEffectSliderElement.style.width = newX + 'px';

      effect = getFilterName(window.util.uploadPhoto);
      valueEffect = resolveProportion(newX, maxWidth, effect.minValue, effect.maxValue);
      setValueOfEffect(window.util.uploadPhoto, effect.name, valueEffect);
      inputValueElement.value = Math.round(valueEffect);
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

  window.filter = {
    effects: effects,
    pinEffectSliderElement: pinEffectSliderElement,
    levelEffectSliderElement: levelEffectSliderElement,
    defaultPositon: defaultPositon
  };
})();
