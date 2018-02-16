import { Directive, NgZone, ElementRef } from '@angular/core';

import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardService, ActionDirection } from '../dashboard.service';
import { DragDirective } from '../../../directives/drag/drag.directive';

@Directive({
    selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
})
export class DashboardDragHandleDirective extends DragDirective {

    constructor(widget: DashboardWidgetComponent, dashboardService: DashboardService, elementRef: ElementRef, ngZone: NgZone) {
        super(elementRef, ngZone);

        this.dragstart.subscribe((event: MouseEvent) => dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }))
        this.drag.subscribe((event: MouseEvent) => dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.dragend.subscribe(() => dashboardService.onDragEnd());
    }
}