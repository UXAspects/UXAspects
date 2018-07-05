import { EventEmitter } from '@angular/core';
import { FacetEvent } from './facet-events';
import { Facet } from './models/facet';
export declare class FacetContainerComponent {
    header: string;
    clearTooltip: string;
    emptyText: string;
    facets: Facet[];
    facetsReorderable: boolean;
    facetsChange: EventEmitter<Facet[]>;
    events: EventEmitter<FacetEvent>;
    selectFacet(facet: Facet): void;
    deselectFacet(facet: Facet): void;
    deselectAllFacets(): void;
    private triggerEvent(event);
}
