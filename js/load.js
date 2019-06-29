'use strict';
/**
* @description модуль загрузки данных с сервера
*/
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  /**
  * @description функция получения данных с сервера
  * @param {object} onSuccess - при успешном получении данных
  * @param {object} onError - при ошибке получении данных
  */
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
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

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
