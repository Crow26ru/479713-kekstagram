'use strict';

(function () {
  window.validate = function (evt) {
    var MAX_HASHTAGS = 5;
    var MAX_LENGTH_HASHTAG = 20;
    var CHAR_SPLIT = ' ';
    var CHAR_HASHTAG = '#';
    var target;

    if (evt.target.tagName !== 'INPUT') {
      target = evt.target.querySelector('.text__hashtags');
    } else {
      target = evt.target;
    }

    var validity = {
      isCorrectFirstSymbol: false,
      isNotOnlyHashtagSymbol: false,
      isCorrectSplitter: false,
      isNotDublicate: false,
      isNotManyHashtags: false,
      isCorrectLength: false,
      checkValid: function () {
        return this.isCorrectFirstSymbol && this.isNotOnlyHashtagSymbol &&
          this.isCorrectSplitter && this.isNotDublicate &&
          this.isNotManyHashtags && this.isCorrectLength;
      }
    };

    var checkFirstSymbol = function (strArr, char) {
      for (var i = 0; i < strArr.length; i++) {
        if (strArr[i][0] !== char) {
          return false;
        }
      }
      return true;
    };

    var checkNotOnlyOneSymbol = function (strArr, char) {
      for (var i = 0; i < strArr.length; i++) {
        if (strArr[i] === char) {
          return false;
        }
      }
      return true;
    };

    var checkCorrectSplitter = function (strArr, char) {
      var MAX_COUNTS = 1;
      var counts;

      for (var i = 0; i < strArr.length; i++) {
        counts = 0;
        for (var j = 0; j < strArr[i].length; j++) {
          if (strArr[i][j] === char) {
            counts++;
          }
          if (counts > MAX_COUNTS) {
            return false;
          }
        }
      }
      return true;
    };

    var checkMaxHashtags = function (strArr, maxElements) {
      return strArr.length <= maxElements;
    };

    var checkDublicates = function (strArr) {
      strArr.sort();

      for (var i = 0; i < strArr.length - 1; i++) {
        if (strArr[i] === strArr[i + 1]) {
          return false;
        }
      }
      return true;
    };

    var checkStringLength = function (strArr, maxLength) {
      for (var i = 0; i < strArr.length; i++) {
        if (strArr[i].length > maxLength) {
          return false;
        }
      }
      return true;
    };

    var hashtagInput = target;
    var textInput = hashtagInput.value.toLowerCase();

    if (textInput === '') {
      return true;
    }

    var textSubstrings = textInput.split(CHAR_SPLIT);

    validity.isCorrectFirstSymbol = checkFirstSymbol(textSubstrings, CHAR_HASHTAG);
    validity.isNotOnlyHashtagSymbol = checkNotOnlyOneSymbol(textSubstrings, CHAR_HASHTAG);
    validity.isCorrectSplitter = checkCorrectSplitter(textSubstrings, CHAR_HASHTAG);
    validity.isNotDublicate = checkDublicates(textSubstrings);
    validity.isNotManyHashtags = checkMaxHashtags(textSubstrings, MAX_HASHTAGS);
    validity.isCorrectLength = checkStringLength(textSubstrings, MAX_LENGTH_HASHTAG);

    if (!validity.checkValid()) {
      var message = 'Ошибка ввода!';
      var messageSeparatop = '\n';

      if (!validity.isCorrectFirstSymbol) {
        message += messageSeparatop + 'Хэш-тег начинается с символа # (решётка).';
      }

      if (!validity.isNotOnlyHashtagSymbol) {
        message += messageSeparatop + 'Хеш-тег не может состоять только из одной решётки.';
      }

      if (!validity.isCorrectSplitter) {
        message += messageSeparatop + 'Хэш-теги разделяются пробелами.';
      }

      if (!validity.isNotDublicate) {
        message += messageSeparatop + 'Один и тот же хэш-тег не может быть использован дважды.';
      }

      if (!validity.isNotManyHashtags) {
        message += messageSeparatop + 'Нельзя указать больше пяти хэш-тегов.';
      }

      if (!validity.isCorrectLength) {
        message += messageSeparatop + 'Максимальная длина одного хэш-тега 20 символов, включая решётку.';
      }

      target.setCustomValidity(message);
      return false;
    } else {
      target.setCustomValidity('');
      return true;
    }
  };
})();
