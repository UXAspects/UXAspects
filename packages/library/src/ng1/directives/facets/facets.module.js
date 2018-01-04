import FacetDirective from './facet/facet.directive.js';
import FacetController from './facet/facet.controller.js';

import FacetContainerDirective from './facetContainer/facetContainer.directive.js';
import FacetContainerController from './facetContainer/facetContainer.controller.js';

import FacetCustomDirective from './facetCustom/facetCustom.directive.js';
import FacetCustomController from './facetCustom/facetCustom.controller.js';

import FacetDynamicDirective from './facetDynamic/facetDynamic.directive.js';
import FacetDynamicController from './facetDynamic/facetDynamic.controller.js';
import FacetSelectedFilter from './facetDynamic/facetSelected.filter.js';
import FacetVisibleFilter from './facetDynamic/facetVisible.filter.js';

import FacetOptionDirective from './facetOption/facetOption.directive.js';
import DynamicFacetOptionDirective from './facetOption/dynamicFacetOptions.directive.js';
import FacetOptionController from './facetOption/facetOption.controller.js';

angular.module("ux-aspects.facets", [])
	.directive("facet", FacetDirective)
	.controller("FacetCtrl", FacetController)
	.directive("facetContainer", FacetContainerDirective)
	.controller("FacetContainerCtrl", FacetContainerController)
	.directive("facetCustom", FacetCustomDirective)
	.controller("FacetCustomCtrl", FacetCustomController)
	.directive("facetDynamic", FacetDynamicDirective)
	.controller("FacetDynamicCtrl", FacetDynamicController)
	.filter("facetDynamicSelectedFilter", FacetSelectedFilter)
	.filter("facetDynamicVisibleFilter", FacetVisibleFilter)
	.directive("facetOption", FacetOptionDirective)
	.directive("dynamicFacetOption", DynamicFacetOptionDirective)
	.controller("FacetOptionCtrl", FacetOptionController);