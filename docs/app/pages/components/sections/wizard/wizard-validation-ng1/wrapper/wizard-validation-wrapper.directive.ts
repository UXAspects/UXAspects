angular.module('app').directive('uxdWizardValidationWrapper', () => {
    return {
        restrict: 'E',
        template: require('./wizard-validation-wrapper.directive.html'),
        controller: 'WizardValidationCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('WizardValidationCtrl', ['$scope', WizardValidationCtrl]);

function WizardValidationCtrl($scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    vm.text = '';
    vm.validate = validate;

    vm.buttonOptions = {
        previousTooltip: "Go to the previous step",
        nextTooltip: "Go to the next step",
        cancelTooltip: "Cancel the wizard",
        finishTooltip: "Finish the wizard"
    };

    function validate() {
        return $scope.vm.requiredInput.requiredText.$valid;
    }
}