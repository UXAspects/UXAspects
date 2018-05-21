import { NgModule } from '@angular/core';

import { MenuNavigationDirective } from './menu-navigation.directive';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';
import { MenuNavigationToggleDirective } from './menu-navigation-toggle.directive';

const EXPORTS = [
    MenuNavigationDirective,
    MenuNavigationItemDirective,
    MenuNavigationToggleDirective
];

@NgModule({
    imports: [],
    exports: EXPORTS,
    declarations: EXPORTS,
})
export class MenuNavigationModule { }
