'use strict';

var randomInt = function (min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

var getRandom = function (array, flag) {
  var maxNumber = array.length - 1;
  switch (flag) {
    case 'list':
      var list = [];
      for (var j = randomInt(0, maxNumber); j < maxNumber; j++) {
        list.push(array[randomInt(0, maxNumber)]);
      }
      return list;

    case 'string':
      var str = '';
      for (var i = randomInt(0, maxNumber); i < maxNumber; i++) {
        str += array[randomInt(0, maxNumber)] + ' ';
      }
      return str;

    default:
      return null;
  }
};

var getNearestAds = function (adsNumber) {
  var adsArray = [];
  var TITLES = ['Отель Демут', 'Nevsky sky', 'Александр Hotel', 'Гостевой дом «Пушкинский»', 'Мини-Отель Дом Романовых', 'Арт Деко Невский', 'Отель Гранд Каньон', 'Мини-отель на Шмидта'];
  var TIPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS_LIST = ['Отель «338 на Мира» расположен в Санкт-Петербурге', 'в 2,6 км от стадиона «Петровский»', 'К услугам гостей общий лаундж, гипоаллергенные номера', 'К услугам гостей этого 3-звездочного отеля общая кухня', 'В отеле имеются семейные номера', 'Все номера отеля оснащены письменным столом и телевизором с плоским экраном', 'В числе удобств номеров шкаф и чайник', 'Мы говорим на вашем языке!'];
  var FOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var pin = pinTemplate.cloneNode(true);

    pin.querySelector('img').src = ads[i].author.avatar;
    pin.querySelector('img').alt = ads[i].offer.title;

    fragment.appendChild(pin);
  }
  return fragment;
};

var pinsRaplace = function (pins) {
  for (var i = 0; i < pins.length - 1; i++) {
    if (!pins[i].classList.contains('map__pin--main')) {
      var pinHeight = window.getComputedStyle(pins[i]).height;
      var pinWidth = window.getComputedStyle(pins[i]).width;

      pinWidth = pinWidth.replace('px', '') * 1;
      pinHeight = pinHeight.replace('px', '') * 1;

      pins[i].style.left = ads[i].location.x - (pinWidth / 2) + 'px';
      pins[i].style.top = ads[i].location.y - pinHeight + 'px';
    }
  }
};

var map = document.querySelector('.map');
if (map.classList.contains('map--taded')) {
  map.classList.remove('map--faded');
}

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var ads = getNearestAds(8);

var pinElements = renderPins(ads);

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(pinElements);

var pins = document.querySelectorAll('.map__pin');
pinsRaplace(pins);

