'use strict';

var randomInt = function (min, max) {
  var rand = min + Math.random() * (max - min + 1);
  return Math.floor(rand);
};

var getRandom = function (array, flag) {
  var maxNumber = array.length - 1;
  var loopStart = randomInt(1, maxNumber);

  switch (flag) {
    case 'list':
      var list = [];

      for (var j = loopStart; j < maxNumber; j++) {
        var random = randomInt(0, maxNumber);
        var isUnique = true;

        for (var i = 0; i < list.length; i++) {
          if (list[i] === array[random]) {
            isUnique = false;
            j++;
          }
        }

        if (isUnique) {
          list.push(array[random]);
        }
      }
      return list;

    case 'string':
      var str = '';

      for (var k = loopStart; k < maxNumber; k++) {
        var randomStr = randomInt(0, maxNumber);
        var isUniqueStr = true;


        if (str.indexOf(array[randomStr]) !== -1) {
          isUniqueStr = false;
          k++;
        }

        if (isUniqueStr) {
          str += array[randomStr] + ' ';
        }
      }

      return str;

    default:
      return null;
  }
};

var removePX = function (element) {
  return element.replace('px', '') * 1;
};

var getNearestAds = function (adsNumber) {
  var adsArray = [];
  var TITLES = ['Отель Демут', 'Nevsky sky', 'Александр Hotel', 'Гостевой дом «Пушкинский»', 'Мини-Отель Дом Романовых', 'Арт Деко Невский', 'Отель Гранд Каньон', 'Мини-отель на Шмидта'];
  var TIPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS_LIST = ['Отель «338 на Мира» расположен в Санкт-Петербурге', 'в 2,6 км от стадиона «Петровский»', 'К услугам гостей общий лаундж, гипоаллергенные номера', 'К услугам гостей этого 3-звездочного отеля общая кухня', 'В отеле имеются семейные номера', 'Все номера отеля оснащены письменным столом и телевизором с плоским экраном', 'В числе удобств номеров шкаф и чайник', 'Мы говорим на вашем языке!'];
  var FOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'https://i.pinimg.com/originals/56/a3/f7/56a3f730cd560be2a3ac4817fb5e3df1.jpg', 'https://www.gabinohome.com/slir/w300-h230-c300:230-q40-p1/assets/clients/c-377998/a-182118/773257_5edccbe58bdfb.jpg'];

  for (var i = 1; i <= adsNumber; i++) {
    var ad = {};

    ad.author = {
      avatar: 'img/avatars/user0' + i + '.png'
    };

    ad.location = {
      x: randomInt(0, 750),
      y: randomInt(130, 630)
    };

    ad.offer = {
      title: TITLES[i],
      address: '' + ad.location.x + ', ' + ad.location.y,
      price: randomInt(100, 1500),
      type: TIPES[randomInt(0, 3)],
      rooms: randomInt(1, 4),
      checkin: CHECK_TIMES[randomInt(0, 2)],
      checkout: CHECK_TIMES[randomInt(0, 2)],
      feature: getRandom(FEATURES_LIST, 'list'),
      description: getRandom(DESCRIPTIONS_LIST, 'string'),
      photos: getRandom(FOTOS, 'list')
    };
    ad.offer.guests = 2 * ad.offer.rooms;

    adsArray.push(ad);
  }
  return adsArray;
};

var renderPins = function (adsList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);

    pin.querySelector('img').src = adsList[i].author.avatar;
    pin.querySelector('img').alt = adsList[i].offer.title;
    pin.dataset.id = i;
    fragment.appendChild(pin);
  }
  return fragment;
};

var pinsRaplace = function () {
  var pinsRendered = document.querySelectorAll('.map__pin');
  for (var i = 0; i < pinsRendered.length - 1; i++) {
    if (!pinsRendered[i].classList.contains('map__pin--main')) {
      var pinHeight = removePX(window.getComputedStyle(pinsRendered[i]).height);
      var pinWidth = removePX(window.getComputedStyle(pinsRendered[i]).width);

      pinsRendered[i].style.left = ads[i].location.x - (pinWidth / 2) + 'px';
      pinsRendered[i].style.top = ads[i].location.y - pinHeight + 'px';
    }
  }
};

var undisabelForm = function () {
  var addForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }

  addForm.classList.remove('ad-form--disabled');
};

var ads = getNearestAds(8);

var activeAll = function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var pinElements = renderPins(ads);

  if (map.classList.contains('map--faded')) {
    map.classList.remove('map--faded');
  }

  mapPins.appendChild(pinElements);

  pinsRaplace();
  addEventForPin();
  undisabelForm();
};

var disableForm = function () {
  var addForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }

  addForm.classList.add('ad-form--disabled');
};

var setAddressValue = function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var mainPinX = removePX(pinMain.style.top);
  var mainPinY = removePX(pinMain.style.left);
  var mainPinHeight = removePX(window.getComputedStyle(pinMain).height);
  var mainPinWidth = removePX(window.getComputedStyle(pinMain).width);
  var addressInput = document.querySelector('#address');

  mainPinY = mainPinY - (mainPinWidth / 2);

  if (map.classList.contains('map--faded')) {
    mainPinX = mainPinX - (mainPinHeight / 2);
  } else {
    mainPinX = mainPinX + mainPinHeight;
  }

  addressInput.value = Math.floor(mainPinX) + ', ' + Math.floor(mainPinY);
};

var renderCard = function (cardId) {
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
  if (ads[cardId].offer.feature.length > 0) {
    while (popupFeaturesList.firstChild) {
      popupFeaturesList.removeChild(popupFeaturesList.firstChild);
    }

    var fragmentList = document.createDocumentFragment();

    for (var i = 0; i < ads[cardId].offer.feature.length; i++) {
      var listItem;
      listItem = document.createElement('li');
      listItem.classList.add('popup__feature');

      switch (ads[cardId].offer.feature[i]) {
        case 'wifi':
          listItem.classList.add('popup__feature--wifi');
          break;

        case 'dishwasher':
          listItem.classList.add('popup__feature--dishwasher');
          break;

        case 'parking':
          listItem.classList.add('popup__feature--parking');
          break;

        case 'washer':
          listItem.classList.add('popup__feature--washer');
          break;

        case 'elevator':
          listItem.classList.add('popup__feature--elevator');
          break;

        case 'conditioner':
          listItem.classList.add('popup__feature--conditioner');
          break;
      }

      fragmentList.appendChild(listItem);
    }

    popupFeaturesList.appendChild(fragmentList);
  } else {
    popupFeaturesList.remove();
  }

  card.content.querySelector('.popup__description').textContent = ads[cardId].offer.description;

  card = card.content.querySelector('article');
  map = document.querySelector('.map');
  map.insertBefore(card, document.querySelector('.map__filters-container'));

  var popupFotos = document.querySelector('.popup__photos');
  if (ads[cardId].offer.photos[0]) {
    popupFotos.querySelector('img').src = ads[cardId].offer.photos[0];

    if (ads[cardId].offer.photos.length !== 1) {
      var photosFragment = document.createDocumentFragment();
      for (var l = 1; l < ads[cardId].offer.photos.length; l++) {
        var img = popupFotos.querySelector('img').cloneNode(true);
        img.src = ads[cardId].offer.photos[l];
        photosFragment.appendChild(img);
      }
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
    var cardActive = document.querySelector('.map__card');
    cardActive.remove();
  });
};

var addEventForPin = function () {
  var pins = document.querySelectorAll('.map__pin');

  var setPinClickEvent = function (element, id) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      renderCard(id);
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
};

disableForm();
setAddressValue();

var pinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    if (map.classList.contains('map--faded')) {
      activeAll();
      setAddressValue();
    }
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    if (map.classList.contains('map--faded')) {
      activeAll();
      setAddressValue();
    }
  }
});

/* --- валидация спальных мест --- */

var validateRooms = function (roomNumberInput, capacityInput) {
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
};

var validatePrice = function (price, type) {
  switch (type) {
    case 'flat':
      if (price.value * 1 < 1000) {
        price.setCustomValidity('Минимальная стоимость квартир - 1000');
      }
      break;

    case 'house':
      if (price.value * 1 < 5000) {
        price.setCustomValidity('Минимальная стоимость домов - 5000');
      }
      break;

    case 'palace':
      if (price.value * 1 < 10000) {
        price.setCustomValidity('Минимальная стоимость домов - 10000');
      }
      break;

    default : price.setCustomValidity('');
  }

  if (price.value * 1 > 1000000) {
    priceInput.setCustomValidity('Цена слишком высока');
  } else {
    price.setCustomValidity('');
  }
};

var priceInput = document.querySelector('#price');
var typeInput = document.querySelector('#type');

priceInput.addEventListener('input', function () {
  validatePrice(priceInput, typeInput.value);
});
typeInput.addEventListener('change', function () {
  validatePrice(priceInput, typeInput.value);
});

var roomNumberInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');
validateRooms(roomNumberInput, capacityInput);

roomNumberInput.addEventListener('change', function () {
  validateRooms(roomNumberInput, capacityInput);
});
capacityInput.addEventListener('change', function () {
  validateRooms(roomNumberInput, capacityInput);
});


var synchronizeTime = function (timeIn, timeOut, flag) {
  if (flag) {
    if (timeIn.value !== timeOut.value) {
      timeOut.value = timeIn.value;
    }
  } else {
    if (timeIn.value !== timeOut.value) {
      timeIn.value = timeOut.value;
    }
  }
};

var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

timeInSelect.addEventListener('change', function () {
  synchronizeTime(timeInSelect, timeOutSelect, true);
});

timeOutSelect.addEventListener('change', function () {
  synchronizeTime(timeInSelect, timeOutSelect, false);
});
