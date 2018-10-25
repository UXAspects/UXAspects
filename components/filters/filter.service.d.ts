import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { FilterEvent } from './events/filter-event';
import { Filter } from './interfaces/filter.interface';
export declare class FilterService {
    /** The list of active filters */
    filters$: BehaviorSubject<Filter[]>;
    /** Emit all the events when they occur */
    events$: Subject<FilterEvent>;
    add(filter: Filter): void;
    remove(filter: Filter): void;
    removeAll(): void;
    isSelected(filter: Filter): boolean;
}
