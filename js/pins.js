'use strict';
/**
* @description модуль второстепенных пинов
*/
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var TOP_LIMITER_PIN = 130;
  var BOTTOM_LIMITER_PIN = 630;
  var MAP_WIDTH = 1200;
  var map = document.querySelector('.map');
  var formFilter = map.querySelector('.map__filters');
  formFilter.classList.add('map__filters--disabled');

  /**
  * @description модуль функция созданя сгенерированных JS объектов
  * @param {number} index - индекс элемент массива
  * @return {object} информация по случайным пинам
  */
  window.createPinIformation = function (index) {

    /**
    * определяет положение метки
    */
    var location = {
      x: window.util.getNumber(1, MAP_WIDTH - PIN_WIDTH),
      y: window.util.getNumber(TOP_LIMITER_PIN, BOTTOM_LIMITER_PIN)
    };

    /**
    * добавляет адрес
    */
    var address = {
      x: location.x + PIN_WIDTH / 2,
      y: location.y + PIN_HEIGHT
    };
    return {

      /**
      * возвращает автора
      */
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      address: address,
      location: location,
      /**
      * возвращает тип жилья
      */
      offer: {
        type: window.util.getRandomElement(TYPES)
      }
    };
  };
})();
