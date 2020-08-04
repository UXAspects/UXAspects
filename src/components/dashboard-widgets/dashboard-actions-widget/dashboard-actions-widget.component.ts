import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, HostListener,
    Input, OnDestroy,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { ActionConfig, ActionsWidgetConfig } from '../interfaces/actions-widget';
import { DashboardWidgetComponent } from '../../dashboard';
import { Subject } from 'rxjs';

@Component({
    selector: 'ux-dashboard-actions-widget',
    templateUrl: './dashboard-actions-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardActionsWidgetComponent implements ActionsWidgetConfig, AfterViewInit, OnDestroy {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @ViewChild('widget') widget: DashboardWidgetComponent;
    @Input() status: { label: string, icon: string | TemplateRef<any> } = { label: '-', icon: 'radial' };
    @Input() actions: ReadonlyArray<ActionConfig>;

    private _isDragged: boolean = false;
    private _onDestroy = new Subject<void>();

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.widget.dashboardService.isDragging$.subscribe((widget) => {
            if (widget) {
                if (widget.id === this.id) {
                    this._isDragged = true;
                }
            } else {
                this._isDragged = false;
            }
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener('window:mousemove', [])
    onMouseEvent() {
        if (this._isDragged) {
            this.changeDetectorRef.markForCheck();
        }
    }
}
