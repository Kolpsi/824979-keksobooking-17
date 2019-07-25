'use strict';
/**
* @description модуль отправки данных
*/
(function () {
  var SUCCES = 200;
  var URL = 'https://js.dump.academy/keksobooking';

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

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
