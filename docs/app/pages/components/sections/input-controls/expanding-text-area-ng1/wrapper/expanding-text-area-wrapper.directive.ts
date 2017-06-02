angular.module('app').directive('uxdExpandingTextAreaWrapper', () => {
    return {
        restrict: 'E',
        controller: 'ExpandingTextAreaDemoCtrl as vm',
        template: require('./expanding-text-area-wrapper.directive.html')
    };
});

angular.module('app').controller('ExpandingTextAreaDemoCtrl', ExpandingTextAreaDemoCtrl);

ExpandingTextAreaDemoCtrl.$inject = ['$scope', '$element', '$timeout'];

function ExpandingTextAreaDemoCtrl($scope: angular.IScope, $element: HTMLElement, $timeout: ng.ITimeoutService) {
    
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    $timeout(function () {
        $element[0].children[0].setAttribute('placeholder', 'Enter text');
    });
    
}