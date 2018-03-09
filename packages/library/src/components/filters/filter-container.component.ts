import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ux-filter-container',
    templateUrl: './filter-container.component.html',
    styleUrls: ['./filter-container.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class FilterContainerComponent {

    @Input() filters: Filter[] = [];
    @Input() clearTooltip: string;
    @Output() filtersChange: EventEmitter<Filter[]> = new EventEmitter<Filter[]>();
    @Output() events: EventEmitter<FilterEvent> = new EventEmitter<FilterEvent>();


    addFilter(filter: Filter): void {
        this.filters.push(filter);
        this.events.next(new FilterAddEvent(filter));
        this.filtersChange.emit(this.filters);
    }

    removeFilter(filter: Filter): void {
        let idx = this.filters.findIndex(filters => filters === filter);

        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter));
            this.filtersChange.emit(this.filters);
        }
    }

    removeAll(): void {
        this.events.next(new FilterRemoveAllEvent());
    }

}

export interface Filter {
    group: string;
    title: string;
    name: string;
    initial?: boolean;
}

export class FilterAddEvent {
    constructor(public filter: Filter) {}
}

export class FilterRemoveEvent {
    constructor(public filter: Filter) {}
}

export class FilterRemoveAllEvent {
}

export type FilterEvent = FilterAddEvent | FilterRemoveEvent | FilterRemoveAllEvent;