import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';
export declare class SearchTextComponent extends BaseSearchComponent {
    type: string;
    readonly label: string;
    readonly placeholder: string;
}
export interface SearchTextConfig extends BaseSearchComponentConfig {
}
