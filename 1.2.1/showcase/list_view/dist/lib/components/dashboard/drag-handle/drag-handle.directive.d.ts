import { ElementRef } from '@angular/core';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardService } from '../dashboard.service';
export declare class DashboardDragHandleDirective {
    private _dragMove;
    private _dragEnd;
    constructor(widget: DashboardWidgetComponent, elementRef: ElementRef, dashboardService: DashboardService);
}
