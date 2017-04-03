import { ContactGroupDirective } from './contact/contact-group.directive';
import { ScrollPaneDirective } from './scroll-pane/scroll-pane.directive';

let wrapperModule = angular.module('ux-aspects.wrappers', [
    'ux-aspects.contacts'
]);

wrapperModule.directive('uxContactGroupNg1', ContactGroupDirective);
wrapperModule.directive('uxScrollPaneNg1', ScrollPaneDirective);
