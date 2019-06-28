'use strict';
/**
* @description модуль второстепенных пинов
*/
(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  /**
  * @description функция отрисовки случайных пинов
  * @param {object} backpin - объект
  * @return {object} pin - возвращает пин
  */
  window.renderPin = function (backpin) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = backpin.location.x + 'px';
    pin.style.top = backpin.location.y + 'px';
    pin.querySelector('img').src = backpin.author.avatar;
    pin.querySelector('img').alt = backpin.offer.title;

    return pin;
  };

})();
