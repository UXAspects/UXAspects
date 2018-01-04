angular.module('app').controller('SplitterDemoCtrl', SplitterDemoCtrl);

function SplitterDemoCtrl() {
    var vm = this;

    vm.dragStart = function () {
        //this will be called when the user begins to drag
    };

    vm.drag = function () {
        //this will be called when the moves the divider
    };

    vm.dragEnd = function () {
        //this will be called when the user has finished dragging
    };
}