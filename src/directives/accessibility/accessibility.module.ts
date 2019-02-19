import { A11yModule } from '@angular/cdk/a11y';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { DefaultFocusIndicatorDirective } from './focus-indicator/default-focus-indicator.directive';
import { FocusIndicatorOptionsDirective } from './focus-indicator/focus-indicator-options/focus-indicator-options.directive';
import { FocusIndicatorOriginDirective } from './focus-indicator/focus-indicator-origin/focus-indicator-origin.directive';
import { FocusIndicatorOriginService } from './focus-indicator/focus-indicator-origin/focus-indicator-origin.service';
import { FocusIndicatorDirective } from './focus-indicator/focus-indicator.directive';
import { FocusIndicatorService } from './focus-indicator/focus-indicator.service';
import { FocusWithinDirective } from './focus-within/focus-within.directive';
import { ManagedFocusContainerDirective } from './managed-focus-container/managed-focus-container.directive';
import { ManagedFocusContainerService } from './managed-focus-container/managed-focus-container.service';
import { AccessibilityOptions } from './options/accessibility-options.interface';
import { AccessibilityOptionsService } from './options/accessibility-options.service';
import { ACCESSIBILITY_OPTIONS_TOKEN } from './options/accessibility-options.token';
import { SplitterAccessibilityDirective } from './splitter/splitter-accessibility.directive';
import { TabbableListItemDirective } from './tabbable-list/tabbable-list-item.directive';
import { TabbableListDirective } from './tabbable-list/tabbable-list.directive';


/**
 * We want this service to be a singleton service (even across lazy modules).
 * This allows us to ensure that it is a singleton without having to have
 * the consumer call the `forRoot()` method on the module.
 *
 * This can be removed once Angular 5 support is dropped as it can be changed
 * to be `providedIn: 'root'` instead.
 */
export function FOCUS_INDICATOR_ORIGIN_SERVICE_PROVIDER_FACTORY(parentFocusIndicatorOriginService: FocusIndicatorOriginService) {
    return parentFocusIndicatorOriginService || new FocusIndicatorOriginService();
}

export const FOCUS_INDICATOR_ORIGIN_SERVICE_PROVIDER = {
    provide: FocusIndicatorOriginService,
    deps: [[new Optional(), new SkipSelf(), FocusIndicatorOriginService]],
    useFactory: FOCUS_INDICATOR_ORIGIN_SERVICE_PROVIDER_FACTORY
};

@NgModule({
    declarations: [
        DefaultFocusIndicatorDirective,
        FocusIndicatorDirective,
        FocusIndicatorOptionsDirective,
        FocusIndicatorOriginDirective,
        FocusWithinDirective,
        ManagedFocusContainerDirective,
        SplitterAccessibilityDirective,
        TabbableListDirective,
        TabbableListItemDirective,
    ],
    imports: [
        A11yModule
    ],
    exports: [
        DefaultFocusIndicatorDirective,
        FocusIndicatorDirective,
        FocusIndicatorOptionsDirective,
        FocusIndicatorOriginDirective,
        FocusWithinDirective,
        ManagedFocusContainerDirective,
        SplitterAccessibilityDirective,
        TabbableListDirective,
        TabbableListItemDirective,
    ],
    providers: [
        AccessibilityOptionsService,
        FocusIndicatorService,
        ManagedFocusContainerService,
    ]
})
export class AccessibilityModule {

    static forRoot(options: AccessibilityOptions): ModuleWithProviders {
        return {
            ngModule: AccessibilityModule,
            providers: [
                { provide: ACCESSIBILITY_OPTIONS_TOKEN, useValue: options },
                FOCUS_INDICATOR_ORIGIN_SERVICE_PROVIDER
            ]
        };
    }

}
