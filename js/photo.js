'use strict';
/**
* @description модуль загрузки изображений
*/
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_WIDTH = 70;
  var PHOTO_HEIGHT = 70;

  var avatar = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview');
  var avatarImg = preview.querySelector('img');
  var photo = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');

  avatar.addEventListener('change', function () {
    var file = avatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photo.addEventListener('change', function () {
    var file = photo.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var elem = document.createElement('img');
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        elem.src = reader.result;
        elem.height = PHOTO_HEIGHT;
        elem.width = PHOTO_WIDTH;
        photoPreview.appendChild(elem);
      });

      reader.readAsDataURL(file);
    }
  });
})();
