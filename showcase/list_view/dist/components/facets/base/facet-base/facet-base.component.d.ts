import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FacetContainerComponent } from '../../facet-container.component';
import { FacetEvent } from '../../facet-events';
import { Facet } from '../../models/facet';
export declare class FacetBaseComponent implements OnInit, OnDestroy {
    private facetContainer;
    _elementRef: ElementRef;
    selected: Facet[];
    selectedChange: EventEmitter<Facet[]>;
    events: Subject<FacetEvent>;
    protected _onDestroy: Subject<void>;
    constructor(facetContainer: FacetContainerComponent, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectFacet(facet: Facet): void;
    deselectFacet(facet: Facet): void;
    deselectAll(): void;
    toggleFacetSelection(facet: Facet): void;
    isFacetSelected(facet: Facet): boolean;
    private triggerEvent(event);
}
