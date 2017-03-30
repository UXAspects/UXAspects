import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-custom-facets-ng1',
    templateUrl: './custom-facets-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsCustomFacetsNg1Component')
export class ComponentsCustomFacetsNg1Component {

    private htmlCode = require('./snippets/sample.html');
    private customFacetHtmlCode = require('./snippets/custom-facets.html');
    private customFacetJsCode = require('./snippets/custom-facets.js');

}