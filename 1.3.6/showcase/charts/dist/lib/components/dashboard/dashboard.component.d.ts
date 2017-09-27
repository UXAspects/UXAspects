import { OnInit, DoCheck, ElementRef, AfterViewInit, NgZone, EventEmitter } from '@angular/core';
import { DashboardService, DashboardLayoutData, DashboardPlaceholder } from './dashboard.service';
import { ResizeDimensions } from '../../directives/resize/resize.service';
export declare class DashboardComponent implements OnInit, DoCheck, AfterViewInit {
    private _dashboardService;
    private _elementRef;
    private _ngZone;
    options: DashboardOptions;
    layout: DashboardLayoutData[];
    layoutChange: EventEmitter<DashboardLayoutData[]>;
    height: number;
    placeholder: DashboardPlaceholder;
    private _nativeElement;
    private _options;
    private _layout;
    constructor(_dashboardService: DashboardService, _elementRef: ElementRef, _ngZone: NgZone);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    setOptions(options: DashboardOptions): void;
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
