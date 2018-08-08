import { ngTemplateOutlet } from './template-outlet.directive';

/**
 * This is an AngularJS equivalent to ngTemplateOutlet
 */
angular.module('ux-aspects.templateOutlet', [])
    .directive('ngTemplateOutlet', ngTemplateOutlet);