import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'expand-input'
})
export class ExpandInputNg1Component extends UpgradeComponent {

    @Input() elname: string;
    @Input() placeHolder: string;
    @Input() className: string;
    @Input() clearTextIcon: string;
    @Input() closeSearch: string;
    @Input() expandAlways: boolean;
    @Input() onEnter: Function;

    // tslint:disable-next-line
    @Output() focus: EventEmitter<string> = new EventEmitter<string>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('expandInput', elementRef, injector);
    }
}