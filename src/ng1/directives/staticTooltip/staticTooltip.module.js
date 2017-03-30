import StaticTooltipDirective from './staticTooltip.directive.js';
import StaticTooltipController from './staticTooltip.controller.js';
import StaticTooltipService from './staticTooltip.service.js';
import StaticTooltipToggleDirective from './staticTooltipToggle.directive.js';

angular.module("ux-aspects.staticTooltip", [])
    .directive("staticTooltip", StaticTooltipDirective)
    .controller("StaticTooltipCtrl", StaticTooltipController)
    .factory("$staticTooltip", StaticTooltipService)
    .directive("staticTooltipToggle", StaticTooltipToggleDirective);