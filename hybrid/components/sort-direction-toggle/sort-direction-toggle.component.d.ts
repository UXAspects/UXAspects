import { ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class SortDirectionToggleNg1Component extends UpgradeComponent {
    label: string;
    sorters: SortDirectionToggleSorter[];
    descend: boolean;
    constructor(elementRef: ElementRef, injector: Injector);
}
export interface SortDirectionToggleSorter {
    name: string;
    sort: string;
    defaultSorter: boolean;
    select: Function;
}
