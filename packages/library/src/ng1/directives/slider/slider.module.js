import SliderDirective from './slider.directive.js';
import SliderController from './slider.controller.js';

angular.module('ux-aspects.slider', [])
    .directive('slider', SliderDirective)
    .controller("SliderCtrl", SliderController);

