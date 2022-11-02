import { InjectionToken } from '@angular/core';
import type { TabsetComponent } from './tabset.component';

/**
 * This token is used to avoid circular dependency
 */
export const TabsetToken = new InjectionToken<TabsetComponent>('Tabset');