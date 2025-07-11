import { Component, ViewChild } from '@angular/core';
import { ColorService, TimelineChartOptions } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions, ScatterDataPoint } from 'chart.js';
import 'chartjs-adapter-moment';
import { BaseChartDirective } from 'ng2-charts';
import { TimelineChartService } from './timeline-chart.service';

const DATE_LOCALE_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimelineChartService],
})
export class AppComponent {
  @ViewChild(BaseChartDirective, { static: true }) baseChart?: BaseChartDirective;

  lineChartData: ChartDataset<'line'>[];
  lineChartOptions: ChartOptions<'line'>;

  timelineChartData: ChartDataset<'line'>[];
  timelineChartOptions: ChartOptions & TimelineChartOptions;

  constructor(
    private readonly _dataService: TimelineChartService,
    private readonly _colorService: ColorService
  ) {
    this.lineChartData = [
      {
        data: this._dataService.getDataset() as ScatterDataPoint[],
        backgroundColor: this._colorService.getColor('alternate3').setAlpha(0.8).toRgba(),
        borderColor: 'transparent',
        pointRadius: 0,
        pointHitRadius: 0,
        borderWidth: 1,
        fill: 'origin',
      },
    ];

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      scales: {
        x: {
          type: 'time',
          grid: {
            display: false,
          },
          time: {
            unit: 'month',
          },
        },
        y: {
          beginAtZero: true,
          max: 1000,
          ticks: {
            stepSize: 250,
            padding: 8,
          },
        },
      },
    };

    this.timelineChartData = [
      {
        data: this._dataService.getDataset() as ScatterDataPoint[],
        backgroundColor: this._colorService.getColor('alternate3').setAlpha(0.8).toRgba(),
        borderColor: 'transparent',
        pointRadius: 0,
        pointHitRadius: 0,
        borderWidth: 1,
        fill: 'origin',
      },
    ];

    this.timelineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      scales: {
        x: {
          type: 'time',
          grid: {
            display: false,
          },
          time: {
            unit: 'month',
            stepSize: 6,
          },
        },
        y: {
          display: false,
        },
      },
      timeline: {
        handles: {
          tooltip: {
            label: () => {
              const data = this.lineChartData[0].data as ScatterDataPoint[];
              const rangeLower = (data[0].x as unknown as Date).toLocaleDateString(
                [],
                DATE_LOCALE_OPTIONS
              );
              const rangeUpper = (data[data.length - 1].x as unknown as Date).toLocaleDateString(
                [],
                DATE_LOCALE_OPTIONS
              );
              return { rangeLower, rangeUpper };
            },
          },
        },
        selectionColor: this._colorService.getColor('alternate3').setAlpha(0.15).toRgba(),
        onChange: (min: Date, max: Date) => {
          this.lineChartData[0].data = this._dataService.getDataset().filter((point: any) => {
            return point.x.getTime() >= min.getTime() && point.x.getTime() <= max.getTime();
          });
          this.baseChart?.update();
        },
        range: {
          lower: new Date(2017, 6, 15),
          upper: (this.lineChartData[0].data as ScatterDataPoint[])[
            this.lineChartData[0].data.length - 1
          ].x as unknown as Date,
          minimum: 8_640_000_000, // 100 days
          maximum: 110_595_600_000, // 3.5 years
          tooltip: {
            label: () => {
              const data = this.lineChartData[0].data as ScatterDataPoint[];
              const rangeLower = (data[0].x as unknown as Date).toLocaleDateString(
                [],
                DATE_LOCALE_OPTIONS
              );
              const rangeUpper = (data[data.length - 1].x as unknown as Date).toLocaleDateString(
                [],
                DATE_LOCALE_OPTIONS
              );
              const label = `${rangeLower} - ${rangeUpper}`;
              return label;
            },
          },
        },
      },
    };
  }
}
