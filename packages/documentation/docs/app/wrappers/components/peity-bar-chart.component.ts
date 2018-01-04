import { Directive, ElementRef, Injector, SimpleChanges, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-peity-bar-chart-ng1'
})
export class PeityBarChartComponent extends UpgradeComponent {

    @Input() data: any;
    @Input() options: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxPeityBarChartNg1', elementRef, injector);
    }
}