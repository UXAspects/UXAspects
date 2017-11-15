angular.module('app').directive('uxdFormValidationOnSubmitWrapper', () => {
    return {
        restrict: 'E',
        template: require('./form-validation-on-submit-wrapper.directive.html'),
        controller: ['$timeout', $timeout => {
            $timeout(() => {
                angular.element('#form-submit').validate((evt: Event) => {
                    evt.preventDefault();
                });
            });
        }]
    };
});