import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Facet, FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from '../../../../../../../src/index';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import 'chance';

@Component({
    selector: 'uxd-components-custom-facet-component',
    templateUrl: './custom-facet-component.component.html'
})
@DocumentationSectionComponent('ComponentsCustomFacetComponent')
export class ComponentsCustomFacetComponent implements IPlunkProvider {

    htmlCode = require('./snippets/app.html');
    tsCode = require('./snippets/app.ts');
    headerHtmlCode = require('./snippets/header.html');
    facetHtmlCode = require('./snippets/facet-component.html');
    facetTsCode = require('./snippets/facet-component.ts');
    facetCssCode = require('./snippets/facet-component.css');

    plunk: IPlunk = {
        files: {
            'app.component.ts': require('./snippets/app.ts'),
            'app.component.html': require('./snippets/app.html'),
            'facet-component.component.html': require('./snippets/facet-component.html'),
            'facet-component.component.css': require('./snippets/facet-component.css'),
            'facet-component.component.ts': require('./snippets/facet-component.ts')
        },
        modules: [{
            imports: ['FacetsModule'],
            library: 'ux-aspects'
        }, {
            imports: ['SampleCustomFacetComponent'],
            library: './facet-component.component',
            declaration: true
        }]
    };
}