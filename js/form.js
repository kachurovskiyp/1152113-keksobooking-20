'use strict';

(function () {
  var Message = {
    Flag: {
      Succes: 'success',
      Error: 'error'
    },
    TemplateId: {
      Succes: '#success',
      Error: '#error'
    },
    Class: {
      Succes: '.success',
      Error: '.error'
    }
  };
  var pinClass = {
    pin: '.map__pin',
    pinMain: '.map__pin--main'
  };
  var mapClass = {
    mapPins: '.map__pins',
    mapFaded: '.map--faded'
  };
  var RoomValue = {
    One: '1',
    Two: '2',
    Three: '3',
    Hundred: '100'
  };
  var CapacityValue = {
    One: '1',
    Two: '2',
    Zero: '0'
  };
  var ResidencePrice = {
    Flat: 1000,
    House: 5000,
    Palace: 10000,
    MaxPrice: 1000000,

    getMinPrice: function (priceType) {
      switch (priceType) {
        case window.HouseType.Value.flat:
          return this.Flat;

        case window.HouseType.Value.house:
          return this.House;

        case window.HouseType.Value.palace:
          return this.Palace;

        default : return 0;
      }
    }
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
    window.backend(new FormData(addForm), function (status) {
      if (status === window.StatusCode.OK) {
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
      window.pin.replaceMain();
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
      var avatarPreview = document.querySelector('.ad-form-header__preview img');
      var fotoPreview = document.querySelector('.ad-form__photo');
      var foto = fotoPreview.querySelector('img');

      addForm.reset();
      avatarPreview.src = 'img/muffin-grey.svg';
      if (foto) {
        fotoPreview.removeChild(foto);
      }
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
      var priceInput = document.querySelector('#price');
      priceInput.setAttribute('min', ResidencePrice.getMinPrice(type));
      priceInput.placeholder = ResidencePrice.getMinPrice(type);

      if (+price.value > ResidencePrice.MaxPrice) {
        priceInput.setCustomValidity('Цена слишком высока');
      } else {
        price.setCustomValidity('');
      }
    },

    validateRooms: function (roomNumberInput, capacityInput) {
      switch (roomNumberInput.value) {
        case RoomValue.One:
          if (capacityInput.value !== CapacityValue.One) {
            roomNumberInput.setCustomValidity('Такое жилье доступно только для 1 гостя');
          } else {
            roomNumberInput.setCustomValidity('');
          }
          break;

        case RoomValue.Two:
          if (capacityInput.value !== CapacityValue.One && capacityInput.value !== CapacityValue.Two) {
            roomNumberInput.setCustomValidity('Такое жилье доступно только для 1 либо 2x гостей');
          } else {
            roomNumberInput.setCustomValidity('');
          }
          break;

        case RoomValue.Three:
          if (capacityInput.value === CapacityValue.Zero) {
            roomNumberInput.setCustomValidity('Такое жилье доступно только для гостей');
          } else {
            roomNumberInput.setCustomValidity('');
          }
          break;

        case RoomValue.Hundred:
          if (capacityInput.value !== CapacityValue.Zero) {
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
        case Message.Flag.Succes:
          template = document.querySelector(Message.TemplateId.Succes);
          break;
        case Message.Flag.Error:
          template = document.querySelector(Message.TemplateId.Error);
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
        case Message.Flag.Succes:
          message = document.querySelector(Message.Class.Succes);
          break;
        case Message.Flag.Error:
          message = document.querySelector(Message.Class.Error);
          break;
      }

      document.addEventListener('click', messageRemove);
      document.addEventListener('keydown', messageRemoveEsc);
    },
  };
})();
