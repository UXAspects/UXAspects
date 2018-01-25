import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-flot-ng1'
})
export class FlotComponent extends UpgradeComponent {

    @Input() dataset: any;
    @Input() options: any;
    @Input() callback: any;
    @Input() donutLabels: any;
    @Output() onPlotClick = new EventEmitter<any>();
    @Output() onPlotHover = new EventEmitter<any>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxFlotNg1', elementRef, injector);
    }
}