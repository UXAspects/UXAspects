import { EventEmitter } from '@angular/core';
export declare class FilterContainerComponent {
    filters: Filter[];
    clearTooltip: string;
    filtersChange: EventEmitter<Filter[]>;
    events: EventEmitter<FilterEvent>;
    addFilter(filter: Filter): void;
    removeFilter(filter: Filter): void;
    removeAll(): void;
}
export interface Filter {
    group: string;
    title: string;
    name: string;
    initial?: boolean;
}
export declare class FilterAddEvent {
    filter: Filter;
    constructor(filter: Filter);
}
export declare class FilterRemoveEvent {
    filter: Filter;
    constructor(filter: Filter);
}
export declare class FilterRemoveAllEvent {
}
export declare type FilterEvent = FilterAddEvent | FilterRemoveEvent | FilterRemoveAllEvent;
