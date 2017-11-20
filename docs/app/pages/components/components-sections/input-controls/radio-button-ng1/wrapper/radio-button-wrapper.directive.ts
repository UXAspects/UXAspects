angular.module('app').directive('uxdRadioButtonWrapper', () => {
    return {
        restrict: 'E',
        controller: 'RadioButtonCtrl as vm',
        template: require('./radio-button-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('RadioButtonCtrl', ['$scope', RadioButtonCtrl]);

function RadioButtonCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.radioModel = 100;

    vm.radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1
        },
        option4: 'Wrap-Text'
    };

    vm.disableRadio = false;
    vm.simplified = false;
}