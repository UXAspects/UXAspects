import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'select-table'
})
export class SelectTableNg1Component extends UpgradeComponent {

    @Input() values: any[];
    @Input() multipleSelect: boolean;
    @Input() selectKey: string;
    @Input() selected: string;
    @Input() searchText: string;
    @Input() tableHeight: string;
    @Input() template: string;
    @Input() templateUrl: string;
    @Input() selectHiddenItems: 'clear' | 'reselect';

    @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('selectTable', elementRef, injector);
    }
}