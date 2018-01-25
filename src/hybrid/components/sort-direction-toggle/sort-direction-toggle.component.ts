import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-sort-direction-toggle-ng1'
})
export class SortDirectionToggleComponent extends UpgradeComponent {

    @Input() label: string;
    @Input() sorters: SortDirectionToggleSorter[];
    @Input() descend: boolean;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('sortDirectionToggle', elementRef, injector);
    }
}

export interface SortDirectionToggleSorter {
    name: string;
    sort: string;
    defaultSorter: boolean;
    select: Function;
}