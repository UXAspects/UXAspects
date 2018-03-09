import SearchCategoriesDirective from './searchCategories.directive.js';
import SearchCategoriesController from './searchCategories.controller.js';

import '../../services/keyboardService/keyboardService.module.js';

angular.module('ux-aspects.searchCategories', ['ux-aspects.keyboardService'])
    .directive('searchCategories', SearchCategoriesDirective)
    .controller("SearchCategoriesCtrl", SearchCategoriesController);

