'use strict';
/**
* @description модуль взаимодействия с картой
*/
(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var inputList = document.querySelectorAll('input');
  var selectList = document.querySelectorAll('select');
  var formFilter = map.querySelector('.map__filters');
  var errorTempate = document.querySelector('#error')
    .content
    .querySelector('.error');

  /**
  * @description функция первого активирования страницы
  * @param {event} evt - событие
  */
  var onPinClick = function (evt) {
    evt.preventDefault();
    window.load(successHandler, errorHandler);
    onMainPinActivated();
    mainPin.removeEventListener('mousedown', onPinClick);
  };

  /**
  * @description функция активирования страницы
  */
  var onMainPinActivated = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    formFilter.classList.remove('map__filters--disabled');
    window.util.toggleAvailabilityFields(inputList);
    window.util.toggleAvailabilityFields(selectList);
  };

  /**
  * проверка формы на активность
  */
  window.util.toggleAvailabilityFields(inputList);
  window.util.toggleAvailabilityFields(selectList);

  /**
  * событие первого активирвания страницы
  */
  mainPin.addEventListener('mousedown', onPinClick);

  /**
  * @description функция отрисовки пинов при успешном получении данных с сервера
  * @param {array} markers - массив
  */
  var successHandler = function (markers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 8; i++) {
      fragment.appendChild(window.renderPin(markers[i]));
    }
    map.appendChild(fragment);
  };

  /**
  * @description функция вывода сообщения об ошибки
  */
  var errorHandler = function () {
    var main = document.querySelector('main');
    main.appendChild(errorTempate);

    var closeError = document.querySelector('.error__button');

    closeError.addEventListener('click', function (evt) {
      evt.preventDefault();
      main.removeChild(errorTempate);
    });
  };

})();
