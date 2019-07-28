'use strict';
/**
* @description модуль управления формой
*/
(function () {
  var ESC_KEYCODE = 27;
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formAddress = document.querySelector('#address');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var form = document.querySelector('.ad-form');
  var formFilter = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var cardSelector = map.querySelector('.map__card');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var main = document.querySelector('main');
  main.appendChild(successTemplate);

  var success = document.querySelector('.success');
  success.classList.add('hidden');

  var priceTypes = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  /**
  * @description функция проверки соответствия поля гостей и номеров
  */
  var validityRoom = function () {
    if ((roomNumber.value === '100') && (capacity.value === '0') || (roomNumber.value === '1') && (capacity.value === '1')) {
      capacity.setCustomValidity('');
    } else {
      if ((roomNumber.value === '2') && (capacity.value === '1') || (roomNumber.value === '2') && (capacity.value === '2')) {
        capacity.setCustomValidity('');
      } else {
        if ((roomNumber.value === '3') && (capacity.value === '1') || (roomNumber.value === '3') && (capacity.value === '2') || (roomNumber.value === '3') && (capacity.value === '3')) {
          capacity.setCustomValidity('');
        } else {
          capacity.setCustomValidity('Неверное количество гостей');
        }
      }
    }
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

  /**
  * @description функция действия при успешной отправки данных на сервер
  */
  var onSuccess = function () {
    success.classList.remove('hidden');
    success.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onPopupEscPress);
    window.onMainDisabled();
  };

  /**
  * @description функция скрывания окна успешной передачи данных
  */
  var onSuccessClick = function () {
    success.classList.add('hidden');
    main.removeEventListener('keydown', onPopupEscPress);
  };

  /**
  * @description функция скрывания окна успешной передачи данных по esc
  * @param {event} evt - событие клика на esc
  */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onSuccessClick();
    }
  };

  onChangeType();
  validityRoom();

  roomNumber.addEventListener('change', validityRoom);
  capacity.addEventListener('change', validityRoom);
  type.addEventListener('change', onChangeType);
  timeIn.addEventListener('change', onChangeTime);
  timeOut.addEventListener('change', onChangeTime);
  formFilter.addEventListener('change', function () {
    var filtered = window.getFilteredPins(window.data);
    cardSelector.classList.add('hidden');
    window.debounce(function () {
      window.drawPins(filtered);
    });
  });
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccess, window.errorHandler);
    evt.preventDefault();
  });
})();
