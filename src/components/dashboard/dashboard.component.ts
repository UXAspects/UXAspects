import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Output, QueryList, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
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
export class DashboardComponent implements AfterViewInit, AfterContentInit, OnDestroy, OnChanges {

    isGrabbing: boolean = false;

    @Input('aria-label') customAriaLabel: (widgets: DashboardWidgetComponent[], options: DashboardOptions) => string | string = this.getDefaultAriaLabel;

    /** If defined or changed this will set the positions of the widgets within the dashboard. This is a two way binding that will be updated with the current layout when it changes. */
    @Input() set layout(layout: DashboardLayoutData[]) {
        if (layout) {
            this.dashboardService.layout$.next(layout);
        }
    }

    /** Configures the options for the dashboard, if an option is not specified the default value will be used. */
    @Input() set options(options: DashboardOptions) {
        this.dashboardService.options$.next({ ...defaultOptions, ...options });
    }

    /** Emits when layout has been changed. */
    @Output() layoutChange = new EventEmitter<DashboardLayoutData[]>();

    @HostBinding('attr.aria-label') ariaLabel: string;

    @ViewChild('dashboard', { static: true }) dashboardElement: ElementRef;

    /** Find all grab handles used in the dashboard */
    @ContentChildren(DashboardGrabHandleDirective, { descendants: true }) handles: QueryList<DashboardGrabHandleDirective>;

    /** Ensure we unsubscribe from all observables */
    private _onDestroy = new Subject<void>();

    constructor(public dashboardService: DashboardService, private readonly _changeDetector: ChangeDetectorRef) {

        dashboardService.layout$.pipe(takeUntil(this._onDestroy), tap(() => this.ariaLabel = this.getAriaLabel()))
            .subscribe(() => _changeDetector.markForCheck());

        dashboardService.userLayoutChange$.pipe(takeUntil(this._onDestroy)).subscribe(data => this.layoutChange.emit(data));

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

    ngAfterContentInit(): void {
        this.dashboardService.initialized$.next(true);
    }

    ngOnChanges(): void {
        this.dashboardService.renderDashboard();
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

    /** Shift widgets up where possible to fill any available space to optimize the dashboard layout */
    refreshLayout(): void {
        const didChangeLayout = this.dashboardService.shiftWidgetsUp();

        if (didChangeLayout) {
            // if widgets have shifted up the dashboard may no longer occupy the same
            // height. We should remove any unneeded whitespace below widgets too.
            this.dashboardService.setDashboardHeight();

            // emit information about the layout
            this.dashboardService.layout$.next(this.dashboardService.getLayoutData());
            this.layoutChange.emit(this.dashboardService.layout$.value);
        }
    }

    private getDefaultAriaLabel(widgets: DashboardWidgetComponent[], options: DashboardOptions): string {
        return `Dashboard with ${ options.columns } columns, containing ${ widgets.length } panels. ${ widgets.map(this.getWidgetAriaLabel).join(' ') }`;
    }

    private getWidgetAriaLabel(widget: DashboardWidgetComponent): string {
        return `${ widget.name } panel in row ${ widget.getRow() }, column ${ widget.getColumn() }, is ${ widget.getColumnSpan() } columns wide and ${ widget.getRowSpan() } rows high.`;
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
