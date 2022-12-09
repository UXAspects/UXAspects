import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { MenuDividerComponent } from './menu-divider/menu-divider.component';
import { MenuInitialFocusDirective } from './menu-initial-focus/menu-initial-focus.directive';
import { MenuItemCustomControlDirective } from './menu-item-custom-control/menu-item-custom-control.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuModuleOptions } from './menu-options.interface';
import { MENU_OPTIONS_TOKEN } from './menu-options.token';
import { MenuTabbableItemDirective } from './menu-tabbable-item/menu-tabbable-item.directive';
import { MenuTriggerDirective } from './menu-trigger/menu-trigger.directive';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemComponent,
        MenuDividerComponent,
        MenuTabbableItemDirective,
        MenuInitialFocusDirective,
        MenuItemCustomControlDirective
    ],
    imports: [
        A11yModule,
        AccessibilityModule,
        CommonModule,
        OverlayModule
    ],
    exports: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemComponent,
        MenuDividerComponent,
        MenuTabbableItemDirective,
        MenuInitialFocusDirective,
        MenuItemCustomControlDirective
    ]
})
export class MenuModule {
    static forRoot(options: MenuModuleOptions): ModuleWithProviders<MenuModule> {
        return {
            ngModule: MenuModule,
            providers: [
                { provide: MENU_OPTIONS_TOKEN, useValue: options }
            ]
        };
    }

    /** Support options at a child module level (implementation is the same as `forRoot`) */
    static forChild(options: MenuModuleOptions): ModuleWithProviders<MenuModule> {
        return MenuModule.forRoot(options);
    }
}
