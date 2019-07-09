import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { MenuDividerComponent } from './menu-divider/menu-divider.component';
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
        MenuTabbableItemDirective
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
        MenuTabbableItemDirective
    ]
})
export class MenuModule {
    static forRoot(options: MenuModuleOptions): ModuleWithProviders {
        return {
            ngModule: MenuModule,
            providers: [
                { provide: MENU_OPTIONS_TOKEN, useValue: options }
            ]
        };
    }

    /** Support options at a child module level (implementation is the same as `forRoot`) */
    static forChild(options: MenuModuleOptions): ModuleWithProviders {
        return MenuModule.forRoot(options);
    }
}
