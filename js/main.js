'use strict';

var map = document.querySelector('.map');
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var PIN_X = PIN_WIDTH / 2;
var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var avatars = [];

map.classList.remove('map--faded');

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
// функция выбора рандомного элемента
var getRandomElement = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

// функция поиска рандомного числа в промежутке min, max
var getNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
// функция создания номера аватара
var createrNumberAvatar = function (numberAvatars) {
  for (var i = 1; i < numberAvatars; i++) {
    avatars.push('img/avatars/user0' + i + '.png');
  }
};

createrNumberAvatar(9);
// функция созданя сгенерированных JS объектов
var createPinIformation = function () {
  return {
    author: {
      avatar: createrNumberAvatar()
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
var renderPin = function () {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = createPinIformation().location.x;
  pin.style.top = createPinIformation().location.y;
  pin.querySelector('img').src = avatars[i];
  pin.querySelector('img').alt = 'заголовок объявления';

  return pin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  createPinIformation();
  fragment.appendChild(renderPin());
}

map.appendChild(fragment);
