'use strict';

var map = document.querySelector('.map');
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

map.classList.remove('map--faded');

var avatars = ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png',];
var types = ['palace', 'flat', 'house', 'bungalo'];

var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array[i];
}

var createNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var renderPin = function () {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = createNumber(1, 1200) - PIN_WIDTH / 2 + 'px';
  pin.style.top = createNumber(130, 630) - PIN_HEIGHT + 'px';
  pin.querySelector('.map__img').src = 'img/avatars/user' + shuffleArray(avatars);
  pin.querySelector('.map__img').alt = 'Заголовок';

   return pin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin());
};

map.appendChild(fragment);

console.log(fragment.appendChild(renderPin()));
