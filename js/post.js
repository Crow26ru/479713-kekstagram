'use strict';

(function () {
  var AVATAR_RANDOM_USER_WIDTH = 35;
  var AVATAR_RANDOM_USER_HEIGHT = 35;
  var DEFAULT_SHOW_COMMENTS = 5;

  var closeBigPictureElement = document.querySelector('.big-picture__cancel');
  var bigPictureElement = document.querySelector('.big-picture');
  var moreCommentsElement = bigPictureElement.querySelector('.comments-loader');
  var commentsMessageElement = bigPictureElement.querySelector('.social__comment-count');

  var insertCommentListElement = function (elem) {
    var commentsElement = document.querySelector('.social__comments');
    commentsElement.appendChild(createCommentListElement(elem));
  };

  var createCommentListElement = function (elem) {
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

      if (i >= DEFAULT_SHOW_COMMENTS) {
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
  
  var editShowComments = function (commentsShow) {
    var textElement = commentsMessageElement.childNodes[0];
    var message = textElement.textContent;
    message = message.split(' ');
    message.shift();
    message.unshift(commentsShow);
    message = message.join(' ');
    textElement.textContent = message;
  };

  var showBigPictureElement = function (elem) {
    var alt = 'Фото пользователя';
    var socialCaptionElement = bigPictureElement.querySelector('.social__caption');

    bigPictureElement.classList.remove('hidden');
    bigPictureElement.querySelector('.big-picture__img img').src = elem.url;
    bigPictureElement.querySelector('.big-picture__img img').alt = alt;
    bigPictureElement.querySelector('.likes-count').textContent = elem.likes;
    bigPictureElement.querySelector('.comments-count').textContent = elem.comments.length;
    insertCommentListElement(elem);
    socialCaptionElement.textContent = elem.description;

    var commentListElement = bigPictureElement.querySelectorAll('.social__comment');

    if (commentListElement.length < DEFAULT_SHOW_COMMENTS) {
      editShowComments(commentListElement.length);
      moreCommentsElement.classList.add('visually-hidden');
    } else {
      editShowComments(DEFAULT_SHOW_COMMENTS);
      if (moreCommentsElement.classList.contains('visually-hidden')) {
        moreCommentsElement.classList.remove('visually-hidden');
      }
    }

    moreCommentsElement.addEventListener('click', commentClickHandler);
    closeBigPictureElement.addEventListener('click', closeBigPictureHandler);
    window.addEventListener('keydown', closeBigPictureHandler);
  };

  var closeBigPictureHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE || evt.type === 'click') {
      bigPictureElement.classList.add('hidden');
      moreCommentsElement.removeEventListener('click', commentClickHandler);
      closeBigPictureElement.removeEventListener('click', closeBigPictureHandler);
      window.removeEventListener('keydown', closeBigPictureHandler);
    }
  };

  var commentClickHandler = function () {
    console.log('Сообщение');
  };

  window.post = {
    showBigPictureElement: showBigPictureElement
  };
})();
