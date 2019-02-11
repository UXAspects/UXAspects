import { ChangeDetectorRef, Directive, ElementRef } from '@angular/core';
import { AccessibilityOptionsService } from '../options/accessibility-options.service';
import { FocusIndicatorDirective } from './focus-indicator.directive';
import { FocusIndicatorService } from './focus-indicator.service';

/**
 * This directive can be used to target specific elements based on their CSS
 * class so we can control when the focus shows. This will help prevent us
 * polluting the FocusIndicatorDirective with an lot of selectors.
 *
 * If the button has a uxFocusIndicator or uxMenuNavigationToggle directive applied we should skip this
 */
@Directive({
    selector: '.btn:not([uxFocusIndicator]):not([uxMenuNavigationToggle])',
})
export class DefaultFocusIndicatorDirective extends FocusIndicatorDirective {

    constructor(
        elementRef: ElementRef,
        focusIndicatorService: FocusIndicatorService,
        optionsService: AccessibilityOptionsService,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(elementRef, focusIndicatorService, changeDetectorRef, optionsService);

        // Enable programmatic focus by default
        this.programmaticFocusIndicator = true;
    }
}
