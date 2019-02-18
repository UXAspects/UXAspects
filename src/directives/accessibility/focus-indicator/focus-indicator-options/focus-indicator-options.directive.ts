import { Directive, Input, Self } from '@angular/core';
import { AccessibilityOptions } from '../../options/accessibility-options.interface';
import { LocalFocusIndicatorOptions } from './focus-indicator-options';

@Directive({
    selector: '[uxFocusIndicatorOptions]',
    providers: [LocalFocusIndicatorOptions]
})
export class FocusIndicatorOptionsDirective implements AccessibilityOptions {

    /** If `true`, this element will receive a focus indicator when the element is clicked on. */
    @Input() set mouseFocusIndicator(mouseFocusIndicator: boolean) {
        this._options.mouseFocusIndicator = mouseFocusIndicator;
    }

    /** If `true`, this element will receive a focus indicator when the element is touched. */
    @Input() set touchFocusIndicator(touchFocusIndicator: boolean) {
        this._options.touchFocusIndicator = touchFocusIndicator;
    }

    /** If `true`, this element will receive a focus indicator when the element is focused using the keyboard. */
    @Input() set keyboardFocusIndicator(keyboardFocusIndicator: boolean) {
        this._options.keyboardFocusIndicator = keyboardFocusIndicator;
    }

    /** If `true`, this element will receive a focus indicator when the element is programmatically focused. */
    @Input() set programmaticFocusIndicator(programmaticFocusIndicator: boolean) {
        this._options.programmaticFocusIndicator = programmaticFocusIndicator;
    }


    constructor(@Self() private _options: LocalFocusIndicatorOptions) { }

}