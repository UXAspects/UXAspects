import { ContactGroupDirective } from './contact/contact-group.directive';

let wrapperModule = angular.module('ux-aspects.wrappers', [
    'ux-aspects.contacts'
]);

wrapperModule.directive('uxContactGroupNg1', ContactGroupDirective);