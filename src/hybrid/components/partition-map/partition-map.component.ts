import { Directive, ElementRef, Injector, SimpleChanges, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-partition-map-ng1'
})
export class PartitionMapComponent extends UpgradeComponent {

    @Input() chartData: any;
    @Input() chartOptions: any;
    @Input() chartLoading: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxPartitionMapNg1', elementRef, injector);
    }
}