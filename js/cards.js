'use strict';
/**
* @description модуль карточек
*/
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var TYPES_NAMES = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  palace: 'Дворец',
  house: 'Дом'
  };

  /**
    * @description функция отрисовки карточки
    * @param {array} cards - массив
    */
  window.renderCard = function (cards) {
    var card = cardTemplate.cloneNode(true);
    map.appendChild(card);
    changeInformation(cards);
  };

  /**
    * @description функция изменения информации в карточки
    * @param {array} cards - объект с информацией о карточке
    */
  var changeInformation = function (cards) {
    var title = map.querySelector('.popup__title');
    var address = map.querySelector('.popup__text--address');
    var price = map.querySelector('.popup__text--price');
    var houseType = map.querySelector('.popup__type');
    var guestAndRoom = map.querySelector('.popup__text--capacity');
    var checkTime = map.querySelector('.popup__text--time');
    var description = map.querySelector('.popup__description');
    var avatar = map.querySelector('.popup__avatar');
    var faciliti = Array.from(map.querySelectorAll('.popup__feature'));
    var filtered = cards[1];

    avatar.src = filtered.author.avatar;
    title.textContent = filtered.offer.title;
    address.textContent = filtered.offer.address;
    price.textContent = filtered.offer.price + '₽/ночь';
    houseType.textContent = changeName(filtered.offer.type);
    guestAndRoom.textContent = filtered.offer.rooms + ' комнаты для ' + filtered.offer.guests + ' гостей';
    checkTime.textContent = 'Заезд после ' + filtered.offer.checkin + ', ' + 'выезд до ' + filtered.offer.checkout;
    description.textContent = filtered.offer.description;
    renderPhoto(filtered.offer.photos);
    showingFeature(filtered.offer.features);
  };

  /** Удаление элемента из массива.
    * @param {string} value: значение, которое необходимо найти и удалить.
    * @return {array} массив без удаленного элемента; false в противном случае.
    */
  Array.prototype.remove = function (value) {
    var idx = this.indexOf(value);
    if (idx !== -1) {
      // Второй параметр - число элементов, которые необходимо удалить
      return this.splice(idx, 1);
    }
    return false;
  };

  /**
    * @description функция отображения удобств в карточке
    * @param {array} array - массив удобств в карточке
    */
  var showingFeature = function (array) {
    var filtered = ['popup__feature--wifi', 'popup__feature--dishwasher', 'popup__feature--parking',
      'popup__feature--washer', 'popup__feature--elevator', 'popup__feature--conditioner'];
    for (var i = 0; i < array.length; i++) {
      var featureSelector = ('popup__feature--' + array[i]);
      filtered.remove(featureSelector);
    }
    filtered.forEach(function (it) {
      map.querySelector('.' + it).style = 'display: none';
    });
  };
  /**
    * @description функция перевода объекта в читабельный вид
    * @param {object} type - объект
    * @return {string} typeName - тип жилья
    */
  var changeName = function (type) {
    return TYPES_NAMES[type];
  };

  /**
    * @description функция присваивания адреса изображению
    * @param {string} photos - ссылка на изображение
    * @return {object} image - возвращает изображение
    */
  var getPhotoAdrress = function (photos) {
    var photo = map.querySelector('.popup__photo');
    var image = photo.cloneNode(true);

    image.src = photos;

    return image;
  };

  /**
    * @description функция отрсовки изображения
    * @param {array} photos - массив ссылок на картинки
    */
  var renderPhoto = function (photos) {
    var photosBlock = map.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    var photo = map.querySelector('.popup__photo');

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(getPhotoAdrress(photos[i]));
    }

    photo.remove();
    photosBlock.appendChild(fragment);
  };
})();