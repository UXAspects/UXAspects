import { Directive, ElementRef, Injector, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-select-table-ng1'
})
export class SelectTableComponent extends UpgradeComponent {

    @Input() values: any[];
    @Input() multipleSelect: boolean;
    @Input() selectKey: string;
    @Input() selected: string;
    @Input() searchText: string;
    @Input() tableHeight: string;
    @Input() selectHiddenItems: 'clear' | 'reselect';

    @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('selectTable', elementRef, injector);
    }
}