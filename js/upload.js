'use strict';

(function () {
  var mapEffectList = {
    'none': 'effects__preview--none',
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat'
  };
  var FORM_FIELDS_DEFAULT = {
    uploadFile: '',
    filterValue: 20,
    hashtag: '',
    comment: '',
    scale: '100%'
  };

  var effectFormElement = document.querySelector('#upload-select-image');
  var fileUploadElement = effectFormElement.querySelector('#upload-file');
  var fileUploadCancelElement = document.querySelector('#upload-cancel');
  var effectListElement = effectFormElement.querySelector('.effects__list');
  var filterValueElement = effectFormElement.querySelector('.effect-level__value');

  var showFileUploadOverlay = function (isShow) {
    var fileUploadOverlayElement = document.querySelector('.img-upload__overlay');
    if (isShow) {
      fileUploadOverlayElement.classList.remove('hidden');
    } else {
      fileUploadOverlayElement.classList.add('hidden');
    }
  };

  var clearForm = function () {
    var hashtagElement = effectFormElement.querySelector('.text__hashtags');
    var commentElement = effectFormElement.querySelector('.text__description');

    fileUploadElement.value = FORM_FIELDS_DEFAULT.uploadFile;
    filterValueElement.value = FORM_FIELDS_DEFAULT.filterValue;
    hashtagElement.value = FORM_FIELDS_DEFAULT.hashtag;
    commentElement.value = FORM_FIELDS_DEFAULT.comment;
  };

  var executeOperationsBeforeCloseEffectForm = function () {
    var hashtagsElement = document.querySelector('.text__hashtags');

    window.util.uploadPhoto.removeAttribute('class');
    window.util.uploadPhoto.removeAttribute('style');
    showFileUploadOverlay(false);
    removeEventListener('keydown', fileUploadKeyPressHandler);
    effectListElement.removeEventListener('change', effectsListClickHandler);
    effectFormElement.removeEventListener('submit', effectFormSubmitHandler);
    hashtagsElement.removeEventListener('input', window.validate);
    hashtagsElement.removeEventListener('keydown', hashtagInputHashtagEscPressHandler);
    window.scale.inputValueElement.value = FORM_FIELDS_DEFAULT.scale;
    window.scale.biggerElement.removeEventListener('click', window.scale.biggerClickHandler);
    window.scale.smallerElement.removeEventListener('click', window.scale.smallerClickHandler);
    clearForm();
  };

  var errorHandler = function (message) {
    var response = typeof message;
    window.messages.openModalError(response);
  };

  var successHandler = function (message) {
    var response = typeof message;
    window.messages.openModalSuccess(response);
  };

  var effectFormSubmitHandler = function (evt) {
    evt.preventDefault();
    if (window.validate(evt)) {
      window.backend.upload(new FormData(effectFormElement), successHandler, errorHandler);
      executeOperationsBeforeCloseEffectForm();
      window.addEventListener('click', window.messages.mouseWindowClickHandler);
      window.addEventListener('keydown', window.messages.keyEscPressHandler);
      window.messages.buttonSuccessClose.addEventListener('click', window.messages.buttonCloseClickHandler);
      window.messages.buttonErrorClose.addEventListener('click', window.messages.buttonCloseClickHandler);
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
    var effectBarElement = document.querySelector('.img-upload__effect-level');
    var target = evt.target;
    var effect = target.value;
    var effectInfo = window.filter.effects.filter(function (element) {
      return effect === element.name;
    }).pop();

    window.util.uploadPhoto.removeAttribute('class');
    window.util.uploadPhoto.removeAttribute('style');
    window.filter.levelEffectSliderElement.style.width = window.filter.defaultPositon;
    window.filter.pinEffectSliderElement.style.left = window.filter.defaultPositon;
    window.util.uploadPhoto.className = mapEffectList[effect];

    if (window.util.uploadPhoto.classList.contains(mapEffectList['none'])) {
      effectBarElement.classList.add('hidden');
    } else {
      if (effectBarElement.classList.contains('hidden')) {
        effectBarElement.classList.remove('hidden');
      }
    }
  };

  fileUploadElement.addEventListener('change', function () {
    if (window.isPhoto) {
      var effectBarElement = document.querySelector('.img-upload__effect-level');
      var hashtagsElement = document.querySelector('.text__hashtags');

      effectBarElement.classList.add('hidden');
      showFileUploadOverlay(true);
      window.addEventListener('keydown', fileUploadKeyPressHandler);
      effectListElement.addEventListener('change', effectsListClickHandler);
      effectFormElement.addEventListener('submit', effectFormSubmitHandler);
      hashtagsElement.addEventListener('input', window.validate);
      hashtagsElement.addEventListener('keydown', hashtagInputHashtagEscPressHandler);
      window.scale.biggerElement.addEventListener('click', window.scale.biggerClickHandler);
      window.scale.smallerElement.addEventListener('click', window.scale.smallerClickHandler);
    } else {
      executeOperationsBeforeCloseEffectForm();
    }
  });

  fileUploadCancelElement.addEventListener('click', function () {
    executeOperationsBeforeCloseEffectForm();
  });

  fileUploadCancelElement.addEventListener('keydown', fileUploadKeyPressHandler);
})();
