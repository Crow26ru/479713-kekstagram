'use strict';

var MIN_URL_ICON_IMAGE = 1;
var MAX_URL_ICON_IMAGE = 6;
var AVATAR_RANDOM_USER_ALT = 'Аватар комментатора фотографии';
var AVATAR_RANDOM_USER_WIDTH = 35;
var AVATAR_RANDOM_USER_HEIGHT = 35;

var ESC_KEYCODE = 27;

// Секция загрузки нового изображения
var fileUploadElement = document.querySelector('#upload-file');
var fileUploadCancelElement = document.querySelector('#upload-cancel');
var effectListElement = document.querySelector('.effects__list');
var picturesElement = document.querySelector('.pictures');
var closeBigPictureElement = document.querySelector('.big-picture__cancel');
var effectFormElement = document.querySelector('#upload-select-image');
var uploadImageElement = document.querySelector('.img-upload__preview img');

// Здесь надо будет исправить экспорт!
window.uploadImageElement = uploadImageElement;

// ФУНКЦИИ ДЛЯ РАБОТЫ С ЭЛЕМЕНТАМИ МАССИВА

var searchElementArray = function (arr, url) {
  for (var i = 0; i < window.pictures.TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
    if (arr[i].url === url) {
      return arr[i];
    }
  }
  return null;
};

// ФУНКЦИИ ДЛЯ ВЗАИМОДЕЙСТВИЯ С DOM

var createElement = function (tag, className, text) {
  var someElement = document.createElement(tag);
  someElement.classList.add(className);

  if (text) {
    someElement.textContent = text;
  }

  return someElement;
};

var createImgElement = function (className) {
  var someImgElement = createElement('img', className);
  var src = 'img/avatar-' + window.util.getRandomNumber(MIN_URL_ICON_IMAGE, MAX_URL_ICON_IMAGE) + '.svg';
  someImgElement.src = src;
  someImgElement.alt = AVATAR_RANDOM_USER_ALT;
  someImgElement.width = AVATAR_RANDOM_USER_WIDTH;
  someImgElement.height = AVATAR_RANDOM_USER_HEIGHT;
  return someImgElement;
};

var createCommentListElement = function (elem) {
  var totalShowComments = 3;
  var commentsListElement = document.createDocumentFragment();
  var socialCommentsElement = document.querySelector('.social__comments');

  while (socialCommentsElement.children.length >= totalShowComments) {
    socialCommentsElement.removeChild(socialCommentsElement.lastChild);
  }

  for (var i = 0; i < elem.comments.length; i++) {
    var listItemElement = createElement('li', 'social__comment');
    var imgElement = createImgElement('social__picture');
    var pElement = createElement('p', 'social__text', elem.comments[i]);
    listItemElement.appendChild(imgElement);
    listItemElement.appendChild(pElement);

    if (i >= totalShowComments) {
      listItemElement.classList.add('visually-hidden');
    }
    commentsListElement.appendChild(listItemElement);
  }

  return commentsListElement;
};

var insertCommentListElement = function (elem) {
  var commentsElement = document.querySelector('.social__comments');
  commentsElement.appendChild(createCommentListElement(elem));
};

var showBigPictureElement = function (elem) {
  var alt = 'Фото рандомного пользователя';
  var bigPictureElement = document.querySelector('.big-picture');
  var socialCaptionElement = bigPictureElement.querySelector('.social__caption');
  var socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img img').src = elem.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = alt;
  bigPictureElement.querySelector('.likes-count').textContent = elem.likes;
  bigPictureElement.querySelector('.comments-count').textContent = elem.comments.length;
  insertCommentListElement(elem);
  socialCaptionElement.textContent = elem.description;
  socialCommentCountElement.classList.add('visually-hidden');
  commentsLoaderElement.classList.add('visually-hidden');

  closeBigPictureElement.addEventListener('click', closeBigPictureHandler);
  window.addEventListener('keydown', closeBigPictureHandler);
};

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

var clearClassName = function (element) {
  element.className = '';
};

var executeOperationsBeforeCloseEffectForm = function () {
  var hashtagsElement = document.querySelector('.text__hashtags');

  showFileUploadOverlay(false);
  clearClassName(window.uploadImageElement);
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
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
    evt.target.value = '';
  }
};

var fileUploadKeyPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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

    if (window.uploadImageElement.className) {
      window.uploadImageElement.className = '';
    }

    window.uploadImageElement.style.filter = '';
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

var picturesContainerClickHandler = function (evt) {
  var target = evt.target;
  var src = '';

  if (target.tagName === 'A' && target.classList.contains('picture')) {
    src = target.firstElementChild.attributes.src.nodeValue;
  }

  if (target.tagName === 'IMG' && target.classList.contains('picture__img')) {
    src = target.attributes.src.nodeValue;
  }

  if (src) {
    showBigPictureElement(searchElementArray(window.pictures.photosGuests, src));
  }
};

var closeBigPictureHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE || evt.type === 'click') {
    var bigPictureElement = document.querySelector('.big-picture');

    bigPictureElement.classList.add('hidden');
    closeBigPictureElement.removeEventListener('click', closeBigPictureHandler);
    window.removeEventListener('keydown', closeBigPictureHandler);
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
picturesElement.addEventListener('click', picturesContainerClickHandler, false);
