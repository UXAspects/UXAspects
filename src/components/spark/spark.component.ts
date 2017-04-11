import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-spark',
    templateUrl: './spark.component.html',
    styleUrls: ['./spark.component.less']
})
export class SparkComponent {

    @Input() trackColor: string = 'rgba(1, 169, 130, 0.1)';
    @Input() barColor: string = '#01A982';
    @Input() value: number;
    @Input() fillHeight: number = 10;
    @Input() inlineLabel: string;
    @Input() topLeftLabel: string;
    @Input() topRightLabel: string;
    @Input() bottomLeftLabel: string;
    @Input() bottomRightLabel: string;

    constructor() { }
}
