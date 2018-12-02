'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var TOTAL_PHOTOS_FROM_RANDOM_USERS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 5;
var MAX_COMMENTS = 15;
var MIN_URL_ICON_IMAGE = 1;
var MAX_URL_ICON_IMAGE = 6;
var AVATAR_RANDOM_USER_ALT = 'Аватар комментатора фотографии';
var AVATAR_RANDOM_USER_WIDTH = 35;
var AVATAR_RANDOM_USER_HEIGHT = 35;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var EVT_CLICK = 'click';
var photosGuests = [];
// Шаблон откуда берем разметку
var pictureTemplateElement = document.querySelector('#picture')
     .content
     .querySelector('.picture');
// Куда будем вставлять разметку из шаблона
var picturesListElement = document.querySelector('.pictures');
// Секция загрузки нового изображения
var fileUploadElement = document.querySelector('#upload-file');
var fileUploadCancelElement = document.querySelector('#upload-cancel');
var effectListElement = document.querySelector('.effects__list');
var picturesElement = document.querySelector('.pictures');
var closeBigPictureElement = document.querySelector('.big-picture__cancel');
var effectForm = document.querySelector('#upload-select-image');

// ФУНКЦИИ ДЛЯ СОЗДАНИЯ ИНФОРМАЦИИ О ФОТОГАФИЯХ ОТ СЛУЧАЙНЫХ ПОЛЬЗОВАТЕЛЕЙ

var createDataInArray = function (arr) {
  for (var i = 1; i <= TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
    var photoInfo = {
      url: getUrlForPhoto(i),
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComments(MIN_COMMENTS, MAX_COMMENTS),
      description: getRandomElementArray(DESCRIPTIONS)
    };
    arr.push(photoInfo);
  }
};

var getUrlForPhoto = function (count) {
  return 'photos/' + count + '.jpg';
};

var getComments = function (min, max) {
  var totalComments = getRandomNumber(min, max);
  var comments = [];

  for (var i = 0; i < totalComments; i++) {
    comments.push(getRandomElementArray(COMMENTS));
  }

  return comments;
};

// ФУНКЦИИ ДЛЯ РАБОТЫ С ЭЛЕМЕНТАМИ МАССИВА

var searchElementArray = function (arr, url) {
  for (var i = 0; i < TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
    if (arr[i].url === url) {
      return arr[i];
    }
  }
  return null;
};

// ФУНКЦИИ ВОЗВРАЩАЮЩИЕ СЛУЧАЙНЫЙ РЕЗУЛЬТАТ

var getRandomNumber = function (min, max) {
  var range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
};

var getRandomElementArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
  var src = 'img/avatar-' + getRandomNumber(MIN_URL_ICON_IMAGE, MAX_URL_ICON_IMAGE) + '.svg';
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

var insertPhotosRandomUsersElements = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
    var url = photosGuests[i].url;
    var likes = photosGuests[i].likes;
    var comments = photosGuests[i].comments;
    var imageRandomElement = pictureTemplateElement.cloneNode(true);
    imageRandomElement.querySelector('.picture__img').src = url;
    imageRandomElement.querySelector('.picture__likes').textContent = likes;
    imageRandomElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(imageRandomElement);
  }

  picturesListElement.appendChild(fragment);
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

// ВАЛИДАЦИЯ ХЕШЕЙ

var hashtagInputHandler = function (evt) {
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var CHAR_SPLIT = ' ';
  var CHAR_HASHTAG = '#';

  var target = evt.target;
  var validity = {
    isCorrectFirstSymbol: false,
    isNotOnlyHashtagSymbol: false,
    isCorrectSplitter: false,
    isNotDublicate: false,
    isNotManyHashtags: false,
    isCorrectLength: false,
    checkValid: function() {
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
      message += messageSeparatop + 'Нельзя указать больше пяти хэш-тегов.';
    }

    target.setCustomValidity(message);
  } /*else if (!validity.isNotOnlyHashtagSymbol) {
    target.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  } else if (!validity.isCorrectSplitter) {
    target.setCustomValidity('Хэш-теги разделяются пробелами');
  } else if (!validity.isNotDublicate) {
    target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  } else if (!validity.isNotManyHashtags) {
    target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else if (!validity.isCorrectLength) {
    target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    
  } */else {
    target.setCustomValidity('');
  }
};

// ВЫЗОВ ФУНКЦИЙ

createDataInArray(photosGuests);
insertPhotosRandomUsersElements();
// showBigPictureElement(searchElementArray(photosGuests, 'photos/1.jpg'));

// ОБРАБОТЧИКИ СОБЫТИЙ

var hashtagInputHashtagEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
    evt.target.value = '';
  }
};

var fileUploadKeyPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE) {
    showFileUploadOverlay(false);
    window.removeEventListener('keydown', fileUploadKeyPressHandler);
    effectListElement.removeEventListener('click', effectsListClickHandler);
    fileUploadElement.value = '';
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
    var uploadImageElement = document.querySelector('.img-upload__preview img');
    var effectBarElement = document.querySelector('.img-upload__effect-level');

    if (uploadImageElement.className) {
      uploadImageElement.className = '';
    }

    uploadImageElement.classList.add(lastElementClassList);

    if (uploadImageElement.classList.contains('effects__preview--none')) {
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
    showBigPictureElement(searchElementArray(photosGuests, src));
  }
};

var closeBigPictureHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE || evt.type === EVT_CLICK) {
    var bigPictureElement = document.querySelector('.big-picture');
    var hashtagsElement = document.querySelector('.text__hashtags');

    bigPictureElement.classList.add('hidden');
    closeBigPictureElement.removeEventListener('click', closeBigPictureHandler);
    window.removeEventListener('keydown', closeBigPictureHandler);
    hashtagsElement.removeEventListener('input', hashtagInputHandler);
    hashtagsElement.removeEventListener('keydown', hashtagInputHashtagEscPressHandler);
  }
};

fileUploadElement.addEventListener('change', function () {
  var effectBarElement = document.querySelector('.img-upload__effect-level');
  var hashtagsElement = document.querySelector('.text__hashtags');

  effectBarElement.classList.add('hidden');
  showFileUploadOverlay(true);
  window.addEventListener('keydown', fileUploadKeyPressHandler);
  effectListElement.addEventListener('click', effectsListClickHandler);
  hashtagsElement.addEventListener('change', hashtagInputHandler);
  hashtagsElement.addEventListener('keydown', hashtagInputHashtagEscPressHandler);
});

fileUploadCancelElement.addEventListener('click', function () {
  var hashtagsElement = document.querySelector('.text__hashtags');

  showFileUploadOverlay(false);
  window.removeEventListener('keydown', fileUploadKeyPressHandler);
  effectListElement.removeEventListener('click', effectsListClickHandler);
  hashtagsElement.removeEventListener('change', hashtagInputHandler);
  hashtagsElement.removeEventListener('keydown', hashtagInputHashtagEscPressHandler);
  fileUploadElement.value = '';
});

fileUploadCancelElement.addEventListener('keydown', fileUploadKeyPressHandler);
picturesElement.addEventListener('click', picturesContainerClickHandler, false);
