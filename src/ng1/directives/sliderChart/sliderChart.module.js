import SliderChartDirective from './sliderChart.directive.js';
import SliderChartController from './sliderChart.controller.js';

angular.module('ux-aspects.sliderChart', [])
    .directive('sliderChart', SliderChartDirective)
    .controller("SliderChartCtrl", SliderChartController);