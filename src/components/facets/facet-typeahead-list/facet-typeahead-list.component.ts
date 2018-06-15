import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Facet } from '../models/facet';

@Component({
    selector: 'ux-facet-typeahead-list',
    templateUrl: './facet-typeahead-list.component.html'
})
export class FacetTypeaheadListComponent extends FacetBaseComponent implements OnInit {

    @Input() facets: Facet[] | Observable<Facet[]>;
    @Input() header: string;
    @Input() expanded: boolean = true;
    @Input() typeaheadConfig: FacetTypeaheadListConfig = {};
    @Input() suggestions: Facet[] = [];
    @Input() simplified: boolean = true;

    typeaheadOptions: Observable<Facet[]>;
    searchQuery: string;

    private _nativeElement: HTMLElement = this._elementRef.nativeElement as HTMLElement;
    private _defaultTypeaheadConfig: FacetTypeaheadListConfig = {
        placeholder: '',
        maxResults: 50,
        minCharacters: 1
    };

    ngOnInit() {

        // wrap the observable and filter out any already selected items or any disabled items
        if (this.facets instanceof Observable) {

            // handle an observable of data
            this.typeaheadOptions = from(this.facets).pipe(map((facets: Facet[]) => {

                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(facet => !facet.disabled)
                    .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
                    .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
            }));

        } else {

            // handle an array of data
            this.typeaheadOptions = of(this.facets).pipe(map((facets: Facet[]) => {

                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(facet => !facet.disabled)
                    .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
                    .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
            }));
        }

        // provide default values for typeahead config
        for (let prop in this._defaultTypeaheadConfig) {

            // check if prop has been defined in the users typeahead config - if not set default value
            if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
                this.typeaheadConfig[prop] = this._defaultTypeaheadConfig[prop];
            }
        }
    }

    selectOption(typeaheadOption: TypeaheadMatch) {

        // check to make sure that the item is not currently selected
        if (this.selected.find(facet => facet === typeaheadOption.item)) {
            return;
        }

        // select the facet
        this.selectFacet(typeaheadOption.item);

        // clear the typeahead
        this.searchQuery = '';
    }

    scrollToFocused(): void {

        let dropdown = this._nativeElement.querySelector('.dropdown-menu');

        // delay to allow the typeahead ui to update
        setTimeout(() => {

            // find the currently active element if there is one
            let activeElement = dropdown.querySelector('.dropdown-menu > li.active');

            if (activeElement) {

                // check if element is not in view
                let elementBounds = activeElement.getBoundingClientRect();
                let dropdownBounds = dropdown.getBoundingClientRect();

                if (elementBounds.top < dropdownBounds.top) {
                    dropdown.scrollTop += elementBounds.top - dropdownBounds.top;
                }

                if (elementBounds.bottom > dropdownBounds.bottom) {
                    dropdown.scrollTop += elementBounds.bottom - dropdownBounds.bottom;
                }
            }
        });
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
        return value.replace(regex, `<b class="facet-typeahead-highlighted">${ value.match(regex) }</b>`);
    }
}