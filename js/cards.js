'use strict';
// Модуль отрисовки карточек
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var TOP_LIMITER_PIN = 130;
  var BOTTOM_LIMITER_PIN = 630;
  var MAP_WIDTH = 1200;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var inputList = document.querySelectorAll('input');
  var selectList = document.querySelectorAll('select');
  var formFilter = map.querySelector('.map__filters');

  formFilter.classList.add('map__filters--disabled');
  // Функция первого активирования страницы
  var onPinClick = function (evt) {
    evt.preventDefault();
    onMainPinActivated();
    map.appendChild(fragment);
    mainPin.removeEventListener('mousedown', onPinClick);
  };

  // функция активирования страницы
  var onMainPinActivated = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    formFilter.classList.remove('map__filters--disabled');
    window.util.toggleAvailabilityFields(inputList);
    window.util.toggleAvailabilityFields(selectList);
  };
  // проверка формы на активность
  window.util.toggleAvailabilityFields(inputList);
  window.util.toggleAvailabilityFields(selectList);

  mainPin.addEventListener('mousedown', onPinClick);
  // функция созданя сгенерированных JS объектов
  var createPinIformation = function (index) {
    var location = {
      x: window.util.getNumber(1, MAP_WIDTH - PIN_WIDTH),
      y: window.util.getNumber(TOP_LIMITER_PIN, BOTTOM_LIMITER_PIN)
    };

    var address = {
      x: location.x + PIN_WIDTH / 2,
      y: location.y + PIN_HEIGHT
    };
    return {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      address: address,
      location: location,
      offer: {
        type: window.util.getRandomElement(TYPES)
      }
    };
  };
  // функция отрисовки маркеров
  var renderPin = function (index) {
    var pin = pinTemplate.cloneNode(true);
    var pinIformation = createPinIformation(index);

    pin.style.left = pinIformation.location.x + 'px';
    pin.style.top = pinIformation.location.y + 'px';
    pin.querySelector('img').src = pinIformation.author.avatar;
    pin.querySelector('img').alt = 'заголовок объявления';

    return pin;
  };

  var fragment = document.createDocumentFragment();
  // цикл отрисовки случайных меток
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(renderPin(i));
  }
})();
