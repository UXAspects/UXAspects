import { Facet } from './models/facet';
export declare class FacetSelect {
    facet: Facet;
    constructor(facet: Facet);
}
export declare class FacetDeselect {
    facet: Facet;
    constructor(facet: Facet);
}
export declare class FacetDeselectAll {
    constructor();
}
export declare type FacetEvent = FacetSelect | FacetDeselect | FacetDeselectAll;
