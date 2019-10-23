import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-spark-ng1'
})
export class SparkChartComponent extends UpgradeComponent {

    @Input() type: any;
    @Input() value: any;
    @Input() fillheight: any;
    @Input() inlineLabel: any;
    @Input() top: any;
    @Input() topLeftLabel: any;
    @Input() topRightLabel: any;
    @Input() bottomLeftLabel: any;
    @Input() bottomRightLabel: any;
    @Input() sparkTooltip: any;
    @Input() sparkTooltips: any;
    @Input() barColor: any;
    @Input() trackColor: any;
    @Output() segmentClick = new EventEmitter<any>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxSparkNg1', elementRef, injector);
    }
}