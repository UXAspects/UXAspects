import { AfterViewInit, QueryList } from '@angular/core';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Facet } from '../models/facet';
import { FacetCheckListItemComponent } from './check-list-item/facet-check-list-item.component';
export declare class FacetCheckListComponent extends FacetBaseComponent implements AfterViewInit {
    facets: Facet[];
    header: string;
    scrollbar: boolean;
    expanded: boolean;
    options: QueryList<FacetCheckListItemComponent>;
    isFocused: boolean;
    activeIndex: number;
    private _focusKeyManager;
    ngAfterViewInit(): void;
    onFocus(index: number): void;
    onKeydown(event: KeyboardEvent): void;
    toggleFacet(index: number, facet: Facet): void;
}
