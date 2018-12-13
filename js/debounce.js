'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  var debounce = function (doSomething) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(doSomething, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();
