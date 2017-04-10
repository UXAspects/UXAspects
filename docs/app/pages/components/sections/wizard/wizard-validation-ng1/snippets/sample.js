angular.module("app").controller("WizardValidationCtrl", ["$scope", WizardCtrl]);

function WizardCtrl($scope) {
    var vm = this;

    vm.text = "";
    vm.validate = validate;

    vm.buttonOptions = {
        previousTooltip: "Go to the previous step",
        nextTooltip: "Go to the next step",
        cancelTooltip: "Cancel the wizard",
        finishTooltip: "Finish the wizard"
    };

    function validate() {
        return $scope.requiredInput.requiredText.$valid;
    }
}