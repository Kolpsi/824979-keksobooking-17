'use strict';
/**
* @description модуль фильтрации
*/
(function () {
  var housingType = document.querySelector('#housing-type');
  /**
    * @description фильтр типа жилья
    * @param {array} data - массив у которого проводится выборка
    * @return {array} отфильтрованный массив по типу
    */
  window.changeHouseType = function (data) {
    var changeTypeData = data.
          filter(function (it) {
            if (housingType.value === 'any') {
              return data;
            } else {
              return it.offer.type === housingType.value;
            }
          });
    return changeTypeData;
  };

  /**
    * @description фильтр массива по кол-ву
    * @param {array} data - массив
    * @return {array} отфильтрованный массив по типу и кол-ву.
    */
  window.getFilteredPins = function (data) {
    var filterData = window.changeHouseType(data);
    return filterData.slice(0, 5);
  };
})();
