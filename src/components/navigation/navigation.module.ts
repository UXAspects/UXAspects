import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { RouterLinkDirective } from '../../directives/router-link/index';
import { IconModule } from '../icon/index';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationLinkDirective } from './navigation-link/navigation-link.directive';
import { NavigationModuleOptions, NAVIGATION_MODULE_OPTIONS } from './navigation-options';
import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [AccessibilityModule, CommonModule, IconModule, RouterLinkDirective],
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
