import { NgModule } from '@angular/core';

import { MenuNavigationDirective } from './menu-navigation.directive';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';

const EXPORTS = [
    MenuNavigationDirective,
    MenuNavigationItemDirective
];

@NgModule({
    imports: [],
    exports: EXPORTS,
    declarations: EXPORTS,
})
export class MenuNavigationModule { }
