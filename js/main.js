'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var PIN_X = PIN_WIDTH / 2;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

map.classList.remove('map--faded');

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

map.appendChild(fragment);


var type = document.querySelector('#type');
var price = document.querySelector('#price');

var getPriceNight = function () {
  if (type.value === 'bungalo') {
    price.min = 0;
    price.placeholder = 0;
  } if (type.value === 'flat') {
    price.min = 1000;
    price.placeholder = 1000;
  } if (type.value === 'palace') {
    price.min = 10000;
    price.placeholder = 10000;
  } if (type.value === 'house') {
    price.min = 5000;
    price.placeholder = 5000;
  }
};

type.addEventListener("click", getPriceNight);

console.log();
