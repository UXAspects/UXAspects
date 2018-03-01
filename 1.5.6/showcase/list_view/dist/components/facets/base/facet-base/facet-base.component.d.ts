import { EventEmitter, OnInit, ElementRef } from '@angular/core';
import { FacetContainerComponent } from '../../facet-container.component';
import { FacetEvent } from '../../facet-events';
import { Facet } from '../../models/facet';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
export declare class FacetBaseComponent implements OnInit {
    private facetContainer;
    _elementRef: ElementRef;
    selected: Facet[];
    selectedChange: EventEmitter<Facet[]>;
    events: Subject<FacetEvent>;
    constructor(facetContainer: FacetContainerComponent, _elementRef: ElementRef);
    ngOnInit(): void;
    selectFacet(facet: Facet): void;
    deselectFacet(facet: Facet): void;
    deselectAll(): void;
    toggleFacetSelection(facet: Facet): void;
    isFacetSelected(facet: Facet): boolean;
    private triggerEvent(event);
}
