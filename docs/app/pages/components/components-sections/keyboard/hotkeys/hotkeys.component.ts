import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AccessibilityModule,
  FocusIfModule,
  IconModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-hotkeys',
  templateUrl: './hotkeys.component.html',
  styleUrls: ['./hotkeys.component.less'],
  host: {
    '(window:keydown.q)': 'focusNextQ()',
    '(window:keydown.w)': 'focusNextW()',
  },
  imports: [
    FocusIfModule,
    AccessibilityModule,
    IconModule,
    TabsetModule,
    SnippetComponent,
    RouterLink,
  ],
})
@DocumentationSectionComponent('ComponentsHotkeysComponent')
export class ComponentsHotkeysComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  qText: string = 'None';
  wText: string = 'None';
  qFocused: number = null;
  wFocused: number = null;

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['FocusIfModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['A11yModule'],
        library: '@angular/cdk/a11y',
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

  announce(item: string): void {
    this._liveAnnouncer.announce(`${item} selected`);
  }

  focusNextQ() {
    this.qFocused = this.qFocused === null || this.qFocused === 3 ? 0 : this.qFocused + 1;
  }

  focusNextW() {
    this.wFocused = this.wFocused === null || this.wFocused === 3 ? 0 : this.wFocused + 1;
  }
}
