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
export class ComponentsCustomFacetComponent /*implements IPlunkProvider*/ {


    headerHtmlCode = require('./snippets/header.html');

    // htmlCode = require('./snippets/app.html');
    // tsCode = require('./snippets/app.ts');

    // plunk: IPlunk = {
    //     files: {
    //         'app.component.ts': require('./snippets/app.ts'),
    //         'app.component.html': require('./snippets/app.html')
    //     },
    //     mappings: [
    //         {
    //             alias: 'chance',
    //             source: 'npm:chance@1.0.6'
    //         }
    //     ],
    //     modules: [{
    //         imports: ['FacetsModule'],
    //         library: 'ux-aspects'
    //     }]
    // };

    constructor() {

    }
}