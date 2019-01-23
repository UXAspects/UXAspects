import { A11yModule } from '@angular/cdk/a11y';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DefaultFocusIndicatorDirective } from './focus-indicator/default-focus-indicator.directive';
import { FocusIndicatorDirective } from './focus-indicator/focus-indicator.directive';
import { FocusIndicatorService } from './focus-indicator/focus-indicator.service';
import { FocusWithinDirective } from './focus-within/focus-within.directive';
import { AccessibilityOptions } from './options/accessibility-options.interface';
import { AccessibilityOptionsService } from './options/accessibility-options.service';
import { ACCESSIBILITY_OPTIONS_TOKEN } from './options/accessibility-options.token';
import { SplitterAccessibilityDirective } from './splitter/splitter-accessibility.directive';
import { TabbableListItemDirective } from './tabbable-list/tabbable-list-item.directive';
import { TabbableListDirective } from './tabbable-list/tabbable-list.directive';

@NgModule({
    declarations: [
        DefaultFocusIndicatorDirective,
        FocusIndicatorDirective,
        FocusWithinDirective,
        TabbableListDirective,
        TabbableListItemDirective,
        SplitterAccessibilityDirective
    ],
    imports: [
        A11yModule
    ],
    exports: [
        DefaultFocusIndicatorDirective,
        FocusIndicatorDirective,
        FocusWithinDirective,
        TabbableListDirective,
        TabbableListItemDirective,
        SplitterAccessibilityDirective,
    ],
    providers: [
        AccessibilityOptionsService,
        FocusIndicatorService
    ]
})
export class AccessibilityModule {

    static forRoot(options: AccessibilityOptions): ModuleWithProviders {
        return {
            ngModule: AccessibilityModule,
            providers: [
                { provide: ACCESSIBILITY_OPTIONS_TOKEN, useValue: options }
            ]
        };
    }

}
