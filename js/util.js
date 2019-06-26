'use strict';
// Утилиты
(function () {
  var map = document.querySelector('.map');
  window.util = {
    // функция проверки неактивности формы
    isFormDisabled: function () {
      return map.classList.contains('map--faded');
    },
    // функция активирования и деактивирования элементов
    toggleAvailabilityFields: function (array) {
      for (var i = 0; i < array.length; i++) {
        var arrayElem = array[i];
        if (window.util.isFormDisabled()) {
          arrayElem.disabled = true;
        } else {
          arrayElem.disabled = false;
        }
      }
    },
    // функция поиска рандомного числа в промежутке min, max
    getNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // функция возврата рандомного элемента
    getRandomElement: function (array) {
      var index = Math.floor(Math.random() * array.length);
      return array[index];
    }
  };
})();
