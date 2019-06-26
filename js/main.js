'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var TOP_LIMITER_PIN = 130;
var BOTTOM_LIMITER_PIN = 630;
var MAP_WIDTH = 1200;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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
  var location = {
    x: getNumber(1, MAP_WIDTH - PIN_WIDTH),
    y: getNumber(TOP_LIMITER_PIN, BOTTOM_LIMITER_PIN)
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
      type: getRandomElement(TYPES)
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
  mainPin.removeEventListener('mousedown', onPinClick);
};

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
  var coordX = Math.round(elem.offsetLeft + elem.clientWidth / 2);
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

// Задание №5
var mainMap = document.querySelector('.map__pins');

mainPin.addEventListener('mousedown', onPinClick);

mainPin.addEventListener('mousedown', function () {
  setAddress(mainPin);
  // функция перетаскивания маркера
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    // получение координат карты
    var fieldCoords = mainMap.getBoundingClientRect();

    var fieldInnerCoords = {
      top: fieldCoords.top + mainMap.clientTop,
      left: fieldCoords.left + mainMap.clientLeft
    };

    var pinCoords = {
      top: event.clientY - fieldInnerCoords.top - mainPin.clientHeight,
      left: event.clientX - fieldInnerCoords.left - mainPin.clientWidth
    };

    // вылезает за верхнюю границу - разместить по ней
    if (pinCoords.top < TOP_LIMITER_PIN) {
      pinCoords.top = TOP_LIMITER_PIN;
    }


    // вылезает за левую границу - разместить по ней
    if (pinCoords.left < mainMap.clientLeft) {
      pinCoords.left = mainMap.clientLeft;
    }


    // вылезает за правую границу - разместить по ней
    if (pinCoords.left + mainPin.clientWidth > mainMap.clientWidth) {
      pinCoords.left = mainMap.clientWidth - mainPin.clientWidt;
    }

    // вылезает за нижнюю границу - разместить по ней
    if (pinCoords.top + mainPin.clientHeight > mainMap.clientHeight) {
      pinCoords.top = BOTTOM_LIMITER_PIN;
    }

    mainPin.style.left = pinCoords.left + 'px';
    mainPin.style.top = pinCoords.top + 'px';
  };
  // отжатие кнопки мыши
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setAddress(mainPin);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
