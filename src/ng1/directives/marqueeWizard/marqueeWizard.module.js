import { MarqueeWizardCtrl } from './marqueeWizard.controller';
import { marqueeWizard } from './marqueeWizard.directive';
import { marqueeWizardSideStep } from './marqueeWizardSideStep.directive';
import { marqueeWizardStep } from './marqueeWizardStep.directive';

angular.module('ux-aspects.marqueeWizard', [])
	.directive('marqueeWizard', marqueeWizard)
	.controller('MarqueeWizardCtrl', MarqueeWizardCtrl)
	.directive('marqueeWizardStep', marqueeWizardStep)
	.directive('marqueeWizardSideStep', marqueeWizardSideStep);