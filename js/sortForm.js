'use strict';

(function () {
  var sortForm = document.querySelector('.map__filters');
  var selects = sortForm.querySelectorAll('select');
  var fieldsets = sortForm.querySelectorAll('fieldset');

  var HousingInput = {
    Type: document.querySelector('#housing-type'),
    Price: document.querySelector('#housing-price'),
    Rooms: document.querySelector('#housing-rooms'),
    Guests: document.querySelector('#housing-guests'),
    Wifi: document.querySelector('#filter-wifi'),
    Dishwasher: document.querySelector('#filter-dishwasher'),
    Parking: document.querySelector('#filter-parking'),
    Washer: document.querySelector('#filter-washer'),
    Elevator: document.querySelector('#filter-elevator'),
    Conditioner: document.querySelector('#filter-conditioner')
  };

  var SetSort = window.debounce(function () {
    window.card.remove();
    window.pin.render(window.pin.sort());
  });

  window.sortForm = {
    undisable: function () {
      selects.forEach(function (selectItem) {
        selectItem.removeAttribute('disabled');
      });

      fieldsets.forEach(function (fieldsetItem) {
        fieldsetItem.removeAttribute('disabled');
      });

      Object.keys(HousingInput).forEach(function (item) {
        HousingInput[item].addEventListener('change', SetSort);
      });
    },

    disable: function () {
      selects.forEach(function (selectItem) {
        selectItem.setAttribute('disabled', 'disabled');
      });

      fieldsets.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });

      Object.keys(HousingInput).forEach(function (item) {
        HousingInput[item].removeEventListener('change', SetSort);
      });
    },

    reset: function () {
      sortForm.reset();
    }
  };
})();
