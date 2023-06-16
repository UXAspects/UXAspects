import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/index';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationLinkDirective } from './navigation-link/navigation-link.directive';
import { NAVIGATION_MODULE_OPTIONS, NavigationModuleOptions } from './navigation-options';
import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [AccessibilityModule, CommonModule, IconModule, RouterModule],
    exports: [NavigationComponent, NavigationItemComponent],
    declarations: [NavigationComponent, NavigationItemComponent, NavigationLinkDirective],
})
export class NavigationModule {
    // allow options to be specified globally
    static forRoot(options: NavigationModuleOptions): ModuleWithProviders<NavigationModule> {
        return {
            ngModule: NavigationModule,
            providers: [{ provide: NAVIGATION_MODULE_OPTIONS, useValue: options }],
        };
    }
}
