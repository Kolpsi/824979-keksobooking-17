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
  * @param {object} pins - объект
  * @return {object} pin - возвращает пин
  */
  window.renderPin = function (pins) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = pins.location.x + 'px';
    pin.style.top = pins.location.y + 'px';
    pin.querySelector('img').src = pins.author.avatar;
    pin.querySelector('img').alt = pins.offer.title;

    return pin;
  };
})();
