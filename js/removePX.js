'use strict';

(function () {
  window.removePX = function (element) {
    return element.replace('px', '') * 1;
  };
})();
