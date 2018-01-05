import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ColorService } from '../../services/color/index';

@Component({
    selector: 'ux-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent implements OnChanges {

    @Input() value: number = 0;
    @Input() max: number = 100;
    @Input() trackColor: string = this.colorService.getColor('grey7').toHex();
    @Input() barColor: string = this.colorService.getColor('accent').toHex();

    percentage: number = 0;

    constructor(private colorService: ColorService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.percentage = (this.value / this.max) * 100;
    }
}
