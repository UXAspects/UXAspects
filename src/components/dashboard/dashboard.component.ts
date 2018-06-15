import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ResizeDimensions } from '../../directives/resize/resize.service';
import { DashboardLayoutData, DashboardService, defaultOptions } from './dashboard.service';

@Component({
    selector: 'ux-dashboard',
    templateUrl: './dashboard.component.html',
    providers: [DashboardService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements AfterViewInit {

    @Input() set layout(layout: DashboardLayoutData[]) {
        if (layout) {
            this.dashboardService.layout$.next(layout);
        }
    }

    @Input() set options(options: DashboardOptions) {
        this.dashboardService.options$.next({ ...defaultOptions, ...options });
    }

    @Output() layoutChange = new EventEmitter<DashboardLayoutData[]>();

    @ViewChild('dashboard') dashboardElement: ElementRef;

    constructor(public dashboardService: DashboardService) {
        dashboardService.layout$.subscribe(layout => this.layoutChange.emit(layout));
    }

    /**
     * Set the initial dimensions
     */
    ngAfterViewInit(): void {
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
    }

    onResize(event: ResizeDimensions): void {
        this.dashboardService.setDimensions(event.width, event.height);
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