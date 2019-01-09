import { Inject, Injectable, Optional } from '@angular/core';
import { AccessibilityConfiguration } from './accessibility-configuration.interface';
import { ACCESSIBILITY_CONFIG_TOKEN } from './accessibility-configuration.token';

@Injectable()
export class AccessibilityConfigurationService {

    /** Determine the default options */
    private _defaultOptions: AccessibilityConfiguration = {
        mouseFocusOutline: false,
        touchFocusOutline: false,
        keyboardFocusOutline: true,
        programmaticFocusOutline: false
    };

    /** Get the complete options populating unspecified options with the default values */
    get options(): AccessibilityConfiguration {
        return { ...this._defaultOptions, ...this._options };
    }

    /** Get the user specified options - but handle cases where they may not be specified */
    constructor(@Optional() @Inject(ACCESSIBILITY_CONFIG_TOKEN) private _options: AccessibilityConfiguration = {}) { }

}