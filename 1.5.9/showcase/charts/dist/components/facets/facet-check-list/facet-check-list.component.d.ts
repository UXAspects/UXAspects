import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Facet } from '../models/facet';
export declare class FacetCheckListComponent extends FacetBaseComponent {
    facets: Facet[];
    header: string;
    scrollbar: boolean;
    expanded: boolean;
}
