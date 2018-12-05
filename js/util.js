'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) {
      var range = max - min + 1;
      return Math.floor(Math.random() * range) + min;
    }
  };
})();
