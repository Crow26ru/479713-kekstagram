'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var SUCCESS_STATUS = 200;

  var setup = function (onLoad, onError) {
    var query = new XMLHttpRequest();

    query.responseType = 'json';
    query.timeout = '3000';

    query.addEventListener('load', function () {
      if (query.status === SUCCESS_STATUS) {
        onLoad(query.response);
      } else {
        onError('Ошибка загрузки данных.');
      }
    });

    query.addEventListener('error', function () {
      onError('Ошибка ' + query.status + ': ' + query.statusText);
    });

    query.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + query.timeout + ' мс');
    });

    return query;
  };

  var download = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
