'use strict';

(function () {
  var housingInput = {
    type: document.querySelector('#housing-type'),
    price: document.querySelector('#housing-price'),
    rooms: document.querySelector('#housing-rooms'),
    guests: document.querySelector('#housing-guests'),
    features: document.querySelector('#housing-features')
  };

  var sortForm = document.querySelector('.map__filters');
  var selects = sortForm.querySelectorAll('select');
  var fieldsets = sortForm.querySelectorAll('fieldset');

  var setTypeSort = function () {
    window.card.remove();
    window.pin.render(window.pin.sort('type', housingInput.type.value));
  };

  window.sortForm = {
    undisable: function () {
      selects.forEach(function (selectItem) {
        selectItem.removeAttribute('disabled');
      });

      fieldsets.forEach(function (fieldsetItem) {
        fieldsetItem.removeAttribute('disabled');
      });

      housingInput.type.addEventListener('change', setTypeSort);
    },

    disable: function () {
      selects.forEach(function (selectItem) {
        selectItem.setAttribute('disabled', 'disabled');
      });

      fieldsets.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });

      housingInput.type.removeEventListener('change', setTypeSort);
    },

    reset: function () {
      sortForm.reset();
    }
  };
})();
