import { createEventDirective } from './create-event.directive';

angular.module('ux-aspects.eventHandlers', [])
    .directive('ngClickLazy', createEventDirective('click', 'ngClickLazy'))
    .directive('ngMousedownLazy', createEventDirective('mousedown', 'ngMousedownLazy'))
    .directive('ngKeydownLazy', createEventDirective('keydown', 'ngKeydownLazy'))
    .directive('ngFocusLazy', createEventDirective('focus', 'ngFocusLazy'))
    .directive('ngBlurLazy', createEventDirective('blur', 'ngBlurLazy'));