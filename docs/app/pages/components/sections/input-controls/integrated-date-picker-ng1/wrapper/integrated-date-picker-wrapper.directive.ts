angular.module('app').directive('uxdIntegratedDatePickerWrapper', () => {
    return {
        restrict: 'E',
        controller: 'IntegratedDatePickerCtrl as vm',
        template: require('./integrated-date-picker-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('IntegratedDatePickerCtrl', ['$scope', IntegratedDatePickerCtrl]);

function IntegratedDatePickerCtrl() {
    var vm = this;

    vm.dateObj = {
        date: new Date(),
        time: '11:21:PM',
        timezone: 'GMT'
    };
    vm.ismeridian = true;
    vm.timezones = ['GMT', 'IST', 'EST', 'CST', 'WST'];
    vm.timezoneDefaultIndex = 0;
    vm.chooseTime = true;
    vm.chooseDate = true;
    vm.chooseTimezone = true;
    vm.datePickerIcon = 'hpe-icon hpe-calendar';

    vm.openIntegratedPicker = function($event: any) {
        // Additional code to be executed when clicked
        vm.datePickerOpen = true;
        $event.preventDefault();
        $event.stopPropagation();
    };
}