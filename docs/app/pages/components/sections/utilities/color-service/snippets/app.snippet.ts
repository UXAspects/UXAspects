import { ColorService, ThemeColor } from 'ux-aspects';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent {

    // ...

    constructor(public colorService: ColorService) {

        this.donutChartColors = [
            {
                backgroundColor: [
                    colorService.getColor('chart1').toRgb(),
                    colorService.getColor('chart2').toRgb(),
                    colorService.getColor('chart3').toRgb(),
                ],
                hoverBackgroundColor: [
                    colorService.getColor('chart1').setAlpha(0.3).toRgba(),
                    colorService.getColor('chart2').setAlpha(0.3).toRgba(),
                    colorService.getColor('chart3').setAlpha(0.3).toRgba(),
                ]
            }
        ];
    }
}