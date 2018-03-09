angular.module("app").controller("FloatingActionButtonCtrl", FloatingActionButtonCtrl);

function FloatingActionButtonCtrl() {
    var vm = this;

    vm.selectFloatingActionButton = function () {};

    vm.itemsOne = [{
        icon: 'hpe-add',
        event: this.selectFloatingActionButton,
        tooltip: 'Add New Item'
    }, {
        icon: 'hpe-analytics',
        event: this.selectFloatingActionButton,
        tooltip: 'Show Analytics'
    }, {
        icon: 'hpe-app',
        event: this.selectFloatingActionButton,
        tooltip: 'Show Overview'
    }];

    vm.itemsTwo = [{
        icon: 'hpe-add',
        event: this.selectFloatingActionButton,
        tooltip: 'Add New Item',
        tooltipPlacement: 'right'
    }, {
        icon: 'hpe-analytics',
        event: this.selectFloatingActionButton,
        tooltip: 'Show Analytics',
        tooltipPlacement: 'right'
    }, {
        icon: 'hpe-app',
        event: this.selectFloatingActionButton,
        tooltip: 'Show Overview',
        tooltipPlacement: 'right'
    }];
}
