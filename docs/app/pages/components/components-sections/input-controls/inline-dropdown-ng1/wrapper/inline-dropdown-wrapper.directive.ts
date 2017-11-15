angular.module('app').directive('uxdInlineDropdownWrapper', () => {
    return {
        restrict: 'E',
        controller: 'InlineDropDownCtrl as vm',
        template: require('./inline-dropdown-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('InlineDropDownCtrl', ['$scope', InlineDropDownCtrl]);

function InlineDropDownCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.inlineDropDownOpen = false;
    vm.inlineDropDownOptions = ['Every Day', 'Every Week', 'Every Hour', 'Every Month'];
    vm.inlineDefaultIndex = 2;

    vm.dropClick = function(index: any) {
        vm.inlineDefaultIndex = index;        
    };
}