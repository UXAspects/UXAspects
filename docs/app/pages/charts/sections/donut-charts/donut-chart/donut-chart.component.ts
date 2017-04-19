import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';

@Component({
    selector: 'uxd-charts-donut-chart',
    templateUrl: './donut-chart.component.html'
})
@DocumentationSectionComponent('ChartsDonutChartComponent')
export class ChartsDonutChartComponent {

    // configure the directive data
    donutChartData: Chart.ChartData = [{
        data: [25, 15, 18, 20, 10],
        borderWidth: 0
    }];

    donutChartLabels: string[] = ['Sales 1', 'Sales 2', 'Sales 3', 'Sales 4', 'Sales 5'];
    donutChartOptions: Chart.ChartOptions;
    donutChartLegend: boolean = true;
    donutChartColors: any;

    constructor(colorService: ColorService) {

        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();

        this.donutChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            cutoutPercentage: 70,
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 12
                }
            },
            tooltips: {
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem, data: any) => {

                        // get the dataset (we only have one)
                        let dataset = data.datasets[0];

                        // calculate the total of all segment values
                        let total = dataset.data.reduce((previousValue: any, currentValue: any) => {
                            return previousValue + currentValue;
                        });

                        // get the value of the current segment
                        let segmentValue = dataset.data[item.index];

                        // calculate the percentage of the current segment compared to the total
                        let precentage = Math.round(((segmentValue / total) * 100));

                        return `${ precentage }%, Sales ${ item.index + 1 }`;
                    }
                },
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                displayColors: false
            } as any
        };

        this.donutChartColors = [
            {
                backgroundColor: [
                    colorService.getColor('chart1').toRgb(),
                    colorService.getColor('chart2').toRgb(),
                    colorService.getColor('chart3').toRgb(),
                    colorService.getColor('chart4').toRgb(),
                    colorService.getColor('chart5').toRgb()
                ]
            }
        ];

        // let borderColor = colorService.getColor('grey2').setAlpha(0.5).toRgba();
        // let tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        // let barBackgroundColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        // let barHoverBackgroundColor = colorService.getColor('chart1').setAlpha(0.2).toRgba();
        // let barBorderColor = colorService.getColor('chart1').toHex();

        // this.barChartOptions = {
        //     maintainAspectRatio: false,
        //     responsive: true,
        //     scales: {
        //         xAxes: [{
        //             gridLines: {
        //                 color: 'transparent'
        //             }
        //         }],
        //         yAxes: [{
        //             barPercentage: 0.5,
        //             categoryPercentage: 1,
        //             gridLines: {
        //                 color: 'transparent'
        //             }
        //         } as Chart.ChartXAxe]
        //     },
        //     tooltips: {
        //         backgroundColor: tooltipBackgroundColor,
        //         cornerRadius: 0,
        //         callbacks: {
        //             title: (item: Chart.ChartTooltipItem[]) => {
        //                 return;
        //             },
        //             label: (item: Chart.ChartTooltipItem) => {
        //                 return `x: ${ item.xLabel }, y: ${ item.yLabel }`;
        //             }
        //         },
        //         displayColors: false
        //     } as any
        // };

        // this.barChartColors = [
        //     {
        //         backgroundColor: barBackgroundColor,
        //         hoverBackgroundColor: barHoverBackgroundColor,
        //         borderColor: barBorderColor
        //     }
        // ];

    }

}