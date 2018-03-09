import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'nested-donut'
})
export class NestedDonutNg1Component extends UpgradeComponent {

    @Input() dataset: any;
    @Input() options: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxNestedDonutNg1', elementRef, injector);
    }
}