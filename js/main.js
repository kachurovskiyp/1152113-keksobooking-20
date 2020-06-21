'use strict';

(function () {
  var activeAll = function () {
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    var pinElements = window.pin.render();

    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
    }

    mapPins.appendChild(pinElements);

    window.pin.replace();
    window.pin.setEvent();
    window.form.undisabel();
  };

  window.form.disable();
  window.form.setAddressValue();

  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (map.classList.contains('map--faded')) {
        activeAll();
        window.form.setAddressValue();
      }
    }
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (map.classList.contains('map--faded')) {
        activeAll();
        window.form.setAddressValue();
      }
    }
  });

  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');

  priceInput.addEventListener('input', function () {
    window.form.validatePrice(priceInput, typeInput.value);
  });
  typeInput.addEventListener('change', function () {
    window.form.validatePrice(priceInput, typeInput.value);
  });

  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');

  window.form.validateRooms(roomNumberInput, capacityInput);
  roomNumberInput.addEventListener('change', function () {
    window.form.validateRooms(roomNumberInput, capacityInput);
  });

  capacityInput.addEventListener('change', function () {
    window.form.validateRooms(roomNumberInput, capacityInput);
  });

  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  timeInSelect.addEventListener('change', function () {
    window.form.synchronizeTime(timeInSelect, timeOutSelect, true);
  });

  timeOutSelect.addEventListener('change', function () {
    window.form.synchronizeTime(timeInSelect, timeOutSelect, false);
  });
})();
