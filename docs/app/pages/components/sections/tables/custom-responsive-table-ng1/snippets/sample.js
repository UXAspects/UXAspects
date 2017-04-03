angular.module('app').controller('CustomResponsiveTableCtrl', CustomResponsiveTableCtrl);

function CustomResponsiveTableCtrl() {
    var vm = this;

    vm.items = ['Option 1', 'Option 2', 'Option 3', 'Options 4'];
    vm.selected = vm.items[0];
}