import { ElementRef, Injector, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class SelectTableComponent extends UpgradeComponent {
    values: any[];
    multipleSelect: boolean;
    selectKey: string;
    selected: string;
    searchText: string;
    tableHeight: string;
    selectHiddenItems: 'clear' | 'reselect';
    selectedChange: EventEmitter<string>;
    constructor(elementRef: ElementRef, injector: Injector);
}
