import { A11yModule } from '@angular/cdk/a11y';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccessibilityConfiguration } from './configuration/accessibility-configuration.interface';
import { AccessibilityConfigurationService } from './configuration/accessibility-configuration.service';
import { ACCESSIBILITY_CONFIG_TOKEN } from './configuration/accessibility-configuration.token';
import { FocusWithinDirective } from './focus-within/focus-within.directive';
import { FocusDirective } from './focus/focus.directive';
import { SplitterAccessibilityDirective } from './splitter/splitter-accessibility.directive';
import { TabbableListItemDirective } from './tabbable-list/tabbable-list-item.directive';
import { TabbableListDirective } from './tabbable-list/tabbable-list.directive';

@NgModule({
    declarations: [
        FocusDirective,
        FocusWithinDirective,
        TabbableListDirective,
        TabbableListItemDirective,
        SplitterAccessibilityDirective
    ],
    imports: [
        A11yModule
    ],
    exports: [
        FocusDirective,
        FocusWithinDirective,
        TabbableListDirective,
        TabbableListItemDirective,
        SplitterAccessibilityDirective,
    ],
    providers: [
        AccessibilityConfigurationService
    ]
})
export class AccessibilityModule {

    static forRoot(options: AccessibilityConfiguration): ModuleWithProviders {
        return {
            ngModule: AccessibilityModule,
            providers: [
                { provide: ACCESSIBILITY_CONFIG_TOKEN, useValue: options }
            ]
        };
    }

}