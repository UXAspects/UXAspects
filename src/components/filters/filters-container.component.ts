import { Component, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'ux-filters-container',
    templateUrl: './filters-container.component.html'
})
export class FiltersContainerComponent {

    @Input() filters: Filter[] = [];

    events: EventEmitter<FilterEvent> = new EventEmitter<FilterEvent>();

    addFilter(filter: Filter): void {
        this.filters.push(filter);
        this.events.next(new FilterAddEvent(filter));
    }

    removeFilter(filter: Filter): void {
        let idx = this.filters.findIndex(filters => filters === filter);

        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter));
        }
    }

    removeAll(): void {
        this.events.next(new FilterRemoveAllEvent());
    }

}

export interface Filter {
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