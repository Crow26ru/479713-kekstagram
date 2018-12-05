'use strict';

// Секция загрузки нового изображения
var fileUploadElement = document.querySelector('#upload-file');
var fileUploadCancelElement = document.querySelector('#upload-cancel');
var effectListElement = document.querySelector('.effects__list');
var effectFormElement = document.querySelector('#upload-select-image');
var uploadImageElement = document.querySelector('.img-upload__preview img');

// Здесь надо будет исправить экспорт!
window.uploadImageElement = uploadImageElement;

// ФУНКЦИИ ДЛЯ ВЗАИМОДЕЙСТВИЯ С DOM

// Функция показывающая или скрывающая '.img-upload__overlay'
// Значение true параметра isShow показывает оверлей
// Значение false параметра isShow скрывает оверлей
var showFileUploadOverlay = function (isShow) {
  var fileUploadOverlayElement = document.querySelector('.img-upload__overlay');

  if (isShow) {
    fileUploadOverlayElement.classList.remove('hidden');
  } else {
    fileUploadOverlayElement.classList.add('hidden');
  }
};

var executeOperationsBeforeCloseEffectForm = function () {
  var hashtagsElement = document.querySelector('.text__hashtags');

  showFileUploadOverlay(false);
  window.uploadImageElement.removeAttribute('class');
  window.uploadImageElement.removeAttribute('style');
  window.removeEventListener('keydown', fileUploadKeyPressHandler);
  effectListElement.removeEventListener('click', effectsListClickHandler);
  effectFormElement.removeEventListener('submit', effectFormSubmitHandler);
  hashtagsElement.removeEventListener('input', hashtagInputHandler);
  hashtagsElement.removeEventListener('keydown', hashtagInputHashtagEscPressHandler);
  fileUploadElement.value = '';
};

// ВАЛИДАЦИЯ ХЕШЕЙ

var hashtagInputHandler = function (evt) {
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var CHAR_SPLIT = ' ';
  var CHAR_HASHTAG = '#';
  var target;

  if (evt.target.tagName !== 'INPUT') {
    target = evt.target.querySelector('.text__hashtags');
  } else {
    target = evt.target;
  }

  var validity = {
    isCorrectFirstSymbol: false,
    isNotOnlyHashtagSymbol: false,
    isCorrectSplitter: false,
    isNotDublicate: false,
    isNotManyHashtags: false,
    isCorrectLength: false,
    checkValid: function () {
      return this.isCorrectFirstSymbol && this.isNotOnlyHashtagSymbol &&
        this.isCorrectSplitter && this.isNotDublicate &&
        this.isNotManyHashtags && this.isCorrectLength;
    }
  };

  var checkFirstSymbol = function (strArr, char) {
    for (var i = 0; i < strArr.length; i++) {
      if (strArr[i][0] !== char) {
        return false;
      }
    }

    return true;
  };

  var checkNotOnlyOneSymbol = function (strArr, char) {
    for (var i = 0; i < strArr.length; i++) {
      if (strArr[i] === char) {
        return false;
      }
    }

    return true;
  };

  var checkCorrectSplitter = function (strArr, char) {
    var MAX_COUNTS = 1;
    var counts;

    for (var i = 0; i < strArr.length; i++) {
      counts = 0;
      for (var j = 0; j < strArr[i].length; j++) {
        if (strArr[i][j] === char) {
          counts++;
        }
        if (counts > MAX_COUNTS) {
          return false;
        }
      }
    }

    return true;
  };

  var checkMaxHashtags = function (strArr, maxElements) {
    return strArr.length <= maxElements;
  };

  var checkDublicates = function (strArr) {
    strArr.sort();

    for (var i = 0; i < strArr.length - 1; i++) {
      if (strArr[i] === strArr[i + 1]) {
        return false;
      }
    }

    return true;
  };

  var checkStringLength = function (strArr, maxLength) {
    for (var i = 0; i < strArr.length; i++) {
      if (strArr[i].length > maxLength) {
        return false;
      }
    }
    return true;
  };

  var hashtagInput = target;
  var textInput = hashtagInput.value.toLowerCase();
  var textSubstrings = textInput.split(CHAR_SPLIT);

  validity.isCorrectFirstSymbol = checkFirstSymbol(textSubstrings, CHAR_HASHTAG);
  validity.isNotOnlyHashtagSymbol = checkNotOnlyOneSymbol(textSubstrings, CHAR_HASHTAG);
  validity.isCorrectSplitter = checkCorrectSplitter(textSubstrings, CHAR_HASHTAG);
  validity.isNotDublicate = checkDublicates(textSubstrings);
  validity.isNotManyHashtags = checkMaxHashtags(textSubstrings, MAX_HASHTAGS);
  validity.isCorrectLength = checkStringLength(textSubstrings, MAX_LENGTH_HASHTAG);

  if (!validity.checkValid()) {
    var message = 'Ошибка ввода!';
    var messageSeparatop = '\n';

    if (!validity.isCorrectFirstSymbol) {
      message += messageSeparatop + 'Хэш-тег начинается с символа # (решётка).';
    }

    if (!validity.isNotOnlyHashtagSymbol) {
      message += messageSeparatop + 'Хеш-тег не может состоять только из одной решётки.';
    }

    if (!validity.isCorrectSplitter) {
      message += messageSeparatop + 'Хэш-теги разделяются пробелами.';
    }

    if (!validity.isNotDublicate) {
      message += messageSeparatop + 'Один и тот же хэш-тег не может быть использован дважды.';
    }

    if (!validity.isNotManyHashtags) {
      message += messageSeparatop + 'Нельзя указать больше пяти хэш-тегов.';
    }

    if (!validity.isCorrectLength) {
      message += messageSeparatop + 'Максимальная длина одного хэш-тега 20 символов, включая решётку.';
    }

    target.setCustomValidity(message);
    return false;
  } else {
    target.setCustomValidity('');
    return true;
  }
};

// ОБРАБОТЧИКИ СОБЫТИЙ

var effectFormSubmitHandler = function (evt) {
  evt.preventDefault();
  if (hashtagInputHandler(evt)) {
    executeOperationsBeforeCloseEffectForm();
  }
};

var hashtagInputHashtagEscPressHandler = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE) {
    evt.stopPropagation();
    evt.target.value = '';
  }
};

var fileUploadKeyPressHandler = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE) {
    executeOperationsBeforeCloseEffectForm();
  }
};

var effectsListClickHandler = function (evt) {
  // Сначала событие будет инициированно элементом <input>
  // И распространится до элементов <span> или <label>, смотря где нажатие было выполнено
  // Нам нужно обрабатывать элемент <span>
  // Если список классов у изображения не пуст, то отчистить его
  // У него надо будет взять последний класс и присвоить его изображению
  // Если присвоен класс 'effects__preview--none', то скрыть бар-ползунок, добавив класс 'hidden'
  // Иначе проверяем бар-ползунок на наличие класса 'hidden'
  // Если он есть, то убрать класс 'hidden'

  var target = evt.target;

  if (target.tagName === 'LABEL') {
    target = target.querySelector('span');
  }

  if (target.tagName === 'SPAN') {
    var length = target.classList.length;
    var lastElementClassList = target.classList[length - 1];
    var effectBarElement = document.querySelector('.img-upload__effect-level');

    window.dragSlider.levelEffectSliderElement.style.width = window.dragSlider.defaultPositon;
    window.dragSlider.pinEffectSliderElement.style.left = window.dragSlider.defaultPositon;
    window.uploadImageElement.classList.add(lastElementClassList);

    if (window.uploadImageElement.classList.contains('effects__preview--none')) {
      effectBarElement.classList.add('hidden');
    } else {
      if (effectBarElement.classList.contains('hidden')) {
        effectBarElement.classList.remove('hidden');
      }
    }
  }
};

fileUploadElement.addEventListener('change', function () {
  var effectBarElement = document.querySelector('.img-upload__effect-level');
  var hashtagsElement = document.querySelector('.text__hashtags');

  effectBarElement.classList.add('hidden');
  showFileUploadOverlay(true);
  window.addEventListener('keydown', fileUploadKeyPressHandler);
  effectListElement.addEventListener('click', effectsListClickHandler);
  effectFormElement.addEventListener('submit', effectFormSubmitHandler);
  hashtagsElement.addEventListener('input', hashtagInputHandler);
  hashtagsElement.addEventListener('keydown', hashtagInputHashtagEscPressHandler);
});

fileUploadCancelElement.addEventListener('click', function () {
  executeOperationsBeforeCloseEffectForm();
});

fileUploadCancelElement.addEventListener('keydown', fileUploadKeyPressHandler);
