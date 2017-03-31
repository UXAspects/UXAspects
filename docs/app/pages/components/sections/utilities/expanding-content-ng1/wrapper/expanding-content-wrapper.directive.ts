angular.module('app').directive('uxdExpandingContentWrapper', () => {
    return {
        restrict: 'E',
        template: require('./expanding-content-wrapper.directive.html'),
        controller: 'ExpandingContentCtrl as vm'
    };
});

angular.module('app').controller('ExpandingContentCtrl', ExpandingContentCtrl);

function ExpandingContentCtrl() {
    var vm = this;

    vm.expanded = false;
}