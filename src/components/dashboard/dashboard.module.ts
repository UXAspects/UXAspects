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
    DashboardGrabHandleDirective
];

@NgModule({
    imports: [
        CommonModule,
        ResizeModule,
        DragModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
    providers: [DashboardService],
})
export class DashboardModule { }
