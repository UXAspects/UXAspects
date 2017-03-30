AspectsWizardCtrl.$inject = ['$scope'];

export default function AspectsWizardCtrl($scope) {
    var vm = this;
    vm.onChanging = $scope.onChanging;
    vm.onFinishing = $scope.onFinishing;
    vm.onFinished = $scope.onFinished;
    vm.onCanceled = $scope.onCanceled;

    vm.isVisited = $scope.isVisited || false;

    // sets the steps to all be 'done' and sets the current active step correctly
    vm.updateIsVisited = function() {
        for (var i = 0; i < vm.steps.length; i++) {
            vm.steps[i].disabled = false;
            vm.steps[i].done = true;
        }
        setActive(vm.currentActiveStep);
    };

    vm.defaultOptions = {
        nextText: 'Next',
        previousText: 'Previous',
        cancelText: 'Cancel',
        finishText: 'Finish',
        showPrevious: true,
        showNext: true,
        showCancel: true,
        showFinish: true,
        nextTooltip: '',
        previousTooltip: '',
        cancelTooltip: '',
        finishTooltip: '',
        hideCancelOnFinish: true,
        previousEnabled: true,
        nextEnabled: true,
        cancelEnabled: true,
        finishEnabled: true,
        alwaysShowFinish: false
    };

    vm.buttonOptions = vm.defaultOptions;

    //set up buttons options and give default values if none are available
    if ($scope.buttonOptions) {
        vm.buttonOptions = angular.extend(vm.defaultOptions, $scope.buttonOptions);
    }

    // if buttons are disabled, set the tabindex to -1 so they are not be navigable by keyboard
    vm.updateButtonTabIndexes = function() {
        vm.buttonOptions.previousTabIndex = 0;
        if (!vm.buttonOptions.previousEnabled) {
            vm.buttonOptions.previousTabIndex = -1;
        }

        vm.buttonOptions.nextTabIndex = 0;
        if (!vm.buttonOptions.nextEnabled) {
            vm.buttonOptions.nextTabIndex = -1;
        }

        vm.buttonOptions.cancelTabIndex = 0;
        if (!vm.buttonOptions.cancelEnabled) {
            vm.buttonOptions.cancelTabIndex = -1;
        }

        vm.buttonOptions.finishTabIndex = 0;
        if (!vm.buttonOptions.finishEnabled) {
            vm.buttonOptions.finishTabIndex = -1;
        }
    };

    vm.updateButtonTabIndexes();

    vm.previousEnabledSet = vm.buttonOptions.previousEnabled;

    //vm.previousDisabled = true;
    vm.nextShow = true;
    vm.finishShow = !vm.nextShow;
    vm.alwaysShowFinish = vm.buttonOptions.alwaysShowFinish === true ? true : false;
    vm.finish = finish;
    vm.cancel = cancel;
    vm.previous = previous;
    vm.next = next;

    vm.showingCancel = vm.buttonOptions.showCancel;

    vm.steps = [];
    vm.currentActiveStep = null;

    vm.addStep = addStep;
    vm.select = select;
    vm.removeStep = removeStep;
    vm.insertStep = insertStep;

    var activeIndex = vm.steps.indexOf(vm.currentActiveStep);
    if (activeIndex <= 0) {
        vm.buttonOptions.previousEnabled = false;

        // if on the first step, previous button is disabled and therefore not navigable by keyboard
        vm.buttonOptions.previousTabIndex = -1;
    }


    function finish() {
        if (vm.onFinishing && vm.onFinishing() === false) {
            vm.currentActiveStep.error = true;
            return;
        }

        vm.currentActiveStep.error = false;
        if (vm.onFinished) {
            vm.onFinished();
        }
    }

    function cancel() {
        if (vm.onCanceled) {
            vm.onCanceled();
        }
    }

    function previous() {
        if (!vm.buttonOptions.previousEnabled)
            return;
        var activeIndex = vm.steps.indexOf(vm.currentActiveStep);
        if (activeIndex <= 0) {
            return;
        }
        changeStep(activeIndex, activeIndex - 1);
    }

    function next() {
        var activeIndex = vm.steps.indexOf(vm.currentActiveStep);
        if (activeIndex === vm.steps.length - 1) {
            return;
        }
        changeStep(activeIndex, activeIndex + 1);
    }

    function changeStep(from, to) {
        var newIndex = to;
        if (vm.onChanging) {
            var result = vm.onChanging({
                from: from,
                to: to
            });
            if (result === false) {
                vm.currentActiveStep.error = true;
                return;
            }
            if (angular.isNumber(result) && result >= 0 && result < vm.steps.length) {
                newIndex = result;
            }
        }
        moveTo(vm.steps[newIndex]);

        if (vm.currentActiveStep.index === vm.steps.length) {
            vm.showingCancel = (vm.buttonOptions.showCancel && !vm.buttonOptions.hideCancelOnFinish);
        }
        else {
            vm.showingCancel = vm.buttonOptions.showCancel;
        }
    }

    function moveTo(next) {


        setDone(vm.currentActiveStep);
        setActive(next);
        var activeIndex = vm.steps.indexOf(vm.currentActiveStep);

        if (vm.previousEnabledSet)
            vm.buttonOptions.previousEnabled = activeIndex !== 0;

        // if previous is enabled again, make it navigable by keyboard
        if (vm.buttonOptions.previousEnabled)
            vm.buttonOptions.previousTabIndex = 0;
        else
            vm.buttonOptions.previousTabIndex = -1;

        vm.nextShow = activeIndex !== vm.steps.length - 1;
        vm.finishShow = !vm.nextShow;
    }

    function setActive(step) {
        step.active = true;
        step.disabled = false;
        step.done = false;
        vm.currentActiveStep = step;
    }

    function setDone(step) {
        step.active = false;
        step.done = true;
        step.error = false;
    }


    function addStep(step) {
        vm.steps.push(step);

        //set id
        step.id = "wizard-step-" + vm.steps.length;
        step.index = vm.steps.length;
        if (vm.steps.length === 1) {
            step.active = true;
            vm.currentActiveStep = step;
        } else {
            step.active = false;

            if (vm.isVisited) {
                step.disabled = false;
                step.done = true;
            } else {
                step.disabled = true;
            }
        }
        vm.nextShow = vm.steps.length > 1;
        vm.finishShow = !vm.nextShow;
    }

    function insertStep(step, index) {
        //shortcut out if its really just adding one on to the end
        if (index === vm.steps.length) {
            vm.addStep(step);
            return;
        }

        //increment everythings id and index from index upwards
        for (var i = index; i < vm.steps.length; i++) {
            vm.steps[i].id = "wizard-step-" + (i + 1);
            vm.steps[i].index = i + 1;
        }

        //if index is active new index must be active
        if (vm.steps[index].active) {
            vm.steps[index].active = false;
            setActive(step);
        } else {
            step.active = false;
            if (vm.isVisited) {
                step.disabled = false;
                step.done = true;
            } else {
                step.disabled = true;
            }
        }
        //set button styling
        //always show next as if it was being appended it should be caught by shortcut at top of function
        vm.nextShow = true;
        vm.finishShow = !vm.nextShow;

        //finally insert
        vm.steps.splice(index, 0, step);

    }

    function select(step) {
        if (step.done) {
            var activeIndex = vm.steps.indexOf(vm.currentActiveStep);
            changeStep(activeIndex, vm.steps.indexOf(step));
        }
    }

    function removeStep(step) {
        var index = vm.steps.indexOf(step);
        if (index < 0) {
            return;
        }
        if (step.active && vm.steps.length > 1) {
            moveTo(vm.steps[index === vm.steps.length - 1 ? index - 1 : index + 1]);
        }
        vm.steps.splice(index, 1);

    }
}