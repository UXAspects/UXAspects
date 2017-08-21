dateTimePickerPopup.$inject =  ['$compile', '$document', '$parse'];

export default function dateTimePickerPopup($compile, $document, $parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        controller: 'DateTimePickerPopupCtrl as dtpp',
        scope: true,
        link: function (scope, element, attrs, ngModel) {

            //pass the ngModel to the controller
            scope.dtpp.init(ngModel, attrs.ngModel, element, attrs.timezones);

            // Notify controller of ngModel updates
            scope.$watch(attrs.ngModel, function (nv, ov) {
                if (!angular.equals(nv, ov)) {
                    scope.dtpp.onModelUpdate(nv, ov);
                }
            }, true);

            element.keyup(function () {
                scope.dtpp.onEdit(element.val());
            });

            //this class should act as a wrapper for the date time picker to show it in a popover
            var popoverTemplate = angular.element('<date-time-picker></date-time-picker>');

            var popoverOpen = false;

            //add model to popover
            popoverTemplate.attr({
                'ng-model': attrs.ngModel,
                'is-open': attrs.isOpen,
                'min-date': attrs.minDate,
                'max-date': attrs.maxDate,
                'disabled': attrs.disabled,
                'date-format': attrs.dateFormat,
                'date-picker-mode': attrs.datePickerMode,
                'is-meridian': attrs.isMeridian,
                'choose-date': attrs.chooseDate,
                'choose-time': attrs.chooseTime,
                'choose-seconds': attrs.chooseSeconds,
                'choose-time-zone': attrs.chooseTimezone,
                'default-day-time': attrs.defaultDayTime,
                'timezones': attrs.timezones,
                'timezoneDefaultIndex': attrs.timezoneDefaultIndex,
                'editing': 'dtpp.editing || !dtpp.ngModelCtrl.$valid || !dtpp.ngModelCtrl.$viewValue',
                'validator': attrs.validator,
                'custom-class': attrs.customClass
            });

            //compile the element before adding it to the popover
            var compiledTemplate = $compile(popoverTemplate)(scope);

            //add popover
            element.popover({
                template: '<div class="popover date-picker-popover" role="tooltip"><div class="date-picker-popover-arrow arrow"></div><div class="popover-content"></div></div>',
                content: compiledTemplate,
                trigger: 'manual',
                placement: attrs.placement ? $parse(attrs.placement)(scope) : 'bottom',
                html: true
            });
            //attributes to watch
            var attrsToWatch = ['chooseDate', 'chooseTime', 'chooseSeconds', 'chooseTimezone', 'isMeridian'];
            var openPopover = true;

            function validatePopoverOpen() {

                if ($parse(attrs.chooseDate)(scope) || $parse(attrs.chooseTime)(scope) || $parse(attrs.chooseTimezone)(scope)) {
                    openPopover = true;
                    element.removeAttr('disabled');
                } else {
                    openPopover = false;
                    element.attr('disabled', 'disabled');
                    element.popover("hide");
                    popoverOpen = false;
                    $parse(attrs.isOpen).assign(scope, false);
                }
            }
            angular.forEach(attrsToWatch, function (key) {
                if (attrs[key]) {
                    scope.$watch($parse(attrs[key]), function (nv, ov) {

                        validatePopoverOpen();
                        //update view when the attribute value changes
                        if (nv !== ov) {
                            scope.dtpp.reformat();
                        }
                    });
                }
            });
            scope.$watch($parse(attrs.isOpen), function (newValue) {
                if (newValue === true) {
                    if (!popoverOpen && openPopover) {
                        element.popover('show');
                        popoverOpen = true;
                    }
                } else {
                    element.popover('hide');
                    popoverOpen = false;
                }
            });

            element.on("keypress", function (event) {
                if (event.which === 13) {
                    element.blur();
                    scope.$apply(function () {
                        $parse(attrs.isOpen).assign(scope, false);
                    });
                    event.preventDefault();
                }
            });

            var documentClickBind = function (event) {
                //Return if clicked on any of the input group components
                if (isPickerClicked(event.target)) return;

                var e = angular.element(event.target);
                //clicked outside datepicker
                if (angular.element('body').has(event.target) && e.hasClass('popover') === false && e.parents('.popover').length === 0) {
                    element.popover("hide");
                    popoverOpen = false;
                    scope.$apply(function () {
                        $parse(attrs.isOpen).assign(scope, false);
                    });
                }
            };

            function isPickerClicked(targetElement) {
                return (targetElement === element.get(0) || element.parents('.input-group').has(targetElement).length > 0);
            }

            $document.bind('mousedown', documentClickBind);

            scope.$on('$destroy', function () {
                $document.unbind('mousedown', documentClickBind);
            });

        }
    };
}