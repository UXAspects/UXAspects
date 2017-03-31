import { ContactGroupDirective } from './contact/contact-group.directive';
import { ScrollPaneDirective } from './scroll-pane/scroll-pane.directive';
import { FlotDirective } from './flot/flot.directive';

let wrapperModule = angular.module('ux-aspects.wrappers', [
    'ux-aspects.contacts',
    'angular-flot'
]);

wrapperModule.directive('uxContactGroupNg1', ContactGroupDirective);
wrapperModule.directive('uxScrollPaneNg1', ScrollPaneDirective);
wrapperModule.directive('uxFlotNg1', FlotDirective);
