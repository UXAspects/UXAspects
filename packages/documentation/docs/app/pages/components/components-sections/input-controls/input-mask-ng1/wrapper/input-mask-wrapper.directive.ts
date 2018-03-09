angular.module('app').directive('uxdInputMaskWrapper', () => {
    return {
        restrict: 'E',
        controller: 'InputMaskCtrl as vm',
        template: require('./input-mask-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('InputMaskCtrl', ['$scope', InputMaskCtrl]);

function InputMaskCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.ISBNMask = '999-99-999-9999-9';
    vm.phoneMask = '(999) 999-9999';
    vm.currencyMask = '$ 999,999,999.99';
    vm.IPMask = '99[9].999.999.999';
}