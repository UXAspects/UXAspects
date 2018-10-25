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
var FilterBaseComponent = /** @class */ (function () {
    function FilterBaseComponent(filtersContainer, _announcer) {
        this.filtersContainer = filtersContainer;
        this._announcer = _announcer;
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
            this.filtersContainer.filterService.add(_filter);
            this._announcer.announce("Filter " + _filter.name + " selected.");
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
        this.filtersContainer.filterService.remove(_filter);
        this._announcer.announce("Filter " + _filter.name + " deselected.");
    };
    FilterBaseComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-filter-base'
                },] }
    ];
    /** @nocollapse */
    FilterBaseComponent.ctorParameters = function () { return [
        { type: FilterContainerComponent, decorators: [{ type: Host }] },
        { type: LiveAnnouncer }
    ]; };
    FilterBaseComponent.propDecorators = {
        filters: [{ type: Input }]
    };
    return FilterBaseComponent;
}());
export { FilterBaseComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7O0lBaUJyRSw2QkFBNEIsZ0JBQTBDLEVBQVUsVUFBeUI7UUFBN0UscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDckcsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxvQkFBb0IsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDcko7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELHVDQUFTOzs7O0lBQVQsVUFBVSxPQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBVSxPQUFPLENBQUMsSUFBSSxlQUFZLENBQUMsQ0FBQztTQUNoRTtLQUNKOzs7OztJQUVELDBDQUFZOzs7O0lBQVosVUFBYSxPQUFlO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBVSxPQUFPLENBQUMsSUFBSSxpQkFBYyxDQUFDLENBQUM7S0FDbEU7O2dCQS9CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtpQkFDN0I7Ozs7Z0JBVlEsd0JBQXdCLHVCQWlCaEIsSUFBSTtnQkF0QlosYUFBYTs7OzBCQWtCakIsS0FBSzs7OEJBbEJWOztTQWdCYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBGaWx0ZXJSZW1vdmVBbGxFdmVudCB9IGZyb20gJy4uL2V2ZW50cy9maWx0ZXItcmVtb3ZlLWFsbC1ldmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi9maWx0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBUaGlzIHNob3VsZCBubyBsb25nZXIgYmUgdXNlZCBhcyB3ZSBub3cgaGF2ZSB0aGUgRmlsdGVyU2VydmljZVxuICogd2hpY2ggaXMgZWFzaWVyIHRvIHVzZSB0aGFuIHRoaXMgYmFzZSBjb21wb25lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWJhc2UnXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZmlsdGVyczogRmlsdGVyW107XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHJpdmF0ZSBmaWx0ZXJzQ29udGFpbmVyOiBGaWx0ZXJDb250YWluZXJDb21wb25lbnQsIHByaXZhdGUgX2Fubm91bmNlcjogTGl2ZUFubm91bmNlcikge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBmaWx0ZXJzQ29udGFpbmVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEZpbHRlclJlbW92ZUFsbEV2ZW50KSkuc3Vic2NyaWJlKHRoaXMucmVtb3ZlRmlsdGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBhZGRGaWx0ZXIoX2ZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIGlmICghX2ZpbHRlci5pbml0aWFsKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNDb250YWluZXIuZmlsdGVyU2VydmljZS5hZGQoX2ZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYEZpbHRlciAke19maWx0ZXIubmFtZX0gc2VsZWN0ZWQuYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVGaWx0ZXIoX2ZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIGlmICghX2ZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maWx0ZXJzQ29udGFpbmVyLmZpbHRlclNlcnZpY2UucmVtb3ZlKF9maWx0ZXIpO1xuICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYEZpbHRlciAke19maWx0ZXIubmFtZX0gZGVzZWxlY3RlZC5gKTtcbiAgICB9XG5cbn0iXX0=