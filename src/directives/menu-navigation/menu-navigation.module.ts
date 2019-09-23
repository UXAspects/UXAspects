import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../accessibility/index';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';
import { MenuNavigationToggleDirective } from './menu-navigation-toggle.directive';
import { MenuNavigationDirective } from './menu-navigation.directive';


const EXPORTS = [
    MenuNavigationDirective,
    MenuNavigationItemDirective,
    MenuNavigationToggleDirective
];

@NgModule({
    imports: [
        AccessibilityModule
    ],
    exports: EXPORTS,
    declarations: EXPORTS,
})
export class MenuNavigationModule { }
