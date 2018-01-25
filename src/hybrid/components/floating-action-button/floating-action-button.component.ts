import { Directive, ElementRef, Injector, Input, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-floating-action-button-ng1'
})
export class FloatingActionButtonComponent extends UpgradeComponent {

    @Input() items: FloatingActionButtonItem[] = [];
    @Input() primary: string;
    @Input() direction: 'top' | 'right' | 'bottom' | 'left';

    constructor(elementRef: ElementRef, injector: Injector) {
        super('floatingActionButton', elementRef, injector);
    }
}

export interface FloatingActionButtonItem {
    icon: string;
    event: Function;
}