'use strict';

(function () {

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

      default: return null;
    }
  };

  window.random = {
    getRandomInt: function (min, max) {
      return randomInt(min, max);
    },

    getRandomElement: function (array, flag) {
      return getRandom(array, flag);
    }
  };
})();
