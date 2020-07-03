'use strict';

(function () {
  var activeAll = function () {
    var map = document.querySelector('.map');

    var onLoad = function (data) {
      window.ads = data;
      window.pin.render(window.ads.slice(0, 5));
      window.pin.setEvent(window.ads.slice(0, 5));
      window.sortForm.undisable();
    };
    var onError = function (err) {
      var span = document.createElement(span);
      span.textContent = err;
      map.appendChild(span);
    };

    window.backend.load(onLoad, onError);

    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
    }
    window.form.undisable();

  };

  window.form.disable();
  window.form.setAddressValue();

  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (map.classList.contains('map--faded')) {
        activeAll();
        window.form.setAddressValue();
      }
    }
  });

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      if (map.classList.contains('map--faded')) {
        activeAll();
        window.form.setAddressValue();
      }
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var coord = {
        x: {
          min: -10,
          max: 1150
        },
        y: {
          min: 70,
          max: 690
        }
      };

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      if (pinMain.offsetTop - shift.y > coord.y.min && pinMain.offsetTop - shift.y < coord.y.max) {
        if (pinMain.offsetLeft - shift.x > coord.x.min && pinMain.offsetLeft - shift.x < coord.x.max) {
          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
          pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
          window.form.setAddressValue();
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
