import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  IconModule,
  RadioButtonModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

const chance = new Chance();

@Component({
  selector: 'uxd-components-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsetModule,
    NgFor,
    IconModule,
    AccessibilityModule,
    AccordionModule,
    CheckboxModule,
    RadioButtonModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsTabsComponent')
export class ComponentsTabsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  tabs: Tab[] = [
    {
      icon: 'schedule',
      title: 'Schedule',
      content: chance.paragraph(),
    },
    {
      icon: 'shield',
      title: 'Protection',
      content: chance.paragraph(),
    },
    {
      icon: 'information',
      title: 'Solution',
      content: chance.paragraph(),
    },
    {
      icon: 'analytics',
      title: 'Analytics',
      content: chance.paragraph(),
    },
  ];

  minimal: boolean = true;

  set stacked(stacked: TabStackType) {
    this._stacked = stacked;

    // if the option is left or right we can not have minimal option disabled
    if (stacked === 'left' || stacked === 'right') {
      this.minimal = true;
    }
  }

  get stacked(): TabStackType {
    return this._stacked;
  }

  private _stacked: TabStackType = 'none';

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['TabsetModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        library: 'chance',
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
  }
}

export type TabStackType = 'left' | 'right' | 'none';

export interface Tab {
  icon: string;
  title: string;
  content: string;
}
