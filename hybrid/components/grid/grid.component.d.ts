import { ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class GridNg1Component extends UpgradeComponent {
    source: any[];
    columns: GridColumn[];
    /**
     * The following inputs are undocumented
     */
    options: any;
    events: any;
    plugins: any;
    constructor(elementRef: ElementRef, injector: Injector);
}
export interface GridColumn {
    title: string;
    template: string;
    width?: string;
}
