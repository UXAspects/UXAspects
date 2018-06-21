/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Host, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FilterContainerComponent, FilterRemoveAllEvent } from '../filter-container.component';
var FilterBaseComponent = (function () {
    function FilterBaseComponent(filtersContainer) {
        this.filtersContainer = filtersContainer;
        this._subscription = filtersContainer.events.pipe(filter(function (event) { return event instanceof FilterRemoveAllEvent; })).subscribe(this.removeFilter.bind(this));
    }
    /**
     * @return {?}
     */
    FilterBaseComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} _filter
     * @return {?}
     */
    FilterBaseComponent.prototype.addFilter = /**
     * @param {?} _filter
     * @return {?}
     */
    function (_filter) {
        if (!_filter.initial) {
            this.filtersContainer.addFilter(_filter);
        }
    };
    /**
     * @param {?} _filter
     * @return {?}
     */
    FilterBaseComponent.prototype.removeFilter = /**
     * @param {?} _filter
     * @return {?}
     */
    function (_filter) {
        if (!_filter) {
            return;
        }
        this.filtersContainer.removeFilter(_filter);
    };
    FilterBaseComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-filter-base'
                },] },
    ];
    /** @nocollapse */
    FilterBaseComponent.ctorParameters = function () { return [
        { type: FilterContainerComponent, decorators: [{ type: Host },] },
    ]; };
    FilterBaseComponent.propDecorators = {
        "filters": [{ type: Input },],
    };
    return FilterBaseComponent;
}());
export { FilterBaseComponent };
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFVLHdCQUF3QixFQUFFLG9CQUFvQixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0lBV25HLDZCQUE0QjtRQUFBLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxvQkFBb0IsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDcko7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELHVDQUFTOzs7O0lBQVQsVUFBVSxPQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QztLQUNKOzs7OztJQUVELDBDQUFZOzs7O0lBQVosVUFBYSxPQUFlO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMvQzs7Z0JBN0JKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUM3Qjs7OztnQkFKZ0Isd0JBQXdCLHVCQVd4QixJQUFJOzs7NEJBSmhCLEtBQUs7OzhCQVhWOztTQVNhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBGaWx0ZXIsIEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCwgRmlsdGVyUmVtb3ZlQWxsRXZlbnQgfSBmcm9tICcuLi9maWx0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWJhc2UnXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZmlsdGVyczogRmlsdGVyW107XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHJpdmF0ZSBmaWx0ZXJzQ29udGFpbmVyOiBGaWx0ZXJDb250YWluZXJDb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gZmlsdGVyc0NvbnRhaW5lci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBGaWx0ZXJSZW1vdmVBbGxFdmVudCkpLnN1YnNjcmliZSh0aGlzLnJlbW92ZUZpbHRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgYWRkRmlsdGVyKF9maWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICBpZiAoIV9maWx0ZXIuaW5pdGlhbCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzQ29udGFpbmVyLmFkZEZpbHRlcihfZmlsdGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihfZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFfZmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpbHRlcnNDb250YWluZXIucmVtb3ZlRmlsdGVyKF9maWx0ZXIpO1xuICAgIH1cblxufSJdfQ==