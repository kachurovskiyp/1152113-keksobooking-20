'use strict';

(function () {
  var FEATURE = {
    NAME: {
      WIFI: 'wifi',
      DISHWASHER: 'dishwasher',
      PARKING: 'parking',
      WASHER: 'washer',
      ELEVATOR: 'elevator',
      CONDITIONER: 'conditioner'
    },
    CLASS: {
      WIFI: 'popup__feature--wifi',
      DISHWASHER: 'popup__feature--dishwasher',
      PARKING: 'popup__feature--parking',
      WASHER: 'popup__feature--washer',
      ELEVATOR: 'popup__feature--elevator',
      CONDITIONER: 'popup__feature--conditioner'
    }
  };

  window.card = {
    remove: function () {
      var cardActive = document.querySelector('.map__card');
      if (cardActive) {
        cardActive.remove();
      }
    },

    render: function (cardId, ads) {
      var cardTemplate = document.querySelector('#card');
      var card = cardTemplate.cloneNode(true);

      card.content.querySelector('.popup__title').textContent = ads[cardId].offer.title;
      card.content.querySelector('.popup__text--address').textContent = ads[cardId].offer.address;
      card.content.querySelector('.popup__text--price').textContent = ads[cardId].offer.price + '₽/ночь';

      switch (ads[cardId].offer.type) {
        case 'flat':
          card.content.querySelector('.popup__type').textContent = 'Квартира';
          break;

        case 'bungalo':
          card.content.querySelector('.popup__type').textContent = 'Бунгало';
          break;

        case 'house':
          card.content.querySelector('.popup__type').textContent = 'Дом';
          break;

        case 'palace':
          card.content.querySelector('.popup__type').textContent = 'Дворец';
          break;
      }

      card.content.querySelector('.popup__text--capacity').textContent = ads[cardId].offer.rooms + ' комнаты для ' + ads[cardId].offer.guests + ' гостей';
      card.content.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[cardId].offer.checkin + ', выезд до ' + ads[cardId].offer.checkout;

      /* --- отрисовки списка удобств --- */

      var popupFeaturesList = card.content.querySelector('.popup__features');
      if (ads[cardId].offer.features.length > 0) {
        while (popupFeaturesList.firstChild) {
          popupFeaturesList.removeChild(popupFeaturesList.firstChild);
        }

        var fragmentList = document.createDocumentFragment();

        for (var i = 0; i < ads[cardId].offer.features.length; i++) {
          var listItem;
          listItem = document.createElement('li');
          listItem.classList.add('popup__feature');

          switch (ads[cardId].offer.features[i]) {
            case FEATURE.NAME.WIFI:
              listItem.classList.add(FEATURE.CLASS.WIFI);
              break;

            case FEATURE.NAME.DISHWASHER:
              listItem.classList.add(FEATURE.CLASS.DISHWASHER);
              break;

            case FEATURE.NAME.PARKING:
              listItem.classList.add(FEATURE.CLASS.PARKING);
              break;

            case FEATURE.NAME.WASHER:
              listItem.classList.add(FEATURE.CLASS.WASHER);
              break;

            case FEATURE.NAME.ELEVATOR:
              listItem.classList.add(FEATURE.CLASS.ELEVATOR);
              break;

            case FEATURE.NAME.CONDITIONER:
              listItem.classList.add(FEATURE.CLASS.CONDITIONER);
              break;
          }

          fragmentList.appendChild(listItem);
        }

        popupFeaturesList.appendChild(fragmentList);
      } else {
        popupFeaturesList.remove();
      }

      card.content.querySelector('.popup__description').textContent = ads[cardId].offer.description;

      var map = document.querySelector('.map');
      card = card.content.querySelector('article');
      map = document.querySelector('.map');
      map.insertBefore(card, document.querySelector('.map__filters-container'));

      var popupFotos = document.querySelector('.popup__photos');
      if (ads[cardId].offer.photos[0]) {
        popupFotos.querySelector('img').src = ads[cardId].offer.photos[0];

        if (ads[cardId].offer.photos.length !== 1) {
          var photosFragment = document.createDocumentFragment();

          ads[cardId].offer.photos.forEach(function (photoSrc) {
            var img = popupFotos.querySelector('img').cloneNode(true);
            img.src = photoSrc;
            photosFragment.appendChild(img);
          });

          popupFotos.appendChild(photosFragment);
        }
      } else {
        popupFotos.remove();
      }

      var popupAvatar = document.querySelector('.popup__avatar');
      popupAvatar.src = ads[cardId].author.avatar;

      var cardClose = document.querySelector('.popup__close');

      cardClose.addEventListener('click', function (closeEvt) {
        closeEvt.preventDefault();
        window.card.remove();
      });
    }
  };
})();
