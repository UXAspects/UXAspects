import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'bar-chart'
})
export class PeityBarChartNg1Component extends UpgradeComponent {

    @Input() data: any;
    @Input() options: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxPeityBarChartNg1', elementRef, injector);
    }
}