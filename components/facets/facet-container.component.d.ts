import { LiveAnnouncer } from '@angular/cdk/a11y';
import { EventEmitter, OnDestroy } from '@angular/core';
import { ReorderEvent } from '../../directives/reorderable/index';
import { FacetEvent } from './facet-events';
import { Facet } from './models/facet';
export declare class FacetContainerComponent implements OnDestroy {
    private _announcer;
    header: string;
    clearTooltip: string;
    emptyText: string;
    facets: Facet[];
    facetsReorderable: boolean;
    facetsChange: EventEmitter<Facet[]>;
    events: EventEmitter<FacetEvent>;
    constructor(_announcer: LiveAnnouncer);
    ngOnDestroy(): void;
    selectFacet(facet: Facet): void;
    deselectFacet(facet: Facet, tag?: HTMLElement): void;
    deselectAllFacets(): void;
    trackBy(_index: number, facet: Facet): string | number;
    shiftRight(facet: Facet, element: HTMLElement): void;
    shiftLeft(facet: Facet, element: HTMLElement): void;
    private shiftFacet(facet, distance);
    private triggerEvent(event);
}
export interface FacetReorderEvent extends ReorderEvent {
    index: number;
}
