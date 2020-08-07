import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input, OnDestroy,
    ViewChild
} from '@angular/core';
import { PredefinedWidgetConfig } from './interfaces/predefined-widget';
import { DashboardWidgetComponent } from '../dashboard';
import { fromEvent, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ux-predefined-widget',
    templateUrl: './dashboard-predefined-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPredefinedWidgetComponent implements PredefinedWidgetConfig, AfterViewInit, OnDestroy {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @ViewChild('widget') widget: DashboardWidgetComponent;

    private _dragging: boolean = false;

    /** Ensure we unsubscribe from all observables */
    private _onDestroy = new Subject<void>();

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        fromEvent(this.elementRef.nativeElement, 'mousedown').pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this._dragging = true;
        });
        fromEvent(document, 'mousemove').pipe(takeUntil(this._onDestroy)).subscribe(() => {
            if (this._dragging) {
                this.widget.dashboardService.renderDashboard();
            }
        });
        fromEvent(document, 'mouseup').pipe(takeUntil(this._onDestroy), delay(0)).subscribe(() => {
            if (this._dragging) {
                this.widget.dashboardService.renderDashboard();
            }
            this._dragging = false;
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
