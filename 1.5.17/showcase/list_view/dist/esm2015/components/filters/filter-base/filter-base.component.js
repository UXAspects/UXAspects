/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directive, Host, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FilterContainerComponent, FilterRemoveAllEvent } from '../filter-container.component';
export class FilterBaseComponent {
    /**
     * @param {?} filtersContainer
     * @param {?} _announcer
     */
    constructor(filtersContainer, _announcer) {
        this.filtersContainer = filtersContainer;
        this._announcer = _announcer;
        this._subscription = filtersContainer.events.pipe(filter(event => event instanceof FilterRemoveAllEvent)).subscribe(this.removeFilter.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} _filter
     * @return {?}
     */
    addFilter(_filter) {
        if (!_filter.initial) {
            this.filtersContainer.addFilter(_filter);
            this._announcer.announce(`Filter ${_filter.name} selected.`);
        }
    }
    /**
     * @param {?} _filter
     * @return {?}
     */
    removeFilter(_filter) {
        if (!_filter) {
            return;
        }
        this.filtersContainer.removeFilter(_filter);
        this._announcer.announce(`Filter ${_filter.name} deselected.`);
    }
}
FilterBaseComponent.decorators = [
    { type: Directive, args: [{
                selector: 'ux-filter-base'
            },] },
];
/** @nocollapse */
FilterBaseComponent.ctorParameters = () => [
    { type: FilterContainerComponent, decorators: [{ type: Host },] },
    { type: LiveAnnouncer, },
];
FilterBaseComponent.propDecorators = {
    "filters": [{ type: Input },],
};
function FilterBaseComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterBaseComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterBaseComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FilterBaseComponent.propDecorators;
    /** @type {?} */
    FilterBaseComponent.prototype.filters;
    /** @type {?} */
    FilterBaseComponent.prototype._subscription;
    /** @type {?} */
    FilterBaseComponent.prototype.filtersContainer;
    /** @type {?} */
    FilterBaseComponent.prototype._announcer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBVSx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBS3ZHLE1BQU07Ozs7O0lBTUYsWUFBNEIsa0JBQW9ELFVBQXlCO1FBQTdFLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFBb0MsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUNyRyxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLFlBQVksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3JKOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQWU7UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsT0FBTyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUM7U0FDaEU7S0FDSjs7Ozs7SUFFRCxZQUFZLENBQUMsT0FBZTtRQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxPQUFPLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQztLQUNsRTs7O1lBL0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzdCOzs7O1lBSmdCLHdCQUF3Qix1QkFXeEIsSUFBSTtZQWZaLGFBQWE7Ozt3QkFXakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTGl2ZUFubm91bmNlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRmlsdGVyLCBGaWx0ZXJDb250YWluZXJDb21wb25lbnQsIEZpbHRlclJlbW92ZUFsbEV2ZW50IH0gZnJvbSAnLi4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3V4LWZpbHRlci1iYXNlJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlcltdO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihASG9zdCgpIHByaXZhdGUgZmlsdGVyc0NvbnRhaW5lcjogRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50LCBwcml2YXRlIF9hbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gZmlsdGVyc0NvbnRhaW5lci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBGaWx0ZXJSZW1vdmVBbGxFdmVudCkpLnN1YnNjcmliZSh0aGlzLnJlbW92ZUZpbHRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgYWRkRmlsdGVyKF9maWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICBpZiAoIV9maWx0ZXIuaW5pdGlhbCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzQ29udGFpbmVyLmFkZEZpbHRlcihfZmlsdGVyKTtcbiAgICAgICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgRmlsdGVyICR7X2ZpbHRlci5uYW1lfSBzZWxlY3RlZC5gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihfZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFfZmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpbHRlcnNDb250YWluZXIucmVtb3ZlRmlsdGVyKF9maWx0ZXIpO1xuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYEZpbHRlciAke19maWx0ZXIubmFtZX0gZGVzZWxlY3RlZC5gKTtcbiAgICB9XG5cbn0iXX0=