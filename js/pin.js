'use strict';

(function () {

  window.pin = {
    render: function (ads) {
      window.pin.remove();
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      ads = ads.filter(function (item) {
        return !!item.offer;
      });

      ads = ads.slice(ads, 5);

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
      window.pin.setEvent(ads);
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

    sort: function () {
      var sortedAds = window.ads;

      var sortForm = document.querySelector('.map__filters');
      var formSelects = sortForm.querySelectorAll('select');

      var Feature = {
        Wifi: 'wifi',
        Dishwasher: 'dishwasher',
        Parking: 'parking',
        Washer: 'washer',
        Elevator: 'elevator',
        Conditioner: 'conditioner',
        Input: {
          Wifi: document.querySelector('#filter-wifi'),
          Dishwasher: document.querySelector('#filter-dishwasher'),
          Parking: document.querySelector('#filter-parking'),
          Washer: document.querySelector('#filter-washer'),
          Elevator: document.querySelector('#filter-elevator'),
          Conditioner: document.querySelector('#filter-conditioner')
        }
      };

      var PriceValue = {
        Name: {
          Low: 'low',
          Middle: 'middle',
          High: 'high'
        },
        middle: {
          min: 10000,
          max: 50000
        },
        low: 10000,
        high: 50000
      };

      var FilterParam = {
        TypeId: 'housing-type',
        PriceId: 'housing-price',
        RoomsId: 'housing-rooms',
        GuestsId: 'housing-guests',
        SortBy: {}
      };

      formSelects.forEach(function (item) {
        if (item.id === FilterParam.TypeId && item.value !== window.HouseType.Value.any) {
          FilterParam.SortBy[FilterParam.TypeId] = item.value;
        }
        if (item.id === FilterParam.PriceId && item.value !== window.HouseType.Value.any) {
          FilterParam.SortBy[FilterParam.PriceId] = item.value;
        }
        if (item.id === FilterParam.RoomsId && item.value !== window.HouseType.Value.any) {
          FilterParam.SortBy[FilterParam.RoomsId] = item.value;
        }
        if (item.id === FilterParam.GuestsId && item.value !== window.HouseType.Value.any) {
          FilterParam.SortBy[FilterParam.GuestsId] = item.value;
        }
        if (Feature.Input.Wifi.checked) {
          FilterParam.SortBy[Feature.Wifi] = true;
        }
        if (Feature.Input.Dishwasher.checked) {
          FilterParam.SortBy[Feature.Dishwasher] = true;
        }
        if (Feature.Input.Parking.checked) {
          FilterParam.SortBy[Feature.Parking] = true;
        }
        if (Feature.Input.Washer.checked) {
          FilterParam.SortBy[Feature.Washer] = true;
        }
        if (Feature.Input.Elevator.checked) {
          FilterParam.SortBy[Feature.Elevator] = true;
        }
        if (Feature.Input.Conditioner.checked) {
          FilterParam.SortBy[Feature.Conditioner] = true;
        }
      });

      Object.keys(FilterParam.SortBy).forEach(function (sortParam) {
        sortedAds = sortedAds.filter(function (item) {

          if (sortParam === FilterParam.PriceId) {
            switch (FilterParam.SortBy[sortParam]) {
              case PriceValue.Name.Low:
                return item.offer.price < PriceValue.low;
              case PriceValue.Name.Middle:
                return item.offer.price >= PriceValue.middle.min && item.offer.price <= PriceValue.middle.max;
              case PriceValue.Name.High:
                return item.offer.price > PriceValue.high;
            }
          }

          if (typeof FilterParam.SortBy[sortParam] === 'boolean') {
            return item.offer.features.indexOf(sortParam) !== -1;
          }

          switch (sortParam) {
            case FilterParam.TypeId:
              return item.offer.type === FilterParam.SortBy[sortParam];
            case FilterParam.RoomsId:
              return item.offer.rooms === +FilterParam.SortBy[sortParam];
            case FilterParam.GuestsId:
              return item.offer.guests === +FilterParam.SortBy[sortParam];
          }
          return false;
        });
      });
      return sortedAds;
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
          var Coords = {
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
          if (pinMain.offsetTop - shift.y > Coords.y.min && pinMain.offsetTop - shift.y < Coords.y.max) {
            if (pinMain.offsetLeft - shift.x > Coords.x.min && pinMain.offsetLeft - shift.x < Coords.x.max) {
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
    },

    remove: function () {
      var pins = document.querySelectorAll('.map__pin');
      pins.forEach(function (pin) {
        if (!pin.classList.contains('map__pin--main')) {
          pin.remove();
        }
      });
    }
  };
})();
