'use strict';
/**
* @description модуль фильтрации
*/
(function () {
  /**
    * @description фильтр типа жилья
    * @param {string} value - тип жилья
    */
  window.changeType = function (value) {
    window.pinTypes = window.data.
          filter(function (it) {
            if (value === 'any') {
              return window.pinTypes;
            } else {
              return it.offer.type === value;
            }
          });
  };

  /**
    * @description фильтр массива по кол-ву
    * @param {array} data - массив
    * @return {array} обрезанный массив
    */
  window.getFilteredPins = function (data) {
    var filterData = data;
    return filterData.slice(0, 5);
  };
})();
