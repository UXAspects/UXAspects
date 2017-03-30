import SplitterDirective from './splitter.directive.js';
import SplitterPanelDirective from './splitterPanel.directive.js';

import '../../plugins/splitter/splitter.js';

angular.module("ux-aspects.splitter", [])
    .directive("splitter", SplitterDirective)
    .directive("splitterPanel", SplitterPanelDirective);