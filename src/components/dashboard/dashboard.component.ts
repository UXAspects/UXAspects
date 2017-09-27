import { Component, Input, OnInit, DoCheck, ElementRef, AfterViewInit, NgZone, EventEmitter, Output } from '@angular/core';
import { DashboardService, DashboardLayoutData, DashboardPlaceholder } from './dashboard.service';
import { ResizeDimensions } from '../../directives/resize/resize.service';

@Component({
    selector: 'ux-dashboard',
    templateUrl: './dashboard.component.html',
    providers: [DashboardService],
    host: {
        '[style.height.px]': 'height'
    }
})
export class DashboardComponent implements OnInit, DoCheck, AfterViewInit {

    @Input() options: DashboardOptions = {};
    @Input() layout: DashboardLayoutData[];
    @Output() layoutChange: EventEmitter<DashboardLayoutData[]> = new EventEmitter<DashboardLayoutData[]>();

    height: number = 0;
    placeholder: DashboardPlaceholder = this._dashboardService.getPlaceholder();

    private _nativeElement: HTMLElement;
    private _options: DashboardOptions;
    private _layout: DashboardLayoutData[];

    constructor(private _dashboardService: DashboardService, private _elementRef: ElementRef, private _ngZone: NgZone) {
        this._nativeElement = _elementRef.nativeElement;
        this._dashboardService.setDashboard(this._nativeElement);

        // watch for changes to component height
        this._dashboardService.height.subscribe(height => this.height = height);

        // subscribe to layout changes
        this._dashboardService.layout.subscribe(layout => {
            this.layout = layout;
            this.layoutChange.emit(layout);
        });
    }

    ngOnInit(): void {
        this.setOptions(this.options);
    }

    ngDoCheck(): void {

        // get the current set of options
        let options = Object.assign({}, this._dashboardService.getDefaultOptions(), this.options);

        // if anything has changed then update them
        if (JSON.stringify(this._dashboardService.getOptions()) !== JSON.stringify(options)) {
            this.setOptions(options);
        }

        // check if the layout has changed
        if (JSON.stringify(this.layout) !== JSON.stringify(this._layout)) {
            this._layout = this.layout.slice();
            this._dashboardService.setLayoutData(this.layout);
        }
    }

    ngAfterViewInit(): void {
        // initially set dimensions
        this._dashboardService.setDimensions(this._nativeElement.offsetWidth, this._nativeElement.offsetHeight);
    }

    setOptions(options: DashboardOptions): void {
        this._dashboardService.setOptions(options);
    }

    onResize(event: ResizeDimensions): void {
        // ensure this gets run inside Angular
        this._ngZone.run(() => {
            this._dashboardService.setDimensions(event.width, event.height);
        });
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