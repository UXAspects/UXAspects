import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-spark',
    templateUrl: './spark.component.html'
})
export class SparkComponent {

    // TODO: use color service
    @Input() trackColor: string = 'rgba(0, 167, 162, 0.2)';
    @Input() barColor: string = '#00a7a2';
    @Input() value: number;
    @Input() fillHeight: number = 10;
    @Input() inlineLabel: string;
    @Input() topLeftLabel: string;
    @Input() topRightLabel: string;
    @Input() bottomLeftLabel: string;
    @Input() bottomRightLabel: string;

    constructor() { }
}
