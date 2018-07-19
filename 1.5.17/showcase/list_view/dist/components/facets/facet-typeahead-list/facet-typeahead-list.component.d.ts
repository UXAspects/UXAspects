import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ElementRef, PipeTransform, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '../../typeahead/index';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { FacetContainerComponent } from '../facet-container.component';
import { Facet } from '../models/facet';
import { FacetTypeaheadListItemComponent } from './typeahead-list-item/facet-typeahead-list-item.component';
export declare class FacetTypeaheadListComponent extends FacetBaseComponent implements AfterViewInit {
    typeaheadKeyService: TypeaheadKeyService;
    private _announcer;
    facets: Facet[] | Observable<Facet[]>;
    header: string;
    expanded: boolean;
    suggestions: Facet[];
    simplified: boolean;
    typeaheadConfig: FacetTypeaheadListConfig;
    options: QueryList<FacetTypeaheadListItemComponent>;
    query$: BehaviorSubject<string>;
    loading: boolean;
    activeIndex: number;
    typeaheadId: string;
    typeaheadOpen: boolean;
    typeaheadOptions: Facet[];
    highlightedElement: HTMLElement;
    private _config;
    private _focusKeyManager;
    constructor(typeaheadKeyService: TypeaheadKeyService, facetContainer: FacetContainerComponent, elementRef: ElementRef, _announcer: LiveAnnouncer);
    ngAfterViewInit(): void;
    onKeydown(event: KeyboardEvent): void;
    onFocus(index: number): void;
    toggleFacet(index: number, facet: Facet): void;
    /** Only show typeahead if we have enough characters */
    updateTypeahead(query?: string): void;
    getFacetObservable(): Observable<Facet[]>;
    select(event: TypeaheadOptionEvent): void;
}
export interface FacetTypeaheadListConfig {
    placeholder?: string;
    minCharacters?: number;
    maxResults?: number;
    delay?: number;
}
export declare class FacetTypeaheadHighlight implements PipeTransform {
    transform(value: string, searchQuery: string): string;
}
