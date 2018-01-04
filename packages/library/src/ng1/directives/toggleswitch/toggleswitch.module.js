import ToggleSwitchController from './toggleswitch.controller.js';
import ToggleSwitchDirective from './toggleswitch.directive.js';

angular.module('ux-aspects.toggleswitch', [])
    .controller('ToggleswitchCtrl', ToggleSwitchController)
    .directive('toggleswitch', ToggleSwitchDirective);