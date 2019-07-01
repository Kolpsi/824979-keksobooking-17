'use strict';
/**
* @description модуль второстепенных пинов
*/
(function () {
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  /**
  * @description функция отрисовки пинов
  * @param {object} pins - объект
  * @return {object} pin - возвращает пин
  */
  window.renderPins = function (pins) {
    window.removePins();
    var pin = pinTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.renderPins(pins[i]));
    }

    map.appendChild(fragment);

    for (i = 0; i < pins.length; i++) {
      return pins[i];
    }

    if (pins.length === 0) {
      window.removePins();
    } else {
      pin.style.left = pins.location.x + 'px';
      pin.style.top = pins.location.y + 'px';
      pin.querySelector('img').src = pins.author.avatar;
      pin.querySelector('img').alt = pins.offer.title;
    }
    return pin;
  };

  /**
  * @description удаляет лишние пины
  */
  window.removePins = function () {
    var obj = document.querySelectorAll('.map__pin');
    for (var i = 1; i < obj.length; i++) {
      obj[i].remove();
    }
  };
})();
