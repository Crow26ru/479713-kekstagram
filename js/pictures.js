'use strict';

(function () {
  var TOTAL_PHOTOS_FROM_RANDOM_USERS = 25;
  var photos = [];
  var pictureTemplateElement = document.querySelector('#picture')
     .content
     .querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  var createDataInArray = function (data) {
    for (var i = 0; i <= TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
      var photoInfo = data[i];
      photos.push(photoInfo);
    }
    insertPhotos();
  };

  var searchElementArray = function (arr, url) {
    for (var i = 0; i < TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
      if (arr[i].url === url) {
        return arr[i];
      }
    }
    return null;
  };

  var insertPhotos = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < TOTAL_PHOTOS_FROM_RANDOM_USERS; i++) {
      var url = photos[i].url;
      var likes = photos[i].likes;
      var comments = photos[i].comments;
      var imageElement = pictureTemplateElement.cloneNode(true);
      imageElement.querySelector('.picture__img').src = url;
      imageElement.querySelector('.picture__likes').textContent = likes;
      imageElement.querySelector('.picture__comments').textContent = comments.length;
      fragment.appendChild(imageElement);
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
      window.post.showBigPictureElement(searchElementArray(photos, src));
    }
  };

  window.pictures = {
    TOTAL_PHOTOS_FROM_RANDOM_USERS: TOTAL_PHOTOS_FROM_RANDOM_USERS,
    picturesElement: picturesElement
  };

  window.backend.download(createDataInArray);

  picturesElement.addEventListener('click', picturesContainerClickHandler, false);
})();
