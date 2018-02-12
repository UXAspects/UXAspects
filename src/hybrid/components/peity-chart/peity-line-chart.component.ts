import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'line-chart'
})
export class PeityLineChartNg1Component extends UpgradeComponent {

    @Input() data: any;
    @Input() options: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxPeityLineChartNg1', elementRef, injector);
    }
}