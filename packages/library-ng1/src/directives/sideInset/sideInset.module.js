import SideInsetDirective from './sideInset.directive.js';
import SideInsetController from './sideInset.controller.js';

angular.module("ux-aspects.sideInset", [])
    .directive("sideInset", SideInsetDirective)
    .controller("SideInsetCtrl", SideInsetController);
