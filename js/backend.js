'use strict';
/**
* @description модуль загрузки и отправки данных
*/
(function () {
  var SUCCES = 200;
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL = 'https://js.dump.academy/keksobooking/data';

  /**
  * @description функция отправления данных на сервер
  * @param {object} data - данные отправляемые на сервер
  * @param {object} onSuccess - при успешном получении данных
  * @param {object} onError - при ошибке получении данных
  */
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCES) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  /**
  * @description функция получения данных с сервера
  * @param {object} onSuccess - при успешном получении данных
  * @param {object} onError - при ошибке получении данных
  */
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCES) {
        var data = xhr.response;
        onSuccess(data);
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
