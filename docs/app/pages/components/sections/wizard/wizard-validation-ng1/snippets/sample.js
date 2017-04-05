angular.module("app").controller("WizardValidationCtrl", ["$scope", WizardCtrl]);

function WizardCtrl($scope) {
    var vm = this;

    vm.text = "";
    vm.validate = validate;

    function validate() {
        return $scope.requiredInput.requiredText.$valid;
    }
}