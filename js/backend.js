'use strict';

window.backend = (function () {
  var POST_URL = 'https://js.dump.academy/code-and-magick';
  var GET_URL = 'https://js.dump.academy/code-and-magick/data';

  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      addXhrListeners(xhr, onLoad, onError);
      xhr.open('GET', GET_URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      addXhrListeners(xhr, onLoad, onError);
      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };

  function addXhrListeners(xhr, action, errorAction) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        action(xhr.response);
      } else {
        errorAction('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorAction('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorAction('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
  }

})();
