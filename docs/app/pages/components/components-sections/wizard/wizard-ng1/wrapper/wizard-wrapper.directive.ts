angular.module('app').directive('uxdWizardWrapper', () => {
    return {
        restrict: 'E',
        template: require('./wizard-wrapper.directive.html'),
        controller: 'WizardCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('WizardCtrl', ['$scope', WizardCtrl]);

function WizardCtrl($scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    vm.steps = [
        { title: 'First Step', content: 'Content of step 1.' },
        { title: 'Second Step', content: 'Content of step 2.' },
        { title: 'Third Step', content: 'Content of step 3.' },
        { title: 'Fourth Step', content: 'Content of step 4.' }
    ];

    vm.buttonOptions = {
        previousTooltip: 'Go to the previous step',
        nextTooltip: 'Go to the next step',
        cancelTooltip: 'Cancel the wizard',
        finishTooltip: 'Finish the wizard'
    };
}