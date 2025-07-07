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
  selector: 'uxd-charts-line-chart',
  templateUrl: './line-chart.component.html',
  imports: [
    NgChartsModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    AccessibilityModule,
  ],
})
@DocumentationSectionComponent('ChartsLineChartComponent')
export class ChartsLineChartComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.lineChartTs,
      'app.component.html': this.snippets.raw.lineChartHtml,
      'app.component.css': this.snippets.raw.lineChartCss,
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

  lineChartData: ChartDataset<'line'>[];
  lineChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  lineChartOptions: ChartOptions<'line'>;
  lineChartLegend: boolean = false;
  lineChartColors: any;

  constructor(colorService: ColorService) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    const tooltipBackgroundColor = colorService.getColor('grey2').toHex();
    const gridBorderColor = colorService.getColor('grey4').toHex();
    const gridColor = colorService.getColor('grey6').toHex();
    const lineBorderColor = colorService.getColor('chart1').toRgb();
    const lineFillColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
    const lineForecastFillColor = colorService.getColor('chart1').setAlpha(0.06).toRgba();
    const pointBorderColor = colorService.getColor('chart1').setAlpha(0.5).toRgba();

    // configure the directive data
    this.lineChartData = [
      {
        data: [34, 25, 19, 34, 32, 44],
        borderWidth: 1,
        borderColor: lineBorderColor,
        backgroundColor: lineFillColor,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointHoverBorderColor: pointBorderColor,
        pointHoverBorderWidth: 3,
        pointHoverRadius: 5,
        pointHitRadius: 5,
        fill: 'origin',
      },
      {
        data: [null, null, null, null, null, 44, 45, 50, 55],
        borderDash: [5],
        borderWidth: 1,
        borderColor: lineBorderColor,
        backgroundColor: lineForecastFillColor,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointHoverBorderColor: pointBorderColor,
        pointHoverBorderWidth: 3,
        pointHoverRadius: 5,
        pointHitRadius: 5,
        fill: 'origin',
      },
    ];

    this.lineChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      elements: {
        line: {
          tension: 0,
        },
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: gridColor,
          },
        },
      },
      plugins: {
        tooltip: {
          backgroundColor: tooltipBackgroundColor,
          cornerRadius: 0,
          callbacks: {
            title: () => '',
            label: (item: TooltipItem<'line'>) => `x: ${item.label}, y: ${item.formattedValue}`,
          },
          displayColors: false,
        },
      },
    };
  }
}
