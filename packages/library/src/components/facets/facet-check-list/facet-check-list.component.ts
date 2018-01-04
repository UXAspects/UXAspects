import { Component, Input } from '@angular/core';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Facet } from '../models/facet';

@Component({
    selector: 'ux-facet-check-list',
    templateUrl: './facet-check-list.component.html'
})
export class FacetCheckListComponent extends FacetBaseComponent {

    @Input() facets: Facet[] = [];
    @Input() header: string;
    @Input() scrollbar: boolean = true;
    @Input() expanded: boolean = true;
}