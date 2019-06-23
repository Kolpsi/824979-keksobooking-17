'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var PIN_X = PIN_WIDTH / 2;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// map.classList.remove('map--faded');

// функция выбора рандомного элемента
var getRandomElement = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};
// функция поиска рандомного числа в промежутке min, max
var getNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
// функция созданя сгенерированных JS объектов
var createPinIformation = function (index) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    location: {
      x: getNumber(1, 1200) - PIN_X + 'px',
      y: getNumber(130, 630) - PIN_HEIGHT + 'px'
    },
    offer: {
      type: getRandomElement(TYPES)
    }
  };
};
// функция отрисовки маркеров
var renderPin = function (index) {
  var pin = pinTemplate.cloneNode(true);
  var pinIformation = createPinIformation(index);

  pin.style.left = pinIformation.location.x;
  pin.style.top = pinIformation.location.y;
  pin.querySelector('img').src = pinIformation.author.avatar;
  pin.querySelector('img').alt = 'заголовок объявления';

  return pin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(i));
}

// ЗАДАНИЕ №4
var mainPin = map.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var inputList = document.querySelectorAll('input');
var selectList = document.querySelectorAll('select');
var formFilter = map.querySelector('.map__filters');
var formAddress = document.querySelector('#address');

formFilter.classList.add('map__filters--disabled');
// Функция обработки события на клик по пину
var onPinClick = function (evt) {
  evt.preventDefault();
  onMainPinActivated();
  map.appendChild(fragment);
  mainPin.removeEventListener('click', onPinClick);
};

mainPin.addEventListener('click', onPinClick);

mainPin.addEventListener('mouseup', function () {
  setAddress(mainPin);
});
// функция активирования страницы
var onMainPinActivated = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  formFilter.classList.remove('map__filters--disabled');
  toggleAvailabilityFields(inputList);
  toggleAvailabilityFields(selectList);
};

// функция получения адреса главной метки
var setAddress = function (elem) {
  var coordX = Math.round(elem.offsetLeft + elem.clientWidth);
  var coordY = Math.round(elem.offsetTop + elem.clientHeight);
  formAddress.value = coordX + ', ' + coordY;
};

setAddress(mainPin);
// функция проверки неактивности формы
function isFormDisabled() {
  return map.classList.contains('map--faded');
}
// функция активированя и деактивирования элементов
var toggleAvailabilityFields = function (array) {
  for (i = 0; i < array.length; i++) {
    var arrayElem = array[i];
    if (isFormDisabled()) {
      arrayElem.disabled = true;
    } else {
      arrayElem.disabled = false;
    }
  }
};

toggleAvailabilityFields(inputList);
toggleAvailabilityFields(selectList);

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
var OnChangeTime = function () {
  timeIn.value = this.value;
  timeOut.value = this.value;
};
// функция смены минимальной цены за ночь
var onChangeType = function () {
  price.min = price.placeholder = priceTypes[type.value];
};

type.addEventListener('click', onChangeType);
timeIn.addEventListener('mouseup', OnChangeTime);
timeOut.addEventListener('mouseup', OnChangeTime);
