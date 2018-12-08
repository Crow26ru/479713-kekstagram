'use strict';

(function () {
  // Секция загрузки нового изображения
  var effectFormElement = document.querySelector('#upload-select-image');
  var fileUploadElement = effectFormElement.querySelector('#upload-file');
  var fileUploadCancelElement = document.querySelector('#upload-cancel');
  var effectListElement = effectFormElement.querySelector('.effects__list');
  var uploadImageElement = effectFormElement.querySelector('.img-upload__preview img');
  var fileUploadOverlayElement = document.querySelector('.img-upload__overlay');

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

    uploadImageElement.removeAttribute('class');
    uploadImageElement.removeAttribute('style');
    showFileUploadOverlay(false);
    removeEventListener('keydown', fileUploadKeyPressHandler);
    effectListElement.removeEventListener('click', effectsListClickHandler);
    effectFormElement.removeEventListener('submit', effectFormSubmitHandler);
    hashtagsElement.removeEventListener('input', window.validate);
    hashtagsElement.removeEventListener('keydown', hashtagInputHashtagEscPressHandler);
    fileUploadElement.value = '';
  };

  // ОБРАБОТЧИКИ СОБЫТИЙ

  var errorHandler = function (message) {
    console.log(message);
  };
  
  var effectFormSubmitHandler = function (evt) {
    window.backend.upload(new FormData(effectFormElement), showFileUploadOverlay, errorHandler);
    evt.preventDefault();
    if (window.validate(evt)) {
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
    var target = evt.target;

    if (target.tagName === 'LABEL') {
      target = target.querySelector('span');
    }

    if (target.tagName === 'SPAN') {
      var length = target.classList.length;
      var lastElementClassList = target.classList[length - 1];
      var effectBarElement = document.querySelector('.img-upload__effect-level');

      uploadImageElement.removeAttribute('class');
      uploadImageElement.removeAttribute('style');
      window.filter.levelEffectSliderElement.style.width = window.filter.defaultPositon;
      window.filter.pinEffectSliderElement.style.left = window.filter.defaultPositon;
      uploadImageElement.classList.add(lastElementClassList);

      for (var i = 0; i < window.filter.effects.length; i++) {
        var result = lastElementClassList.split('--');
        result = window.filter.effects[i].isFilter(result[1]);

        if (result) {
          uploadImageElement.style.filter = window.filter.effects[i].getMaxValueProperty();
          break;
        }
      }

      if (uploadImageElement.classList.contains('effects__preview--none')) {
        effectBarElement.classList.add('hidden');
      } else {
        if (effectBarElement.classList.contains('hidden')) {
          effectBarElement.classList.remove('hidden');
        }
      }
    }
  };

  window.upload = uploadImageElement;

  fileUploadElement.addEventListener('change', function () {
    var effectBarElement = document.querySelector('.img-upload__effect-level');
    var hashtagsElement = document.querySelector('.text__hashtags');

    effectBarElement.classList.add('hidden');
    showFileUploadOverlay(true);
    window.addEventListener('keydown', fileUploadKeyPressHandler);
    effectListElement.addEventListener('click', effectsListClickHandler);
    effectFormElement.addEventListener('submit', effectFormSubmitHandler);
    hashtagsElement.addEventListener('input', window.validate);
    hashtagsElement.addEventListener('keydown', hashtagInputHashtagEscPressHandler);
  });

  fileUploadCancelElement.addEventListener('click', function () {
    executeOperationsBeforeCloseEffectForm();
  });

  fileUploadCancelElement.addEventListener('keydown', fileUploadKeyPressHandler);
})();
