import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-expand-input-ng1'
})
export class ExpandInputComponent extends UpgradeComponent {

    @Input() elname: string;
    @Input() placeHolder: string;
    @Input() className: string;
    @Input() clearTextIcon: string;
    @Input() closeSearch: string;
    @Input() expandAlways: boolean;
    @Input() onEnter: Function;

    @Output() focus: EventEmitter<string> = new EventEmitter<string>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('expandInput', elementRef, injector);
    }
}