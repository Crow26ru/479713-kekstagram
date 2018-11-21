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
var pictureTemplate = document.querySelector('#picture')
     .content
     .querySelector('.picture');
// Куда будем вставлять разметку из шаблона
var picturesList = document.querySelector('.pictures');

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

var setUrlForPhoto = function (count) {
  return 'photos/' + count + '.jpg';
};

var setLikes = function () {
  return Math.round(Math.random() * 185 + 15);
};

var setComments = function () {
  var totalComments = Math.ceil(Math.random() * 10);
  var comments = [];
  for (var i = 0; i < totalComments; i++) {
    comments.push(getRandomElementArray(COMMENTS));
  }
  return comments;
};

var getRandomElementArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var insertPhotosRandomUsers = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 25; i++) {
    var url = photosGuests[i].url;
    var likes = photosGuests[i].likes;
    var comments = photosGuests[i].comments;
    var imageRandom = pictureTemplate.cloneNode(true);
    imageRandom.querySelector('.picture__img').src = url;
    imageRandom.querySelector('.picture__likes').textContent = likes;
    imageRandom.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(imageRandom);
  }
  picturesList.appendChild(fragment);
};

getInfomationAboutPhoto();
insertPhotosRandomUsers();
