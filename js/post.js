'use strict';

(function () {
  var AVATAR_RANDOM_USER_WIDTH = 35;
  var AVATAR_RANDOM_USER_HEIGHT = 35;

  var closeBigPictureElement = document.querySelector('.big-picture__cancel');

  var insertCommentListElement = function (elem) {
    var commentsElement = document.querySelector('.social__comments');
    commentsElement.appendChild(createCommentListElement(elem));
  };

  var createCommentListElement = function (elem) {
    var totalShowComments = 5;
    var commentsListElement = document.createDocumentFragment();
    var socialCommentsElement = document.querySelector('.social__comments');

    while (socialCommentsElement.children.length > 0) {
      socialCommentsElement.removeChild(socialCommentsElement.lastChild);
    }

    for (var i = 0; i < elem.comments.length; i++) {
      var listItemElement = createElement('li', 'social__comment');
      var imgElement = createImgElement('social__picture', elem.comments[i]);
      var pElement = createElement('p', 'social__text', elem.comments[i].message);
      listItemElement.appendChild(imgElement);
      listItemElement.appendChild(pElement);

      if (i >= totalShowComments) {
        listItemElement.classList.add('visually-hidden');
      }
      commentsListElement.appendChild(listItemElement);
    }
    return commentsListElement;
  };

  var createElement = function (tag, className, text) {
    var someElement = document.createElement(tag);
    someElement.classList.add(className);

    if (text) {
      someElement.textContent = text;
    }
    return someElement;
  };

  var createImgElement = function (className, commentObject) {
    var someImgElement = createElement('img', className);
    var src = commentObject.avatar;
    someImgElement.src = src;
    someImgElement.alt = commentObject.name;
    someImgElement.width = AVATAR_RANDOM_USER_WIDTH;
    someImgElement.height = AVATAR_RANDOM_USER_HEIGHT;
    return someImgElement;
  };
  
  var showBigPictureElement = function (elem) {
    var alt = 'Фото пользователя';
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
  }

  var closeBigPictureHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE || evt.type === 'click') {
      var bigPictureElement = document.querySelector('.big-picture');

      bigPictureElement.classList.add('hidden');
      closeBigPictureElement.removeEventListener('click', closeBigPictureHandler);
      window.removeEventListener('keydown', closeBigPictureHandler);
    }
  };

  window.post = {
    showBigPictureElement: showBigPictureElement
  };
})();
