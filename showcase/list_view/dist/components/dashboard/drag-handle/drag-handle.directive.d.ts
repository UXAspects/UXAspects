import { ElementRef, NgZone, Renderer2 } from '@angular/core';
import { DragDirective } from '../../../directives/drag/drag.directive';
import { DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
export declare class DashboardDragHandleDirective extends DragDirective {
    constructor(widget: DashboardWidgetComponent, dashboardService: DashboardService, elementRef: ElementRef, ngZone: NgZone, renderer: Renderer2);
}
