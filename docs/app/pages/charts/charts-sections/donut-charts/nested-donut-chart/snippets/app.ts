import { Component } from '@angular/core';
import { Color, ColorService, NestedDonutChartData } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    dataset: ReadonlyArray<NestedDonutChartData> = [
        { name: 'To be retained', value: 42, color: this._colorService.getColor(Color.Ok).toHex() },
        { name: 'Potentially sensitive', value: 33, color: this._colorService.getColor(Color.Warning).toHex() },
        { name: 'Sensitive', value: 9, color: this._colorService.getColor(Color.Critical).toHex() }
    ];

    constructor(private _colorService: ColorService) { }
}