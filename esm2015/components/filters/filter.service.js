/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { FilterAddEvent } from './events/filter-add-event';
import { FilterRemoveAllEvent } from './events/filter-remove-all-event';
import { FilterRemoveEvent } from './events/filter-remove-event';
export class FilterService {
    constructor() {
        /**
         * The list of active filters
         */
        this.filters$ = new BehaviorSubject([]);
        /**
         * Emit all the events when they occur
         */
        this.events$ = new Subject();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    add(filter) {
        // if the filter is already selected or it is the intial filter then do nothing
        if (this.isSelected(filter) || filter.initial) {
            return;
        }
        // update the list of active filters
        this.filters$.next([...this.filters$.value, filter]);
        // emit the event
        this.events$.next(new FilterAddEvent(filter));
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    remove(filter) {
        // if the filter is not selected then do nothing
        if (!this.isSelected(filter)) {
            return;
        }
        // update the list of active filters
        this.filters$.next(this.filters$.value.filter(_filter => _filter !== filter));
        // emit the event
        this.events$.next(new FilterRemoveEvent(filter));
    }
    /**
     * @return {?}
     */
    removeAll() {
        // empty the list of active filters
        this.filters$.next([]);
        // emit the event
        this.events$.next(new FilterRemoveAllEvent());
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    isSelected(filter) {
        return this.filters$.value.indexOf(filter) > -1;
    }
}
FilterService.decorators = [
    { type: Injectable }
];
function FilterService_tsickle_Closure_declarations() {
    /**
     * The list of active filters
     * @type {?}
     */
    FilterService.prototype.filters$;
    /**
     * Emit all the events when they occur
     * @type {?}
     */
    FilterService.prototype.events$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUlqRSxNQUFNOzs7Ozt3QkFHUyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUM7Ozs7dUJBR2xDLElBQUksT0FBTyxFQUFlOzs7Ozs7SUFFcEMsR0FBRyxDQUFDLE1BQWM7O1FBR2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzs7UUFHckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNqRDs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBYzs7UUFHakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzs7UUFHOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3BEOzs7O0lBRUQsU0FBUzs7UUFHTCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFHdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7S0FDakQ7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQWM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNuRDs7O1lBaERKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEZpbHRlckFkZEV2ZW50IH0gZnJvbSAnLi9ldmVudHMvZmlsdGVyLWFkZC1ldmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJFdmVudCB9IGZyb20gJy4vZXZlbnRzL2ZpbHRlci1ldmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJSZW1vdmVBbGxFdmVudCB9IGZyb20gJy4vZXZlbnRzL2ZpbHRlci1yZW1vdmUtYWxsLWV2ZW50JztcbmltcG9ydCB7IEZpbHRlclJlbW92ZUV2ZW50IH0gZnJvbSAnLi9ldmVudHMvZmlsdGVyLXJlbW92ZS1ldmVudCc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTZXJ2aWNlIHtcblxuICAgIC8qKiBUaGUgbGlzdCBvZiBhY3RpdmUgZmlsdGVycyAqL1xuICAgIGZpbHRlcnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGaWx0ZXJbXT4oW10pO1xuXG4gICAgLyoqIEVtaXQgYWxsIHRoZSBldmVudHMgd2hlbiB0aGV5IG9jY3VyICovXG4gICAgZXZlbnRzJCA9IG5ldyBTdWJqZWN0PEZpbHRlckV2ZW50PigpO1xuXG4gICAgYWRkKGZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGZpbHRlciBpcyBhbHJlYWR5IHNlbGVjdGVkIG9yIGl0IGlzIHRoZSBpbnRpYWwgZmlsdGVyIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGZpbHRlcikgfHwgZmlsdGVyLmluaXRpYWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBvZiBhY3RpdmUgZmlsdGVyc1xuICAgICAgICB0aGlzLmZpbHRlcnMkLm5leHQoWy4uLnRoaXMuZmlsdGVycyQudmFsdWUsIGZpbHRlcl0pO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIGV2ZW50XG4gICAgICAgIHRoaXMuZXZlbnRzJC5uZXh0KG5ldyBGaWx0ZXJBZGRFdmVudChmaWx0ZXIpKTtcbiAgICB9XG5cbiAgICByZW1vdmUoZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGUgZmlsdGVyIGlzIG5vdCBzZWxlY3RlZCB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQoZmlsdGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBsaXN0IG9mIGFjdGl2ZSBmaWx0ZXJzXG4gICAgICAgIHRoaXMuZmlsdGVycyQubmV4dCh0aGlzLmZpbHRlcnMkLnZhbHVlLmZpbHRlcihfZmlsdGVyID0+IF9maWx0ZXIgIT09IGZpbHRlcikpO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIGV2ZW50XG4gICAgICAgIHRoaXMuZXZlbnRzJC5uZXh0KG5ldyBGaWx0ZXJSZW1vdmVFdmVudChmaWx0ZXIpKTtcbiAgICB9XG5cbiAgICByZW1vdmVBbGwoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZW1wdHkgdGhlIGxpc3Qgb2YgYWN0aXZlIGZpbHRlcnNcbiAgICAgICAgdGhpcy5maWx0ZXJzJC5uZXh0KFtdKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBldmVudFxuICAgICAgICB0aGlzLmV2ZW50cyQubmV4dChuZXcgRmlsdGVyUmVtb3ZlQWxsRXZlbnQoKSk7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChmaWx0ZXI6IEZpbHRlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzJC52YWx1ZS5pbmRleE9mKGZpbHRlcikgPiAtMTtcbiAgICB9XG59Il19