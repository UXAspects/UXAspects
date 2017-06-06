import { Directive, Host, ElementRef } from '@angular/core';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { Observable } from 'rxjs/Observable';
import { DashboardService, ActionDirection } from '../dashboard.service';

@Directive({
    selector: '[ux-dashboard-widget-drag-handle]'
})
export class DashboardDragHandleDirective {

    private _dragMove: Observable<MouseEvent> = Observable.fromEvent(document, 'mousemove');
    private _dragEnd: Observable<MouseEvent> = Observable.fromEvent(document, 'mouseup');

    constructor( @Host() widget: DashboardWidgetComponent, elementRef: ElementRef, dashboardService: DashboardService) {

        Observable.fromEvent(elementRef.nativeElement, 'mousedown').subscribe((downEvent: MouseEvent) => {

            downEvent.preventDefault();

            // inform service that we are beginning to drag
            dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: downEvent });

            let move$ = this._dragMove.takeUntil(this._dragEnd).subscribe((moveEvent: MouseEvent) => {
                moveEvent.preventDefault();

                dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: moveEvent });
            }, null, () => {
                move$.unsubscribe();
                dashboardService.onDragEnd();
            });

        });
    }
}