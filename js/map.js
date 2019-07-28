'use strict';
/**
* @description модуль взаимодействия с картой
*/
(function () {
  var ESC_KEYCODE = 27;
  var MAIN_PIN__STYLE_LEFT = 570;
  var MAIN_PIN_STYLE_TOP = 375;
  var main = document.querySelector('main');
  var map = main.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = main.querySelector('.ad-form');
  var inputList = document.querySelectorAll('input');
  var selectList = document.querySelectorAll('select');
  var formFilter = map.querySelector('.map__filters');
  var textAreaList = form.querySelectorAll('textarea');
  var buttonList = form.querySelectorAll('button');
  var cardSelector = map.querySelector('.map__card');
  var reset = form.querySelector('.ad-form__reset');
  var preview = form.querySelector('.ad-form-header__preview');
  var avatarImg = preview.querySelector('img');
  var photoPreview = form.querySelector('.ad-form__photo');
  var errorTempate = document.querySelector('#error')
    .content
    .querySelector('.error');

  /**
  * Добавление экрана ошибки и скрытие его
  */
  main.appendChild(errorTempate);
  errorTempate.classList.add('hidden');

  /**
  * Деактивирование страницы при клике на ресет
  */
  reset.addEventListener('click', function () {
    window.onMainDisabled();
  });

  /**
  * @description функция удаления фотографий жилья
  */
  var deletePhoto = function () {
    var photoImg = photoPreview.querySelectorAll('img');
    photoImg.forEach(function (it) {
      photoPreview.removeChild(it);
    });
  };
  /**
  * @description функция первого активирования страницы
  * @param {event} evt - событие
  */
  var onPinClick = function (evt) {
    evt.preventDefault();
    window.load(window.successHandler, window.errorHandler);
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
    window.util.toggleAvailabilityFields(textAreaList);
    window.util.toggleAvailabilityFields(buttonList);
  };

  /**
  * проверка формы на активность
  */
  window.util.toggleAvailabilityFields(inputList);
  window.util.toggleAvailabilityFields(selectList);
  window.util.toggleAvailabilityFields(textAreaList);
  window.util.toggleAvailabilityFields(buttonList);

  /**
  * событие первого активирвания страницы
  */
  mainPin.addEventListener('mousedown', onPinClick);

  /**
  * событие смены информации карточки по пину
  */
  map.addEventListener('click', function (evt) {
    onMainPinActive(evt);
    closeCard();
  });

  /**
  * @description функция проверки наличия активированных пинов
  */
  var checkPinActivated = function () {
    var pinActive = document.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  /**
  * @description функция активирования пина и показ информаци о карточке
  * @param {event} evt - событие нажатия
  */
  var onMainPinActive = function (evt) {
    var target = evt.target;
    while (target !== evt.currentTarget) {
      if (target.classList.contains('map__pin')) {
        if (target.matches('.map__pin--main')) {
          return;
        }
        checkPinActivated();
        target.classList.add('map__pin--active');
        window.filtered = window.getFilteredPins(window.data);
        var index = window.filtered[target.value];
        window.changeInformation(index);
        cardSelector.classList.remove('hidden');
      }
      target = target.parentNode;
    }
  };

  /**
  * @description функция закрытия карточки
  */
  var closeCard = function () {
    var close = cardSelector.querySelector('.popup__close');
    close.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  /**
  * @description функция скрытия карточки по нажатию на кнопку esc
  */
  var onCloseClick = function () {
    cardSelector.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    checkPinActivated();
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
  * @description функция скрытия ошибки по нажатию на кнопку esc
  * @param {event} evt - событие нажатия
  */
  var onEscCloseError = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      errorTempate.classList.add('hidden');
      document.removeEventListener('keydown', onEscCloseError);
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
  window.errorHandler = function () {
    errorTempate.classList.remove('hidden');
    document.addEventListener('keydown', onEscCloseError);
  };

  /**
  * @description функция возвращающая главный пин в неактивное состояние
  */
  var mainPinDisabled = function () {
    mainPin.style.left = MAIN_PIN__STYLE_LEFT + 'px';
    mainPin.style.top = MAIN_PIN_STYLE_TOP + 'px';
    window.setAddress(mainPin);
  };

  /**
  * @description функция возвращяющая страницу в неактивное состояние
  */
  window.onMainDisabled = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    formFilter.classList.add('map__filters--disabled');
    form.reset();
    window.util.toggleAvailabilityFields(inputList);
    window.util.toggleAvailabilityFields(selectList);
    window.util.toggleAvailabilityFields(textAreaList);
    window.util.toggleAvailabilityFields(buttonList);
    window.removePins();
    mainPinDisabled();
    mainPin.addEventListener('mousedown', onPinClick);
    avatarImg.src = '../keksob/img/muffin-grey.svg';
    deletePhoto();
    cardSelector.classList.add('hidden');
  };


  /**
  *  Повторный запрос данных с сервера при нажатие на кнопку
  */
  var closeError = document.querySelector('.error__button');
  closeError.addEventListener('click', function (evt) {
    evt.preventDefault();
    errorTempate.classList.add('hidden');
  });
})();
