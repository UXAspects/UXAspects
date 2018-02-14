import { ElementRef, Injector, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class FlotComponent extends UpgradeComponent {
    dataset: any;
    options: any;
    callback: any;
    donutLabels: any;
    onPlotClick: EventEmitter<any>;
    onPlotHover: EventEmitter<any>;
    constructor(elementRef: ElementRef, injector: Injector);
}
