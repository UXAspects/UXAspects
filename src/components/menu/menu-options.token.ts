import { InjectionToken } from '@angular/core';
import { MenuModuleOptions } from './menu-options.interface';

export const MENU_OPTIONS_TOKEN = new InjectionToken<MenuModuleOptions>('MENU_OPTIONS_TOKEN');