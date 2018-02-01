import { BaseSearchComponent } from '../base-search.component';
export declare class SearchDateRangeComponent extends BaseSearchComponent {
    type: string;
    readonly label: string;
    from: any;
    to: any;
    readonly fromLabel: string;
    readonly toLabel: string;
    readonly fromPlaceholder: string;
    readonly toPlaceholder: string;
    /**
     * Override the default validation
     */
    validate(): void;
}
export interface SearchDateRangeConfig {
    label?: string;
    fromLabel?: string;
    toLabel?: string;
    fromPlaceholder?: string;
    toPlaceholder?: string;
    validation: (value: any) => boolean;
}
