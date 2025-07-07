import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccessibilityModule,
  AccordionModule,
  LayoutSwitcherModule,
  SliderModule,
  SliderOptions,
  SliderType,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-layout-switching',
  templateUrl: './layout-switching.component.html',
  styleUrls: ['./layout-switching.component.less'],
  imports: [
    AccessibilityModule,
    ButtonsModule,
    FormsModule,
    LayoutSwitcherModule,
    NgFor,
    AccordionModule,
    SliderModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsLayoutSwitchingComponent')
export class ComponentsLayoutSwitchingComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  width: number = 100;
  group: string = 'table';
  documents: LayoutSwitchingData[] = [];

  options: SliderOptions = {
    type: SliderType.Value,
    track: {
      min: 40,
      max: 100,
      ticks: {
        major: {
          show: true,
          steps: 60,
          labels: true,
          formatter: (value: number) => (value === 40 ? 'Narrow' : 'Wide'),
        },
        minor: {
          show: false,
        },
      },
    },
  };

  layouts = {
    table: {
      group: 'table',
    },
    card: {
      group: 'card',
      minWidth: 620,
    },
    cardstack: {
      group: 'card',
      maxWidth: 620,
    },
  };

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['SliderModule', 'LayoutSwitcherModule', 'AccordionModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        library: 'chance',
      },
      {
        imports: ['ButtonsModule'],
        forRoot: true,
        library: 'ngx-bootstrap/buttons',
      },
    ],
  };

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    // create some sample data
    for (let idx = 1; idx < 10; idx++) {
      this.documents.push({
        name: `Document ${idx}`,
        author: chance.name(),
        date: chance.date({ year: 2017 }) as Date,
      });
    }
  }
}

interface LayoutSwitchingData {
  name: string;
  author: string;
  date: Date;
}
