import { Inject, Injectable, Optional } from '@angular/core';
import { AccessibilityOptions } from './accessibility-options.interface';
import { ACCESSIBILITY_OPTIONS_TOKEN } from './accessibility-options.token';

@Injectable()
export class AccessibilityOptionsService {

    /** Determine the default options */
    private _defaultOptions: AccessibilityOptions = {
        mouseFocusIndicator: false,
        touchFocusIndicator: false,
        keyboardFocusIndicator: true,
        programmaticFocusIndicator: false
    };

    /** Get the complete options populating unspecified options with the default values */
    get options(): AccessibilityOptions {
        return { ...this._defaultOptions, ...this._options };
    }

    /** Get the user specified options - but handle cases where they may not be specified */
    constructor(@Optional() @Inject(ACCESSIBILITY_OPTIONS_TOKEN) private _options: AccessibilityOptions = {}) { }

}