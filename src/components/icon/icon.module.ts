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
import { IconModuleOptions } from './icon-options.interface';
import { ICON_OPTIONS_TOKEN } from './icon-options.token';
import { IconComponent } from './icon.component';
import { IconService } from './icon.service';

@NgModule({
  imports: [IconComponent],
  exports: [IconComponent],
  providers: [IconService],
})
export class IconModule {
  /** Allow configuration at AppModule level */
  static forRoot(options?: IconModuleOptions): ModuleWithProviders<IconModule> {
    return {
      ngModule: IconModule,
      providers: [{ provide: ICON_OPTIONS_TOKEN, useValue: options }],
    };
  }

  /** Allow configuration at a child module level */
  static forChild(options?: IconModuleOptions): ModuleWithProviders<IconModule> {
    // the `forChild` does the same as `forRoot` however this having
    // `forChild` follows the correct conventions as we should never
    // import `forRoot` in a child module
    return IconModule.forRoot(options);
  }
}
