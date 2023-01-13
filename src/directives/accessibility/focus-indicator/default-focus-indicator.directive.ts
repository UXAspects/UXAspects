import { Directive } from '@angular/core';
import { FocusIndicatorDirective } from './focus-indicator.directive';

/**
 * This directive can be used to target specific elements based on their CSS
 * class so we can control when the focus shows. This will help prevent us
 * polluting the FocusIndicatorDirective with an lot of selectors.
 *
 * If the button has a uxFocusIndicator, uxMenuTriggerFor or uxMenuNavigationToggle directive applied we should skip this
 */
@Directive({
    selector: '.btn:not([uxFocusIndicator]):not([uxMenuNavigationToggle]):not([uxMenuTriggerFor]), a[href]:not([uxFocusIndicator]):not([uxMenuNavigationToggle]):not([uxMenuTriggerFor])'
})
export class DefaultFocusIndicatorDirective extends FocusIndicatorDirective {

    constructor() {
        super();

        // Enable programmatic focus by default
        this.programmaticFocusIndicator = true;
    }
}
