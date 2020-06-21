'use strict';

(function () {
  var adsArray = [];
  var TITLES = ['Отель Демут', 'Nevsky sky', 'Александр Hotel', 'Гостевой дом «Пушкинский»', 'Мини-Отель Дом Романовых', 'Арт Деко Невский', 'Отель Гранд Каньон', 'Мини-отель на Шмидта'];
  var TIPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS_LIST = ['Отель «338 на Мира» расположен в Санкт-Петербурге', 'в 2,6 км от стадиона «Петровский»', 'К услугам гостей общий лаундж, гипоаллергенные номера', 'К услугам гостей этого 3-звездочного отеля общая кухня', 'В отеле имеются семейные номера', 'Все номера отеля оснащены письменным столом и телевизором с плоским экраном', 'В числе удобств номеров шкаф и чайник', 'Мы говорим на вашем языке!'];
  var FOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'https://i.pinimg.com/originals/56/a3/f7/56a3f730cd560be2a3ac4817fb5e3df1.jpg', 'https://www.gabinohome.com/slir/w300-h230-c300:230-q40-p1/assets/clients/c-377998/a-182118/773257_5edccbe58bdfb.jpg'];

  window.getNearestAds = function (adsNumber) {

    for (var i = 1; i <= adsNumber; i++) {
      var ad = {};

      ad.author = {
        avatar: 'img/avatars/user0' + i + '.png'
      };

      ad.location = {
        x: window.random.getRandomInt(0, 750),
        y: window.random.getRandomInt(130, 630)
      };

      ad.offer = {
        title: TITLES[i],
        address: '' + ad.location.x + ', ' + ad.location.y,
        price: window.random.getRandomInt(100, 1500),
        type: TIPES[window.random.getRandomInt(0, 3)],
        rooms: window.random.getRandomInt(1, 4),
        checkin: CHECK_TIMES[window.random.getRandomInt(0, 2)],
        checkout: CHECK_TIMES[window.random.getRandomInt(0, 2)],
        feature: window.random.getRandomElement(FEATURES_LIST, 'list'),
        description: window.random.getRandomElement(DESCRIPTIONS_LIST, 'string'),
        photos: window.random.getRandomElement(FOTOS, 'list')
      };
      ad.offer.guests = 2 * ad.offer.rooms;

      adsArray.push(ad);
    }
    return adsArray;
  };
})();
