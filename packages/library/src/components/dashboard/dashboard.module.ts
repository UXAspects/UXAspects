import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';
import { DashboardService } from './dashboard.service';
import { DashboardDragHandleDirective } from './drag-handle/drag-handle.directive';
import { ResizeModule } from '../../directives/resize/index';
import { DragModule } from '../../directives/drag/index';

const DECLARATIONS: any[] = [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardDragHandleDirective
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
