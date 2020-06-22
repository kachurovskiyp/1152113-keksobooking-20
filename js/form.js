'use strict';

(function () {
  var addForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');

  window.form = {
    activeAll: function () {
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
    },

    undisabel: function () {
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled');
      }
      addForm.classList.remove('ad-form--disabled');
    },

    disable: function () {
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].setAttribute('disabled', 'disabled');
      }
      addForm.classList.add('ad-form--disabled');
    },

    setAddressValue: function () {
      var map = document.querySelector('.map');
      var pinMain = document.querySelector('.map__pin--main');
      var mainPinX = window.removePX(pinMain.style.top);
      var mainPinY = window.removePX(pinMain.style.left);
      var mainPinHeight = window.removePX(window.getComputedStyle(pinMain).height);
      var mainPinWidth = window.removePX(window.getComputedStyle(pinMain).width);
      var addressInput = document.querySelector('#address');

      mainPinY = mainPinY - (mainPinWidth / 2);

      if (map.classList.contains('map--faded')) {
        mainPinX = mainPinX - (mainPinHeight / 2);
      } else {
        mainPinX = mainPinX + mainPinHeight;
      }

      addressInput.value = Math.floor(mainPinX) + ', ' + Math.floor(mainPinY);
    },

    validatePrice: function (price, type) {
      var priceInput = document.querySelector('#price');

      switch (type) {
        case 'flat':
          priceInput.setAttribute('min', 1000);
          break;

        case 'house':
          priceInput.setAttribute('min', 5000);
          break;

        case 'palace':
          priceInput.setAttribute('min', 10000);
          break;

        default : priceInput.setAttribute('min', 0);
      }

      if (price.value * 1 > 1000000) {
        priceInput.setCustomValidity('Цена слишком высока');
      } else {
        price.setCustomValidity('');
      }
    },

    validateRooms: function (roomNumberInput, capacityInput) {
      switch (roomNumberInput.value) {
        case '1':
          if (capacityInput.value !== '1') {
            roomNumberInput.setCustomValidity('Такое жилье доступно только для 1 гостя');
          } else {
            roomNumberInput.setCustomValidity('');
          }
          break;

        case '2':
          if (capacityInput.value !== '1' && capacityInput.value !== '2') {
            roomNumberInput.setCustomValidity('Такое жилье доступно только для 1 либо 2x гостей');
          } else {
            roomNumberInput.setCustomValidity('');
          }
          break;

        case '3':
          if (capacityInput.value === '0') {
            roomNumberInput.setCustomValidity('Такое жилье доступно только для гостей');
          } else {
            roomNumberInput.setCustomValidity('');
          }
          break;

        case '100':
          if (capacityInput.value !== '0') {
            roomNumberInput.setCustomValidity('Такое жилье не доступно для гостей');
          }
          break;

        default:
          roomNumberInput.setCustomValidity('');
      }
    },

    synchronizeTime: function (timeIn, timeOut, flag) {
      if (flag) {
        if (timeIn.value !== timeOut.value) {
          timeOut.value = timeIn.value;
        }
      } else {
        if (timeIn.value !== timeOut.value) {
          timeIn.value = timeOut.value;
        }
      }
    }
  };
})();
