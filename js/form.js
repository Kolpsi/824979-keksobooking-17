'use strict';
/**
* @description модуль управления формой
*/
(function () {
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formAddress = document.querySelector('#address');
  var housingType = document.querySelector('#housing-type');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  roomNumber.addEventListener('change', function () {
    if ((roomNumber.value === '100') && (capacity.value === '0') || (roomNumber.value === '1') && (capacity.value === '1')) {
      return;
    } else {
      if ((roomNumber.value === '2') && (capacity.value === '1') || (roomNumber.value === '2') && (capacity.value === '2')) {
        return;
      } else {
        if ((roomNumber.value === '3') && (capacity.value === '1') || (roomNumber.value === '3') && (capacity.value === '2') || (roomNumber.value === '3') && (capacity.value === '3')) {
          return;
        } else {
          capacity.setCustomValidity('Неверное количество гостей');
        }
      }
    }
  });

  var priceTypes = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  /**
  * @description функция синхронизации времени в форме
  * @param {event} evt - событие клика
  */
  var onChangeTime = function (evt) {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };

  /**
  * @description функция смены минимальной цены за ночь
  */
  var onChangeType = function () {
    price.min = price.placeholder = priceTypes[type.value];
  };

  /**
  * @description функция получения адреса метки и передачи в input
  * @param {object} elem - элемент
  */
  window.setAddress = function (elem) {
    var coordX = Math.round(elem.offsetLeft + elem.clientWidth / 2);
    var coordY = Math.round(elem.offsetTop + elem.clientHeight);
    formAddress.value = coordX + ', ' + coordY;
  };

  onChangeType();
  type.addEventListener('change', onChangeType);
  timeIn.addEventListener('change', onChangeTime);
  timeOut.addEventListener('change', onChangeTime);
  housingType.addEventListener('change', function () {
    var filtered = window.getFilteredPins(window.data);
    window.drawPins(filtered);
  });
})();
