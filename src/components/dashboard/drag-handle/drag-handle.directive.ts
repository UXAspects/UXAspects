import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DragDirective } from '../../../directives/drag/drag.directive';
import { DragService } from '../../../directives/drag/index';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';

@Directive({
    selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
})
export class DashboardDragHandleDirective extends DragDirective {

    constructor(widget: DashboardWidgetComponent, dashboardService: DashboardService, elementRef: ElementRef,
        ngZone: NgZone, renderer: Renderer2, drag: DragService) {

        super(elementRef, ngZone, renderer, drag);

        this.onDragStart.pipe(takeUntil(this._onDestroy))
            .subscribe((event: MouseEvent) => dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }));

        this.onDrag.pipe(takeUntil(this._onDestroy))
            .subscribe((event: MouseEvent) => dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }));

        this.onDragEnd.pipe(takeUntil(this._onDestroy))
            .subscribe(() => dashboardService.onDragEnd());
    }
}