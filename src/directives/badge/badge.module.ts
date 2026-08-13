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

import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../accessibility/index';
import { ColorServiceModule } from './../../services/color/color.module';
import { BadgeDirective } from './badge.directive';

@NgModule({
  imports: [ColorServiceModule, AccessibilityModule, BadgeDirective],
  exports: [BadgeDirective],
})
export class BadgeModule {}
