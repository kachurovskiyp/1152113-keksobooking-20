'use strict';

(function () {
  window.readImage = function (fileChooser, preview, placeFoto) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    if (preview === false) {
      preview = document.createElement('img');
      placeFoto.appendChild(preview);
    }

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };
})();
