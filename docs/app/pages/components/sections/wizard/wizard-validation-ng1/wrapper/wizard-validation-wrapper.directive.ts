angular.module('app').directive('uxdWizardValidationWrapper', () => {
    return {
        restrict: 'E',
        template: require('./wizard-validation-wrapper.directive.html'),
        controller: 'WizardValidationCtrl as vm'
    };
});

angular.module('app').controller('WizardValidationCtrl', ['$scope', WizardValidationCtrl]);

function WizardValidationCtrl($scope: any) {
    var vm = this;

    vm.text = '';
    vm.validate = validate;

    function validate() {
        return $scope.requiredInput.requiredText.$valid;
    }
}