'use strict';
/**
* @description модуль второстепенных пинов
*/
(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  /**
  * @description функция возврата данных о пине
  * @param {object} marker - объект
  * @return {object} pin - возвращает пин
  */
  window.renderPin = function (marker) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = marker.location.x + 'px';
    pin.style.top = marker.location.y + 'px';
    pin.querySelector('img').src = marker.author.avatar;
    pin.querySelector('img').alt = marker.offer.title;

    return pin;
  };

})();
