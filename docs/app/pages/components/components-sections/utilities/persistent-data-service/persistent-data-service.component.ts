import { Component } from '@angular/core';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
  selector: 'uxd-components-persistent-data-service',
  templateUrl: './persistent-data-service.component.html',
  imports: [ApiPropertiesComponent, ApiPropertyComponent, SnippetComponent],
})
@DocumentationSectionComponent('ComponentsPersistentDataServiceComponent')
export class ComponentsPersistentDataServiceComponent extends BaseDocumentationSection {
  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }
}
