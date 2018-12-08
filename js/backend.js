'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  
  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = '10000';
    
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки данных.');
      }
    });
    
    xhr.addEventListener('error', function () {
      onError('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    });
    
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс')ж
    });
    
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };
  
  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = '10000';
    
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки данных.');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс')ж
    });
    
    xhr.open('POST', URL_UPLOAD);
    xhr.send();
  };
})();
