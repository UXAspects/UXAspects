import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AccessibilityModule, ColorService, TabsetModule } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions, TooltipItem } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-charts-donut-chart',
  templateUrl: './donut-chart.component.html',
  imports: [
    NgChartsModule,
    NgFor,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    AccessibilityModule,
  ],
})
@DocumentationSectionComponent('ChartsDonutChartComponent')
export class ChartsDonutChartComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        library: 'chart.js',
      },
      {
        imports: ['NgChartsModule'],
        library: 'ng2-charts',
      },
    ],
  };

  donutChartData: ChartDataset<'doughnut'>[];
  donutChartLabels: string[] = ['Sales 1', 'Sales 2', 'Sales 3', 'Sales 4', 'Sales 5'];
  donutChartOptions: ChartOptions<'doughnut'>;
  donutChartLegend: boolean = true;
  donutChartColors: any;

  constructor(colorService: ColorService) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    const tooltipBackgroundColor = colorService.getColor('grey2').toHex();

    this.donutChartColors = {
      backgroundColor: [
        colorService.getColor('chart1').toRgb(),
        colorService.getColor('chart2').toRgb(),
        colorService.getColor('chart3').toRgb(),
        colorService.getColor('chart4').toRgb(),
        colorService.getColor('chart5').toRgb(),
      ],
      hoverBackgroundColor: [
        colorService.getColor('chart1').setAlpha(0.3).toRgba(),
        colorService.getColor('chart2').setAlpha(0.3).toRgba(),
        colorService.getColor('chart3').setAlpha(0.3).toRgba(),
        colorService.getColor('chart4').setAlpha(0.3).toRgba(),
        colorService.getColor('chart5').setAlpha(0.3).toRgba(),
      ],
    };

    // configure the directive data
    this.donutChartData = [
      {
        data: [25, 15, 18, 20, 10],
        borderWidth: 0,
        backgroundColor: this.donutChartColors.backgroundColor,
        hoverBackgroundColor: this.donutChartColors.hoverBackgroundColor,
      },
    ];

    this.donutChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      cutout: 70,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 12,
          },
        },
        tooltip: {
          callbacks: {
            title: () => '',
            label: (item: TooltipItem<'doughnut'>) => {
              // get the dataset (we only have one)
              const dataset: any = this.donutChartData[0];

              // calculate the total of all segment values
              const total = dataset.data.reduce((previousValue: any, currentValue: any) => {
                return previousValue + currentValue;
              });

              // get the value of the current segment
              const segmentValue = dataset.data[item.dataIndex];

              // calculate the percentage of the current segment compared to the total
              const percentage = Math.round((segmentValue / total) * 100);

              return `${percentage}%, Sales ${item.dataIndex + 1}`;
            },
          },
          backgroundColor: tooltipBackgroundColor,
          cornerRadius: 0,
          displayColors: false,
        },
      },
    };
  }
}
