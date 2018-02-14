angular.module('app').directive('uxdFormValidationOnSubmitWrapper', () => {
    return {
        restrict: 'E',
        template: require('./form-validation-on-submit-wrapper.directive.html'),
    };
});