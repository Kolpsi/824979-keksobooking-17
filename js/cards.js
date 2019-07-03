'use strict';
/**
* @description модуль карточек
*/
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var title = cardTemplate.querySelector('.popup__title');
  var address = cardTemplate.querySelector('.popup__text--address');
  var price = cardTemplate.querySelector('.popup__text--price');
  var houseType = cardTemplate.querySelector('.popup__type');
  var guestAndRoom = cardTemplate.querySelector('.popup__text--capacity');
  var checkTime = cardTemplate.querySelector('.popup__text--time');
  var facilities = cardTemplate.querySelector('.popup__features');
  var description = cardTemplate.querySelector('.popup__description');
  var photo = cardTemplate.querySelector('.popup__photos');
  var img = photo.querySelector('.popup__photo');

  window.renderCard = function (cards) {
    var card = cardTemplate.cloneNode(true);

    title.textContent = cards.offer.title;
    address.textContent = cards.offer.address;
    price.textContent = cards.offer.price + '₽/ночь';
    houseType.textContent = changeName(cards.offer.type);
    guestAndRoom.textContent =  cards.offer.rooms + ' комнаты для ' + cards.offer.guests + ' гостей';
    checkTime.textContent = 'Заезд после ' + cards.offer.checkin + ', ' + 'выезд до ' + cards.offer.checkout;
    facilities.textContent = cards.offer.features;
    description.textContent = cards.offer.description;
    renderPhoto(cards.offer.photos);


    return card;
  };

  window.drawCard = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 1; i++) {
      fragment.appendChild(window.renderCard(cards[i]));
    }
    map.appendChild(fragment);
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
    var image = img.cloneNode(true);

      image.src = photos;

      return image
    };

    var renderPhoto = function (photos) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < photos.length; i++) {
        fragment.appendChild(getPhotoAdrress(photos[i]));
      }
      photo.appendChild(fragment);
    };

})();
