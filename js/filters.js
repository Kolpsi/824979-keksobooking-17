'use strict';
/**
* @description модуль фильтрации
*/
(function () {
  /**
    * @description фильтр типа жилья
    * @param {array} pins - массив
    * @param {string} value - тип жилья
    */
  window.changeType = function (pins, value) {
    window.pinTypes = window.data.
          filter(function (pin) {
            if (value === 'any') {
              return window.pinTypes;
            } else {
              return pin.offer.type === value;
            }
          });
  };
})();
