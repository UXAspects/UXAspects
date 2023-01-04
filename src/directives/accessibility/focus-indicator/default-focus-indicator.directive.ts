import { Directive, ElementRef, inject, NgZone } from '@angular/core';
import { AccessibilityOptionsService } from '../options/accessibility-options.service';
import { LocalFocusIndicatorOptions } from './focus-indicator-options/focus-indicator-options';
import { FocusIndicatorDirective } from './focus-indicator.directive';
import { FocusIndicatorService } from './focus-indicator.service';

/**
 * This directive can be used to target specific elements based on their CSS
 * class so we can control when the focus shows. This will help prevent us
 * polluting the FocusIndicatorDirective with an lot of selectors.
 *
 * If the button has a uxFocusIndicator, uxMenuTriggerFor or uxMenuNavigationToggle directive applied we should skip this
 */
@Directive({
    selector: '.btn:not([uxFocusIndicator]):not([uxMenuNavigationToggle]):not([uxMenuTriggerFor]), a[href]:not([uxFocusIndicator]):not([uxMenuNavigationToggle]):not([uxMenuTriggerFor])',
    providers: [LocalFocusIndicatorOptions]
})
export class DefaultFocusIndicatorDirective extends FocusIndicatorDirective {
    readonly elementRef = inject(ElementRef);

    readonly focusIndicatorService = inject(FocusIndicatorService);

    readonly optionsService = inject(AccessibilityOptionsService);

    readonly ngZone = inject(NgZone);

    readonly localOptions = inject(LocalFocusIndicatorOptions);

    constructor() {
        super();

        // Enable programmatic focus by default
        this.programmaticFocusIndicator = true;
    }
}
