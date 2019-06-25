import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'sort-direction-toggle'
})
export class SortDirectionToggleNg1Component extends UpgradeComponent {

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