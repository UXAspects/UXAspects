import { NgZone, ElementRef } from '@angular/core';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardService } from '../dashboard.service';
import { DragDirective } from '../../../directives/drag/drag.directive';
export declare class DashboardDragHandleDirective extends DragDirective {
    constructor(widget: DashboardWidgetComponent, dashboardService: DashboardService, elementRef: ElementRef, ngZone: NgZone);
}
