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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBVSx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBS3ZHLE1BQU07Ozs7O0lBTUYsWUFBNEIsZ0JBQTBDLEVBQVUsVUFBeUI7UUFBN0UscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDckcsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssWUFBWSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDcko7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBZTtRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxPQUFPLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQztTQUNoRTtLQUNKOzs7OztJQUVELFlBQVksQ0FBQyxPQUFlO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLE9BQU8sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDO0tBQ2xFOzs7WUEvQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7YUFDN0I7Ozs7WUFKZ0Isd0JBQXdCLHVCQVd4QixJQUFJO1lBZlosYUFBYTs7O3NCQVdqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBGaWx0ZXIsIEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCwgRmlsdGVyUmVtb3ZlQWxsRXZlbnQgfSBmcm9tICcuLi9maWx0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWJhc2UnXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZmlsdGVyczogRmlsdGVyW107XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHJpdmF0ZSBmaWx0ZXJzQ29udGFpbmVyOiBGaWx0ZXJDb250YWluZXJDb21wb25lbnQsIHByaXZhdGUgX2Fubm91bmNlcjogTGl2ZUFubm91bmNlcikge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBmaWx0ZXJzQ29udGFpbmVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEZpbHRlclJlbW92ZUFsbEV2ZW50KSkuc3Vic2NyaWJlKHRoaXMucmVtb3ZlRmlsdGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBhZGRGaWx0ZXIoX2ZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIGlmICghX2ZpbHRlci5pbml0aWFsKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNDb250YWluZXIuYWRkRmlsdGVyKF9maWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKGBGaWx0ZXIgJHtfZmlsdGVyLm5hbWV9IHNlbGVjdGVkLmApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKF9maWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICBpZiAoIV9maWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlsdGVyc0NvbnRhaW5lci5yZW1vdmVGaWx0ZXIoX2ZpbHRlcik7XG4gICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZShgRmlsdGVyICR7X2ZpbHRlci5uYW1lfSBkZXNlbGVjdGVkLmApO1xuICAgIH1cblxufSJdfQ==