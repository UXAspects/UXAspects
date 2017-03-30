import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-dynamic-facets-ng1',
    templateUrl: './dynamic-facets-ng1.components.html'
})
@DocumentationSectionComponent('ComponentsDynamicFacetsNg1Component')
export class ComponentsDynamicFacetsNg1Component {

    private htmlCode = require('./snippets/dynamic-facets.html');
    private jsCode = require('./snippets/dynamic-facets.js');

}