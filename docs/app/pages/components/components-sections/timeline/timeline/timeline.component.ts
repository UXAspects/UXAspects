import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AccessibilityModule,
  IconModule,
  TabsetModule,
  TimelineModule,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-timeline',
  templateUrl: './timeline.component.html',
  imports: [
    AccessibilityModule,
    TimelineModule,
    NgFor,
    IconModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    RouterLink,
    TabsetModule,
    SnippetComponent,
    DatePipe,
  ],
})
@DocumentationSectionComponent('ComponentsTimelineComponent')
export class ComponentsTimelineComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  private readonly _now = Date.now();
  private readonly _dayInMilliSeconds = 24 * 60 * 60 * 1000;
  private _daysAfterFirstEvent = 3;

  events: TimelineEvent[] = [
    {
      color: 'accent',
      date: new Date(this._now + this._dayInMilliSeconds * 3),
      url: '#',
      id: chance.integer({ min: 1000, max: 9999 }),
      action: 'tested',
      assignee: chance.name(),
    },
    {
      color: 'alternate2',
      date: new Date(this._now + this._dayInMilliSeconds * 2),
      url: '#',
      id: chance.integer({ min: 1000, max: 9999 }),
      action: 'reviewed',
      assignee: chance.name(),
    },
    {
      color: 'grey4',
      date: new Date(this._now + this._dayInMilliSeconds * 1),
      url: '#',
      id: chance.integer({ min: 1000, max: 9999 }),
      action: 'developed',
      assignee: chance.name(),
    },
    {
      color: 'primary',
      date: new Date(this._now),
      url: '#',
      id: chance.integer({ min: 1000, max: 9999 }),
      action: 'recorded',
      assignee: chance.name(),
    },
  ];

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: ['TimelineModule'],
        library: '@ux-aspects/ux-aspects',
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

  addEvent(): void {
    this._daysAfterFirstEvent++;
    this.events.unshift({
      color: 'grey4',
      date: new Date(this._now + this._dayInMilliSeconds * this._daysAfterFirstEvent),
      url: '#',
      id: chance.integer({ min: 1000, max: 9999 }),
      action: 'updated',
      assignee: chance.name(),
    });
  }
}

interface TimelineEvent {
  color: string;
  date: Date;
  url: string;
  id: number;
  action: 'recorded' | 'developed' | 'updated' | 'reviewed' | 'tested' | 'closed';
  assignee: string;
}
