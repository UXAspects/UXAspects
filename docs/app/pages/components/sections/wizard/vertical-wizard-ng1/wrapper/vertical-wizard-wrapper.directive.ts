angular.module('app').directive('uxdVerticalWizardWrapper', () => {
    return {
        restrict: 'E',
        template: require('./vertical-wizard-wrapper.directive.html'),
        controller: 'VerticalWizardCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('VerticalWizardCtrl', ['$scope', VerticalWizardCtrl]);

function VerticalWizardCtrl($scope: angular.IScope) {

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