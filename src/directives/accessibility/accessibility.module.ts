import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ColorServiceModule } from '../../services/color/index';
import { ColorContrastDirective } from './contrast-ratio/color-contrast.directive';
import { ContrastService } from './contrast-ratio/contrast.service';
import { DefaultFocusIndicatorDirective } from './focus-indicator/default-focus-indicator.directive';
import { FocusIndicatorOptionsDirective } from './focus-indicator/focus-indicator-options/focus-indicator-options.directive';
import { FocusIndicatorOriginDirective } from './focus-indicator/focus-indicator-origin/focus-indicator-origin.directive';
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
import { FocusIndicatorOriginService } from './focus-indicator/focus-indicator-origin/focus-indicator-origin.service';

/**
 * Note: This is a workaround for the Angular 8 providedIn: 'root'
 * issue.
 *
 * This provider allows us to have only a single instance
 * of the service throughout out entire application
 * regardless of how many times this module is imported.
 */
export function FOCUS_ORIGIN_SERVICE_PROVIDER_FACTORY(parentService: FocusIndicatorOriginService) {
    return parentService || new FocusIndicatorOriginService();
}

export const FOCUS_ORIGIN_SERVICE_PROVIDER = {
    provide: FocusIndicatorOriginService,
    deps: [[new Optional(), new SkipSelf(), FocusIndicatorOriginService]],
    useFactory: FOCUS_ORIGIN_SERVICE_PROVIDER_FACTORY
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
        FocusIndicatorOriginDirective,
        ColorContrastDirective
    ],
    imports: [
        A11yModule,
        ColorServiceModule,
        PlatformModule
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
        FocusIndicatorOriginDirective,
        ColorContrastDirective
    ],
    providers: [
        FOCUS_ORIGIN_SERVICE_PROVIDER,
        AccessibilityOptionsService,
        ContrastService,
        FocusIndicatorService,
        ManagedFocusContainerService,
    ]
})
export class AccessibilityModule {

    static forRoot(options: AccessibilityOptions): ModuleWithProviders<AccessibilityModule> {
        return {
            ngModule: AccessibilityModule,
            providers: [
                { provide: ACCESSIBILITY_OPTIONS_TOKEN, useValue: options }
            ]
        };
    }

}
