'use strict';

(function () {

  window.pin = {
    render: function (ads) {
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pin = pinTemplate.cloneNode(true);

        pin.querySelector('img').src = ads[i].author.avatar;
        pin.querySelector('img').alt = ads[i].offer.title;
        pin.dataset.id = i;
        fragment.appendChild(pin);
      }

      mapPins.appendChild(fragment);
      window.pin.replace(ads);
    },

    replace: function (ads) {
      var pinsRendered = document.querySelectorAll('.map__pin');
      for (var i = 0; i < pinsRendered.length - 1; i++) {
        if (!pinsRendered[i].classList.contains('map__pin--main')) {
          var pinHeight = window.removePX(window.getComputedStyle(pinsRendered[i]).height);
          var pinWidth = window.removePX(window.getComputedStyle(pinsRendered[i]).width);

          pinsRendered[i].style.left = ads[i].location.x - (pinWidth / 2) + 'px';
          pinsRendered[i].style.top = ads[i].location.y - pinHeight + 'px';
        }
      }
    },

    setMainEvent: function () {
      var pinMain = document.querySelector('.map__pin--main');
      var map = document.querySelector('.map');

      pinMain.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          if (map.classList.contains('map--faded')) {
            window.form.activeAll();
            window.form.setAddressValue();
          }
        }
      });

      pinMain.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        if (evt.button === 0) {
          if (map.classList.contains('map--faded')) {
            window.form.activeAll();
            window.form.setAddressValue();
          }
        }

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          var MIN_X = -10;
          var MAX_X = 1150;
          var MIN_Y = 70;
          var MAX_Y = 690;

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };
          if (pinMain.offsetTop - shift.y > MIN_Y && pinMain.offsetTop - shift.y < MAX_Y) {
            if (pinMain.offsetLeft - shift.x > MIN_X && pinMain.offsetLeft - shift.x < MAX_X) {
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
    },

    setEvent: function (ads) {
      var pins = document.querySelectorAll('.map__pin');
      var setPinClickEvent = function (element, id) {
        element.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.card.remove();
          window.card.render(id, ads);
        });
      };

      var setPinEscEvent = function (element) {
        element.addEventListener('keydown', function (evt) {
          if (evt.key === 'Escape') {
            var cardActive = document.querySelector('.map__card');
            cardActive.remove();
          }
        });
      };

      for (var i = 0; i < pins.length; i++) {
        if (!pins[i].classList.contains('map__pin--main')) {
          setPinClickEvent(pins[i], pins[i].dataset.id * 1);
          setPinEscEvent(pins[i]);
        }
      }
    }
  };
})();
