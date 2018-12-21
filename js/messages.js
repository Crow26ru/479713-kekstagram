'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorTemplateElement = document.querySelector('#error')
        .content
        .querySelector('.error');

  var successTemplateElement = document.querySelector('#success')
        .content
        .querySelector('.success');

  var insertModalsSecion = function () {
    var fragment = document.createDocumentFragment();
    var errorElement = errorTemplateElement.cloneNode(true);
    var successElement = successTemplateElement.cloneNode(true);

    errorElement.style.display = 'none';
    successElement.style.display = 'none';
    fragment.appendChild(errorElement);
    fragment.appendChild(successElement);
    mainElement.appendChild(fragment);
  };

  var openModalError = function (response) {
    if (response === 'string') {
      modalError.removeAttribute('style');
    }
  };

  var openModalSuccess = function (response) {
    if (response !== 'string') {
      modalSuccess.removeAttribute('style');
    }
  };

  var mouseWindowClickHandler = function () {
    modalSuccess.style.display = 'none';
    modalError.style.display = 'none';
    removeAllHandlers();
  };

  var keyEscPressHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      modalSuccess.style.display = 'none';
      modalError.style.display = 'none';
      removeAllHandlers();
    }
  };

  var buttonCloseClickHandler = function (evt) {
    if (evt.target === buttonSuccessClose || evt.target === buttonErrorClose) {
      modalSuccess.style.display = 'none';
      modalError.style.display = 'none';
      removeAllHandlers();
    }
  };

  var removeAllHandlers = function () {
    window.removeEventListener('click', mouseWindowClickHandler);
    window.removeEventListener('keydown', keyEscPressHandler);
    buttonSuccessClose.removeEventListener('click', buttonCloseClickHandler);
    buttonErrorClose.removeEventListener('click', buttonCloseClickHandler);
  };

  insertModalsSecion();

  var buttonErrorClose = document.querySelector('.error__button');
  var buttonSuccessClose = document.querySelector('.success__button');
  var modalError = document.querySelector('.error');
  var modalSuccess = document.querySelector('.success');

  window.messages = {
    openModalError: openModalError,
    openModalSuccess: openModalSuccess,
    mouseWindowClickHandler: mouseWindowClickHandler,
    keyEscPressHandler: keyEscPressHandler,
    buttonCloseClickHandler: buttonCloseClickHandler,
    buttonSuccessClose: buttonSuccessClose,
    buttonErrorClose: buttonErrorClose
  };
})();
