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

import { Directive, inject } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { DragDirective, DragScrollEvent } from '../../../directives/drag/drag.directive';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';

@Directive({ selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]' })
export class DashboardDragHandleDirective extends DragDirective {
  readonly widget = inject(DashboardWidgetComponent);

  readonly dashboardService = inject(DashboardService);

  constructor() {
    super();

    // inform the widget that it can be dragged
    this.widget.isDraggable = true;

    this.onDragStart
      .pipe(
        takeUntil(this._onDestroy),
        tap(() => this.dashboardService.isGrabbing$.next(null))
      )
      .subscribe((event: MouseEvent) =>
        this.dashboardService.onDragStart({
          widget: this.widget,
          direction: ActionDirection.Move,
          event,
        })
      );

    this.onDrag.pipe(takeUntil(this._onDestroy)).subscribe((event: MouseEvent) =>
      this.dashboardService.onDrag({
        widget: this.widget,
        direction: ActionDirection.Move,
        event,
      })
    );

    this.onDragScroll
      .pipe(takeUntil(this._onDestroy))
      .subscribe((event: DragScrollEvent) =>
        this.dashboardService.onDragScroll(this.widget, event)
      );

    this.onDragEnd
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.dashboardService.onDragEnd());
  }
}
