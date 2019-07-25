'use strict';
/**
* @description модуль фильтрации
*/
(function () {
  var UPPER_PRICE_LIMIT = 50000;
  var LOWER_PRICE_LIMIT = 10000;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  /**
    * @description фильтр массива по кол-ву и типу
    * @param {array} data - массив объявлений
    * @return {array} отфильтрованный массив по всем фильтрам.
    */
  window.getFilteredPins = function (data) {
    var filterData = data.
          filter(function (it) {
            return checkHousingType(it) && checkPrice(it) &&
              checkRoom(it) && checkGuests(it) && checkFeatures(it);
          });
    return filterData.slice(0, 5);
  };

  /**
    * @description фильтр по типу жилья
    * @param {object} it - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkHousingType = function (it) {
    if (housingType.value === 'any') {
      return window.data;
    }
    return it.offer.type === housingType.value;
  };

  /**
    * @description фильтр по цене
    * @param {object} it - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkPrice = function (it) {
    if (housingPrice.value === 'middle') {
      return it.offer.price > LOWER_PRICE_LIMIT && it.offer.price < UPPER_PRICE_LIMIT;
    }
    if (housingPrice.value === 'low') {
      return it.offer.price < LOWER_PRICE_LIMIT;
    }
    if (housingPrice.value === 'high') {
      return it.offer.price > UPPER_PRICE_LIMIT;
    } else {
      return window.data;
    }
  };

  /**
    * @description фильтр по количеству комнат
    * @param {object} it - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkRoom = function (it) {
    if (housingRoom.value === 'any') {
      return window.data;
    }
    return it.offer.rooms === Number(housingRoom.value);
  };

  /**
    * @description фильтр по количеству гостей
    * @param {object} it - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkGuests = function (it) {
    if (housingGuests.value === 'any') {
      return window.data;
    } else {
      if (Number(housingGuests.value) === 0) {
        return it.offer.guests === 0;
      }
    }
    return it.offer.guests === Number(housingGuests.value);
  };

  /**
    * @description фильтр по наличию удобств
    * @param {object} elem - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkFeatures = function (elem) {
    var filterFeaturesCheckboxes = document.querySelectorAll('.map__features input[type=checkbox]:checked');
    var filtered = true;
    if (filterFeaturesCheckboxes.length) {
      filterFeaturesCheckboxes.forEach(function (checkbox) {
        if (!elem.offer.features.includes(checkbox.value)) {
          filtered = false;
        }
      });
    }
    return filtered;
  };

})();

