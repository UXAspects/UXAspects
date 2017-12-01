import { Component, Input } from '@angular/core';
import { ColorService } from '../../services/color/index';
import { ColorIdentifier } from '../../index';

@Component({
    selector: 'ux-spark',
    templateUrl: './spark.component.html'
})
export class SparkComponent {

    values: number[] = [];

    @Input() barHeight: number = 10;
    @Input() inlineLabel: string;
    @Input() topLeftLabel: string;
    @Input() topRightLabel: string;
    @Input() bottomLeftLabel: string;
    @Input() bottomRightLabel: string;
    @Input() tooltip: string;
    @Input() theme: ColorIdentifier = 'primary';
    
    private _trackColor: string;
    private _barColor: string | string[];

    @Input() 
    set trackColor(value: string) {
        this._trackColor = this._colorService.resolve(value);
    }

    get trackColor(): string {
        return this._trackColor;
    }

    @Input() 
    set barColor(value: string | string[]) {

        if (Array.isArray(value)) {
            this._barColor = value.map(color => this._colorService.resolve(color));
        } else {
            this._barColor = this._colorService.resolve(value);
        }
    }

    get barColor(): string | string[] {
        return this._barColor;
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