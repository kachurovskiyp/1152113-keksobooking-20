'use strict';

(function () {
  var Url = {
    load: 'https://javascript.pages.academy/keksobooking/data',
    send: 'https://javascript.pages.academy/keksobooking'
  };
  var Method = {
    load: 'GET',
    send: 'POST'
  };

  window.StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var onLoad = function (data) {
    window.ads = data;
    window.pin.render(window.ads.slice(0, 5));
    window.pin.setEvent(window.ads.slice(0, 5));
    window.sortForm.undisable();
  };
  var onError = function (err) {
    var map = document.querySelector('.map');
    var span = document.createElement(span);
    span.textContent = err;
    map.appendChild(span);
  };

  window.backend = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (data === 'load') {
      xhr.addEventListener('load', function () {
        if (xhr.status === window.StatusCode.OK) {
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

      xhr.open(Method.load, Url.load);
      xhr.send();
    }

    if (data && onSuccess) {
      xhr.addEventListener('load', function () {
        onSuccess(xhr.status);
      });

      xhr.open(Method.send, Url.send);
      xhr.send(data);
    }
  };
})();
