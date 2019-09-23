import { AccessibilityOptions } from '../options/accessibility-options.interface';

export interface FocusIndicatorOptions extends AccessibilityOptions {
    checkChildren: boolean;
}