'use strict';

(function () {
  /*
  var EFFECTS = [
    'chrome',
    'sepia',
    'marvin',
    'phobos',
    'heat'
  ];
  var MAX_VALUES_EFFECTS = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: 3
  };
  var MIN_VALUES_EFFECTS = {
    chrome: 0,
    sepia: 0,
    marvin: 0,
    phobos: 0,
    heat: 1
  };
  */
  
  var effects = [
    {
      name: 'chrome',
      filter: 'grayscale',
      minValue: 0,
      maxValue: 100,
      measuringUnit: '%',
      getProperty: function (value) {
        return filter + '(' + value + measuringUnit + ')';
      };
    },
    {
      name: 'sepia',
      filter: 'sepia',
      minValue: 0,
      maxValue: 100,
      measuringUnit: '%'
      getProperty: function (value) {
        return filter + '(' + value + measuringUnit + ')';
      };
    },
    {
      name: 'marvin',
      filter: 'invert',
      minValue: 0,
      maxValue: 100,
      measuringUnit: '%',
      getProperty: function (value) {
        return filter + '(' + value + measuringUnit + ')';
      };
    },
    {
      name: 'phobos',
      filter: 'blur',
      minValue: 0,
      maxValue: 3,
      measuringUnit: 'px',
      getProperty: function (value) {
        return filter + '(' + value + measuringUnit + ')';
      };
    },
    {
      name: 'heat',
      filter: 'brightness',
      minValue: 0,
      maxValue: 100,
      measuringUnit: '%',
      getProperty: function (value) {
        return filter + '(' + value + measuringUnit + ')';
      };
    }
  ];
  
  var lineEffectSliderElement = document.querySelector('.effect-level__line');
  var pinEffectSliderElement = lineEffectSliderElement.querySelector('.effect-level__pin');
  var levelEffectSliderElement = lineEffectSliderElement.querySelector('.effect-level__depth');

  // В будущем надо будет из этого модуля убрать создание переменной uploadImageElement
  // Её создаст другой модуль в глобальную облась видимости

  var uploadImageElement = document.querySelector('.img-upload__preview img');

  /*
  // numeratorX - числитель левого числа дроби        - значение newX
  // denominatorX - знаменатель левого числа дроби    - значение maxWidth
  var resolveProportion = function (numeratorX, denominatorX, denominatorYMin, denominatorYMax) {
    if (!denominatorYMin) {
      return numeratorX * denominatorYMax / denominatorX;
    } else {
      var diff = denominatorYMax - denominatorYMin;
      return (numeratorX * diff / denominatorX) + denominatorYMin;
    }
  };

  // Функция возвращает нужный фильтр из имени класса DOM элемента
  var getFilterName = function (nodeElement) {
    for (var i = 0; i < EFFECTS.length; i++) {
      var result = nodeElement.className.indexOf('--' + EFFECTS[i]);
      if (result > -1) {
        return EFFECTS[i];
      }
    }
    return '';
  };

  var getFilterProperty = function (filter, value) {
    switch (filter) {
      case 'chrome':
        return 'grayscale(' + value + ')';
      case 'sepia':
        return 'sepia(' + value + ')';
      case 'marvin':
        return 'invert(' + value + '%)';
      case 'phobos':
        return 'blur(' + value + 'px)';
      case 'heat':
        return 'brightness(' + value + ')';
    }
    return '';
  };
  /*

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

  // Пин и бар уровня эффектов потребуются
  // Для сброса их в начальное состояние при перключении фильтор
  window.dragSlider = {
    pinEffectSliderElement: pinEffectSliderElement,
    levelEffectSliderElement: levelEffectSliderElement
  };
})();
