'use strict';
/**
* @description модуль отрисовки пина
*/
(function () {
  var TOP_LIMITER_PIN = 130;
  var BOTTOM_LIMITER_PIN = 630;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mainMap = document.querySelector('.map__pins');
  window.setAddress(mainPin);

  mainPin.addEventListener('mousedown', function () {

    /**
    * передача адреса в input
    */
    window.setAddress(mainPin);

    /**
    * @description функция перетаскиваня маркера
    * @param {number} moveEvt движение мышки
    */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      /**
      * получение координат карты
      */
      var fieldCoords = mainMap.getBoundingClientRect();

      var fieldInnerCoords = {
        top: fieldCoords.top + mainMap.clientTop,
        left: fieldCoords.left + mainMap.clientLeft
      };

      var pinCoords = {
        top: event.clientY - fieldInnerCoords.top - mainPin.clientHeight,
        left: event.clientX - fieldInnerCoords.left - mainPin.clientWidth
      };

      /**
      * вылезает за верхнюю границу - разместить по ней
      */
      if (pinCoords.top < TOP_LIMITER_PIN) {
        pinCoords.top = TOP_LIMITER_PIN;
      }

      /**
      * вылезает за левую границу - разместить по ней
      */
      if (pinCoords.left < mainMap.clientLeft) {
        pinCoords.left = mainMap.clientLeft;
      }

      /**
      * вылезает за правую границу - разместить по ней
      */
      if (pinCoords.left + mainPin.clientWidth > mainMap.clientWidth) {
        pinCoords.left = mainMap.clientWidth - mainPin.clientWidt;
      }

      /**
      * вылезает за нижнюю границу - разместить по ней
      */
      if (pinCoords.top + mainPin.clientHeight > mainMap.clientHeight) {
        pinCoords.top = BOTTOM_LIMITER_PIN;
      }

      mainPin.style.left = pinCoords.left + 'px';
      mainPin.style.top = pinCoords.top + 'px';
    };

    /**
    * @description отжатие кнопки мыши
    * @param {string} upEvt - событие отжатия кнопки мыши
    */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.setAddress(mainPin);
      /**
      * снятие обработчиков события
      */
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
