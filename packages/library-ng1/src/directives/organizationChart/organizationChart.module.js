import OrganizationChartDirective from './organizationChart.directive.js';
import OrganizationChartController from './organizationChart.controller.js';

angular.module('ux-aspects.organizationChart', [])
	.directive('organizationChart', OrganizationChartDirective)
	.controller('OrganizationChartCtrl', OrganizationChartController);