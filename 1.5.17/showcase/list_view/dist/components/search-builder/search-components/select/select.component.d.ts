import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';
import { InfiniteScrollLoadFunction } from '../../../../index';
export declare class SearchSelectComponent extends BaseSearchComponent {
    type: string;
    /**
     * Provide defaults for undefined properties
     */
    readonly label: string;
    readonly options: any;
    readonly multiple: boolean;
    readonly placeholder: string;
    readonly dropDirection: string;
    readonly allowNull: boolean;
    readonly disabled: boolean;
    readonly maxHeight: string;
    readonly pageSize: number;
}
export interface SearchSelectConfig extends BaseSearchComponentConfig {
    options?: any[] | InfiniteScrollLoadFunction;
    multiple?: boolean;
    dropDirection?: 'up' | 'down';
    allowNull?: boolean;
    disabled?: boolean;
    maxHeight?: string;
    pageSize?: number;
}
