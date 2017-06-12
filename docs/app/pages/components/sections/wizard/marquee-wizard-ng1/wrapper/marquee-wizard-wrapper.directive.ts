angular.module('app').directive('uxdMarqueeWizardWrapper', ['$templateCache', ($templateCache) => {
    return {
        restrict: 'E',
        template: require('./marquee-wizard-wrapper.directive.html'),
        controller: 'MarqueeModalCtrl as vm',
        scope: true
    };
}]);

angular.module('app').controller('MarqueeModalCtrl', ['$modal', '$scope', MarqueeModalCtrl]);

function MarqueeModalCtrl($modal: any, $scope: angular.IScope) {

    var mc = this;

    mc.$onDestroy = function() {
      $scope.$destroy();
    };

    mc.openModal = function () {

        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '../snippets/sample.html',
            controller: 'MarqueeModalInstanceCtrl',
            controllerAs: 'vm',
            keyboard: 'true',
            size: 'lg',
            windowClass: 'marquee-modal-window'
        });

        modalInstance.result.then(function () {
            // result passed into closed function;
        });
    };
}

angular.module('app').controller('MarqueeModalInstanceCtrl', MarqueeModalInstanceCtrl);

MarqueeModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];

function MarqueeModalInstanceCtrl($scope: any, $modalInstance: any) {
    var vm = this;

    let first = require('!file-loader?name=[path][name].[ext]!../snippets/first.html');
    let second = require('!file-loader?name=[path][name].[ext]!../snippets/second.html');
    let third = require('!file-loader?name=[path][name].[ext]!../snippets/third.html');
    let fourth = require('!file-loader?name=[path][name].[ext]!../snippets/fourth.html');
    let fifth = require('!file-loader?name=[path][name].[ext]!../snippets/fifth.html');
    let sixth = require('!file-loader?name=[path][name].[ext]!../snippets/sixth.html');

    vm.steps = [{
        title: 'First step',
        html: '<div><i class="hpe-icon hpe-soa"></i><p class="inline-title">First step</p></div>',
        header: 'Marquee wizard',
        hidden: false
    }, {
        title: 'Second step',
        html: '<div><i class="hpe-icon hpe-schedule-clone"></i><p class="inline-title">Second step</p></div>',
        header: 'Second step title',
        hidden: false
    }, {
        title: 'Third step',
        html: '<div><i class="hpe-icon hpe-sync"></i><p class="inline-title">Third step</p></div>',
        header: 'Third step title',
        hidden: false
    }, {
        title: 'Fourth step',
        html: '<div><i class="hpe-icon hpe-compliance"></i><p class="inline-title">Fourth step</p></div>',
        header: 'Second step title',
        hidden: true
    }, {
        title: 'Fifth step',
        html: '<div><i class="hpe-icon hpe-storage"></i><p class="inline-title">Fifth step</p></div>',
        header: 'Third step title',
        hidden: false
    }, {
        title: 'Sixth step',
        html: '<div><i class="hpe-icon hpe-scorecard"></i><p class="inline-title">Sixth step</p></div>',
        header: 'Fourth step title',
        hidden: false
    }];

    let templates = [first, second, third, fourth, fifth, sixth];

    vm.steps.map((step: any, idx: number) => {
        step['templateUrl'] = templates[idx];
        return step;
    });

    vm.buttonOptions = {
      previousTooltip: 'Previous Step',
      nextTooltip: 'Next Step',
      finishTooltip: 'Finish'
    };

    vm.isVisited = false;

    vm.onChanging = function(from: any, to: any) {
        console.log($scope.requiredInput.skipSteps);
        if (from === 2 && $scope.requiredInput.skipSteps) {
            return 5;
        }
    };

    // for performing validation when the finish button is pressed
    vm.onFinishing = function() {
        // sets the submitted value on the form to true
        $scope.requiredInput.$setSubmitted();

        // returns boolean value for validation check
        return $scope.requiredInput.requiredText.$valid;
    };

    vm.onFinished = function() {
        // do stuff here when finished

        // including dismissing the modal
        $modalInstance.dismiss('ok');
    };

    vm.onCanceled = function() {
        // do stuff here if user attempts to close modal

        // including dismissing the modal
        $modalInstance.dismiss('ok');
    };

}