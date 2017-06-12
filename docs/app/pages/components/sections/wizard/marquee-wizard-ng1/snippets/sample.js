angular.module("app").controller("MarqueeWizardModalCtrl", MarqueeWizardModalCtrl);

MarqueeWizardModalCtrl.$inject = ['$scope', '$modalInstance'];

function MarqueeWizardModalCtrl($scope, $modalInstance) {
    var vm = this;

    vm.steps = [{
        title: 'First step',
        html: '<div><i class="hpe-icon hpe-soa"></i><p class="inline-title">First step</p></div>',
        header: 'Marquee wizard',
        templateUrl: 'first.html'
    }, {
        title: 'Second step',
        html: '<div><i class="hpe-icon hpe-schedule-clone"></i><p class="inline-title">Second step</p></div>',
        header: 'Second step title',
        templateUrl: 'second.html'
    }, {
        title: 'Third step',
        html: '<div><i class="hpe-icon hpe-sync"></i><p class="inline-title">Third step</p></div>',
        header: 'Third step title',
        templateUrl: 'third.html'
    }, {
        title: 'Fourth step',
        html: '<div><i class="hpe-icon hpe-scorecard"></i><p class="inline-title">Fourth step</p></div>',
        header: 'Fourth step title',
        templateUrl: 'fourth.html'
    },{
        title: 'Fifth step',
        html: '<div><i class="hpe-icon hpe-storage"></i><p class="inline-title">Fifth step</p></div>',
        header: 'Fifth step title',
        templateUrl: 'fifth.html'
    }, {
        title: 'Sixth step',
        html: '<div><i class="hpe-icon hpe-scorecard"></i><p class="inline-title">Sixth step</p></div>',
        header: 'Sixth step title',
        templateUrl: 'sixth.html'
    }];

    vm.buttonOptions = {
      previousTooltip: 'Previous Step',
      nextTooltip: 'Next Step',
      finishTooltip: 'Finish'
    };

    vm.isVisited = false;

    vm.onChanging = function(from, to) {
        if (from === 2 && $scope.requiredInput.skipSteps) {
            vm.steps[3].hidden = true;
            vm.steps[4].hidden = true;
        } else if (!$scope.requiredInput.skipSteps) {
            vm.steps[3].hidden = false;
            vm.steps[4].hidden = false;
        }

        if (from === 1 && $scope.requiredInput.errorDemo) {
            vm.steps[1].error = true;
            return false;
        } else {
            vm.steps[1].error = false;
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