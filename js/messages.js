'use strict';

(function () {
  var errorTemplateElement = document.querySelector('#error')
        .content
        .querySelector('.error');

  var insertErrorSecion = function () {
    var fragment = document.createDocumentFragment();
    var errorElement = errorTemplateElement.cloneNode(true);
    var mainElement = document.querySelector('main');

    errorElement.style.display = 'none';
    fragment.appendChild(errorElement);
    mainElement.appendChild(fragment);
  };

  var closeModalError = function () {
    modalError.style.display = 'none';
  };

  /*
  var openModalError = function () {
    modalError.removeAttribute('style');
  };
  */

  insertErrorSecion();

  var buttonErrorClose = document.querySelector('.error__button');
  var modalError = document.querySelector('.error');

  buttonErrorClose.addEventListener('click', function () {
    closeModalError();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeModalError();
    }
  });
})();
