import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, Directive, ElementRef } from '@angular/core';
import { AccessibilityOptionsService } from '../options/accessibility-options.service';
import { FocusIndicatorDirective } from './focus-indicator.directive';
import { FocusIndicatorService } from './focus-indicator.service';

/**
 * This directive can be used to target specific elements based on their CSS
 * class so we can control when the focus shows. This will help prevent us
 * polluting the FocusIndicatorDirective with an lot of selectors.
 */
@Directive({
    selector: '.btn',
})
export class DefaultFocusIndicatorDirective extends FocusIndicatorDirective {

    constructor(
        elementRef: ElementRef,
        focusIndicatorService: FocusIndicatorService,
        optionsService: AccessibilityOptionsService,
        changeDetectorRef: ChangeDetectorRef,
        platform: Platform
    ) {
        super(elementRef, focusIndicatorService, optionsService, changeDetectorRef);

        /**
         * @workaround - Firefox Focus Issue
         * Firefox can mistakenly detect a focus origin as programmatic focus rather than via keyboard
         * which can cause the focus indicator not to show. This workaround will show the indicator when
         * programmtic focus is detected and our browser is firefox.
         */
        if (platform.FIREFOX) {
            this.programmaticFocusIndicator = true;
        }
    }
}