import WizardController from './wizard.controller.js';
import WizardDirective from './wizard.directive.js';

import WizardStep from './wizardStep.directive.js';
import WizardStepHeading from './wizardStepHeading.directive.js';
import WizardStepContent from './wizardStepContent.directive.js';

angular.module("ux-aspects.wizard", [])
    .controller("AspectsWizardCtrl", WizardController)
    .directive("wizard", WizardDirective)
    .directive('step', WizardStep)
    .directive('stepHeadingTransclude', WizardStepHeading)
    .directive('stepContentTransclude', WizardStepContent);