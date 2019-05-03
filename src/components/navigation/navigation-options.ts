import { InjectionToken } from '@angular/core';
import { NavigationItemRouterOptions } from './navigation-item.inferface';

export interface NavigationModuleOptions {
    routerOptions: NavigationItemRouterOptions;
}

export const NAVIGATION_MODULE_OPTIONS = new InjectionToken('NAVIGATION_MODULE_OPTIONS');