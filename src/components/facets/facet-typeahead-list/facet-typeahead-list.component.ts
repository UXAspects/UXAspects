import { FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, Pipe, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '../../typeahead/index';
import { FacetDeselect, FacetDeselectAll, FacetEvent, FacetSelect } from '../facet-events';
import { FacetService } from '../facet.service';
import { Facet } from '../models/facet';
import { FacetTypeaheadListItemComponent } from './typeahead-list-item/facet-typeahead-list-item.component';

let uniqueId = 1;

@Component({
    selector: 'ux-facet-typeahead-list',
    templateUrl: './facet-typeahead-list.component.html'
})
export class FacetTypeaheadListComponent implements AfterViewInit, OnDestroy {

    @Input() set selected(selection: Facet[]) {
        if (Array.isArray(selection)) {
            selection.forEach(facet => this.facetService.select(facet));
        }
    }

    @Input() facets: Facet[] | Observable<Facet[]>;
    @Input() header: string;
    @Input() expanded: boolean = true;
    @Input() suggestions: Facet[] = [];
    @Input() simplified: boolean = true;
    @Output() events: Subject<FacetEvent> = new Subject<FacetEvent>();
    @Output() selectedChange: EventEmitter<Facet[]> = new EventEmitter<Facet[]>();

    @Input()
    set typeaheadConfig(config: FacetTypeaheadListConfig) {
        this._config = { placeholder: '', maxResults: 50, minCharacters: 1, ...config };
    }

    get typeaheadConfig(): FacetTypeaheadListConfig {
        return this._config;
    }

    @ViewChildren(FacetTypeaheadListItemComponent) options: QueryList<FacetTypeaheadListItemComponent>;

    query$ = new BehaviorSubject<string>('');
    loading: boolean = false;
    activeIndex: number = 0;
    typeaheadId: string = `ux-facet-typeahead-${uniqueId++}`;
    typeaheadOpen: boolean = false;
    typeaheadOptions: Facet[] = [];
    highlightedElement: HTMLElement;

    private _selected: Facet[] = [];
    private _onDestroy = new Subject<void>();
    private _config: FacetTypeaheadListConfig = { placeholder: '', maxResults: 50, minCharacters: 1 };
    private _focusKeyManager: FocusKeyManager<FacetTypeaheadListItemComponent>;

    constructor(public typeaheadKeyService: TypeaheadKeyService, public facetService: FacetService, private _announcer: LiveAnnouncer) {
        facetService.events$.pipe(takeUntil(this._onDestroy)).subscribe(event => {

            // deselect all events should always be emitted
            if (event instanceof FacetDeselectAll) {
                this.events.next(event);
                this.selectedChange.next([]);
            }

            // if deselected remove the facet from our internal list of selected facets
            if (event instanceof FacetDeselect && this.isOwnFacet(event.facet)) {
                this._selected = this._selected.filter(_facet => _facet !== event.facet);
            }

            // selection and deselection events should only be emitted when the facet belongs to this component
            if ((event instanceof FacetSelect || event instanceof FacetDeselect) && this.isOwnFacet(event.facet)) {
                this.events.next(event);
                this.selectedChange.next(this._selected);
            }
        });
    }

    ngAfterViewInit(): void {

        // set up search query subscription
        this.query$.pipe(
            takeUntil(this._onDestroy),
            tap(() => {
                this.loading = true;
                this.typeaheadOptions = [];
            }),
            mergeMap(() => this.getFacetObservable().pipe(map(facets => {
                return facets.filter(facet => !facet.disabled && !this.facetService.facets$.value.find(selectedFacet => selectedFacet === facet))
                    .slice(0, this._config.maxResults);
            })))
        ).subscribe(facets => {
            this.loading = false;
            this.typeaheadOptions = facets;
        });

        this._focusKeyManager = new FocusKeyManager(this.options).withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onKeydown(event: KeyboardEvent): void {
        this._focusKeyManager.onKeydown(event);
    }

    onFocus(index: number): void {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    }

    toggleFacet(index: number, facet: Facet): void {

        if (this.facetService.isSelected(facet)) {
            this.facetService.deselect(facet);
            this._selected = this._selected.filter(_facet => _facet !== facet);
        } else {
            this._selected.push(facet);
            this.facetService.select(facet);
        }

        this._focusKeyManager.setActiveItem(index);
    }

    /** Only show typeahead if we have enough characters */
    updateTypeahead(query: string = ''): void {
        this.typeaheadOpen = query.length >= this._config.minCharacters;
    }

    getFacetObservable(): Observable<Facet[]> {
        return this.facets instanceof Observable ? this.facets : of(this.facets);
    }

    select(event: TypeaheadOptionEvent) {

        // check to make sure that the item is not currently selected
        if (this.facetService.isSelected(event.option)) {
            return;
        }

        // add this to the list of internal selected facets
        this._selected.push(event.option);

        // select the facet
        this.facetService.select(event.option);

        // clear the typeahead
        this.query$.next('');

        // announce the selected facet
        this._announcer.announce(`${(event.option as Facet).title} selected.`);
    }

    private isOwnFacet(facet: Facet): boolean {
        return this._selected.indexOf(facet) !== -1;
    }
}

export interface FacetTypeaheadListConfig {
    placeholder?: string;
    minCharacters?: number;
    maxResults?: number;
    delay?: number;
}

@Pipe({
    name: 'facetTypeaheadHighlight'
})
export class FacetTypeaheadHighlight implements PipeTransform {
    transform(value: string, searchQuery: string): string {
        let regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b class="facet-typeahead-highlighted">${value.match(regex)}</b>`);
    }
}