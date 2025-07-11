import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-color-service',
  templateUrl: './color-service.component.html',
  styleUrls: ['./color-service.component.less'],
  imports: [RouterLink, ApiPropertiesComponent, ApiPropertyComponent, SnippetComponent],
})
@DocumentationSectionComponent('ComponentsColorServiceComponent')
export class ComponentsColorServiceComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  focused = false;

  playground: IPlayground = {
    files: {
      'app.component.ts': this.snippets.raw.appExampleTs,
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        library: 'chart.js',
      },
      {
        imports: ['NgChartsModule'],
        library: 'ng2-charts',
      },
      {
        imports: ['SelectModule'],
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
}
