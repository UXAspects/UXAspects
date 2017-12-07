import { OnInit } from '@angular/core';
import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';
export declare class SearchDateComponent extends BaseSearchComponent implements OnInit {
    type: string;
    readonly label: string;
    readonly placeholder: string;
    ngOnInit(): void;
}
export interface SearchDateConfig extends BaseSearchComponentConfig {
}
