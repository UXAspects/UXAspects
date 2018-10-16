import { Filter } from '../interfaces/filter.interface';

export class FilterRemoveEvent {
    constructor(public filter: Filter) {}
}