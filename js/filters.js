'use strict';
/**
* @description модуль фильтрации
*/
(function () {
  var housingType = document.querySelector('#housing-type');
  /**
    * @description фильтр массива по кол-ву и типу
    * @param {array} data - массив
    * @return {array} отфильтрованный массив по типу и кол-ву.
    */
  window.getFilteredPins = function (data) {
    var filterData = data.
          filter(function (it) {
            if (housingType.value === 'any') {
              return data;
            } else {
              return it.offer.type === housingType.value;
            }
          });
    return filterData.slice(0, 5);
  };
})();
