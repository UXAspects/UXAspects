import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { DragDirective, DragScrollEvent } from '../../../directives/drag/drag.directive';
import { DragService } from '../../../directives/drag/index';
import { ActionDirection, DashboardAction, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';

@Directive({
    selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
})
export class DashboardDragHandleDirective extends DragDirective {

    constructor(widget: DashboardWidgetComponent, dashboardService: DashboardService, elementRef: ElementRef,
        ngZone: NgZone, renderer: Renderer2, drag: DragService) {

        super(elementRef, ngZone, renderer, drag);

        // inform the widget that it can be dragged
        widget.isDraggable = true;

        this.onDragStart.pipe(takeUntil(this._onDestroy), tap(() => dashboardService.isGrabbing$.next(null)))
            .subscribe((event: MouseEvent) => dashboardService.onDragStart(this.createDashboardAction(widget, event)));

        this.onDrag.pipe(takeUntil(this._onDestroy))
            .subscribe((event: MouseEvent) => dashboardService.onDrag(this.createDashboardAction(widget, event)));

        this.onDragScroll.pipe(takeUntil(this._onDestroy))
            .subscribe((event: DragScrollEvent) => dashboardService.onDrag(this.createDashboardAction(widget, event)));

        this.onDragEnd.pipe(takeUntil(this._onDestroy))
            .subscribe(() => dashboardService.onDragEnd());
    }

    private createDashboardAction(widget: DashboardWidgetComponent, event: MouseEvent | DragScrollEvent): DashboardAction {
        return {
            widget,
            direction: ActionDirection.Move,
            eventPosition: {
                x: event.pageX,
                y: event.pageY
            }
        };
    }
}
