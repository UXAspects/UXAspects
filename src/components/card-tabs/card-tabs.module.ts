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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResizeModule } from '../../directives/resize/index';
import { IconModule } from '../icon/index';
import { CardTabContentDirective } from './card-tab/card-tab-content.directive';
import { CardTabComponent } from './card-tab/card-tab.component';
import { CardTabsetComponent } from './card-tabset/card-tabset.component';

@NgModule({
  imports: [
    CommonModule,
    ResizeModule,
    IconModule,
    CardTabsetComponent,
    CardTabComponent,
    CardTabContentDirective,
  ],
  exports: [CardTabsetComponent, CardTabComponent, CardTabContentDirective],
})
export class CardTabsModule {}
