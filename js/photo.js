'use strict';

(function () {
  var PHOTO_TYPE = 'jpg';

  var photoElement = document.querySelector('.img-upload__preview img');
  var fileChooserElement = document.querySelector('#upload-file');

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var isPhoto = fileName.endsWith(PHOTO_TYPE);

    if (isPhoto) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
