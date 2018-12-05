'use strict';

(function () {
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
  var pictureTemplateElement = document.querySelector('#picture')
     .content
     .querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  var createDataInArray = function (arr) {
    for (var i = 1; i <= TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
      var photoInfo = {
        url: getUrlForPhoto(i),
        likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
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
    var totalComments = window.util.getRandomNumber(min, max);
    var comments = [];

    for (var i = 0; i < totalComments; i++) {
      comments.push(getRandomElementArray(COMMENTS));
    }
    return comments;
  };

  var getRandomElementArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var searchElementArray = function (arr, url) {
    for (var i = 0; i < TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
      if (arr[i].url === url) {
        return arr[i];
      }
    }
    return null;
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
    picturesElement.appendChild(fragment);
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
      window.modalBigPicture.showBigPictureElement(searchElementArray(photosGuests, src));
    }
  };

  window.pictures = {
    TOTAL_PHOTOS_FROM_RANDOM_USERS: TOTAL_PHOTOS_FROM_RANDOM_USERS,
    picturesElement: picturesElement
  };

  createDataInArray(photosGuests);
  insertPhotosRandomUsersElements();
  picturesElement.addEventListener('click', picturesContainerClickHandler, false);
})();
