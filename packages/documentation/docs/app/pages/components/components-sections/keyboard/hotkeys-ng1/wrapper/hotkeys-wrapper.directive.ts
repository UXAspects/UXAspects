angular.module('app').directive('uxdHotkeysWrapper', () => {
    return {
        restrict: 'E',
        template: require('./hotkeys-wrapper.directive.html'),
        controller: ['$scope', 'keyboardService', function ($scope, keyboardService) {
            var vm = this;

            vm.selected = 'None';
            vm.otherSelected = 'None';

            vm.callback1 = function () {
            };
            vm.callback2 = function (elem: any) {
                elem.trigger('click');
            };

            vm.button1 = function () {
                vm.selected = 'Active';
            };
            vm.button2 = function () {
                vm.selected = 'Inactive';
            };
            vm.button3 = function () {
                vm.selected = 'Lock';
            };
            vm.buttonA = function () {
                vm.otherSelected = 'Decelerate';
            };
            vm.buttonB = function () {
                vm.otherSelected = 'Drive';
            };
            vm.buttonC = function () {
                vm.otherSelected = 'Accelerate';
            };

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

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});
