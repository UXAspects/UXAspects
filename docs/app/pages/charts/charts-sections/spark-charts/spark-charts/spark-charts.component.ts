import { Component } from '@angular/core';
import { ColorIdentifier, ColorService, SparkModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-charts-spark-charts',
  templateUrl: './spark-charts.component.html',
  imports: [
    SparkModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ChartsSparkChartsComponent')
export class ChartsSparkChartsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  charts: SparkChart[] = [
    {
      theme: 'chart1',
      value: 35,
      barHeight: 8,
      topLeftLabel: "<span class='spark-label'>21.7 MB</span>",
      tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)',
    },
    {
      theme: 'chart3',
      value: 30,
      barHeight: 5,
      inlineLabel: '30%',
      ariaLabel: 'Spark Line indicator',
    },
    {
      theme: 'chart2',
      value: 35,
      barHeight: 8,
      topLeftLabel:
        "<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>",
      bottomLeftLabel:
        '<span class="spark-label hidden-xxxs"><span class="medium light">INDEX COVERAGE</span></span>',
      tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)',
    },
    {
      theme: 'chart3',
      value: 30,
      barHeight: 5,
      inlineLabel: '<div class="spark-label hidden-spark"><span class="x-large">30%</span></div>',
      topLeftLabel:
        '<span class="spark-label hidden-xxs"><span class="small">STORAGE ON HOLD</span></span>',
      ariaLabel: 'Spark Line indicator - 30%',
    },
    {
      theme: 'chart4',
      value: 55,
      barHeight: 8,
      topLeftLabel:
        '<span class="spark-label hidden-xxs"><span class="large">8.6</span><span class="medium light">&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>',
      ariaLabel: '8.6 Disk Space - 55%',
    },
    {
      theme: 'chart5',
      value: 30,
      barHeight: 8,
      topLeftLabel: '<span class="spark-label">21.7 MB</span>',
      topRightLabel: '<span class="spark-label">75.0 MB</span>',
      bottomLeftLabel: '<span class="spark-label">ITEMS ON HOLD</span>',
      bottomRightLabel: '<span class="spark-label">TOTAL</span>',
      ariaLabel: 'Spark Line indicator - ITEMS ON HOLD',
    },
    {
      value: [70, 20, 10],
      barColor: ['#1aac60', '#fcdb1f', '#e5004c'],
      barHeight: 6,
      topLeftLabel: "<span class='spark-label'>Multi-value</span>",
      ariaLabel: ['70% Documents', '20% Audio', '10% Video'],
    },
    {
      theme: 'vibrant2',
      value: 30,
      barHeight: 8,
      topLeftLabel: '30%',
      bottomLeftLabel:
        '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
      topRightLabel:
        '<span class="spark-label hidden-spark"><span class="medium light">75.0 MB</span></span>',
      bottomRightLabel:
        '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>',
      ariaLabel: 'Spark Line indicator',
    },
  ];

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: ['SparkModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  constructor(private readonly colorService: ColorService) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }
}

interface SparkChart {
  theme?: ColorIdentifier;
  value: number | number[];
  barColor?: string | string[];
  trackColor?: string;
  barHeight?: number;
  topLeftLabel?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  inlineLabel?: string;
  tooltip?: string;
  ariaLabel?: string | string[];
}
