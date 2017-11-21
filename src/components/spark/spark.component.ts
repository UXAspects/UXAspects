import { Component, Input } from '@angular/core';
import { ColorService } from '../../services/color/index';
import { ColorIdentifier } from '../../index';

@Component({
    selector: 'ux-spark',
    templateUrl: './spark.component.html'
})
export class SparkComponent {

    values: number[] = [];

    @Input() trackColor: string = this._colorService.getColor('primary').setAlpha(0.2).toRgba();
    @Input() barColor: string | string[] = this._colorService.getColor('primary').toHex();
    @Input() barHeight: number = 10;
    @Input() inlineLabel: string;
    @Input() topLeftLabel: string;
    @Input() topRightLabel: string;
    @Input() bottomLeftLabel: string;
    @Input() bottomRightLabel: string;
    @Input() tooltip: string;

    @Input()
    set theme(themeName: ColorIdentifier) {
        this.trackColor = this._colorService.getColor(themeName).setAlpha(0.2).toRgba();
        this.barColor = this._colorService.getColor(themeName).toHex();
    }

    @Input()
    set value(value: number | number[]) {

        // ensure 'value' is an array at this point
        const values = Array.isArray(value) ? value : [value];

        // get the total value of all lines
        let total = Math.max(values.reduce((previous, current) => previous + current, 0), 100);

        // figure out the percentages for each spark line
        this.values = values.map(val => (val / total) * 100);

        // ensure 'barColor' is an array
        this.barColor = Array.isArray(this.barColor) ? this.barColor : [this.barColor];
    }

    get value() {
        return this.values;
    }

    constructor(private _colorService: ColorService) { 

    }
}