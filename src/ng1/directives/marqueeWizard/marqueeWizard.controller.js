MarqueeWizardCtrl.$inject = ['$scope'];

export default function MarqueeWizardCtrl($scope) {
  var vm = this;

  //get all the steps available
  vm.steps = $scope.wizardSteps;

  //initially set the completed state to false for each step
  processSteps();

  //select the first step initially
  vm.stepIndex = 0;
  vm.currentStep = vm.steps[vm.stepIndex];
  vm.currentStep.visited = true;
  vm.currentStep.error = false;

  //side info
  vm.sidePanelInfo = $scope.sideInfo || null;

  if (vm.sidePanelInfo !== null) {
    vm.sidePanelTitle = vm.sidePanelInfo.title || null;
    vm.sidePanelDescription = vm.sidePanelInfo.description || null;
  }

  //process the button options
  updateButtonOptions();

  //determine which buttons to show
  updateButtonVisibility();

  //watch for changes to the button options
  $scope.$watch('buttonOptions', function (nv, ov) {
    if (!angular.equals(nv, ov)) {
      updateButtonOptions();
    }
  }, true);

  /*
    Public Functions
  */

  //allow the user to go to the next step
  vm.goNext = function () {
    
    

    //check if we are on the last page
    if (vm.stepIndex === vm.steps.length - 1) return;
    
    //if on change function specified call it and await its response
    if (typeof $scope.onChanging === 'function') {
      var response = $scope.onChanging(vm.stepIndex, vm.stepIndex + 1);

      //check if the next step is visible
      while (vm.stepIndex !== vm.steps.length -1) {
        if (vm.steps[vm.stepIndex + 1].hidden === true) {
          vm.stepIndex += 1;
        } else {
          break;
        }
      }

      //dont go to the next page if the response is false
      if (response === false) {
        vm.currentStep.error = true;
        return;
      }
      if (angular.isNumber(response) && response >= 0 && response < vm.steps.length && !vm.steps[response].hidden) {
        vm.stepIndex = response;
      }
      else {
        vm.stepIndex++;
      }
      vm.currentStep.error = false;
    }

    //mark page as completed and visited
    vm.currentStep.completed = true;

    //move to the next page
    vm.currentStep = vm.steps[vm.stepIndex];

    //mark the new step as visited
    vm.currentStep.visited = true;

    //determine which buttons to show
    updateButtonVisibility();
  };

  //allow the user to go to the previous step
  vm.goPrevious = function () {

    //check if we are on the first page
    if (vm.stepIndex === 0) return;

    //if on change function specified call it and await its response
    if (typeof $scope.onChanging === 'function') {
      var response = $scope.onChanging(vm.stepIndex, vm.stepIndex - 1);

      //check if the next step is visible
      while (vm.stepIndex !== 0) {
        if (vm.steps[vm.stepIndex - 1].hidden === true) {
          vm.stepIndex -= 1;
        } else {
          break;
        }
      }

      //dont go to the previous page if the response is false
      if (response === false) {
        return;
      }
      if (angular.isNumber(response) && response >= 0 && response < vm.steps.length && !vm.steps[response].hidden) {
        console.log("here");
        vm.stepIndex = response;
      }
      else {
        vm.stepIndex--;
      }
    }

    vm.currentStep.error = false;

    //move to the next page
    vm.currentStep = vm.steps[vm.stepIndex];

    //determine which buttons to show
    updateButtonVisibility();
  };

  //allow the user to finish
  vm.finish = function () {

    //if on finishing function specified call it and await its response
    if (typeof $scope.onFinishing === 'function') {
      var response = $scope.onFinishing();

      //dont go to the next page if the response is false
      if (response === false) {
        vm.currentStep.error = true;
        return;
      }
      vm.currentStep.error = false;
    }

    //mark the final step as complete
    vm.currentStep.completed = true;

    //if a function was specified to be called when the finish button is clicked call it
    if (typeof $scope.onFinished === 'function') $scope.onFinished();
  };

  //if modal is dimissed using the close button
  vm.cancel = function () {
    //if a function was specified to be called when the modal is canceled then call it
    if (typeof $scope.onCanceled === 'function') $scope.onCanceled();
  };

  vm.goToStep = function (stepIdx) {
    var targetStep = vm.steps[stepIdx];

    if (targetStep.visited === true) {
      vm.currentStep.error = false;
      vm.stepIndex = stepIdx;
      vm.currentStep = vm.steps[vm.stepIndex];

      //determine which buttons to show
      updateButtonVisibility();
    }
  };

  /*
    Private Functions
  */
  function processSteps() {
    //add an additional property on the steps to store its completed and visited state
    vm.steps.forEach(function (step) {
      step.completed = false;
      step.visited = $scope.isVisited !== null || $scope.isVisited !== undefined ? $scope.isVisited : false;
    });
  }

  function updateButtonVisibility() {

    //set initially hide all the buttons
    vm.showPrevious = false;
    vm.showNext = false;
    vm.showFinish = false;

    //show buttons accordingly
    if (vm.stepIndex > 0 && vm.buttonOptions.showPrevious === true) vm.showPrevious = true;
    if (vm.stepIndex === vm.steps.length - 1 && vm.buttonOptions.showFinish === true) vm.showFinish = true;
    else if (vm.buttonOptions.showNext) vm.showNext = true;

    //check for hidden steps
    if (vm.buttonOptions.showFinish === true && vm.stepIndex !== vm.steps.length -1) {
      for (var i = 1; vm.stepIndex + i < vm.steps.length; i++) {
        if(!vm.steps[vm.stepIndex+i].hidden){
          return;
        } else {
          vm.showFinish = true;
          vm.showNext = false;
        }
      }
    }
  }

  function updateButtonOptions() {
    var options = $scope.buttonOptions;

    var defaultOptions = {
      previousText: 'Previous',
      nextText: 'Next',
      finishText: 'Finish',
      showPrevious: true,
      showNext: true,
      showFinish: true,
      previousTooltip: null,
      nextTooltip: null,
      finishTooltip: null,
      previousEnabled: true,
      nextEnabled: true,
      finishEnabled: true
    };

    //store the button options
    vm.buttonOptions = angular.extend(defaultOptions, options);
  }

}