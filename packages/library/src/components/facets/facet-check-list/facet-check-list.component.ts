import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Facet } from '../models/facet';

@Component({
    selector: 'ux-facet-check-list',
    templateUrl: './facet-check-list.component.html',
    styleUrls: ['./facet-check-list.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FacetCheckListComponent extends FacetBaseComponent {

    @Input() facets: Facet[] = [];
    @Input() header: string;
    @Input() scrollbar: boolean = true;
    @Input() expanded: boolean = true;
}