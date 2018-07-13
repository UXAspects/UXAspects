import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, Input, Pipe, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '../../typeahead/index';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { FacetContainerComponent } from '../facet-container.component';
import { Facet } from '../models/facet';
import { FacetTypeaheadListItemComponent } from './typeahead-list-item/facet-typeahead-list-item.component';

@Component({
    selector: 'ux-facet-typeahead-list',
    templateUrl: './facet-typeahead-list.component.html'
})
export class FacetTypeaheadListComponent extends FacetBaseComponent implements AfterViewInit {

    @Input() facets: Facet[] | Observable<Facet[]>;
    @Input() header: string;
    @Input() expanded: boolean = true;
    @Input() suggestions: Facet[] = [];
    @Input() simplified: boolean = true;

    @Input()
    set typeaheadConfig(config: FacetTypeaheadListConfig) {
        this._config = { placeholder: '', maxResults: 50, minCharacters: 1, ...config };
    }

    get typeaheadConfig(): FacetTypeaheadListConfig {
        return this._config;
    }

    @ViewChildren(FacetTypeaheadListItemComponent) options: QueryList<FacetTypeaheadListItemComponent>;

    query$ = new BehaviorSubject<string>('');
    activeIndex: number = 0;
    typeaheadOpen: boolean = false;
    typeaheadOptions: Facet[] = [];

    private _config: FacetTypeaheadListConfig = { placeholder: '', maxResults: 50, minCharacters: 1 };
    private _focusKeyManager: FocusKeyManager<FacetTypeaheadListItemComponent>;

    constructor(public typeaheadKeyService: TypeaheadKeyService, facetContainer: FacetContainerComponent, elementRef: ElementRef) {
        super(facetContainer, elementRef);
    }

    ngAfterViewInit(): void {

        // set up search query subscription
        this.query$.pipe(takeUntil(this._onDestroy), mergeMap(() => this.getFacetObservable())).subscribe(facets => {
            this.typeaheadOptions = facets.filter(facet => !facet.disabled && !this.selected.find(selectedFacet => selectedFacet === facet)).slice(0, this._config.maxResults);
        });

        this._focusKeyManager = new FocusKeyManager(this.options).withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }

    onKeydown(event: KeyboardEvent): void {
        this._focusKeyManager.onKeydown(event);
    }

    toggleFacet(index: number, facet: Facet): void {
        this.toggleFacetSelection(facet);
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
        if (this.selected.find(facet => facet === event.option)) {
            return;
        }

        // select the facet
        this.selectFacet(event.option);

        // clear the typeahead
        this.query$.next('');
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