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

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ColorSet, colorSets, COLOR_SET_TOKEN } from './color-sets/index';
import { ColorService } from './color.service';

@NgModule({})
export class ColorServiceModule {
  /**
   * The function allows the consuming applications to specify the applications
   * color set once in the app module, eg:
   * ```
   * ColorServiceModule.forRoot(colorSets.microFocus);
   * ```
   * @param colorSet The color set the application should use
   */
  static forRoot(colorSet: ColorSet): ModuleWithProviders<ColorServiceModule> {
    return {
      ngModule: ColorServiceModule,
      providers: [
        { provide: COLOR_SET_TOKEN, useValue: colorSet ? colorSet : colorSets.keppel },
        ColorService,
      ],
    };
  }
}
