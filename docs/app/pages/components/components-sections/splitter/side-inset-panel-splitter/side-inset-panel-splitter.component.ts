import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccessibilityModule, IconModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { AngularSplitModule } from 'angular-split';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-side-inset-panel-splitter',
  templateUrl: './side-inset-panel-splitter.component.html',
  styleUrls: ['./side-inset-panel-splitter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccessibilityModule, AngularSplitModule, IconModule, TabsetModule, SnippetComponent],
})
@DocumentationSectionComponent('ComponentsSideInsetPanelSplitterComponent')
export class ComponentsSideInsetPanelSplitterComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  visible: boolean = false;

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['AngularSplitModule'],
        library: 'angular-split',
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
