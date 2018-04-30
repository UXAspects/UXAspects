import { ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class HierarchyBarNg1Component extends UpgradeComponent {
    data: any[];
    options: HierarchyBarOptions;
    selectNode: any;
    containerClass: any;
    constructor(elementRef: ElementRef, injector: Injector);
}
export interface HierarchyBarOptions {
    enabled: boolean;
    overview?: Function;
    image: Function;
    valueFormatter: Function;
    action?: {
        title: string;
        event: Function;
    };
}
