angular.module('app').directive('uxdCheckboxWrapper', () => {
    return {
        restrict: 'E',
        controller: 'CheckboxDemoCtrl as vm',
        template: require('./checkbox-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('CheckboxDemoCtrl', ['$scope', CheckboxDemoCtrl]);

function CheckboxDemoCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.checkModel = {
        option1: true,
        option2: false,
        option3: false,
        option4: false
    };

    vm.simplified = false;
    vm.indeterminateValue = -1;
    vm.disableCheck = false;
}
