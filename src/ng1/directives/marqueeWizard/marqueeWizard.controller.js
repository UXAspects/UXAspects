export class MarqueeWizardCtrl {

  /**
   * @param {ng.IScope} $scope
   * @param {ng.ITimeoutService} $timeout
   */
  constructor($scope, $timeout) {

    // watch for changes to the button options
    const optionsWatcher = $scope.$watch('buttonOptions', (nv, ov) => {
      if (!angular.equals(nv, ov)) {
        this.updateButtonOptions();
      }
    }, true);

    // watch for any changes to the visible steps
    const stepWatcher = $scope.$watch(() => this.wizardSteps, () => this.updateButtonVisibility(), true);

    // cleanup afterwards
    $scope.$on('$destroy', () => {
      // remove the options watcher
      optionsWatcher();

      // remove the step watcher
      stepWatcher();
    });

    // Delay initial setup until we have all the required values
    $timeout(() => this.initialise());
  }

  initialise() {
    //initially set the completed state to false for each step
    this.processSteps();

    //select the first step initially
    this.stepIndex = this.wizardSteps.findIndex(step => !step.hidden);
    this.currentStep = this.wizardSteps[this.stepIndex];
    this.currentStep.visited = true;
    this.currentStep.error = false;

    //side info
    this.sidePanelTitle = this.sideInfo ? this.sideInfo.title : null;
    this.sidePanelDescription = this.sideInfo ? this.sideInfo.description : null;

    //process the button options
    this.updateButtonOptions();

    //determine which buttons to show
    this.updateButtonVisibility();
  }

  //allow the user to go to the next step
  goNext() {

    //check if we are on the last page
    if (this.stepIndex === this.wizardSteps.length - 1) return;

    //if on change function specified call it and await its response
    if (typeof this.onChanging === 'function') {

      const response = this.onChanging(this.stepIndex, this.stepIndex + 1);

      //dont go to the next page if the response is false
      if (response === false) {
        this.currentStep.error = true;
        return;
      }

      //check if the next step is visible
      while (this.stepIndex !== this.wizardSteps.length - 1) {
        if (this.wizardSteps[this.stepIndex + 1].hidden === true) {
          this.stepIndex += 1;
        } else {
          break;
        }
      }

      if (angular.isNumber(response) && response >= 0 && response < this.wizardSteps.length && !this.wizardSteps[response].hidden) {
        this.stepIndex = response;
      } else {
        this.stepIndex++;
      }
      this.currentStep.error = false;
    }

    //mark page as completed and visited
    this.currentStep.completed = true;

    //move to the next page
    this.currentStep = this.wizardSteps[this.stepIndex];

    //mark the new step as visited
    this.currentStep.visited = true;

    //determine which buttons to show
    this.updateButtonVisibility();
  }

  //allow the user to go to the previous step
  goPrevious() {

    //check if we are on the first page
    if (this.stepIndex === 0) return;

    //if on change function specified call it and await its response
    if (typeof this.onChanging === 'function') {
      const response = this.onChanging(this.stepIndex, this.stepIndex - 1);

      //check if the next step is visible
      while (this.stepIndex !== 0) {
        if (this.wizardSteps[this.stepIndex - 1].hidden === true) {
          this.stepIndex -= 1;
        } else {
          break;
        }
      }

      //dont go to the previous page if the response is false
      if (response === false) {
        return;
      }
      if (angular.isNumber(response) && response >= 0 && response < this.wizardSteps.length && !this.wizardSteps[response].hidden) {
        this.stepIndex = response;
      } else {
        this.stepIndex--;
      }
    }

    this.currentStep.error = false;

    //move to the next page
    this.currentStep = this.wizardSteps[this.stepIndex];

    //determine which buttons to show
    this.updateButtonVisibility();
  }

  //allow the user to finish
  finish() {

    //if on finishing function specified call it and await its response
    if (typeof this.onFinishing === 'function') {
      // determine whether or not we can proceed
      return this.canFinish(this.onFinishing());
    }

    // if there is on onFinishing function then we can always complete
    this.complete();
  }

  canFinish(response) {

    // start by making the current step valid unless we detect otherwise
    this.currentStep.error = false;

    // if the response is true then proceed
    if (response === true) {
      return this.complete();
    }

    // if the response is false then do not proceed
    if (response === false) {
      this.currentStep.error = true;
      return;
    }

    // if we returned a number then go to that specific step
    if (typeof response === 'number') {
      return this.goToStep(response);
    }

    // if a promise was return wait the promise response before continuing
    if (response && typeof response.then === 'function') {
      response.then(result => this.canFinish(result));
    }
  }

  complete() {

    //mark the final step as complete
    this.currentStep.completed = true;

    //if a function was specified to be called when the finish button is clicked call it
    if (typeof this.onFinished === 'function') this.onFinished();
  }

  //if modal is dimissed using the close button
  cancel() {
    //if a function was specified to be called when the modal is canceled then call it
    if (typeof this.onCanceled === 'function') this.onCanceled();
  }

  goToStep(stepIdx) {
    const targetStep = this.wizardSteps[stepIdx];

    if (targetStep.visited === true) {

      if (typeof this.onChanging === 'function') {
        const response = this.onChanging(this.stepIndex, stepIdx);

        //dont go to the selected step if the response is false
        if (response === false) {
          return;
        }
      }

      this.currentStep.error = false;
      this.stepIndex = stepIdx;
      this.currentStep = this.wizardSteps[this.stepIndex];

      //determine which buttons to show
      this.updateButtonVisibility();
    }
  }

  /*
    Private Functions
  */
  processSteps() {
    //add an additional property on the steps to store its completed and visited state
    this.wizardSteps.forEach(step => {
      step.completed = false;
      step.visited = this.isVisited !== null || this.isVisited !== undefined ? this.isVisited : false;
    });
  }

  updateButtonVisibility() {

    //set initially hide all the buttons
    this.showPrevious = false;
    this.showNext = false;
    this.showFinish = false;

    // calculate the first visible step index
    const firstStepIdx = this.wizardSteps.findIndex(step => !step.hidden);

    //show buttons accordingly
    if (this.stepIndex > firstStepIdx && this.buttonOptions.showPrevious === true) {
      this.showPrevious = true;
    }

    if (this.stepIndex === this.wizardSteps.length - 1 && this.buttonOptions.showFinish === true) {
      this.showFinish = true;
    } else if (this.buttonOptions.showNext) {
      this.showNext = true;
    }

    if (!this.showFinish && this.buttonOptions.showFinish === true && this.stepIndex !== this.wizardSteps.length) {
      this.showFinish = this.wizardSteps.slice(this.stepIndex + 1).filter(step => step.hidden !== true).length === 0;
      this.showNext = !this.showFinish;
    }

    // Override per-step
    if (angular.isFunction(this.buttonOptions.visibilityOnStep)) {
      const visibility = this.buttonOptions.visibilityOnStep(this.stepIndex);
      this.showPrevious = visibility.hasOwnProperty('previous') ? visibility.previous : this.showPrevious;
      this.showNext = visibility.hasOwnProperty('next') ? visibility.next : this.showNext;
      this.showFinish = visibility.hasOwnProperty('finish') ? visibility.finish : this.showFinish;
    }
  }

  updateButtonOptions() {

    const defaultOptions = {
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
    this.buttonOptions = angular.extend(defaultOptions, this.buttonOptions);
  }

}

MarqueeWizardCtrl.$inject = ['$scope', '$timeout'];