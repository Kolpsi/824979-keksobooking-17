'use strict';
/**
* @description модуль фильтрации
*/
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeature = document.querySelector('#housing-features');

  /**
    * @description фильтр массива по кол-ву и типу
    * @param {array} data - массив
    * @return {array} отфильтрованный массив по типу и кол-ву.
    */
  window.getFilteredPins = function (data) {
    var filterData = data.
          filter(function (it) {
            return checkHousingType(it) && checkPrice(it) &&
              checkRoom(it) && checkGuests(it);
          });
    return filterData.slice(0, 5);
  };

  var checkHousingType = function (it) {
    if (housingType.value === 'any') {
      return window.data;
    } else {
      return it.offer.type === housingType.value;
    }
  };

  var checkPrice = function (it) {
    if (housingPrice.value === 'middle') {
      return it.offer.price > 10000 && it.offer.price < 50000;
    }
    if (housingPrice.value === 'low') {
      return it.offer.price < 10000;
    }
    if (housingPrice.value === 'high') {
      return it.offer.price > 50000;
    } else {
      return window.data;
    }
  };

  var checkRoom = function (it) {
    if (housingRoom.value === '1') {
      return it.offer.rooms === 1;
    }
    if (housingRoom.value === '2') {
      return it.offer.rooms === 2;
    }
    if (housingRoom.value === '3') {
      return it.offer.rooms === 3;
    } else {
      return window.data;
    }
  };

  var checkGuests = function (it) {
    if (housingGuests.value === '0') {
      return it.offer.guests === 0;
    }
    if (housingGuests.value === '1') {
      return it.offer.guests === 1;
    }
    if (housingGuests.value === '2') {
      return it.offer.guests === 2;
    } else {
      return window.data;
    }
  };

  var checkFeatures = function (evt) {
    console.log()
  };
})();

