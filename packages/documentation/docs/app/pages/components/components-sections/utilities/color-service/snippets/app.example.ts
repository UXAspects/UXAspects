import { ColorService, ThemeColor } from '@ux-aspects/ux-aspects';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // color list
    public colorSet = ['primary', 'accent', 'secondary', 'alternate1', 'alternate2', 'alternate3', 'vibrant1', 'vibrant2', 'grey1', 'grey2', 'grey3', 'grey4', 'grey5', 'grey6', 'grey7', 'grey8', 'chart1', 'chart2', 'chart3', 'chart4', 'chart5', 'chart6', 'ok', 'warning', 'critical'];

    salesColorNames = ['chart1', 'chart2', 'chart3'];
    salesColorValues = this.salesColorNames.map(color => this.colorService.getColor(color).toHex());
    
    // configure the directive data
    donutChartData: Chart.ChartData = [{
        data: [33, 34, 33],
        borderWidth: 0
    }];

    donutChartOptions: Chart.ChartOptions;
    donutChartColors: any = [];

    constructor(public colorService: ColorService) {

        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();

        this.donutChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            cutoutPercentage: 70,
            tooltips: {
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem, data: any) => {
                        return `Sales ${item.index + 1}`;
                    }
                },
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                displayColors: false
            } as any
        };
    }

    ngOnInit() {
        this.colorNamesUpdated();
    }

    colorNamesUpdated() {
        this.salesColorValues = this.salesColorNames.map((colorName, index) => colorName ? this.colorService.getColor(colorName).toHex() : this.salesColorValues[index]);
        this.colorValuesUpdated();
    }

    colorValuesUpdated() {

        // check if all colors are valid
        for (let value of this.salesColorValues) {
            try {
                ThemeColor.parse(value);
            } catch (err) {
                return;
            }
        }

        const chartColors = this.salesColorValues.slice();
        const chartHoverColors = this.salesColorValues.map(color => ThemeColor.parse(color).setAlpha(0.3).toRgba());
        this.donutChartColors = [{
            backgroundColor: chartColors,
            hoverBackgroundColor: chartHoverColors
        }];

        this.salesColorValues.forEach((color, index) => {
            if (!this.colorSet.find(colorName => this.colorService.getColor(colorName).toHex() === color)) {
                this.salesColorNames[index] = '';
            }
        });
    }
}
