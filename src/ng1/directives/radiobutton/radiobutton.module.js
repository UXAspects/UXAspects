import RadioButtonDirective from './radiobutton.directive.js';
import RadioButtonController from './radiobutton.controller.js';

angular.module('ux-aspects.radiobutton', [])
    .directive('radiobutton', RadioButtonDirective)
    .controller('RadiobuttonCtrl', RadioButtonController);
