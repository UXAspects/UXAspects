TmpkCtrl.$inject = ['$scope'];

export default function TmpkCtrl($scope) {
    var vm = this;

    vm.meridian = "AM";

    //get our reference to parent controller
    vm.dateTimePickerCtrl = $scope.dtpk; 
    vm.separator = ":";
    $scope.$watch('ngModel.time', function(nv) {

        if (vm.dateTimePickerCtrl.chooseTime === false) return;

        if (angular.isString(nv)) {
            var matches = nv.match(/(\d{1,2}):(\d{1,2}):?(\d{1,2})?:?(AM|PM)?/i);
            if (matches && matches.length === 5) {
                vm.hours = matches[1];
                vm.minutes = matches[2];
                vm.seconds = matches[3];
                if (matches[4]) vm.meridian = matches[4];
            }
        }
        else {
            vm.hours = undefined;
            vm.minutes = undefined;
            vm.seconds = undefined;
        }

        if ($scope.isMeridian === true && angular.isString(vm.meridian) && vm.meridian.length > 0) {
            $scope.showMeridian = true;
        } else {
            //Donot show AM/PM button if it is 24 hour clock
            $scope.showMeridian = false;
        }

    });
    $scope.$watch('ngModel.timezone', function(nv) {
        vm.timezone = nv;
    });

    function updateTime() {

        if(vm.dateTimePickerCtrl.chooseTime === false)return;
        
        //Only update if time is valid
        if (!($scope.invalidHours || $scope.invalidMinutes))
        {
            if (!$scope.ngModel) $scope.ngModel = {};

            $scope.ngModel.time = $scope.tmpk.hours + vm.separator + $scope.tmpk.minutes;

            if ($scope.chooseSeconds) {
                $scope.ngModel.time += vm.separator + $scope.tmpk.seconds;
            }
            if ($scope.isMeridian) {
                $scope.ngModel.time += vm.separator + $scope.tmpk.meridian;
            }
        }
        
    }

    function updateTimezone() {
        if (angular.isDefined($scope.tmpk.timezone)) {
            if (!$scope.ngModel) $scope.ngModel = {};
            $scope.ngModel.timezone = $scope.tmpk.timezone;
        }
    }

    //Function which validates hours and updates time
    function validateHours(nv) {

        if(vm.dateTimePickerCtrl.chooseTime === false)return;
        if (!angular.isDefined(nv)) return;

        var hours = 0;
        var minOneNum = false;
        for (var i = 0; i < nv.length; i++) {
            if (!isNaN(parseInt(nv[i]))) {
                hours *= 10;
                hours += parseInt(nv[i]);
                minOneNum = true;

            }
        }
        if (minOneNum === false) {
            $scope.invalidHours = true;
            return;
        }

        hours = hours.toString();

        //update vm.dateTimePickerCtrl.value.time here
        //If meridian format, then hours can range from 1-12, else 0-23
        if ($scope.isMeridian === true) {
            if (!(parseInt(hours) >= 1 && parseInt(hours) <= 12)) {
                $scope.invalidHours = true;
            } else $scope.invalidHours = false;
        } else {
            if (!(parseInt(hours) >= 0 && parseInt(hours) <= 23)) {
                $scope.invalidHours = true;
            } else $scope.invalidHours = false;
        }
        //If the input box has no string, mark as invalid
        if (hours.length < 1 || minOneNum === false) $scope.invalidHours = true;
        //If the input box has one digit, append zero before it
        else if (hours.length === 1) $scope.tmpk.hours = "0" + hours;

        if ($scope.invalidHours === false) {
            updateTime();
        }
    }
    //watch for changes in these values
    $scope.$watch('tmpk.hours', function(nv, ov) {
        if (nv !== ov) {

            validateHours(nv);

        }
    });

    //Function which validates minutes and updates time
    function validateMinutes(nv) {

        if(vm.dateTimePickerCtrl.chooseTime === false)return;
        if (!angular.isDefined(nv)) return;

        //update vm.dateTimePickerCtrl.value.time here
        var minutes = 0;
        var minOneNum = false;
        for (var i = 0; i < nv.length; i++) {
            if (!isNaN(parseInt(nv[i]))) {
                minutes *= 10;
                minutes += parseInt(nv[i]);
                minOneNum = true;

            }
        }
        if (minOneNum === false) {
            $scope.invalidMinutes = true;
            return;
        }

        minutes = minutes.toString();


        if (!(parseInt(minutes) >= 0 && parseInt(minutes) <= 59)) {
            $scope.invalidMinutes = true;
        } else
            $scope.invalidMinutes = false;
        //If the input box has no string, mark as invalid
        if (minutes.length < 1 || minOneNum === false) $scope.invalidMinutes = true;
        //If the input box has one digit, append zero before it
        else if (minutes.length === 1) $scope.tmpk.minutes = "0" + minutes;

        if ($scope.invalidMinutes === false) {
            updateTime();
        }
    }

    $scope.$watch('tmpk.minutes', function(nv, ov) {
        if (nv !== ov) {
            validateMinutes(nv);

        }
    });

    function validateSeconds(nv) {
        if (!vm.dateTimePickerCtrl.chooseTime || !vm.dateTimePickerCtrl.chooseSeconds) return;
        if (!angular.isDefined(nv)) return;
        $scope.invalidSeconds = (!angular.isString(nv) || nv.match(/^[0-5]?[0-9]$/) === null);
        if (!$scope.invalidSeconds) {
            // Zero padding
            $scope.tmpk.seconds = (nv.length < 2) ? "0" + nv : "" + nv;
            updateTime();
        }
    }

    $scope.$watch('tmpk.seconds', function(nv, ov) {
        if (nv !== ov) {
            validateSeconds(nv);
        }
    });

    $scope.$watch('tmpk.meridian', function(nv, ov) {
        if (nv !== ov) {
            //update vm.dateTimePickerCtrl.value.time here
            updateTime();
        }
    });

    //When isMeridian value changes, validate hours and minutes again
    $scope.$watch('isMeridian', function(nv, ov) {
        // Fix hours when switching between 24h and 12h
        if (ov === false && nv === true && $scope.tmpk.hours > 12) {
            $scope.tmpk.hours = (parseInt($scope.tmpk.hours, 10) - 12).toString();
        }
        else if (ov === true && nv === false && $scope.tmpk.meridian === "PM") {
            $scope.tmpk.hours = (parseInt($scope.tmpk.hours, 10) + 12).toString();
        }
        validateHours($scope.tmpk.hours);
        validateMinutes($scope.tmpk.minutes);
        validateSeconds($scope.tmpk.seconds);
    });

    $scope.$watch('tmpk.timezone', function(nv, ov) {
        if (nv !== ov) {
            //update vm.dateTimePickerCtrl.value.timezone here
            updateTimezone();
        }
    });

    vm.toggleMeridian = function() {
        //do the toggling here
        $scope.tmpk.meridian = $scope.tmpk.meridian === "AM" ? "PM" : "AM";
    };

    vm.selectTimezone = function(index) {
        //update the selected timezone here
        vm.timezone = vm.dateTimePickerCtrl.timezones[index];
    };
}
