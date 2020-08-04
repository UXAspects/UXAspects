import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { TableWidgetConfig } from '../interfaces/table-widget';
import { DashboardWidgetComponent } from '../../dashboard';

@Component({
    selector: 'ux-dashboard-table-widget',
    templateUrl: './dashboard-table-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTableWidgetComponent implements TableWidgetConfig, OnDestroy {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @ViewChild('widget') widget: DashboardWidgetComponent;
    @Input() header: ReadonlyArray<string> = [];
    @Input() data: ReadonlyArray<ReadonlyArray<string>> = [];

    private _isDragged: boolean = false;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnDestroy() {
        this.widget.dashboardService.isDragging$.unsubscribe();
    }

    @HostListener('window:mousemove', [])
    onMouseEvent() {
        if (this._isDragged) {
            this.changeDetectorRef.markForCheck();
        }
    }
}
