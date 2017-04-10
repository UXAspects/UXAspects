angular.module('app').controller('KeyboardServiceDemoCtrl', KeyboardServiceDemoCtrl);

KeyboardServiceDemoCtrl.$inject = ['$scope', 'keyboardService'];

function KeyboardServiceDemoCtrl($scope, keyboardService) {
    var vm = this;

    vm.testKeyInput = '';
    vm.testKey = {};
    vm.testKeyBound = false;
    vm.testMessage = '';

    vm.toggleBind = function () {
        if (vm.testKeyBound) {
            keyboardService.unbindKey(vm.testKey);
            vm.testKeyBound = false;
        } else {
            var code = keyboardService.getCharCode(vm.testKeyInput);
            if (code === 0) { return; }

            vm.testKey.code = code;
            keyboardService.bindKey(vm.testKey, function () {
                $scope.$apply(function () {
                    vm.testMessage = 'Hotkey was pressed at ' + new Date().toLocaleTimeString();
                });
            });
            vm.testKeyBound = true;
        }
        vm.testMessage = '';
    };
}
