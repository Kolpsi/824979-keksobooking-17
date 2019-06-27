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

  var priceTypes = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  /**
  * @description функция синхронизации времени в форме
  * @param {string} evt событие клика
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
  * @param {string} elem - элемент
  * return {string} координаты в поле адреса
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
})();
