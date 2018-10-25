/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterService } from '../filter.service';
export class FilterDropdownComponent {
    /**
     * @param {?} _filterService
     */
    constructor(_filterService) {
        this._filterService = _filterService;
        /**
         * The list of items to display in the dropdown
         */
        this.filters = [];
        this._onDestroy = new Subject();
        _filterService.events$.pipe(takeUntil(this._onDestroy), rxFilter(event => event instanceof FilterRemoveAllEvent))
            .subscribe(() => this.removeFilter());
        // ensure that the current selected filter is still selected when the active filters change
        _filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
            if (this.selected && filters.indexOf(this.selected) === -1) {
                this.removeFilter();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selected = this.initial;
        // check to see if any of the filters have been preselected or changes to selected filters
        this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
            filters.forEach(filter => {
                if (this.filters.indexOf(filter) !== -1) {
                    this.selected = filter;
                }
            });
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} filter
     * @param {?} event
     * @return {?}
     */
    selectFilter(filter, event) {
        this.removeFilter();
        this.selected = filter;
        this._filterService.add(this.selected);
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    removeFilter() {
        this._filterService.remove(this.selected);
        this.selected = this.initial;
    }
}
FilterDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dropdown',
                template: "<div class=\"btn-group\" dropdown [autoClose]=\"true\" #dropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dropdown.isOpen\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"dropdown.isOpen\"\n        class=\"filter-dropdown btn dropdown-toggle\"\n        [class.active]=\"selected !== initial\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\"\n        class=\"dropdown-menu\" role=\"menu\">\n\n        <li class=\"dropdown-list-item\"\n            *ngFor=\"let filter of filters\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"listitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"filter === selected\"\n                (click)=\"selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.escape)=\"menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n            </a>\n        </li>\n    </ul>\n</div>"
            }] }
];
/** @nocollapse */
FilterDropdownComponent.ctorParameters = () => [
    { type: FilterService }
];
FilterDropdownComponent.propDecorators = {
    filters: [{ type: Input }],
    initial: [{ type: Input }]
};
function FilterDropdownComponent_tsickle_Closure_declarations() {
    /**
     * The list of items to display in the dropdown
     * @type {?}
     */
    FilterDropdownComponent.prototype.filters;
    /**
     * Define an initial item to select
     * @type {?}
     */
    FilterDropdownComponent.prototype.initial;
    /** @type {?} */
    FilterDropdownComponent.prototype.selected;
    /** @type {?} */
    FilterDropdownComponent.prototype._onDestroy;
    /** @type {?} */
    FilterDropdownComponent.prototype._filterService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLWRyb3Bkb3duL2ZpbHRlci1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU9sRCxNQUFNOzs7O0lBWUYsWUFBb0IsY0FBNkI7UUFBN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7Ozs7dUJBVHBCLEVBQUU7MEJBT1YsSUFBSSxPQUFPLEVBQVE7UUFHcEMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFlBQVksb0JBQW9CLENBQUMsQ0FBQzthQUM1RyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7O1FBRzFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtTQUNKLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7UUFHN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDOUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztpQkFDMUI7YUFDSixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7S0FDTjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7OztJQUVELFlBQVksQ0FBQyxNQUFjLEVBQUUsS0FBaUI7UUFDMUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2QyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzFCOzs7O0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDaEM7OztZQTFESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsK2lEQUErQzthQUNsRDs7OztZQU5RLGFBQWE7OztzQkFVakIsS0FBSztzQkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciBhcyByeEZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBGaWx0ZXJSZW1vdmVBbGxFdmVudCB9IGZyb20gJy4uL2V2ZW50cy9maWx0ZXItcmVtb3ZlLWFsbC1ldmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJEcm9wZG93bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBUaGUgbGlzdCBvZiBpdGVtcyB0byBkaXNwbGF5IGluIHRoZSBkcm9wZG93biAqL1xuICAgIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlcltdID0gW107XG5cbiAgICAvKiogRGVmaW5lIGFuIGluaXRpYWwgaXRlbSB0byBzZWxlY3QgKi9cbiAgICBASW5wdXQoKSBpbml0aWFsOiBGaWx0ZXI7XG5cbiAgICBzZWxlY3RlZDogRmlsdGVyO1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UpIHtcbiAgICAgICAgX2ZpbHRlclNlcnZpY2UuZXZlbnRzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCByeEZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEZpbHRlclJlbW92ZUFsbEV2ZW50KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVGaWx0ZXIoKSk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgZmlsdGVyIGlzIHN0aWxsIHNlbGVjdGVkIHdoZW4gdGhlIGFjdGl2ZSBmaWx0ZXJzIGNoYW5nZVxuICAgICAgICBfZmlsdGVyU2VydmljZS5maWx0ZXJzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZmlsdGVycyA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiBmaWx0ZXJzLmluZGV4T2YodGhpcy5zZWxlY3RlZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIGFueSBvZiB0aGUgZmlsdGVycyBoYXZlIGJlZW4gcHJlc2VsZWN0ZWQgb3IgY2hhbmdlcyB0byBzZWxlY3RlZCBmaWx0ZXJzXG4gICAgICAgIHRoaXMuX2ZpbHRlclNlcnZpY2UuZmlsdGVycyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGZpbHRlcnMgPT4ge1xuICAgICAgICAgICAgZmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVycy5pbmRleE9mKGZpbHRlcikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmaWx0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIsIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRmlsdGVyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmaWx0ZXI7XG4gICAgICAgIHRoaXMuX2ZpbHRlclNlcnZpY2UuYWRkKHRoaXMuc2VsZWN0ZWQpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyU2VydmljZS5yZW1vdmUodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG4gICAgfVxuXG59Il19