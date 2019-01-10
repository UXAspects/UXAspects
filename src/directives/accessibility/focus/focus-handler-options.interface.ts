import { AccessibilityConfiguration } from '../configuration/accessibility-configuration.interface';

export interface FocusHandlerOptions extends AccessibilityConfiguration {
    checkChildren: boolean;
}