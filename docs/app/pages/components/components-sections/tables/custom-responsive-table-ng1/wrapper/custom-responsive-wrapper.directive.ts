angular.module('app').directive('uxdCustomResponsiveTableWrapper', () => {
    return {
        restrict: 'E',
        template: require('./custom-responsive-wrapper.directive.html'),
        controller: 'CustomResponsiveTableWrapperCtrl as vm'
    };
});

angular.module('app').controller('CustomResponsiveTableWrapperCtrl', CustomResponsiveTableWrapperCtrl);

function CustomResponsiveTableWrapperCtrl() {
    var vm = this;

    vm.items = ['Option 1', 'Option 2', 'Option 3', 'Options 4'];
    vm.options = { scroll: false };
    vm.selected = vm.items[0];
}