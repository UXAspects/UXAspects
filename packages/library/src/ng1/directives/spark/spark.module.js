import SparkDirective from './spark.directive.js';
import SparkController from './spark.controller.js';

angular.module("ux-aspects.spark", [])
    .directive("spark", SparkDirective)
    .controller("SparkCtrl", SparkController);