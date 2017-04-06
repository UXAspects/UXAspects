angular.module('app').directive('uxdDateRangePickerWrapper', () => {
    return {
        restrict: 'E',
        controller: 'DateRangePickerCtrl as vm',
        template: require('./date-range-picker-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('DateRangePickerCtrl', DateRangePickerCtrl);

DateRangePickerCtrl.$inject = ['$scope'];

function DateRangePickerCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };
    
    // temp to suppress errors
    let moment = require('');

    vm.fromDate = {};
    vm.toDate = {};
    vm.ismeridian = true;
    vm.datePickerIcon = 'hpe-icon hpe-calendar';

    vm.openDateFromPicker = function ($event: any) {
        // Additional code to be executed when clicked
        vm.dateFromPickerOpen = true;
        $event.preventDefault();
        $event.stopPropagation();
    };
    vm.openDateToPicker = function ($event: any) {
        // Additional code to be executed when clicked
        vm.dateToPickerOpen = true;
        $event.preventDefault();
        $event.stopPropagation();
    };

    vm.timezones = [{
        display: 'GMT -08:00',
        offset: '-08:00'
    }, {
        display: 'GMT -07:00',
        offset: '-07:00'
    }, {
        display: 'GMT -06:00',
        offset: '-06:00'
    }, {
        display: 'GMT -05:00',
        offset: '-05:00'
    }, {
        display: 'GMT -04:00',
        offset: '-04:00'
    }, {
        display: 'GMT -03:00',
        offset: '-03:00'
    }, {
        display: 'GMT -02:00',
        offset: '-02:00'
    }, {
        display: 'GMT -01:00',
        offset: '-01:00'
    }, {
        display: 'GMT',
        offset: '+00:00'
    }, {
        display: 'GMT +01:00',
        offset: '+01:00'
    }, {
        display: 'GMT +02:00',
        offset: '+02:00'
    }];
    vm.selectedTimeZone = null;

    vm.timeZoneSelectOptions = {
        allowNull: false
    };

    initialiseTimeZone();

    $scope.$watch('vm.selectedTimeZone', function (nv, ov) {
        if (nv !== ov) {
            setTimeZoneOffset(nv);
        }
    });

    function initialiseTimeZone() {
        // Use moment.js to get the user's timezone offset in +00:00 format
        var localTimeZoneOffset = moment().tz(moment.tz.guess()).format('Z');
        setTimeZoneOffset(localTimeZoneOffset);
        var tz = null;
        for (var i = 0; i < vm.timezones.length; i += 1) {
            if (vm.timezones[i].offset === localTimeZoneOffset) {
                tz = vm.timezones[i];
                break;
            }
        }
        if (!tz) {
            // Add missing timezone to the list
            tz = {
                display: 'GMT ' + localTimeZoneOffset,
                offset: localTimeZoneOffset
            };
            vm.timezones.push(tz);
        }
        vm.selectedTimeZone = tz;
    }

    // Set timezone in both date objects
    function setTimeZoneOffset(tz: any) {
        if (angular.isString(tz.offset)) {
            if (!angular.isDefined(vm.fromDate)) {vm.fromDate = {};}
            vm.fromDate.timezone = tz.offset;
            if (!angular.isDefined(vm.toDate)) {vm.toDate = {};}
            vm.toDate.timezone = tz.offset;
        }
    }

    vm.getLocalDateTime = function (date: any, timezone: any) {
        if (!angular.isDefined(date) || !angular.isDefined(timezone)) {return 'Not Set';}
        return moment(date).utcOffset(timezone, true).format('ddd MMM DD, YYYY h:mm:ss A Z');
    };

    vm.getUniversalDateTime = function (date: any, timezone: any) {
        if (!angular.isDefined(date) || !angular.isDefined(timezone)) {return 'Not Set'};
        return moment(date).utcOffset(timezone, true).utc().format('ddd MMM DD, YYYY h:mm:ss A Z');
    };
}