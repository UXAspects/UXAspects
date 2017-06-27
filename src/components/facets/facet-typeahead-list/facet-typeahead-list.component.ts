import { Component, OnInit, Input, Host, Pipe, PipeTransform } from '@angular/core';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Observable } from 'rxjs/Observable';
import { Facet } from '../models/facet';
import { FacetContainerComponent } from '../facet-container.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observer } from 'rxjs/Observer';

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

    private defaultTypeaheadConfig: FacetTypeaheadListConfig = {
        placeholder: '',
        maxResults: 5,
        minCharacters: 1
    };

    ngOnInit() {

        // wrap the observable and filter out any already selected items or any disabled items
        if (this.facets instanceof Observable) {

            // handle an observable of data
            this.typeaheadOptions = Observable.from(this.facets).map((facets: Facet[]) => {

                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(facet => !facet.disabled)
                    .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
                    .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
            });

        } else {

            // handle an array of data
            this.typeaheadOptions = Observable.of(this.facets).map((facets: Facet[]) => {

                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(facet => !facet.disabled)
                    .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
                    .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
            });
        }

        // provide default values for typeahead config
        for (let prop in this.defaultTypeaheadConfig) {

            // check if prop has been defined in the users typeahead config - if not set default value
            if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
                this.typeaheadConfig[prop] = this.defaultTypeaheadConfig[prop];
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