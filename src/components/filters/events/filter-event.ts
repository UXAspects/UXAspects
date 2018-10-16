import { FilterAddEvent } from './filter-add-event';
import { FilterRemoveAllEvent } from './filter-remove-all-event';
import { FilterRemoveEvent } from './filter-remove-event';

export type FilterEvent = FilterAddEvent | FilterRemoveEvent | FilterRemoveAllEvent;