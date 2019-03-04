import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, QueryList, ViewChild } from '@angular/core';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ResizeDimensions } from '../../directives/resize/resize.service';
import { DashboardLayoutData, DashboardService, defaultOptions } from './dashboard.service';
import { DashboardGrabHandleDirective } from './grab-handle/grab-handle.directive';
import { DashboardGrabHandleService } from './grab-handle/grab-handle.service';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';

@Component({
    selector: 'ux-dashboard',
    templateUrl: './dashboard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DashboardService,
        DashboardGrabHandleService
    ]
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

    isGrabbing: boolean = false;

    @Input('aria-label') customAriaLabel: (widgets: DashboardWidgetComponent[], options: DashboardOptions) => string | string = this.getDefaultAriaLabel;

    @Input() set layout(layout: DashboardLayoutData[]) {
        if (layout) {
            this.dashboardService.layout$.next(layout);
        }
    }

    @Input() set options(options: DashboardOptions) {
        this.dashboardService.options$.next({ ...defaultOptions, ...options });
    }

    @Output() layoutChange = new EventEmitter<DashboardLayoutData[]>();

    @HostBinding('attr.aria-label') ariaLabel: string;

    @ViewChild('dashboard') dashboardElement: ElementRef;

    /** Find all grab handles used in the dashboard */
    @ContentChildren(DashboardGrabHandleDirective, { descendants: true }) handles: QueryList<DashboardGrabHandleDirective>;

    /** Ensure we unsubscribe from all observables */
    private _onDestroy = new Subject<void>();

    constructor(public dashboardService: DashboardService, private _grabHandleService: DashboardGrabHandleService) {

        dashboardService.layout$.pipe(takeUntil(this._onDestroy), tap(() => this.ariaLabel = this.getAriaLabel()))
            .subscribe(layout => this.layoutChange.emit(layout));

        // subscribe to changes to the grab mode
        dashboardService.isGrabbing$.pipe(takeUntil(this._onDestroy), map(widget => !!widget))
            .subscribe(isGrabbing => this.isGrabbing = isGrabbing);
    }

    /**
     * Set the initial dimensions
     */
    ngAfterViewInit(): void {
        // set the initial dimensions
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onResize(event: ResizeDimensions): void {
        this.dashboardService.setDimensions(event.width, event.height);
    }

    getAriaLabel(): string {
        if (this.customAriaLabel && typeof this.customAriaLabel === 'string') {
            return this.customAriaLabel;
        } else if (this.customAriaLabel && typeof this.customAriaLabel === 'function') {
            return this.customAriaLabel(this.dashboardService.widgets, this.dashboardService.options);
        }

        return this.ariaLabel;
    }

    private getDefaultAriaLabel(widgets: DashboardWidgetComponent[], options: DashboardOptions): string {
        return `Dashboard with ${options.columns} columns, containing ${widgets.length} panels. ${widgets.map(this.getWidgetAriaLabel).join(' ')}`;
    }

    private getWidgetAriaLabel(widget: DashboardWidgetComponent): string {
        return `${widget.name} panel in row ${widget.getRow()}, column ${widget.getColumn()}, is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high.`;
    }
}

export interface DashboardOptions {
    columns?: number;
    padding?: number;
    minWidth?: number;
    minHeight?: number;
    rowHeight?: number;
    emptyRow?: boolean;
}