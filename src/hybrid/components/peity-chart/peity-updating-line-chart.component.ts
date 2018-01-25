import { Directive, ElementRef, Injector, SimpleChanges, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-peity-updating-line-chart-ng1'
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