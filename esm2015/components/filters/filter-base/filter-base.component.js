/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directive, Host, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterContainerComponent } from '../filter-container.component';
/**
 * @deprecated
 * This should no longer be used as we now have the FilterService
 * which is easier to use than this base component.
 */
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
            this.filtersContainer.filterService.add(_filter);
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
        this.filtersContainer.filterService.remove(_filter);
        this._announcer.announce(`Filter ${_filter.name} deselected.`);
    }
}
FilterBaseComponent.decorators = [
    { type: Directive, args: [{
                selector: 'ux-filter-base'
            },] }
];
/** @nocollapse */
FilterBaseComponent.ctorParameters = () => [
    { type: FilterContainerComponent, decorators: [{ type: Host }] },
    { type: LiveAnnouncer }
];
FilterBaseComponent.propDecorators = {
    filters: [{ type: Input }]
};
function FilterBaseComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterBaseComponent.prototype.filters;
    /** @type {?} */
    FilterBaseComponent.prototype._subscription;
    /** @type {?} */
    FilterBaseComponent.prototype.filtersContainer;
    /** @type {?} */
    FilterBaseComponent.prototype._announcer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFXekUsTUFBTTs7Ozs7SUFNRixZQUE0QixnQkFBMEMsRUFBVSxVQUF5QjtRQUE3RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTBCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUNyRyxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNySjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELFNBQVMsQ0FBQyxPQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxPQUFPLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQztTQUNoRTtLQUNKOzs7OztJQUVELFlBQVksQ0FBQyxPQUFlO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxPQUFPLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQztLQUNsRTs7O1lBL0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzdCOzs7O1lBVlEsd0JBQXdCLHVCQWlCaEIsSUFBSTtZQXRCWixhQUFhOzs7c0JBa0JqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGl2ZUFubm91bmNlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRmlsdGVyUmVtb3ZlQWxsRXZlbnQgfSBmcm9tICcuLi9ldmVudHMvZmlsdGVyLXJlbW92ZS1hbGwtZXZlbnQnO1xuaW1wb3J0IHsgRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICogVGhpcyBzaG91bGQgbm8gbG9uZ2VyIGJlIHVzZWQgYXMgd2Ugbm93IGhhdmUgdGhlIEZpbHRlclNlcnZpY2VcbiAqIHdoaWNoIGlzIGVhc2llciB0byB1c2UgdGhhbiB0aGlzIGJhc2UgY29tcG9uZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3V4LWZpbHRlci1iYXNlJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlcltdO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihASG9zdCgpIHByaXZhdGUgZmlsdGVyc0NvbnRhaW5lcjogRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50LCBwcml2YXRlIF9hbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gZmlsdGVyc0NvbnRhaW5lci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBGaWx0ZXJSZW1vdmVBbGxFdmVudCkpLnN1YnNjcmliZSh0aGlzLnJlbW92ZUZpbHRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgYWRkRmlsdGVyKF9maWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICBpZiAoIV9maWx0ZXIuaW5pdGlhbCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzQ29udGFpbmVyLmZpbHRlclNlcnZpY2UuYWRkKF9maWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKGBGaWx0ZXIgJHtfZmlsdGVyLm5hbWV9IHNlbGVjdGVkLmApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKF9maWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICBpZiAoIV9maWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlsdGVyc0NvbnRhaW5lci5maWx0ZXJTZXJ2aWNlLnJlbW92ZShfZmlsdGVyKTtcbiAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKGBGaWx0ZXIgJHtfZmlsdGVyLm5hbWV9IGRlc2VsZWN0ZWQuYCk7XG4gICAgfVxuXG59Il19