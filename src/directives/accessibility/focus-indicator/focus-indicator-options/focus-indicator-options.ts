import { AccessibilityOptions } from '../../options/accessibility-options.interface';

export class LocalFocusIndicatorOptions implements AccessibilityOptions {
    mouseFocusIndicator: boolean;
    touchFocusIndicator: boolean;
    keyboardFocusIndicator: boolean;
    programmaticFocusIndicator: boolean;
}