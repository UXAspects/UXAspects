import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-facets-ng1',
    templateUrl: './facets-ng1.components.html'
})
@DocumentationSectionComponent('ComponentsFacetsNg1Component')
export class ComponentsFacetsNg1Component {

    public facetContainerCode = require('./snippets/facet-container.html');
    public facetCode = require('./snippets/facet.html');

    public facetOptionHtmlCode = require('./snippets/facet-option.html');
    public facetOptionJsCode = require('./snippets/facet-option.js');

    public facetVisibility = require('./snippets/facet-visibility.js');

}