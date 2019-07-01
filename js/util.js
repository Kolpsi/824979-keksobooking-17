'use strict';
/**
* @description утилиты
*/
(function () {
  var map = document.querySelector('.map');
  window.util = {
    /**
    * @description функция проверки неактивности формы
    * @return {boolean}  css-селектор
    */
    isFormDisabled: function () {
      return map.classList.contains('map--faded');
    },

    /**
    * @description функция активирования и деактивирования элементов
    * @param {array} array - массив
    */
    toggleAvailabilityFields: function (array) {
      for (var i = 0; i < array.length; i++) {
        var arrayElem = array[i];
        if (window.util.isFormDisabled()) {
          arrayElem.disabled = true;
        } else {
          arrayElem.disabled = false;
        }
      }
    },

    /**
    * @description Возвращает случайное число из заданного промежутка
    * @param {number} min – минимальное значение
    * @param {number} max – максимальное значение
    * @return {number} случайное число
    */
    getNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    /**
    * @description Возвращает рандомный элемент
    * @param {array} array - массив
    * @return {any}  случайный элемент массива
    */
    getRandomElement: function (array) {
      var index = Math.floor(Math.random() * array.length);
      return array[index];
    },

    /**
    * @description фильтр типа жилья
    * @param {array} pins - массив
    * @param {string} value - тип жилья
    */
    changeType: function (pins, value) {
      window.pinTypes = window.pins.
          filter(function (pin) {
            if (value === 'any') {
              return window.pinTypes;
            } else {
              return pin.offer.type === value;
            }
          });
    },

    /**
    * @description удаляет лишние пины
    */
    remove: function () {
      var obj = document.querySelectorAll('.map__pin');
      for (var i = 1; i < obj.length; i++) {
        obj[i].remove();
      }
    }
  };
})();
