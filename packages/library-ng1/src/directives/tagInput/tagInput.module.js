import TagInputDirective from './tagInput.directive.js';
import TagInputController from './tagInput.controller.js';

import '../../services/safeTimeout/safeTimeout.module.js';
import '../../external/ng-tags-input/ng-tags-input.js';

require('./customAutocompleteTemplate.html');

angular.module("ux-aspects.tagInput", ['ux-aspects.safeTimeout', 'ngTagsInput'])
    .directive("tagInput", TagInputDirective)
    .controller("TagInputCtrl", TagInputController);