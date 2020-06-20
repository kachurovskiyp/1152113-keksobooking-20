'use strict';

(function () {
  var ads = window.getNearestAds(8);

  window.pin = {
    render: function () {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pin = pinTemplate.cloneNode(true);

        pin.querySelector('img').src = ads[i].author.avatar;
        pin.querySelector('img').alt = ads[i].offer.title;
        pin.dataset.id = i;
        fragment.appendChild(pin);
      }
      return fragment;
    },

    replace: function () {
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

    setEvent: function () {
      var pins = document.querySelectorAll('.map__pin');

      var setPinClickEvent = function (element, id) {
        element.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.renderCard(id, ads);
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
