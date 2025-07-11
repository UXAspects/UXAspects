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
  selector: 'uxd-charts-bar-chart',
  templateUrl: './bar-chart.component.html',
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
@DocumentationSectionComponent('ChartsBarChartComponent')
export class ChartsBarChartComponent
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

  barChartData: ChartDataset<'bar'>[];
  barChartLabels: string[] = ['.doc', '.ppt', '.pdf', '.xls', '.html', '.txt', '.csv', '.mht'];
  barChartOptions: ChartOptions<'bar'>;
  barChartLegend: boolean = false;
  barChartColors: any;

  constructor(colorService: ColorService) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    // Prepare colors used in chart
    const borderColor = colorService.getColor('grey2').setAlpha(0.5).toRgba();
    const barBackgroundColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
    const barHoverBackgroundColor = colorService.getColor('chart1').setAlpha(0.2).toRgba();
    const barBorderColor = colorService.getColor('chart1').toHex();
    const tooltipBackgroundColor = colorService.getColor('grey2').toHex();

    this.barChartData = [
      {
        data: [34, 25, 19, 34, 32, 44, 50, 67],
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 1,
        backgroundColor: barBackgroundColor,
        borderColor: barBorderColor,
        hoverBackgroundColor: barHoverBackgroundColor,
        hoverBorderColor: barBorderColor,
      },
    ];

    this.barChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          grid: {
            display: true,
            borderColor,
            color: 'transparent',
          },
        },
        y: {
          type: 'linear',
          min: 0,
          max: 80,
          ticks: {
            stepSize: 20,
          },
          grid: {
            display: true,
            borderColor,
          },
        },
      },
      plugins: {
        tooltip: {
          backgroundColor: tooltipBackgroundColor,
          cornerRadius: 0,
          callbacks: {
            title: () => '',
            label: (item: TooltipItem<'bar'>) => `x: ${item.label}, y: ${item.formattedValue}`,
          },
          displayColors: false,
        },
      },
    };
  }
}
