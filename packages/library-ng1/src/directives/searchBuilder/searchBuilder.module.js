import SearchBuilderDirective from './searchBuilder.directive.js';
import SearchBuilderController from './searchBuilder.controller.js';

import SearchGroupDirective from './searchGroup.directive.js';
import SearchGroupController from './searchGroup.controller.js';

import SearchComponentDirective from './searchComponent.directive.js';
import SearchComponentController from './searchComponent.controller.js';

angular.module('ux-aspects.searchBuilder', [])
    .directive('searchBuilder', SearchBuilderDirective)
    .controller('SearchBuilderCtrl', SearchBuilderController)
    .directive('searchGroup', SearchGroupDirective)
    .controller('SearchGroupCtrl', SearchGroupController)
    .directive('searchComponent', SearchComponentDirective)
    .controller('SearchComponentCtrl', SearchComponentController);