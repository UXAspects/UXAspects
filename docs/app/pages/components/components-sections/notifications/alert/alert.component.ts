import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AccessibilityModule, AlertModule, IconModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxmd-pages-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
  imports: [
    NgFor,
    AlertModule,
    IconModule,
    AccessibilityModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsAlertComponent')
export class ComponentsAlertComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  private readonly _alerts: ReadonlyArray<AlertExample> = [
    {
      type: 'info',
      icon: 'status-information-filled',
      description:
        'This is an example of an info alert message <a class="alert-link">with a link</a>.',
    },
    {
      type: 'error',
      icon: 'status-error-filled',
      description:
        'This is an example of an error alert message <a class="alert-link">with a link</a>.',
    },
    {
      type: 'success',
      icon: 'status-approved-filled',
      description:
        'This is an example of a success alert message <a class="alert-link">with a link</a>.',
    },
    {
      type: 'warning',
      icon: 'status-warning-filled',
      description:
        'This is an example of a warning alert message <a class="alert-link">with a link</a>.',
    },
    {
      type: 'dark',
      icon: 'status-information-filled',
      description:
        'This is an example of a dark alert message <a class="alert-link">with a link</a>.',
    },
  ];

  alerts: AlertExample[] = [...this._alerts];

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['AlertModule', 'AccordionModule', 'CheckboxModule'],
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

  remove(alert: AlertExample): void {
    this.alerts = this.alerts.filter(_alert => _alert !== alert);
  }

  reset(): void {
    this.alerts = [...this._alerts];
  }
}

export interface AlertExample {
  type: string;
  icon: string;
  description: string;
}
