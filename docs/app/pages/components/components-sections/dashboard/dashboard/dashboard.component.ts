import { Component } from '@angular/core';
import {
  AccessibilityModule,
  ColorService,
  DashboardModule,
  DashboardOptions,
  IconModule,
  SparkModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { ChartDataset, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  imports: [
    DashboardModule,
    IconModule,
    NgChartsModule,
    SparkModule,
    AccessibilityModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsDashboardComponent')
export class ComponentsDashboardComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  // configure the directive data
  lineChartData: ChartDataset<'line'>[] = [
    {
      data: [],
      borderWidth: 2,
      fill: false,
      borderColor: this.colorService.getColor('vibrant1').toHex(),
    },
    {
      data: [],
      borderWidth: 2,
      fill: false,
      borderColor: this.colorService.getColor('vibrant2').toHex(),
    },
  ];

  lineChartOptions: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      line: {
        tension: 0,
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 49,
        grid: {
          color: 'transparent',
        },
        ticks: {
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#ddd',
        },
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  lineChartLabels: string[] = [];
  lineChartLegend: boolean = false;

  options: DashboardOptions = {
    columns: 4,
    padding: 10,
    rowHeight: 220,
    emptyRow: false,
    minWidth: 187,
  };

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['DashboardModule', 'SparkModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        library: 'chance',
      },
      {
        library: 'chart.js',
      },
      {
        imports: ['NgChartsModule'],
        library: 'ng2-charts',
      },
    ],
  };

  constructor(public colorService: ColorService) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    // generate the chart data
    for (let idx = 0; idx < 50; idx++) {
      let label = '';

      if (idx === 0) {
        label = 'Jan 1, 2017';
      }

      if (idx === 49) {
        label = 'Mar 30, 2017';
      }

      this.lineChartLabels.push(label);

      const dataset1 = this.lineChartData[0].data as any;
      const dataset2 = this.lineChartData[1].data as any;

      dataset1.push({
        x: idx,
        y: chance.integer({ min: 280, max: 460 }),
      });

      dataset2.push({
        x: idx,
        y: chance.integer({ min: 50, max: 250 }),
      });
    }
  }
}
