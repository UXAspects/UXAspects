angular.module('app').directive('uxdFormValidationFieldByFieldWrapper', () => {
    return {
        restrict: 'E',
        template: require('./form-validation-field-by-field-wrapper.directive.html')
    };
});