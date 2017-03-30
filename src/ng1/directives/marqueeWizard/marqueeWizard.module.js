import MarqueeWizardDirective from './marqueeWizard.directive.js';
import MarqueeWizardController from './marqueeWizard.controller.js';
import MarqueeWizardStepDirective from './marqueeWizardStep.directive.js';

angular.module('ux-aspects.marqueeWizard', [])
	.directive('marqueeWizard', MarqueeWizardDirective)
	.controller('MarqueeWizardCtrl', MarqueeWizardController)
	.directive('marqueeWizardStep', MarqueeWizardStepDirective);