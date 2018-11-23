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
var photosGuests = [];
// Шаблон откуда берем разметку
var pictureTemplateElement = document.querySelector('#picture')
     .content
     .querySelector('.picture');
// Куда будем вставлять разметку из шаблона
var picturesListElement = document.querySelector('.pictures');

// ФУНКЦИИ ДЛЯ СОЗДАНИЯ ИНФОРМАЦИИ О ФОТОГАФИЯХ ОТ СЛУЧАЙНЫХ ПОЛЬЗОВАТЕЛЕЙ

var createDataInArray = function (arr, total, minLikes, maxLikes, minComments, maxComments) {
  for (var i = 1; i <= total; i++) {
    var photoInfo = {
      url: getUrlForPhoto(i),
      likes: getRandomNumber(minLikes, maxLikes),
      comments: getComments(minComments, maxComments),
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

var createImgElement = function (alt, width, height, className, minUrlIndex, maxUrlIndex) {
  var someImgElement = createElement('img', className);
  var src = 'img/avatar-' + getRandomNumber(minUrlIndex, maxUrlIndex) + '.svg';
  someImgElement.src = src;
  someImgElement.alt = alt;
  someImgElement.width = width;
  someImgElement.height = height;
  return someImgElement;
};

var createCommentListElement = function (elem) {
  var totalShowComments = 3;
  var minUrlIndex = 1;
  var maxUrlIndex = 6;
  var commentsListElement = document.createDocumentFragment();

  for (var i = 0; i < photosGuests[elem].comments.length; i++) {
    var listItemElement = createElement('li', 'social__comment');
    var imgElement = createImgElement('Аватар комментатора фотографии', '35', '35', 'social__picture', minUrlIndex, maxUrlIndex);
    var pElement = createElement('p', 'social__text', photosGuests[elem].comments[i]);
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
  var bigPictureElement = document.querySelector('.big-picture');
  var socialCaptionElement = bigPictureElement.querySelector('.social__caption');
  var socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img').src = photosGuests[elem].url;
  bigPictureElement.querySelector('.likes-count').textContent = photosGuests[elem].likes;
  bigPictureElement.querySelector('.comments-count').textContent = photosGuests[elem].comments.length;
  insertCommentListElement(elem);
  socialCaptionElement.textContent = photosGuests[elem].description;
  socialCommentCountElement.classList.add('visually-hidden');
  commentsLoaderElement.classList.add('visually-hidden');
};

// ВЫЗОВ ФУНКЦИЙ

createDataInArray(photosGuests, TOTAL_PHOTOS_FROM_RANDOM_USERS, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS);
insertPhotosRandomUsersElements();
showBigPictureElement(0);
