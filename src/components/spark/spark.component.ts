import { Component, Input } from '@angular/core';
import { ColorService } from '../../services/color/index';

@Component({
    selector: 'ux-spark',
    templateUrl: './spark.component.html'
})
export class SparkComponent {

    @Input() trackColor: string = this.colorService.getColor('primary').setAlpha(0.2).toRgba();
    @Input() barColor: string = this.colorService.getColor('primary').toHex();
    @Input() value: number = 0;
    @Input() barHeight: number = 10;
    @Input() inlineLabel: string;
    @Input() topLeftLabel: string;
    @Input() topRightLabel: string;
    @Input() bottomLeftLabel: string;
    @Input() bottomRightLabel: string;
    @Input() tooltip: string;

    constructor(private colorService: ColorService) { }

}
