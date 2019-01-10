import { AccessibilityConfiguration } from '../configuration/accessibility-configuration.interface';

export interface FocusIndicatorOptions extends AccessibilityConfiguration {
    checkChildren: boolean;
}