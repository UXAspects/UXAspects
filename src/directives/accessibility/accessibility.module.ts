///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { ModuleWithProviders, NgModule } from '@angular/core';
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

@NgModule({
  imports: [
    A11yModule,
    ColorServiceModule,
    PlatformModule,
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
    ColorContrastDirective,
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
    ColorContrastDirective,
  ],
  providers: [
    AccessibilityOptionsService,
    ContrastService,
    FocusIndicatorService,
    ManagedFocusContainerService,
  ],
})
export class AccessibilityModule {
  static forRoot(options: AccessibilityOptions): ModuleWithProviders<AccessibilityModule> {
    return {
      ngModule: AccessibilityModule,
      providers: [{ provide: ACCESSIBILITY_OPTIONS_TOKEN, useValue: options }],
    };
  }
}
