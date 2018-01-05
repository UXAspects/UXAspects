require('../../templates/ui-bootstrap/datepicker/popup.html'); 
require('../../templates/ui-bootstrap/datepicker/day.html');
require('../../templates/ui-bootstrap/datepicker/month.html');
require('../../templates/ui-bootstrap/datepicker/year.html');

export default function dateTimePicker() {
  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      isOpen: '=',
      minDate: '=?',
      maxDate: '=?',
      disabled: '=?',
      dateFormat: '=?',
      datePickerMode: '=?',
      isMeridian: '=?',
      showMeridian: '=?',
      chooseDate: '=?',
      chooseTime: '=?',
      chooseSeconds: '=?',
      chooseTimeZone: '=?',
      defaultDayTime: '@?',
      timezones: '=?',
      timezoneDefaultIndex: '=?',
      editing: '=?' // boolean value indicating that the model value is not yet finalised
    },
    controller: "DateTimePickerCtrl as dtpk",
    template: require('./dateTimePicker.html'),
    link: function (scope) {
      scope.dtpk.init(); 
    }
  };
}