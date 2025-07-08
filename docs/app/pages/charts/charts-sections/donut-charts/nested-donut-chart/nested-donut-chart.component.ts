import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Color,
  ColorService,
  NestedDonutChartData,
  NestedDonutChartModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-charts-nested-donut-chart',
  templateUrl: './nested-donut-chart.component.html',
  styleUrls: ['./nested-donut-chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NestedDonutChartModule,
    NgFor,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ChartsNestedDonutChartComponent')
export class ChartsNestedDonutChartComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  dataset: ReadonlyArray<NestedDonutChartData> = [
    { name: 'To be retained', value: 42, color: this._colorService.getColor(Color.Ok).toHex() },
    {
      name: 'Potentially sensitive',
      value: 33,
      color: this._colorService.getColor(Color.Warning).toHex(),
    },
    { name: 'Sensitive', value: 9, color: this._colorService.getColor(Color.Critical).toHex() },
  ];

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['NestedDonutChartModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  constructor(private readonly _colorService: ColorService) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }
}
