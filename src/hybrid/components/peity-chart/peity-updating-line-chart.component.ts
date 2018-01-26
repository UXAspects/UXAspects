import { Directive, ElementRef, Injector, SimpleChanges, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'updating-line-chart'
})
export class PeityUpdatingLineChartComponent extends UpgradeComponent {

    @Input() data: any;
    @Input() options: any;
    @Input() method: any;
    @Input() updateinterval: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxPeityUpdatingLineChartNg1', elementRef, injector);
    }
}