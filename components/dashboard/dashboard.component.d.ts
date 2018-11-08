import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { ResizeDimensions } from '../../directives/resize/resize.service';
import { DashboardLayoutData, DashboardService } from './dashboard.service';
import { DashboardGrabHandleDirective } from './grab-handle/grab-handle.directive';
import { DashboardGrabHandleService } from './grab-handle/grab-handle.service';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';
export declare class DashboardComponent implements AfterViewInit, OnDestroy {
    dashboardService: DashboardService;
    private _grabHandleService;
    isGrabbing: boolean;
    customAriaLabel: (widgets: DashboardWidgetComponent[], options: DashboardOptions) => string | string;
    layout: DashboardLayoutData[];
    options: DashboardOptions;
    layoutChange: EventEmitter<DashboardLayoutData[]>;
    ariaLabel: string;
    dashboardElement: ElementRef;
    /** Find all grab handles used in the dashboard */
    handles: QueryList<DashboardGrabHandleDirective>;
    /** Ensure we unsubscribe from all observables */
    private _onDestroy;
    constructor(dashboardService: DashboardService, _grabHandleService: DashboardGrabHandleService);
    /**
     * Set the initial dimensions
     */
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onResize(event: ResizeDimensions): void;
    getAriaLabel(): string;
    private getDefaultAriaLabel(widgets, options);
    private getWidgetAriaLabel(widget);
}
export interface DashboardOptions {
    columns?: number;
    padding?: number;
    minWidth?: number;
    minHeight?: number;
    rowHeight?: number;
    emptyRow?: boolean;
}
