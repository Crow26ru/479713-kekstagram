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
var photosGuests = [];
// Шаблон откуда берем разметку
var pictureTemplateElement = document.querySelector('#picture')
     .content
     .querySelector('.picture');
// Куда будем вставлять разметку из шаблона
var picturesListElement = document.querySelector('.pictures');

var getInfomationAboutPhoto = function () {
  for (var i = 1; i < 26; i++) {
    var photoInfo = {
      url: setUrlForPhoto(i),
      likes: setLikes(),
      comments: setComments(),
      description: getRandomElementArray(DESCRIPTIONS)
    };
    photosGuests.push(photoInfo);
  }
};

// ФУНКЦИИ ДЛЯ СОЗДАНИЯ ИНФОРМАЦИИ О ФОТОГАФИЯХ ОТ СЛУЧАЙНЫХ ПОЛЬЗОВАТЕЛЕЙ

var setUrlForPhoto = function (count) {
  return 'photos/' + count + '.jpg';
};

var setLikes = function () {
  return Math.round(Math.random() * 185 + 15);
};

var setComments = function () {
  var totalComments = Math.ceil(Math.random() * 10 + 5);
  var comments = [];
  for (var i = 0; i < totalComments; i++) {
    comments.push(getRandomElementArray(COMMENTS));
  }
  return comments;
};

// ФУНКЦИИ ВОЗВРАЩАЮЩИЕ СЛУЧАЙНЫЙ РЕЗУЛЬТАТ

var getRandomNumber = function (integer) {
  return Math.ceil(Math.random() * integer);
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

var createImgElement = function (alt, width, height, className) {
  var someImgElement = createElement('img', className);
  var src = 'img/avatar-' + getRandomNumber(6) + '.svg';
  someImgElement.src = src;
  someImgElement.alt = alt;
  someImgElement.width = width;
  someImgElement.height = height;
  return someImgElement;
};

var createCommentListElement = function () {
  var commentsListElement = document.createDocumentFragment();

  for (var i = 0; i < photosGuests[0].comments.length; i++) {
    var listItemElement = createElement('li', 'social__comment');
    var imgElement = createImgElement('Аватар комментатора фотографии', '35', '35', 'social__picture');
    var pElement = createElement('p', 'social__text', photosGuests[0].comments[i]);
    listItemElement.appendChild(imgElement);
    listItemElement.appendChild(pElement);
    commentsListElement.appendChild(listItemElement);
  }

  return commentsListElement;
};

var insertCommentListElement = function () {
  var commentsElement = document.querySelector('.social__comments');
  commentsElement.appendChild(createCommentListElement());
};

var insertPhotosRandomUsersElements = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 25; i++) {
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

var showBigPictureElement = function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var socialCaptionElement = bigPictureElement.querySelector('.social__caption');
  var socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img').src = photosGuests[0].url;
  bigPictureElement.querySelector('.likes-count').textContent = photosGuests[0].likes;
  bigPictureElement.querySelector('.comments-count').textContent = photosGuests[0].comments.length;
  insertCommentListElement();
  socialCaptionElement.textContent = photosGuests[0].description;
  socialCommentCountElement.classList.add('visually-hidden');
  commentsLoaderElement.classList.add('visually-hidden');
};

// ВЫЗОВ ФУНКЦИЙ

getInfomationAboutPhoto();
insertPhotosRandomUsersElements();
showBigPictureElement();
