'use strict';
/**
* @description модуль карточек
*/
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');

  window.renderCard = function (cards) {
    var card = cardTemplate.cloneNode(true);
    map.appendChild(card);
    changeInformation(cards)
  };

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
    var filtered = cards[0];

    avatar.src = filtered.author.avatar;
    title.textContent = filtered.offer.title;
    address.textContent = filtered.offer.address;
    price.textContent = filtered.offer.price + '₽/ночь';
    houseType.textContent = changeName(filtered.offer.type);
    guestAndRoom.textContent = filtered.offer.rooms + ' комнаты для ' + filtered.offer.guests + ' гостей';
    checkTime.textContent = 'Заезд после ' + filtered.offer.checkin + ', ' + 'выезд до ' + filtered.offer.checkout;
    description.textContent = filtered.offer.description;
    renderPhoto(filtered.offer.photos);
    faciliti.forEach(function (it) {
      it.style = 'display: none';
    });
    showingFeatures(filtered.offer.features);
  };

  var showingFeatures = function (array) {
    for (var i = 0; i < array.length; i++) {
      var featureSelector = ('.popup__feature--' + array[i]);
      map.querySelector(featureSelector).style = 'display: inline-block';
    }
  };

  var changeName = function (value) {
    var typeName;
    if (value === 'flat') {
      typeName = 'Квартира';
    }
    if (value === 'bungalo') {
      typeName = 'Бунгало';
    }
    if (value === 'house') {
      typeName = 'Дом';
    }
    if (value === 'palace') {
      typeName = 'Дворец';
    }
    return typeName;
  };

  var getPhotoAdrress = function (photos) {
    var photo = map.querySelector('.popup__photo');
    var image = photo.cloneNode(true);

    image.src = photos;

    return image;
  };

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
