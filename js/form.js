'use strict';
// Модуль управления формой
(function () {
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var priceTypes = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  // функция синхронизации времени
  var onChangeTime = function (evt) {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };
  // функция смены минимальной цены за ночь
  var onChangeType = function () {
    price.min = price.placeholder = priceTypes[type.value];
  };

  type.addEventListener('change', onChangeType);
  timeIn.addEventListener('change', onChangeTime);
  timeOut.addEventListener('change', onChangeTime);
})();
