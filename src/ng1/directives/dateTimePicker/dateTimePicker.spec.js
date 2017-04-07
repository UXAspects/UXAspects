import * as moment from 'moment-timezone';

describe('Integrated date picker', function() {
    var $compile, $rootScope, $scope, $timeout, $interval;
    var vm = {};
    var suite = {};

    beforeEach(module("ux-aspects.dateTimePicker"));
    beforeEach(module("ux-aspects.safeInterval"));


    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$interval_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $interval = _$interval_;
        $scope = $rootScope.$new();
    }));

    describe("dateTimePicker directive", function() {
        beforeEach(function() {

            vm = {};
            vm.dateObj = {
                date: new Date(),
                time: "11:21:PM",
                timezone: "GMT"
            };
            vm.ismeridian = true;
            vm.timezones = ["GMT", "IST", "EST", "CST", "WST"];
            vm.timezoneDefaultIndex = 0;
            vm.chooseTime = true;
            vm.chooseDate = true;
            vm.chooseTimezone = true;
            vm.datePickerOpen = false;
            vm.openIntegratedPicker = function($event) {
                //Additional code to be executed when clicked
                vm.datePickerOpen = true;
                $event.preventDefault();
                $event.stopPropagation();
            };
            var html = '<div class="row">\n' +
                '<div class="col-sm-5 col-xs-12">\n' +
                '<div class="input-group m-nil">\n' +
                '<span class="input-group-addon" ng-click="vm.openIntegratedPicker($event)" \n' +
                'aria-haspopup="true" type="button" tabindex="1">\n' +
                '<i class="hpe-icon hpe-calendar" aria-hidden="true"></i></span>\n' +
                '<input type="text" class="form-control" ng-model="vm.dateObj" date-time-picker-popup \n' +
                'ng-click="vm.openIntegratedPicker($event)" is-meridian = "vm.ismeridian" \n' +
                'timezones="vm.timezones" \n' +
                'timezone-default-index="vm.timezoneDefaultIndex" aria-label="Selected date" choose-time="vm.chooseTime" \n' +
                'choose-date="vm.chooseDate" choose-timezone="vm.chooseTimezone"\n' +
                'is-open="vm.datePickerOpen">\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>';

            var dateTimePickerHTML = '<date-time-picker ng-model="vm.dateObj" is-meridian = "vm.ismeridian" timezones="vm.timezones" timezone-default-index="vm.timezoneDefaultIndex" aria-label="Selected date" choose-time="vm.chooseTime" choose-date="vm.chooseDate" choose-timezone="vm.chooseTimezone"\n' +
                'is-open="vm.datePickerOpen"></date-time-picker>';
            $scope.vm = vm;

            //if (!suite.element) {

            suite.element = $compile(html)($scope);
            suite.dateTimeElement = $compile(dateTimePickerHTML)($scope);
            $scope.$digest();
            $timeout.flush();
            //   }
        });
        afterAll(function() {
            //destroy our new scope
            $scope.$destroy();

            //remove element
            suite.element.remove();
            suite = null;
        });

        it('Should set the default values in the input box', function() {
            var container = suite.element;
            var d = moment().format("ddd MMM DD, YYYY");

            $scope.$apply(function() {
                expect(container.find('input')[0].value).toBe(d + " 11:21:00 PM");
            });

        });
        
        it('Should update the time value when hour is updated', function() {
            var container = suite.dateTimeElement;

            var input = container.find('input')[0]; //hour input box
            var ngModelController = angular.element(input).controller('ngModel');

            ngModelController.$viewValue = "04"; // Update the '$viewValue'
            ngModelController.$commitViewValue(); //update $$lastCommittedViewValue
            ngModelController.$render();
            $scope.$apply();

            expect(vm.dateObj.time).toBe('04:21:PM');
        });

        it('Should update the time value when minute is updated', function() {
            var container = suite.dateTimeElement;

            var input = container.find('input')[1]; //minute input box
            var ngModelController = angular.element(input).controller('ngModel');

            //Also to check that zero will be prepended when it is single digit
            ngModelController.$viewValue = "4"; // Update the '$viewValue'
            ngModelController.$commitViewValue(); //update $$lastCommittedViewValue
            ngModelController.$render();
            $scope.$apply();

            expect(vm.dateObj.time).toBe('11:04:PM');
        });

        it('Should not update the time value when minute is updated to invalid number', function() {
            var container = suite.dateTimeElement;

            var input = container.find('input')[1]; //minute input box
            var ngModelController = angular.element(input).controller('ngModel');

            ngModelController.$viewValue = "66"; // Update the '$viewValue' to invalid minute
            ngModelController.$commitViewValue(); //update $$lastCommittedViewValue
            ngModelController.$render();
            $scope.$apply();
            //Should still retain the previous valid value, as the current input is invalid
            expect(vm.dateObj.time).toBe('11:21:PM');
        });

        it('Should update the timezone correctly', function() {
            //Click on the 3rd timezone in the dropdown and test the value
            var container = suite.dateTimeElement;
            var timezoneToSelect = container.find('.dropdown-menu').find('a')[2];
            var timezoneText = timezoneToSelect.text;

            angular.element(timezoneToSelect).trigger('click');

            //verify that the value is set as the text of selected timezone item
            expect(vm.dateObj.timezone).toBe(timezoneText);

        });

        it('Should set the invalid class on input when time is not valid', function() {
            var container = suite.dateTimeElement;

            var input = container.find('input')[0]; //hour input box
            var ngModelController = angular.element(input).controller('ngModel');

            ngModelController.$viewValue = "26"; // Update the '$viewValue' to invalid hour
            ngModelController.$commitViewValue(); //update $$lastCommittedViewValue
            ngModelController.$render();
            $scope.$apply();

            //check for the has-error class to be set
            expect(angular.element(container.find('input')[0]).parent().hasClass('has-error')).toBe(true);

        });

        it('Should toggle AM/PM when meridian button is clicked', function() {
            var container = suite.dateTimeElement;

            container.find('.meridian-btn').trigger('click');
            expect(vm.dateObj.time).toBe('11:21:AM');

            //Click again
            container.find('.meridian-btn').trigger('click');
            expect(vm.dateObj.time).toBe('11:21:PM');

        });

    });

});
