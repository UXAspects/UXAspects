import { Component, Input } from '@angular/core';
import { FacetBaseComponent, Facet } from '../../../../../../../../src/index';

@Component({
    selector: 'my-custom-facet-component',
    templateUrl: './sample-facet-component.component.html'
})
export class SampleCustomFacetComponent extends FacetBaseComponent {

    expanded: boolean = true;
    facets: Facet[] = [
        new Facet('Components'),
        new Facet('Charts'),
        new Facet('CSS'),
        new Facet('CSS'),
    ];


}