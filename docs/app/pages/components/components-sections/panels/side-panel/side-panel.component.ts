import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  IconModule,
  RadioButtonModule,
  SidePanelModule,
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
  selector: 'uxd-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.less'],
  imports: [
    AccessibilityModule,
    SidePanelModule,
    IconModule,
    AccordionModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    RouterLink,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsSidePanelComponent')
export class ComponentsSidePanelComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['SidePanelModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['A11yModule'],
        library: '@angular/cdk/a11y',
      },
    ],
  };

  open = false;
  inline = false;
  width = '50%';
  minWidth: string;
  maxWidth: string;
  top = '53px';
  modal = false;
  animate = true;
  closeOnExternalClick = false;
  closeOnEscape = true;

  get attachTo(): string {
    return this._attachTo;
  }

  set attachTo(value: string) {
    this._attachTo = value;
    if (value === 'window') {
      this.top = '53px';
    } else {
      this.top = '0';
    }
  }

  private _attachTo = 'window';

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }

  announce(isOpen: boolean): void {
    this._liveAnnouncer.announce(`Side panel ${isOpen ? 'opened' : 'closed'}.`);
  }
}
