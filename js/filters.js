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
          filter(function (filterElem) {
            return checkHousingType(filterElem) && checkPrice(filterElem) &&
              checkRoom(filterElem) && checkGuests(filterElem) && checkFeatures(filterElem);
          });
    return filterData.slice(0, 5);
  };

  /**
    * @description фильтр по типу жилья
    * @param {object} object - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkHousingType = function (object) {
    if (housingType.value === 'any') {
      return window.data;
    }
    return object.offer.type === housingType.value;
  };

  /**
    * @description фильтр по цене
    * @param {object} price - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkPrice = function (price) {
    if (housingPrice.value === 'middle') {
      return price.offer.price > LOWER_PRICE_LIMIT && price.offer.price < UPPER_PRICE_LIMIT;
    }
    if (housingPrice.value === 'low') {
      return price.offer.price < LOWER_PRICE_LIMIT;
    }
    if (housingPrice.value === 'high') {
      return price.offer.price > UPPER_PRICE_LIMIT;
    } else {
      return window.data;
    }
  };

  /**
    * @description фильтр по количеству комнат
    * @param {object} number - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkRoom = function (number) {
    if (housingRoom.value === 'any') {
      return window.data;
    }
    return number.offer.rooms === Number(housingRoom.value);
  };

  /**
    * @description фильтр по количеству гостей
    * @param {object} numberOfGuests - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkGuests = function (numberOfGuests) {
    if (housingGuests.value === 'any') {
      return window.data;
    } else {
      if (Number(housingGuests.value) === 0) {
        return numberOfGuests.offer.guests === 0;
      }
    }
    return numberOfGuests.offer.guests === Number(housingGuests.value);
  };

  /**
    * @description фильтр по наличию удобств
    * @param {object} features - объект объявления
    * @return {object} подходящее по параметрам объявление.
    */
  var checkFeatures = function (features) {
    var filterFeaturesCheckboxes = document.querySelectorAll('.map__features input[type=checkbox]:checked');
    var filtered = true;
    if (filterFeaturesCheckboxes.length) {
      filterFeaturesCheckboxes.forEach(function (checkbox) {
        if (!features.offer.features.includes(checkbox.value)) {
          filtered = false;
        }
      });
    }
    return filtered;
  };

})();

