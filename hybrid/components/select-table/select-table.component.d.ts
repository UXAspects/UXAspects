import { ElementRef, EventEmitter, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class SelectTableNg1Component extends UpgradeComponent {
    values: any[];
    multipleSelect: boolean;
    selectKey: string;
    selected: string;
    searchText: string;
    tableHeight: string;
    template: string;
    templateUrl: string;
    selectHiddenItems: 'clear' | 'reselect';
    selectedChange: EventEmitter<string>;
    constructor(elementRef: ElementRef, injector: Injector);
}
