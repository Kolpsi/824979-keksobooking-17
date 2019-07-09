'use strict';
/**
* @description модуль взаимодействия с картой
*/
(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var inputList = document.querySelectorAll('input');
  var selectList = document.querySelectorAll('select');
  var formFilter = map.querySelector('.map__filters');
  var main = document.querySelector('main');
  var cardSelector = map.querySelector('.map__card');
  var errorTempate = document.querySelector('#error')
    .content
    .querySelector('.error');

  /**
  * Добавление экрана ошибки и скрытие его
  */
  main.appendChild(errorTempate);
  errorTempate.classList.add('hidden');

  /**
  * @description функция первого активирования страницы
  * @param {event} evt - событие
  */
  var onPinClick = function (evt) {
    evt.preventDefault();
    window.load(window.successHandler, errorHandler);
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
  * событие смены информации карточки по пину
  */
  map.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.value) {
      var index = window.filtered[target.value];
      window.changeInformation(index);
      cardSelector.classList.remove('hidden');
    } else {
      return;
    }
    var close = cardSelector.querySelector('.popup__close');
    close.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
  });

  /**
  * @description функция скрытия карточки по нажатию на кнопку закрыть
  */
  var onCloseClick = function () {
    cardSelector.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  /**
  * @description функция скрытия карточки по нажатию на кнопку esc
  * @param {event} evt - событие нажатия
  */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCloseClick(evt);
    }
  };

  /**
  * @description функция отрисовки пинов при успешном получении данных с сервера
  * @param {array} data - массив
  */
  window.successHandler = function (data) {
    window.data = data;
    window.filtered = window.getFilteredPins(data);
    window.drawPins(window.filtered);
  };

  /**
  * @description функция вывода сообщения об ошибки
  */
  var errorHandler = function () {
    errorTempate.classList.remove('hidden');
  };

  /**
  *  Повторный запрос данных с сервера при нажатие на кнопку
  */
  var closeError = document.querySelector('.error__button');
  closeError.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.load(window.successHandler, errorHandler);
    errorTempate.classList.add('hidden');
    window.successHandler();
  });
})();
