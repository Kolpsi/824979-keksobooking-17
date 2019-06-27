'use strict';
// модуль взаимодействия с картой
(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var inputList = document.querySelectorAll('input');
  var selectList = document.querySelectorAll('select');
  var formFilter = map.querySelector('.map__filters');
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
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
  // функция отрисовки случайных пинов
  var renderPin = function (index) {
    var pin = pinTemplate.cloneNode(true);
    var pinIformation = window.createPinIformation(index);

    pin.style.left = pinIformation.location.x + 'px';
    pin.style.top = pinIformation.location.y + 'px';
    pin.querySelector('img').src = pinIformation.author.avatar;
    pin.querySelector('img').alt = 'заголовок объявления';

    return pin;
  };

  // цикл отрисовки случайных пинов
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(renderPin(i));
  }
})();
