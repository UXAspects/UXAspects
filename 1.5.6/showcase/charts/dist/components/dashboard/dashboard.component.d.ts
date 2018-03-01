import { ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { DashboardService, DashboardLayoutData } from './dashboard.service';
import { ResizeDimensions } from '../../directives/resize/resize.service';
export declare class DashboardComponent implements AfterViewInit {
    dashboardService: DashboardService;
    layout: DashboardLayoutData[];
    options: DashboardOptions;
    layoutChange: EventEmitter<DashboardLayoutData[]>;
    dashboardElement: ElementRef;
    constructor(dashboardService: DashboardService);
    /**
     * Set the initial dimensions
     */
    ngAfterViewInit(): void;
    onResize(event: ResizeDimensions): void;
}
export interface DashboardOptions {
    columns?: number;
    padding?: number;
    minWidth?: number;
    minHeight?: number;
    rowHeight?: number;
    emptyRow?: boolean;
}
