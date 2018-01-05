DateTimePickerCtrl.$inject = ["$scope"];

import * as moment from 'moment-timezone';

export default function DateTimePickerCtrl($scope) { 
    var vm = this;

    vm.init = function () {
        //set values - with their specifed values or default values
        vm.minDate = $scope.minDate ? $scope.minDate : null;
        vm.maxDate = $scope.maxDate ? $scope.maxDate : null;
        vm.disabled = $scope.disabled ? $scope.disabled : false;
        vm.dateFormat = $scope.dateFormat ? $scope.dateFormat : 'yyyy-MM-dd';
        vm.maxDate = $scope.maxDate ? $scope.maxDate : null;
        vm.datePickerMode = $scope.datePickerMode ? $scope.datePickerMode : 'day';
        vm.isMeridian = $scope.isMeridian ? $scope.isMeridian : null;
        vm.showMeridian = $scope.showMeridian ? $scope.showMeridian : false;
        vm.chooseDate = $scope.chooseDate ? $scope.chooseDate : false;
        vm.chooseTime = $scope.chooseTime ? $scope.chooseTime : false;
        vm.chooseSeconds = $scope.chooseSeconds ? $scope.chooseSeconds : false;
        vm.chooseTimeZone = $scope.chooseTimeZone ? $scope.chooseTimeZone : false;
        vm.defaultDayTime = $scope.defaultDayTime;
        vm.timezones = $scope.timezones ? $scope.timezones : ["GMT", "IST", "EST", "CST", "WST"];
        vm.timezoneDefaultIndex = $scope.timezoneDefaultIndex ? $scope.timezoneDefaultIndex : 0;
    };

    $scope.$watch("ngModel.date", function (nv, ov) {
        if (nv !== ov && !$scope.editing) {
            vm.date = nv;
        }
    });

    $scope.$watch("dtpk.date", function (nv, ov) {
        if (nv !== ov && angular.isDefined(vm.date)) {
            if (!$scope.ngModel) $scope.ngModel = {};
            $scope.ngModel.date = vm.date;
            if (angular.isDate($scope.ngModel.date) && !angular.isDefined($scope.ngModel.time) && vm.defaultDayTime === "end") {
                $scope.ngModel.date = moment($scope.ngModel.date).endOf("day").toDate();
            }
        }
    });

    vm.goToday = function () {
        //set the value to todays date
        if (!$scope.ngModel) $scope.ngModel = {};
        $scope.ngModel.date = new Date();
    };

}