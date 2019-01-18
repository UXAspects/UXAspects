import { Directive } from '@angular/core';
import { FocusIndicatorDirective } from './focus-indicator.directive';

/**
 * This directive can be used to target specific elements based on their CSS
 * class so we can control when the focus shows. This will help prevent us
 * polluting the FocusIndicatorDirective with an lot of selectors.
 */
@Directive({
    selector: '.btn',
})
export class DefaultFocusIndicatorDirective extends FocusIndicatorDirective {

}