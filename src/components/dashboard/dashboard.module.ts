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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragModule } from '../../directives/drag/index';
import { ResizeModule } from '../../directives/resize/index';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { DashboardDragHandleDirective } from './drag-handle/drag-handle.directive';
import { DashboardGrabHandleDirective } from './grab-handle/grab-handle.directive';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';

const DECLARATIONS = [
  DashboardComponent,
  DashboardWidgetComponent,
  DashboardDragHandleDirective,
  DashboardGrabHandleDirective,
];

@NgModule({
  imports: [A11yModule, CommonModule, ResizeModule, DragModule, ...DECLARATIONS],
  exports: DECLARATIONS,
  providers: [DashboardService],
})
export class DashboardModule {}
