import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Pipe, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, takeUntil } from 'rxjs/operators';
import { TypeaheadKeyService } from '../../typeahead/index';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { FacetContainerComponent } from '../facet-container.component';
import { Facet } from '../models/facet';
import { FacetTypeaheadListItemComponent } from './typeahead-list-item/facet-typeahead-list-item.component';

@Component({
    selector: 'ux-facet-typeahead-list',
    templateUrl: './facet-typeahead-list.component.html'
})
export class FacetTypeaheadListComponent extends FacetBaseComponent implements OnInit, AfterViewInit {

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

    searchQuery: string = '';
    activeIndex: number = 0;
    typeaheadOpen: boolean = false;
    typeaheadOptions: Facet[] = [];

    private _config: FacetTypeaheadListConfig = { placeholder: '', maxResults: 50, minCharacters: 1 };
    private _focusKeyManager: FocusKeyManager<FacetTypeaheadListItemComponent>;

    constructor(public typeaheadKeyService: TypeaheadKeyService, facetContainer: FacetContainerComponent, elementRef: ElementRef) {
        super(facetContainer, elementRef);
    }

    ngOnInit(): void {
        const facetsObservable = this.facets instanceof Observable ? this.facets : of(this.facets);

        facetsObservable.pipe(map(facets =>
            facets.filter(facet =>
                !facet.disabled &&
                !this.selected.find(selectedFacet => selectedFacet === facet) &&
                facet.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            )),
            takeUntil(this._onDestroy)).subscribe(facets => this.typeaheadOptions = facets.slice(0, this._config.maxResults));
    }

    ngAfterViewInit(): void {
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

    updateTypeahead(query: string = ''): void {
        // update typeahead visibility
        this.typeaheadOpen = query.length >= this._config.minCharacters;

        // if the facets are an observable then give them the next search query
        // this.facets.
    }

    // ngOnInit() {

    //     // wrap the observable and filter out any already selected items or any disabled items
    //     if (this.facets instanceof Observable) {

    //         // handle an observable of data
    //         this.typeaheadOptions = from(this.facets).pipe(map((facets: Facet[]) => {

    //             // remove disabled facets, selected facets and facets that dont match search term
    //             return facets.filter(facet => !facet.disabled)
    //                 .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
    //                 .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
    //         }));

    //     } else {

    //         // handle an array of data
    //         this.typeaheadOptions = of(this.facets).pipe(map((facets: Facet[]) => {

    //             // remove disabled facets, selected facets and facets that dont match search term
    //             return facets.filter(facet => !facet.disabled)
    //                 .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
    //                 .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
    //         }));
    //     }

    //     // provide default values for typeahead config
    //     for (let prop in this._defaultTypeaheadConfig) {

    //         // check if prop has been defined in the users typeahead config - if not set default value
    //         if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
    //             this.typeaheadConfig[prop] = this._defaultTypeaheadConfig[prop];
    //         }
    //     }
    // }

    // selectOption(typeaheadOption: TypeaheadMatch) {

    //     // check to make sure that the item is not currently selected
    //     if (this.selected.find(facet => facet === typeaheadOption.item)) {
    //         return;
    //     }

    //     // select the facet
    //     this.selectFacet(typeaheadOption.item);

    //     // clear the typeahead
    //     this.searchQuery = '';
    // }

    // scrollToFocused(): void {

    //     let dropdown = this._nativeElement.querySelector('.dropdown-menu');

    //     // delay to allow the typeahead ui to update
    //     setTimeout(() => {

    //         // find the currently active element if there is one
    //         let activeElement = dropdown.querySelector('.dropdown-menu > li.active');

    //         if (activeElement) {

    //             // check if element is not in view
    //             let elementBounds = activeElement.getBoundingClientRect();
    //             let dropdownBounds = dropdown.getBoundingClientRect();

    //             if (elementBounds.top < dropdownBounds.top) {
    //                 dropdown.scrollTop += elementBounds.top - dropdownBounds.top;
    //             }

    //             if (elementBounds.bottom > dropdownBounds.bottom) {
    //                 dropdown.scrollTop += elementBounds.bottom - dropdownBounds.bottom;
    //             }
    //         }
    //     });
    // }

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