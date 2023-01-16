import { InjectionToken } from '@angular/core';
import { NavigationItemRouterOptions } from './navigation-item.interface';

export interface NavigationModuleOptions {
    routerOptions: NavigationItemRouterOptions;
}

export const NAVIGATION_MODULE_OPTIONS = new InjectionToken<NavigationModuleOptions>('NAVIGATION_MODULE_OPTIONS');
