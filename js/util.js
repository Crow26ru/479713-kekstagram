'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomNumber: function (min, max) {
      var range = max - min + 1;
      return Math.floor(Math.random() * range) + min;
    },
    getRandomElementArray: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };
})();
