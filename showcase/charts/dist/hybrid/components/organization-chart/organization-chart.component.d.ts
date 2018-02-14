import { ElementRef, Injector, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class OrganizationChartComponent extends UpgradeComponent {
    data: any;
    options: any;
    dataChange: EventEmitter<any>;
    optionsChange: EventEmitter<any>;
    constructor(elementRef: ElementRef, injector: Injector);
}
