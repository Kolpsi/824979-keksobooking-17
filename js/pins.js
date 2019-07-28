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
  * @description функция отрисовки одного пина
  * @param {object} pins - объект
  * @return {object} pin - возвращает пин
  */
  window.renderPin = function (pins) {
    var pin = pinTemplate.cloneNode(true);

    if (pins.offer) {
      pin.value = window.pinIndex;
      pin.style.left = pins.location.x + 'px';
      pin.style.top = pins.location.y + 'px';
      pin.querySelector('img').src = pins.author.avatar;
      pin.querySelector('img').alt = pins.offer.title;

      return pin;
    } else {
      return null;
    }
  };
  /**
  * @description функция отрисовки всех пинов
  * @param {array} pins - массив минов
  */
  window.drawPins = function (pins) {
    window.removePins();

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      window.pinIndex = i;
      fragment.appendChild(window.renderPin(pins[i]));
    }

    map.appendChild(fragment);
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
