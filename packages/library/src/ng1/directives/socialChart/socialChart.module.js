import SocialChartDirective from './socialChart.directive.js';
import SocialChartController from './socialChart.controller.js';

import '../../services/safeTimeout/safeTimeout.module.js';
import '../../external/d3/d3.directive.js';

if(window.sigma === undefined) {
	// load all additional plugins
	require('../../plugins/sigma/_sigma.min.js');
	require('../../plugins/sigma/sigma.canvas.edgehovers.curve.custom.js');
	require('../../plugins/sigma/sigma.canvas.edges.curve.js');
	require('../../plugins/sigma/sigma.canvas.hovers.def.custom.js');
	require('../../plugins/sigma/sigma.canvas.labels.def.js');
	require('../../plugins/sigma/sigma.canvas.nodes.def.custom.js');
	require('../../plugins/sigma/sigma.captors.mouse.js');
	require('../../plugins/sigma/sigma.classes.camera.js');
	require('../../plugins/sigma/sigma.layout.forceAtlas2.min.js');
	require('../../plugins/sigma/sigma.misc.bindEvents.js');
	require('../../plugins/sigma/sigma.misc.drawHovers.custom.js');
	require('../../plugins/sigma/sigma.plugins.animate.js');
	require('../../plugins/sigma/sigma.plugins.filter.min.js');
	require('../../plugins/sigma/sigma.plugins.neighborhoods.min.js');
	require('../../plugins/sigma/sigma.renderers.canvas.js'); 

	require('../../external/sigma/sigma.directive.js');
}

import '../../plugins/customscroll/jquery.jscrollpane.js';
import '../../plugins/customscroll/jquery.mousewheel.js';

angular.module("ux-aspects.socialChart", ['ux-aspects.safeTimeout', 'ux-aspects.sigma', 'ux-aspects.d3'])
    .directive("socialChart", SocialChartDirective)
    .controller("SocialChartCtrl", SocialChartController);