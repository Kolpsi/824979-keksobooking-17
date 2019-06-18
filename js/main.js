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

// map.appendChild(fragment);

var mainOpen = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var inputList = document.querySelectorAll('input');
var selectList = document.querySelectorAll('select');

mainOpen.addEventListener('click', function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  enabledElement(selectList);
  enabledElement(inputList);
});

var disabledElement = function (array) {
  for (var i = 0; i < array.length; i++){
   var arrayElem = array[i];
   arrayElem.disabled = true;
  };
};

var enabledElement = function (array) {
  for (var i = 0; i < array.length; i++){
   var arrayElem = array[i];
   arrayElem.disabled = false;
  };
}

disabledElement(inputList);
disabledElement(selectList);
console.log();
