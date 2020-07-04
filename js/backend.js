'use strict';

(function () {
  var URL = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SEND: 'https://javascript.pages.academy/keksobooking'
  };
  var METHOD = {
    LOAD: 'GET',
    SEND: 'POST'
  };
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(METHOD.LOAD, URL.LOAD);
      xhr.send();
    },

    send: function (data, onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onSuccess(xhr.status);
      });

      xhr.open(METHOD.SEND, URL.SEND);
      xhr.send(data);
    }
  };
})();
