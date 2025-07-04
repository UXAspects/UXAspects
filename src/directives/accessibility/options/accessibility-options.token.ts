import { InjectionToken } from '@angular/core';
import { AccessibilityOptions } from './accessibility-options.interface';

export const ACCESSIBILITY_OPTIONS_TOKEN = new InjectionToken<AccessibilityOptions>(
  'ACCESSIBILITY_OPTIONS'
);
