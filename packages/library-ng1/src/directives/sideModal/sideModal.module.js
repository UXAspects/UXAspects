import SideModalFactory from './sideModal.factory.js';
import SideModalWindowDirective from './sideModalWindow/sideModalWindow.directive.js';
import SideModalDialogDirective from './sideModalDialog/sideModalDialog.directive.js';

// ensure ui bootstrap is referenced
import '../../external/ui-bootstrap/ui-bootstrap-tpls.js';

// load templates used
require('./sideModalWindow/sideWindowDialog.html');

angular.module("ux-aspects.sideModal", [])
    .factory('sideModalFactory', SideModalFactory)
    .directive('sideModalWindow', SideModalWindowDirective)
    .directive('sideModalDialog', SideModalDialogDirective);
