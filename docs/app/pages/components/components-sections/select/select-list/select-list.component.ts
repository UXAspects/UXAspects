import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccordionModule,
  CheckboxModule,
  SelectListModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { Chance } from 'chance';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

const chance = new Chance();

@Component({
  selector: 'uxd-components-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.less'],
  imports: [
    FormsModule,
    SelectListModule,
    AccordionModule,
    CheckboxModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsSelectListComponent')
export class ComponentsSelectListComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  multiple: boolean = false;
  selected: ReadonlyArray<string> = [];
  authors: string[] = [];
  query: string = '';

  private readonly _authors: string[] = [];

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['SelectListModule'],
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

    // create some dummy list items
    for (let idx = 0; idx < 20; idx++) {
      this._authors.push(chance.name());
    }

    // perform initial search
    this.search();
  }

  search(): void {
    this.authors = this._authors.filter(
      author => author.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
    );
  }
}
