'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var CHAR_SPLIT = ' ';
  var CHAR_HASHTAG = '#';
  var CHAR_SEPARATOR_MESSAGE_ERROR = '\n';
  var MESSAGE_INCORRECT_FIRST_SYMBOL = 'Хэш-тег начинается с символа # (решётка).';
  var MESSAGE_INCORRECT_MIN_LENGTH = 'Хеш-тег не может состоять только из одной решётки.';
  var MESSAGE_INCORRECT_SEPARATOR = 'Хэш-теги разделяются пробелами.';
  var MESSAGE_NO_DUBLICATES = 'Один и тот же хэш-тег не может быть использован дважды.';
  var MESSAGE_INCORRECT_MAX_QUANTITY = 'Нельзя указать больше пяти хэш-тегов.';
  var MESSAGE_INCORRECT_MAX_LENGTH = 'Максимальная длина одного хэш-тега 20 символов, включая решётку.';

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

  window.validate = function (evt) {
    var target;

    if (evt.target.tagName !== 'INPUT') {
      target = evt.target.querySelector('.text__hashtags');
    } else {
      target = evt.target;
    }

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

      if (!validity.isCorrectFirstSymbol) {
        message += CHAR_SEPARATOR_MESSAGE_ERROR + MESSAGE_INCORRECT_FIRST_SYMBOL;
      }

      if (!validity.isNotOnlyHashtagSymbol) {
        message += CHAR_SEPARATOR_MESSAGE_ERROR + MESSAGE_INCORRECT_MIN_LENGTH;
      }

      if (!validity.isCorrectSplitter) {
        message += CHAR_SEPARATOR_MESSAGE_ERROR + MESSAGE_INCORRECT_SEPARATOR;
      }

      if (!validity.isNotDublicate) {
        message += CHAR_SEPARATOR_MESSAGE_ERROR + MESSAGE_NO_DUBLICATES;
      }

      if (!validity.isNotManyHashtags) {
        message += CHAR_SEPARATOR_MESSAGE_ERROR + MESSAGE_INCORRECT_MAX_QUANTITY;
      }

      if (!validity.isCorrectLength) {
        message += CHAR_SEPARATOR_MESSAGE_ERROR + MESSAGE_INCORRECT_MAX_LENGTH;
      }

      target.setCustomValidity(message);
      return false;
    }
    target.setCustomValidity('');
    return true;
  };
})();
