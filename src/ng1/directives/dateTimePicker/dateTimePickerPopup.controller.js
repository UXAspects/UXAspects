DateTimePickerPopupCtrl.$inject = ['$scope', '$parse', '$attrs'];

import * as moment from 'moment-timezone';

export default function DateTimePickerPopupCtrl($scope, $parse, $attrs) {
    var vm = this;

    var DisplayFormat12h = $attrs.displayFormat12hr || "ddd MMM DD, YYYY h:mm:ss A";
    var DisplayFormat24h = $attrs.displayFormat24hr || "ddd MMM DD, YYYY HH:mm:ss";

    var DateFormats = [
        "ddd MMM D, YYYY",
        "MMM D, YYYY",
        "M/D/YYYY",
        "M-D-YYYY",
        "YYYY-M-D"
    ];

    var TimeFormats = [
        "h A",
        "h:mm A",
        "h:mm:ss A",
        "H:mm",
        "H:mm:ss"
    ];

    var DateAndTimeFormats = [];
    for (var d = 0; d < DateFormats.length; d += 1) {
        for (var t = 0; t < TimeFormats.length; t += 1) {
            DateAndTimeFormats.push(DateFormats[d] + " " + TimeFormats[t]);
        }
    }

    vm.init = function (ngModelCtrl, ngModelAttr, element, timezones) {
        vm.ngModelCtrl = ngModelCtrl;

        vm.element = element;

        vm.ngModelAttr = ngModelAttr;
        vm.modelGetter = $parse(ngModelAttr);

        // Save the timezone
        storeTimezone();

        //get all the timezones for parsing
        vm.timezones = $parse(timezones)($scope);

        //create a custom render
        vm.ngModelCtrl.$render = renderFn;

        //add a parser
        vm.ngModelCtrl.$parsers.push(parse);

        vm.ngModelCtrl.$formatters.push(format);

        vm.ngModelCtrl.$validators.isFormatValid = isFormatValid;
        vm.ngModelCtrl.$validators.isAfterMin = isAfterMin;
        vm.ngModelCtrl.$validators.isBeforeMax = isBeforeMax;

        // Set the initial time on the date if it was specified.
        addTimeToDate(vm.modelGetter($scope));

        // watch for changes to the min and max date properties
        $scope.$watch(()=> $parse($attrs.minDate)($scope), vm.ngModelCtrl.$validate);
        $scope.$watch(()=> $parse($attrs.maxDate)($scope), vm.ngModelCtrl.$validate);
    };

    // Model value changed by the picker
    vm.onModelUpdate = function(nv) {
        if (!angular.isDefined(nv) || angular.equals(nv, {})) return;

        // If the time field has changed then insert it into the date for correct rendering
        if (angular.isString(nv.time)) {
            addTimeToDate(nv);
        }
        // If there's no time field then add it from the date field
        else if (angular.isDate(nv.date)) {
            nv.time = formatTime(nv.date);
        }

        storeTimezone();

        // Restore selected timezone if it was unset.
        nv.timezone = vm.currentTimezone;

        vm.reformat();

        vm.editing = false;

        vm.ngModelCtrl.$validate();
    };

    // Input was received
    vm.onEdit = function(value) {
        $scope.$apply(function() {
            vm.editing = (value !== format(vm.ngModelCtrl.$modelValue));
        });
    };

    vm.reformat = function() {
        var formatted = format(vm.ngModelCtrl.$modelValue);
        if (angular.isString(formatted)) {
            vm.ngModelCtrl.$setViewValue(formatted);
            vm.ngModelCtrl.$render();
        }
    };

    function renderFn() {
        vm.element.val(vm.ngModelCtrl.$viewValue);
    }

    function parse(value) {
        if (!angular.isString(value)) return undefined;

        // Substitute special tokens
        var dateString = value.trim()
            .replace(/today/i, moment().format("YYYY-MM-DD"))
            .replace(/yesterday/i, moment().subtract(1, "days").format("YYYY-MM-DD"))
            .replace(/tomorrow/i, moment().add(1, "days").format("YYYY-MM-DD"));

        // Look for date-only strings
        var date = moment(dateString, DateFormats, true);
        if (date.isValid()) {
            // Apply the appropriate default time
            if ($attrs.defaultDayTime === "end") {
                date.endOf("day");
            }
        } else {
            // Check time-only strings (date will be today by default)
            date = moment(dateString, TimeFormats, true);
            if (!date.isValid()) {
                // Lastly check full date+time formats
                date = moment(dateString, DateAndTimeFormats, true);
            }
        }

        var valid = $attrs.validator ? $parse($attrs.validator)($scope)() : date.isValid();

        if (!valid) {
            return {};
        }

        return {
            date: date.toDate(),
            time: formatTime(date),
            timezone: vm.currentTimezone
        };
    }

    function format(value) {
        if (isValidDate(value)) {
            return moment(value.date).format($parse($attrs.isMeridian)($scope) ? DisplayFormat12h : DisplayFormat24h);
        }
        return undefined;
    }

    // Check input is valid
    function isFormatValid(modelValue) {
        return isValidDate(modelValue) || isInputEmpty();
    }

    // Check date is after min-date (if specified)
    function isAfterMin(modelValue) {
        var minDate = $parse($attrs.minDate)($scope);
        if (isValidDate(modelValue) && angular.isDate(minDate) && !moment(modelValue.date).isAfter(minDate)) return false;
        return true;
    }

    // Check date is before max-date (if specified)
    function isBeforeMax(modelValue) {
        var maxDate = $parse($attrs.maxDate)($scope);
        if (isValidDate(modelValue) && angular.isDate(maxDate) && !moment(modelValue.date).isBefore(maxDate)) return false;
        return true;
    }

    function isInputEmpty() {
        return !angular.isString(vm.ngModelCtrl.$viewValue) || vm.ngModelCtrl.$viewValue.length === 0;
    }

    function isValidDate(modelValue) {
        return angular.isDefined(modelValue) && angular.isDefined(modelValue.date) && moment(modelValue.date).isValid();
    }

    // Update the date property with time value.
    function addTimeToDate(value) {
        if (angular.isString(value.time)) {
            var time = moment(value.time, TimeFormats);
            if (time.isValid()) {
                if (!isValidDate(value)) {
                    value.date = new Date();
                }
                value.date.setHours(time.hour());
                value.date.setMinutes(time.minute());
                value.date.setSeconds(time.second());
            }
        }
    }

    function formatTime(date) {
        var md = moment(date);
        var isMeridian = $parse($attrs.isMeridian)($scope);
        var chooseSeconds = $parse($attrs.chooseSeconds)($scope);
        var hours = isMeridian ? "hh" : "HH";
        var seconds = chooseSeconds ? ":ss" : "";
        var suffix = isMeridian ? ":A" : "";
        var formatString = hours + ":mm" + seconds + suffix;
        return md.format(formatString);
    }

    // Save the timezone from valid model values. The model will become undefined if an invalid input
    // is entered, so we have to restore the last good value afterwards. 
    function storeTimezone() {
        var model = vm.modelGetter($scope);
        if (model && angular.isDefined(model.timezone)) {
            vm.currentTimezone = model.timezone;
        }
    }
}