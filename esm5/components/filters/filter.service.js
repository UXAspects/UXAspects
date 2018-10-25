/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { FilterAddEvent } from './events/filter-add-event';
import { FilterRemoveAllEvent } from './events/filter-remove-all-event';
import { FilterRemoveEvent } from './events/filter-remove-event';
var FilterService = /** @class */ (function () {
    function FilterService() {
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
    FilterService.prototype.add = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        // if the filter is already selected or it is the intial filter then do nothing
        if (this.isSelected(filter) || filter.initial) {
            return;
        }
        // update the list of active filters
        this.filters$.next(tslib_1.__spread(this.filters$.value, [filter]));
        // emit the event
        this.events$.next(new FilterAddEvent(filter));
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterService.prototype.remove = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        // if the filter is not selected then do nothing
        if (!this.isSelected(filter)) {
            return;
        }
        // update the list of active filters
        this.filters$.next(this.filters$.value.filter(function (_filter) { return _filter !== filter; }));
        // emit the event
        this.events$.next(new FilterRemoveEvent(filter));
    };
    /**
     * @return {?}
     */
    FilterService.prototype.removeAll = /**
     * @return {?}
     */
    function () {
        // empty the list of active filters
        this.filters$.next([]);
        // emit the event
        this.events$.next(new FilterRemoveAllEvent());
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterService.prototype.isSelected = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        return this.filters$.value.indexOf(filter) > -1;
    };
    FilterService.decorators = [
        { type: Injectable }
    ];
    return FilterService;
}());
export { FilterService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozt3QkFPbEQsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDOzs7O3VCQUdsQyxJQUFJLE9BQU8sRUFBZTs7Ozs7O0lBRXBDLDJCQUFHOzs7O0lBQUgsVUFBSSxNQUFjOztRQUdkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFFLE1BQU0sR0FBRSxDQUFDOztRQUdyRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2pEOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxNQUFjOztRQUdqQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxNQUFNLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDOztRQUc5RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDcEQ7Ozs7SUFFRCxpQ0FBUzs7O0lBQVQ7O1FBR0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBR3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0tBQ2pEOzs7OztJQUVELGtDQUFVOzs7O0lBQVYsVUFBVyxNQUFjO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDbkQ7O2dCQWhESixVQUFVOzt3QkFUWDs7U0FVYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBGaWx0ZXJBZGRFdmVudCB9IGZyb20gJy4vZXZlbnRzL2ZpbHRlci1hZGQtZXZlbnQnO1xuaW1wb3J0IHsgRmlsdGVyRXZlbnQgfSBmcm9tICcuL2V2ZW50cy9maWx0ZXItZXZlbnQnO1xuaW1wb3J0IHsgRmlsdGVyUmVtb3ZlQWxsRXZlbnQgfSBmcm9tICcuL2V2ZW50cy9maWx0ZXItcmVtb3ZlLWFsbC1ldmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJSZW1vdmVFdmVudCB9IGZyb20gJy4vZXZlbnRzL2ZpbHRlci1yZW1vdmUtZXZlbnQnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsdGVyU2VydmljZSB7XG5cbiAgICAvKiogVGhlIGxpc3Qgb2YgYWN0aXZlIGZpbHRlcnMgKi9cbiAgICBmaWx0ZXJzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RmlsdGVyW10+KFtdKTtcblxuICAgIC8qKiBFbWl0IGFsbCB0aGUgZXZlbnRzIHdoZW4gdGhleSBvY2N1ciAqL1xuICAgIGV2ZW50cyQgPSBuZXcgU3ViamVjdDxGaWx0ZXJFdmVudD4oKTtcblxuICAgIGFkZChmaWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZSBmaWx0ZXIgaXMgYWxyZWFkeSBzZWxlY3RlZCBvciBpdCBpcyB0aGUgaW50aWFsIGZpbHRlciB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChmaWx0ZXIpIHx8IGZpbHRlci5pbml0aWFsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGxpc3Qgb2YgYWN0aXZlIGZpbHRlcnNcbiAgICAgICAgdGhpcy5maWx0ZXJzJC5uZXh0KFsuLi50aGlzLmZpbHRlcnMkLnZhbHVlLCBmaWx0ZXJdKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBldmVudFxuICAgICAgICB0aGlzLmV2ZW50cyQubmV4dChuZXcgRmlsdGVyQWRkRXZlbnQoZmlsdGVyKSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGZpbHRlciBpcyBub3Qgc2VsZWN0ZWQgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGZpbHRlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBvZiBhY3RpdmUgZmlsdGVyc1xuICAgICAgICB0aGlzLmZpbHRlcnMkLm5leHQodGhpcy5maWx0ZXJzJC52YWx1ZS5maWx0ZXIoX2ZpbHRlciA9PiBfZmlsdGVyICE9PSBmaWx0ZXIpKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBldmVudFxuICAgICAgICB0aGlzLmV2ZW50cyQubmV4dChuZXcgRmlsdGVyUmVtb3ZlRXZlbnQoZmlsdGVyKSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGVtcHR5IHRoZSBsaXN0IG9mIGFjdGl2ZSBmaWx0ZXJzXG4gICAgICAgIHRoaXMuZmlsdGVycyQubmV4dChbXSk7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgZXZlbnRcbiAgICAgICAgdGhpcy5ldmVudHMkLm5leHQobmV3IEZpbHRlclJlbW92ZUFsbEV2ZW50KCkpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoZmlsdGVyOiBGaWx0ZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycyQudmFsdWUuaW5kZXhPZihmaWx0ZXIpID4gLTE7XG4gICAgfVxufSJdfQ==