import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions, TooltipItem } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  lineChartData: ChartDataset<'line'>[];

  lineChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
  lineChartOptions: ChartOptions<'line'>;
  lineChartLegend: boolean = false;
  lineChartColors: any;

  constructor(colorService: ColorService) {
    const tooltipBackgroundColor = colorService.getColor('grey2').toHex();
    const lineBorderColor1 = colorService.getColor('chart1').toRgb();
    const lineFillColor1 = colorService.getColor('chart1').setAlpha(0.1).toRgba();
    const lineForecastFillColor1 = colorService.getColor('chart1').setAlpha(0.06).toRgba();
    const pointBorderColor1 = colorService.getColor('chart1').setAlpha(0.5).toRgba();

    const lineBorderColor2 = colorService.getColor('chart2').toRgb();
    const lineFillColor2 = colorService.getColor('chart2').setAlpha(0.1).toRgba();
    const lineForecastFillColor2 = colorService.getColor('chart2').setAlpha(0.06).toRgba();
    const pointBorderColor2 = colorService.getColor('chart2').setAlpha(0.5).toRgba();

    const lineBorderColor3 = colorService.getColor('chart3').toRgb();
    const lineFillColor3 = colorService.getColor('chart3').setAlpha(0.1).toRgba();
    const lineForecastFillColor3 = colorService.getColor('chart3').setAlpha(0.06).toRgba();
    const pointBorderColor3 = colorService.getColor('chart3').setAlpha(0.5).toRgba();

    this.lineChartData = [
      {
        data: this.getRandomData(),
        borderWidth: 1,
        borderColor: lineBorderColor1,
        backgroundColor: lineFillColor1,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointHoverBorderColor: pointBorderColor1,
        pointHoverBorderWidth: 3,
        pointHoverRadius: 5,
        pointHitRadius: 5,
        fill: 'origin',
      },
      {
        data: this.getRandomData(),
        borderWidth: 1,
        borderColor: lineBorderColor2,
        backgroundColor: lineFillColor2,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointHoverBorderColor: pointBorderColor2,
        pointHoverBorderWidth: 3,
        pointHoverRadius: 5,
        pointHitRadius: 5,
        fill: 'origin',
      },
      {
        data: this.getRandomData(),
        borderWidth: 1,
        borderColor: lineBorderColor3,
        backgroundColor: lineFillColor3,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointHoverBorderColor: pointBorderColor3,
        pointHoverBorderWidth: 3,
        pointHoverRadius: 5,
        pointHitRadius: 5,
        fill: 'origin',
      },
    ];

    this.lineChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      hover: {
        mode: 'nearest',
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      scales: {
        ticks: {
          min: 0,
          max: 25000,
        },
        y: {
          stacked: true,
          min: 0,
          max: 30000,
          ticks: {
            stepSize: 5000,
            callback: value => `${value}€`,
          },
        },
      },
      plugins: {
        tooltip: {
          backgroundColor: tooltipBackgroundColor,
          cornerRadius: 0,
          callbacks: {
            title: () => '',
            label: (item: TooltipItem<'line'>) =>
              `Sales ${item.datasetIndex + 1} - ${item.formattedValue}€ in cycle ${item.dataIndex + 1}`,
          },
          displayColors: false,
        },
      },
    };
  }

  getRandomData(): number[] {
    const data: number[] = [];

    for (let idx = 0; idx < 13; idx++) {
      data.push(Math.floor(Math.random() * 10000));
    }

    return data;
  }
}
