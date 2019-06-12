'use strict';

var map = document.querySelector('.map');
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

map.classList.remove('map--faded');

var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
// var types = ['palace', 'flat', 'house', 'bungalo'];
// функция поиска рандомного числа в промежутке min, max
var createNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
// функция отрисовки маркеров
var renderPin = function () {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = createNumber(1, 1200) - PIN_WIDTH / 2 + 'px';
  pin.style.top = createNumber(130, 630) - PIN_HEIGHT + 'px';
  pin.querySelector('.map__img').src = 'img/avatars/user' + avatars[i] + '.png';
  pin.querySelector('.map__img').alt = 'заголовок объявления';

  return pin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin());
}

map.appendChild(fragment);
