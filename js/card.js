'use strict';

(function () {
  var Feature = {
    Name: {
      Wifi: 'wifi',
      Dishwasher: 'dishwasher',
      Parking: 'parking',
      Washer: 'washer',
      Elevator: 'elevator',
      Conditioner: 'conditioner'
    },
    Class: {
      Wifi: 'popup__feature--wifi',
      Dishwasher: 'popup__feature--dishwasher',
      Parking: 'popup__feature--parking',
      Washer: 'popup__feature--washer',
      Elevator: 'popup__feature--elevator',
      Conditioner: 'popup__feature--conditioner'
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
        case window.HouseType.Value.flat:
          card.content.querySelector('.popup__type').textContent = window.HouseType.Name.flat;
          break;

        case window.HouseType.Value.bungalo:
          card.content.querySelector('.popup__type').textContent = window.HouseType.Name.bungalo;
          break;

        case window.HouseType.Value.house:
          card.content.querySelector('.popup__type').textContent = window.HouseType.Name.house;
          break;

        case window.HouseType.Value.palace:
          card.content.querySelector('.popup__type').textContent = window.HouseType.Name.palace;
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
            case Feature.Name.Wifi:
              listItem.classList.add(Feature.Class.Wifi);
              break;

            case Feature.Name.Dishwasher:
              listItem.classList.add(Feature.Class.Dishwasher);
              break;

            case Feature.Name.Parking:
              listItem.classList.add(Feature.Class.Parking);
              break;

            case Feature.Name.Washer:
              listItem.classList.add(Feature.Class.Washer);
              break;

            case Feature.Name.Elevator:
              listItem.classList.add(Feature.Class.Elevator);
              break;

            case Feature.Name.Conditioner:
              listItem.classList.add(Feature.Class.Conditioner);
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

      if (ads[cardId].offer.photos.length > 1) {
        var photosFragment = document.createDocumentFragment();
        var img = popupFotos.querySelector('img');
        ads[cardId].offer.photos.forEach(function (photoSrc) {
          var newImg = img.cloneNode(true);
          newImg.src = photoSrc;
          photosFragment.appendChild(newImg);
        });
        popupFotos.removeChild(img);
        popupFotos.appendChild(photosFragment);

      } else if (ads[cardId].offer.photos.length === 1) {
        popupFotos.querySelector('img').src = ads[cardId].offer.photos[0];

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
