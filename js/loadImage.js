'use strict';

(function () {
  window.readImage = function (fileChooser, preview, placeFoto) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    var previewAccess = preview;

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (!previewAccess) {
        preview = document.createElement('img');
        placeFoto.appendChild(preview);
      }

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
