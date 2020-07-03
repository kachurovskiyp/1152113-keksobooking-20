'use strict';

(function () {
  var pinClass = {
    pin: '.map__pin',
    pinMain: '.map__pin--main'
  };
  var mapClass = {
    mapPins: '.map__pins',
    mapFaded: '.map--faded'
  };

  var addForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var fieldsets = document.querySelectorAll('fieldset');
  var resetButton = document.querySelector('.ad-form__reset');

  var resetButtonEvent = function (evt) {
    evt.preventDefault();
    window.form.reset();
  };

  var submitEvent = function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(addForm), function (status) {
      if (status === 200) {
        window.form.disableAll();
        window.form.message('success');
      } else {
        window.form.message('error');
      }
    });
  };

  window.form = {
    activeAll: function () {
      var mapPins = document.querySelector(mapClass.mapPins);
      var pinElements = window.pin.render();

      if (map.classList.contains(mapClass.mapFaded.slice(1))) {
        map.classList.remove(mapClass.mapFaded.slice(1));
      }

      mapPins.appendChild(pinElements);

      window.pin.replace();
      window.pin.setEvent();
      window.form.undisable();
    },

    disableAll: function () {
      if (!map.classList.contains(mapClass.mapFaded.slice(1))) {
        map.classList.add(mapClass.mapFaded.slice(1));
      }

      window.pin.remove();
      window.sortForm.reset();
      window.sortForm.disable();
      window.form.reset();
      window.form.disable();
    },

    undisable: function () {
      fieldsets.forEach(function (fieldsetItem) {
        fieldsetItem.removeAttribute('disabled');
      });
      addForm.classList.remove('ad-form--disabled');
      resetButton.addEventListener('click', resetButtonEvent);
      addForm.addEventListener('submit', submitEvent);
    },

    disable: function () {
      fieldsets.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });
      addForm.classList.add('ad-form--disabled');
      resetButton.removeEventListener('click', resetButtonEvent);
      addForm.removeEventListener('submit', submitEvent);
    },

    reset: function () {
      addForm.reset();
    },

    setAddressValue: function () {
      var addressInput = document.querySelector('#address');
      var pinMain = {
        element: document.querySelector(pinClass.pinMain)
      };

      pinMain = {
        x: window.removePX(pinMain.element.style.top),
        y: window.removePX(pinMain.element.style.left),
        height: window.removePX(window.getComputedStyle(pinMain.element).height),
        width: window.removePX(window.getComputedStyle(pinMain.element).width)
      };

      pinMain.y = pinMain.y - (pinMain.width / 2);

      if (map.classList.contains(mapClass.mapFaded.slice(1))) {
        pinMain.x = pinMain.x - (pinMain.height / 2);
      } else {
        pinMain.x = pinMain.x + pinMain.height;
      }

      addressInput.value = Math.floor(pinMain.x) + ', ' + Math.floor(pinMain.y);
    },

    validatePrice: function (price, type) {
      var residencePrice = {
        flat: 1000,
        house: 5000,
        palace: 10000,

        getMinPrice: function (priceType) {
          switch (priceType) {
            case 'flat':
              return this.flat;

            case 'house':
              return this.house;

            case 'palace':
              return this.palace;

            default : return 0;
          }
        }
      };
      var priceInput = document.querySelector('#price');
      priceInput.setAttribute('min', residencePrice.getMinPrice(type));

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
    },

    message: function (flag) {
      var template = '';

      switch (flag) {
        case 'success':
          template = document.querySelector('#success');
          break;
        case 'error':
          template = document.querySelector('#error');
          break;
      }

      var message = template.cloneNode(true);
      addForm.appendChild(message.content);

      var messageRemove = function () {
        message.remove();
        document.removeEventListener('click', messageRemove);
        document.removeEventListener('keydown', messageRemoveEsc);
      };

      var messageRemoveEsc = function (evtEsc) {
        if (evtEsc.key === 'Escape') {
          message.remove();
          document.removeEventListener('click', messageRemove);
          document.removeEventListener('click', messageRemove);
        }
      };

      switch (flag) {
        case 'success':
          message = document.querySelector('.success');
          break;
        case 'error':
          message = document.querySelector('.error');
          break;
      }

      document.addEventListener('click', messageRemove);
      document.addEventListener('keydown', messageRemoveEsc);
    },
  };
})();
