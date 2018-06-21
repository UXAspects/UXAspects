import { OnInit, PipeTransform } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable } from 'rxjs/Observable';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Facet } from '../models/facet';
export declare class FacetTypeaheadListComponent extends FacetBaseComponent implements OnInit {
    facets: Facet[] | Observable<Facet[]>;
    header: string;
    expanded: boolean;
    typeaheadConfig: FacetTypeaheadListConfig;
    suggestions: Facet[];
    simplified: boolean;
    typeaheadOptions: Observable<Facet[]>;
    searchQuery: string;
    private _nativeElement;
    private _defaultTypeaheadConfig;
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
