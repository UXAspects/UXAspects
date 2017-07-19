import { OnInit, PipeTransform } from '@angular/core';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Observable } from 'rxjs/Observable';
import { Facet } from '../models/facet';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
export declare class FacetTypeaheadListComponent extends FacetBaseComponent implements OnInit {
    facets: Facet[] | Observable<Facet[]>;
    header: string;
    expanded: boolean;
    typeaheadConfig: FacetTypeaheadListConfig;
    suggestions: Facet[];
    simplified: boolean;
    typeaheadOptions: Observable<Facet[]>;
    searchQuery: string;
    private nativeElement;
    private defaultTypeaheadConfig;
    ngOnInit(): void;
    selectOption(typeaheadOption: TypeaheadMatch): void;
    scrollToFocused(): void;
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
