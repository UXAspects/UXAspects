// Import Polyfills
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
/*
  Import Angular 1 Components and their dependencies
*/
import '../../dist/ng1/ux-aspects-ng1';

declare const angular: ng.IAngularStatic;

// create the AngularJS module
angular.module('app', ['ux-aspects']);