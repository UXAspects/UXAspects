import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { DragDirective, DragScrollEvent } from '../../../directives/drag/drag.directive';
import { DragService } from '../../../directives/drag/index';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';

@Directive({
    selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
})
export class DashboardDragHandleDirective extends DragDirective {

    constructor(
        widget: DashboardWidgetComponent,
        dashboardService: DashboardService,
        elementRef: ElementRef<Element>,
        ngZone: NgZone,
        renderer: Renderer2,
        scrollDispatcher: ScrollDispatcher,
        drag: DragService
    ) {

        super(elementRef, ngZone, renderer, scrollDispatcher, drag);

        // inform the widget that it can be dragged
        widget.isDraggable = true;

        this.onDragStart.pipe(takeUntil(this._onDestroy), tap(() => dashboardService.isGrabbing$.next(null)))
            .subscribe((event: MouseEvent) => dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }));

        this.onDrag.pipe(takeUntil(this._onDestroy))
            .subscribe((event: MouseEvent) => dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }));

        this.onDragScroll.pipe(takeUntil(this._onDestroy))
            .subscribe((event: DragScrollEvent) => dashboardService.onDragScroll(widget, event));

        this.onDragEnd.pipe(takeUntil(this._onDestroy))
            .subscribe(() => dashboardService.onDragEnd());
    }
}
