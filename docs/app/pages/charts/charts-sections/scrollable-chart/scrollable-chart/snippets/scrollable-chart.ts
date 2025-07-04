import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions, TooltipItem } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // configure the directive data
  barChartData: ChartDataset<'bar'>[];

  barChartLabels: string[];
  barChartOptions: ChartOptions<'bar'>;
  barChartLegend: boolean = false;
  barChartColors: any;

  labels: string[] = [
    '.doc',
    '.ppt',
    '.pdf',
    '.xls',
    '.html',
    '.txt',
    '.png',
    '.bmp',
    '.gif',
    '.svg',
    '.ttf',
    '.wav',
  ];
  data: number[] = [34, 25, 19, 34, 32, 44, 12, 27, 15, 48, 40, 36];

  page: number = 0;
  pageSize: number = 4;

  constructor(colorService: ColorService) {
    this.barChartLabels = this.getPageLabels();

    // Prepare colors used in chart
    const gridColor = colorService.getColor('grey6').toHex();
    const barBackgroundColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
    const barHoverBackgroundColor = colorService.getColor('chart1').setAlpha(0.2).toRgba();
    const barBorderColor = colorService.getColor('chart1').toHex();
    const tooltipBackgroundColor = colorService.getColor('grey2').toHex();

    this.barChartData = [
      {
        data: this.getPageData(),
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 1,
        backgroundColor: barBackgroundColor,
        hoverBackgroundColor: barHoverBackgroundColor,
        hoverBorderColor: barBorderColor,
        borderColor: barBorderColor,
      },
    ];

    this.barChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      animation: {
        duration: 0,
      },
      scales: {
        x: {
          grid: {
            color: 'transparent',
          },
        },
        y: {
          grid: {
            color: gridColor,
          },
          min: 0,
          max: 50,
          ticks: {
            stepSize: 10,
          },
        },
      },
      plugins: {
        tooltip: {
          backgroundColor: tooltipBackgroundColor,
          cornerRadius: 0,
          callbacks: {
            title: () => '',
            label: (item: TooltipItem<'bar'>) => {
              return `x: ${item.label}, y: ${item.formattedValue}`;
            },
          },
          displayColors: false,
        },
      },
    };
  }

  getPageData(): number[] {
    const startIdx = this.page * this.pageSize;
    const endIdx = startIdx + this.pageSize;

    return this.data.slice(startIdx, endIdx);
  }

  getPageLabels(): string[] {
    const startIdx = this.page * this.pageSize;
    const endIdx = startIdx + this.pageSize;

    return this.labels.slice(startIdx, endIdx);
  }

  goToPreviousPage(): void {
    if (this.hasPreviousPage()) {
      this.page -= 1;

      // get the data and labels for the new page
      this.barChartLabels = this.getPageLabels();
      this.barChartData[0].data = this.getPageData();
    }
  }

  goToNextPage(): void {
    if (this.hasNextPage()) {
      this.page += 1;

      // get the data and labels for the new page
      this.barChartLabels = this.getPageLabels();
      this.barChartData[0].data = this.getPageData();
    }
  }

  hasNextPage(): boolean {
    // get the index of the next page
    const nextPageIndex = (this.page + 1) * this.pageSize;

    // check if this index is out of bounds
    return nextPageIndex < this.data.length;
  }

  hasPreviousPage(): boolean {
    return this.page > 0;
  }
}
