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

  insertErrorSecion();

})();
