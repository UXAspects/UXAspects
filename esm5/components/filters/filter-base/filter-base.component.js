/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directive, Host, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FilterContainerComponent, FilterRemoveAllEvent } from '../filter-container.component';
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
            this.filtersContainer.addFilter(_filter);
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
        this.filtersContainer.removeFilter(_filter);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBVSx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztJQVduRyw2QkFBNEIsZ0JBQTBDLEVBQVUsVUFBeUI7UUFBN0UscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDckcsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxvQkFBb0IsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDcko7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELHVDQUFTOzs7O0lBQVQsVUFBVSxPQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFVLE9BQU8sQ0FBQyxJQUFJLGVBQVksQ0FBQyxDQUFDO1NBQ2hFO0tBQ0o7Ozs7O0lBRUQsMENBQVk7Ozs7SUFBWixVQUFhLE9BQWU7UUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVUsT0FBTyxDQUFDLElBQUksaUJBQWMsQ0FBQyxDQUFDO0tBQ2xFOztnQkEvQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzdCOzs7O2dCQUpnQix3QkFBd0IsdUJBV3hCLElBQUk7Z0JBZlosYUFBYTs7OzBCQVdqQixLQUFLOzs4QkFaVjs7U0FVYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IExpdmVBbm5vdW5jZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEZpbHRlciwgRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50LCBGaWx0ZXJSZW1vdmVBbGxFdmVudCB9IGZyb20gJy4uL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItYmFzZSdcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoQEhvc3QoKSBwcml2YXRlIGZpbHRlcnNDb250YWluZXI6IEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCwgcHJpdmF0ZSBfYW5ub3VuY2VyOiBMaXZlQW5ub3VuY2VyKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IGZpbHRlcnNDb250YWluZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgRmlsdGVyUmVtb3ZlQWxsRXZlbnQpKS5zdWJzY3JpYmUodGhpcy5yZW1vdmVGaWx0ZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGFkZEZpbHRlcihfZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFfZmlsdGVyLmluaXRpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyc0NvbnRhaW5lci5hZGRGaWx0ZXIoX2ZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UoYEZpbHRlciAke19maWx0ZXIubmFtZX0gc2VsZWN0ZWQuYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVGaWx0ZXIoX2ZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIGlmICghX2ZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maWx0ZXJzQ29udGFpbmVyLnJlbW92ZUZpbHRlcihfZmlsdGVyKTtcbiAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKGBGaWx0ZXIgJHtfZmlsdGVyLm5hbWV9IGRlc2VsZWN0ZWQuYCk7XG4gICAgfVxuXG59Il19