import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'pie-chart'
})
export class PeityPieChartComponent extends UpgradeComponent {

    @Input() data: any;
    @Input() options: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxPeityPieChartNg1', elementRef, injector);
    }
}