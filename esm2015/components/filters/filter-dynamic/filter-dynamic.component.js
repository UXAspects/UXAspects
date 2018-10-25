/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TypeaheadKeyService } from '../../typeahead/index';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterService } from '../filter.service';
let /** @type {?} */ uniqueId = 1;
export class FilterDynamicComponent {
    /**
     * @param {?} typeaheadKeyService
     * @param {?} _filterService
     * @param {?} _elementRef
     */
    constructor(typeaheadKeyService, _filterService, _elementRef) {
        this.typeaheadKeyService = typeaheadKeyService;
        this._filterService = _filterService;
        this._elementRef = _elementRef;
        /**
         * The list of possible filter options
         */
        this.filters = [];
        /**
         * Generate a unique id for the typeahead
         */
        this.typeaheadId = `ux-filter-dynamic-typeahead-${uniqueId++}`;
        /**
         * Store the current search query
         */
        this.query$ = new BehaviorSubject('');
        /**
         * Indicate whether or not the typeahead should be shown
         */
        this.showTypeahead = true;
        /**
         * Store the items that should be displayed in the typeahead
         */
        this.typeaheadItems = [];
        /**
         * Store the open state of the typeahead
         */
        this.typeaheadOpen = false;
        /**
         * The default options
         */
        this._defaultOptions = { placeholder: '', minCharacters: 3, maxResults: Infinity };
        /**
         * Store the user specified typeahead options
         */
        this._options = Object.assign({}, this._defaultOptions);
        /**
         * Unsubscribe from all subscriptions
         */
        this._onDestroy = new Subject();
        // listen for remove all events in which case we should deselect event initial filters
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
     * Specify the typeahead options
     * @param {?} options
     * @return {?}
     */
    set options(options) { this._options = options; }
    /**
     * Get the options with the defaults for any missing options
     * @return {?}
     */
    get options() {
        return Object.assign({}, this._defaultOptions, this._options);
    }
    /**
     * Set up the initial conditions
     * @return {?}
     */
    ngOnInit() {
        // The initially selected item should be set the the specified initial item
        this.selected = this.initial;
        // watch for changes to the selected filters
        this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
            filters.forEach(filter => {
                if (this.filters.indexOf(filter) !== -1) {
                    this.selected = filter;
                }
            });
        });
        // get the items to be displayed in the typeahead
        this.typeaheadItems = this.getItems();
        // determine if we should show the typeahead control
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    }
    /**
     * Cleanup all subscriptions
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Get the items to display in the typeahead based on the search query
     * @return {?}
     */
    getItems() {
        const /** @type {?} */ query = this.query$.value.toLowerCase();
        return this.filters.filter(item => item !== this.initial && item.name.toLowerCase().indexOf(query) !== -1)
            .map(item => item.name)
            .slice(0, this._options.maxResults);
    }
    /**
     * Handle selection of a typeahead options
     * @param {?} typeaheadOption
     * @return {?}
     */
    selectOption(typeaheadOption) {
        // remove any current filters
        this.removeFilter();
        // find the filter that corresponds to the selected item
        this.selected = this.filters.find(_filter => _filter.name === typeaheadOption.value);
        // store the selection in the service
        this._filterService.add(this.selected);
        // clear the search query
        this.query$.next('');
        // hide the dropdown
        this.dropdown.hide();
    }
    /**
     * If a click occurred that was outside the dropdown then close the dropdown
     * @param {?} target
     * @return {?}
     */
    clickOff(target) {
        // if the click was outside the dropdown then close it
        if (!(/** @type {?} */ (this._elementRef.nativeElement)).contains(target)) {
            this.query$.next('');
            this.dropdown.hide();
        }
    }
    /**
     * If a filter needs removed, and is not the initial filter then remove it
     * @return {?}
     */
    removeFilter() {
        // check if the filter we want to remove is the initial filter
        if (this.selected !== this.initial) {
            this._filterService.remove(this.selected);
            this.selected = this.initial;
        }
        // clear the search query
        this.query$.next('');
    }
    /**
     * Select a specific filter
     * @param {?} filter
     * @return {?}
     */
    selectFilter(filter) {
        // clear any current filters
        this.removeFilter();
        // store the newly selected filter
        this.selected = filter;
        // store the filter in the service
        this._filterService.add(this.selected);
    }
    /**
     * Update typeahead items and visibility
     * @param {?} query
     * @return {?}
     */
    updateTypeahead(query) {
        this.typeaheadOpen = query.length >= this._options.minCharacters;
        this.typeaheadItems = this.getItems();
    }
    /**
     * Select a filter from a typeahead item
     * @param {?} event
     * @return {?}
     */
    select(event) {
        // find the filter with the matching name
        const /** @type {?} */ filter = this.filters.find(_filter => _filter.name === event.option);
        if (filter) {
            this.selectFilter(filter);
        }
    }
}
FilterDynamicComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dynamic',
                template: "<div class=\"btn-group ux-dynamic-filter\"\n    dropdown\n    [autoClose]=\"true\"\n    #dynamicDropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        aria-haspopup=\"true\"\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dynamicDropdown.isOpen\"\n        [attr.aria-expanded]=\"dynamicDropdown.isOpen\"\n        [class.active]=\"selected !== initial\"\n        class=\"filter-dropdown btn dropdown-toggle\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"initial === selected\"\n                (click)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.escape)=\"menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n            </a>\n        </li>\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"selected !== initial && showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem>\n                <i class=\"hpe-icon hpe-checkmark\"></i>\n                <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n            </a>\n        </li>\n\n        <hr>\n\n        <li *ngIf=\"showTypeahead\" class=\"typeahead-box\" role=\"none\">\n\n                <input type=\"text\"\n                    class=\"form-control\"\n                    [placeholder]=\"options?.placeholder\"\n                    [attr.aria-activedescendant]=\"highlightedElement?.id\"\n                    [attr.aria-controls]=\"typeaheadId\"\n                    aria-autocomplete=\"list\"\n                    aria-multiline=\"false\"\n                    [ngModel]=\"query$ | async\"\n                    (ngModelChange)=\"query$.next($event); updateTypeahead($event)\"\n                    (keydown)=\"typeaheadKeyService.handleKey($event, typeahead); $event.stopPropagation();\"\n                    (keydown.enter)=\"$event.preventDefault()\"\n                    (blur)=\"typeaheadOpen = false\"\n                    (click)=\"$event.stopPropagation()\">\n\n                <ux-typeahead #typeahead\n                    [id]=\"typeaheadId\"\n                    [(open)]=\"typeaheadOpen\"\n                    display=\"title\"\n                    [selectOnEnter]=\"true\"\n                    [options]=\"typeaheadItems\"\n                    [optionTemplate]=\"filterOptionTemplate\"\n                    (optionSelected)=\"select($event); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (highlightedElementChange)=\"highlightedElement = $event\">\n                </ux-typeahead>\n        </li>\n\n        <ng-container *ngIf=\"!showTypeahead\">\n\n            <li class=\"dropdown-list-item\"\n                *ngFor=\"let filter of filters\"\n                role=\"none\">\n\n                <a class=\"dropdown-item\"\n                    role=\"menuitem\"\n                    tabindex=\"-1\"\n                    uxMenuNavigationItem\n                    [attr.aria-selected]=\"filter === selected\"\n                    (click)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (keydown.enter)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\">\n\n                    <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                    <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                </a>\n            </li>\n\n        </ng-container>\n\n    </ul>\n</div>\n\n<ng-template #filterOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span [attr.aria-label]=\"option\" [innerHTML]=\"option | filterTypeaheadHighlight: (query$ | async)\"></span>\n</ng-template>"
            }] }
];
/** @nocollapse */
FilterDynamicComponent.ctorParameters = () => [
    { type: TypeaheadKeyService },
    { type: FilterService },
    { type: ElementRef }
];
FilterDynamicComponent.propDecorators = {
    filters: [{ type: Input }],
    initial: [{ type: Input }],
    options: [{ type: Input }],
    dropdown: [{ type: ViewChild, args: [BsDropdownDirective,] }],
    clickOff: [{ type: HostListener, args: ['document:click', ['$event.target'],] }]
};
function FilterDynamicComponent_tsickle_Closure_declarations() {
    /**
     * The list of possible filter options
     * @type {?}
     */
    FilterDynamicComponent.prototype.filters;
    /**
     * Specify if there should be an initially selected filter
     * @type {?}
     */
    FilterDynamicComponent.prototype.initial;
    /**
     * Get the dropdown directive
     * @type {?}
     */
    FilterDynamicComponent.prototype.dropdown;
    /**
     * Generate a unique id for the typeahead
     * @type {?}
     */
    FilterDynamicComponent.prototype.typeaheadId;
    /**
     * Store the current search query
     * @type {?}
     */
    FilterDynamicComponent.prototype.query$;
    /**
     * Store the selected filter
     * @type {?}
     */
    FilterDynamicComponent.prototype.selected;
    /**
     * Indicate whether or not the typeahead should be shown
     * @type {?}
     */
    FilterDynamicComponent.prototype.showTypeahead;
    /**
     * Store the items that should be displayed in the typeahead
     * @type {?}
     */
    FilterDynamicComponent.prototype.typeaheadItems;
    /**
     * Store the currently highlighted element
     * @type {?}
     */
    FilterDynamicComponent.prototype.highlightedElement;
    /**
     * Store the open state of the typeahead
     * @type {?}
     */
    FilterDynamicComponent.prototype.typeaheadOpen;
    /**
     * The default options
     * @type {?}
     */
    FilterDynamicComponent.prototype._defaultOptions;
    /**
     * Store the user specified typeahead options
     * @type {?}
     */
    FilterDynamicComponent.prototype._options;
    /**
     * Unsubscribe from all subscriptions
     * @type {?}
     */
    FilterDynamicComponent.prototype._onDestroy;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadKeyService;
    /** @type {?} */
    FilterDynamicComponent.prototype._filterService;
    /** @type {?} */
    FilterDynamicComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxtQkFBbUIsRUFBd0IsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFJbEQscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQU1qQixNQUFNOzs7Ozs7SUFpREYsWUFBbUIsbUJBQXdDLEVBQVUsY0FBNkIsRUFBVSxXQUF1QjtRQUFoSCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTs7Ozt1QkE5Q3RHLEVBQUU7Ozs7MkJBaUJULCtCQUErQixRQUFRLEVBQUUsRUFBRTs7OztzQkFHeEQsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDOzs7OzZCQU1mLElBQUk7Ozs7OEJBR0YsRUFBRTs7Ozs2QkFNSixLQUFL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TUFBYzs7UUFHdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOztRQUdwQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQzs7UUFHdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzFDOzs7Ozs7SUFHRCxlQUFlLENBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDekM7Ozs7OztJQUdELE1BQU0sQ0FBQyxLQUEyQjs7UUFFOUIsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0UsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0I7S0FDSjs7O1lBL0tKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qiw0dUpBQThDO2FBQ2pEOzs7O1lBWFEsbUJBQW1CO1lBRW5CLGFBQWE7WUFSRixVQUFVOzs7c0JBcUJ6QixLQUFLO3NCQUdMLEtBQUs7c0JBR0wsS0FBSzt1QkFRTCxTQUFTLFNBQUMsbUJBQW1CO3VCQXdHN0IsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnNEcm9wZG93bkRpcmVjdGl2ZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuaW1wb3J0IHsgVHlwZWFoZWFkTWF0Y2ggfSBmcm9tICduZ3gtYm9vdHN0cmFwL3R5cGVhaGVhZCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBmaWx0ZXIgYXMgcnhGaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVHlwZWFoZWFkS2V5U2VydmljZSwgVHlwZWFoZWFkT3B0aW9uRXZlbnQgfSBmcm9tICcuLi8uLi90eXBlYWhlYWQvaW5kZXgnO1xuaW1wb3J0IHsgRmlsdGVyUmVtb3ZlQWxsRXZlbnQgfSBmcm9tICcuLi9ldmVudHMvZmlsdGVyLXJlbW92ZS1hbGwtZXZlbnQnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL2ZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXItZHluYW1pYy1saXN0LWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcblxubGV0IHVuaXF1ZUlkID0gMTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItZHluYW1pYycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZpbHRlci1keW5hbWljLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJEeW5hbWljQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIC8qKiBUaGUgbGlzdCBvZiBwb3NzaWJsZSBmaWx0ZXIgb3B0aW9ucyAqL1xuICAgIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlcltdID0gW107XG5cbiAgICAvKiogU3BlY2lmeSBpZiB0aGVyZSBzaG91bGQgYmUgYW4gaW5pdGlhbGx5IHNlbGVjdGVkIGZpbHRlciAqL1xuICAgIEBJbnB1dCgpIGluaXRpYWw6IEZpbHRlcjtcblxuICAgIC8qKiBTcGVjaWZ5IHRoZSB0eXBlYWhlYWQgb3B0aW9ucyAqL1xuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnKSB7IHRoaXMuX29wdGlvbnMgPSBvcHRpb25zOyB9XG5cbiAgICAvKiogR2V0IHRoZSBvcHRpb25zIHdpdGggdGhlIGRlZmF1bHRzIGZvciBhbnkgbWlzc2luZyBvcHRpb25zICovXG4gICAgZ2V0IG9wdGlvbnMoKTogRmlsdGVyRHluYW1pY0xpc3RDb25maWcge1xuICAgICAgICByZXR1cm4geyAuLi4gdGhpcy5fZGVmYXVsdE9wdGlvbnMsIC4uLnRoaXMuX29wdGlvbnMgfTtcbiAgICB9XG5cbiAgICAvKiogR2V0IHRoZSBkcm9wZG93biBkaXJlY3RpdmUgKi9cbiAgICBAVmlld0NoaWxkKEJzRHJvcGRvd25EaXJlY3RpdmUpIGRyb3Bkb3duOiBCc0Ryb3Bkb3duRGlyZWN0aXZlO1xuXG4gICAgLyoqIEdlbmVyYXRlIGEgdW5pcXVlIGlkIGZvciB0aGUgdHlwZWFoZWFkICovXG4gICAgdHlwZWFoZWFkSWQ6IHN0cmluZyA9IGB1eC1maWx0ZXItZHluYW1pYy10eXBlYWhlYWQtJHt1bmlxdWVJZCsrfWA7XG5cbiAgICAvKiogU3RvcmUgdGhlIGN1cnJlbnQgc2VhcmNoIHF1ZXJ5ICovXG4gICAgcXVlcnkkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICAgIC8qKiBTdG9yZSB0aGUgc2VsZWN0ZWQgZmlsdGVyICovXG4gICAgc2VsZWN0ZWQ6IEZpbHRlcjtcblxuICAgIC8qKiBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgdHlwZWFoZWFkIHNob3VsZCBiZSBzaG93biAqL1xuICAgIHNob3dUeXBlYWhlYWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFN0b3JlIHRoZSBpdGVtcyB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHR5cGVhaGVhZCAqL1xuICAgIHR5cGVhaGVhZEl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLyoqIFN0b3JlIHRoZSBjdXJyZW50bHkgaGlnaGxpZ2h0ZWQgZWxlbWVudCAqL1xuICAgIGhpZ2hsaWdodGVkRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKiogU3RvcmUgdGhlIG9wZW4gc3RhdGUgb2YgdGhlIHR5cGVhaGVhZCAqL1xuICAgIHR5cGVhaGVhZE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgZGVmYXVsdCBvcHRpb25zICovXG4gICAgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnID0geyBwbGFjZWhvbGRlcjogJycsIG1pbkNoYXJhY3RlcnM6IDMsIG1heFJlc3VsdHM6IEluZmluaXR5IH07XG5cbiAgICAvKiogU3RvcmUgdGhlIHVzZXIgc3BlY2lmaWVkIHR5cGVhaGVhZCBvcHRpb25zICovXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogRmlsdGVyRHluYW1pY0xpc3RDb25maWcgPSB7IC4uLnRoaXMuX2RlZmF1bHRPcHRpb25zIH07XG5cbiAgICAvKiogVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9ucyAqL1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSwgcHJpdmF0ZSBfZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICAvLyBsaXN0ZW4gZm9yIHJlbW92ZSBhbGwgZXZlbnRzIGluIHdoaWNoIGNhc2Ugd2Ugc2hvdWxkIGRlc2VsZWN0IGV2ZW50IGluaXRpYWwgZmlsdGVyc1xuICAgICAgICBfZmlsdGVyU2VydmljZS5ldmVudHMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIHJ4RmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgRmlsdGVyUmVtb3ZlQWxsRXZlbnQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZUZpbHRlcigpKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgY3VycmVudCBzZWxlY3RlZCBmaWx0ZXIgaXMgc3RpbGwgc2VsZWN0ZWQgd2hlbiB0aGUgYWN0aXZlIGZpbHRlcnMgY2hhbmdlXG4gICAgICAgIF9maWx0ZXJTZXJ2aWNlLmZpbHRlcnMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmaWx0ZXJzID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICYmIGZpbHRlcnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZpbHRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogU2V0IHVwIHRoZSBpbml0aWFsIGNvbmRpdGlvbnMgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBUaGUgaW5pdGlhbGx5IHNlbGVjdGVkIGl0ZW0gc2hvdWxkIGJlIHNldCB0aGUgdGhlIHNwZWNpZmllZCBpbml0aWFsIGl0ZW1cbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcblxuICAgICAgICAvLyB3YXRjaCBmb3IgY2hhbmdlcyB0byB0aGUgc2VsZWN0ZWQgZmlsdGVyc1xuICAgICAgICB0aGlzLl9maWx0ZXJTZXJ2aWNlLmZpbHRlcnMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmaWx0ZXJzID0+IHtcbiAgICAgICAgICAgIGZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmlsdGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgdGhlIGl0ZW1zIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdHlwZWFoZWFkXG4gICAgICAgIHRoaXMudHlwZWFoZWFkSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHdlIHNob3VsZCBzaG93IHRoZSB0eXBlYWhlYWQgY29udHJvbFxuICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5tYXhJbmRpdmlkdWFsSXRlbXMgJiYgdGhpcy5vcHRpb25zLm1heEluZGl2aWR1YWxJdGVtcyArIDEgPj0gdGhpcy5maWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zaG93VHlwZWFoZWFkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2xlYW51cCBhbGwgc3Vic2NyaXB0aW9ucyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogR2V0IHRoZSBpdGVtcyB0byBkaXNwbGF5IGluIHRoZSB0eXBlYWhlYWQgYmFzZWQgb24gdGhlIHNlYXJjaCBxdWVyeSAqL1xuICAgIGdldEl0ZW1zKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5JC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcnMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdGhpcy5pbml0aWFsICYmIGl0ZW0ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkpICE9PSAtMSlcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PiBpdGVtLm5hbWUpXG4gICAgICAgICAgICAuc2xpY2UoMCwgdGhpcy5fb3B0aW9ucy5tYXhSZXN1bHRzKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIHNlbGVjdGlvbiBvZiBhIHR5cGVhaGVhZCBvcHRpb25zICovXG4gICAgc2VsZWN0T3B0aW9uKHR5cGVhaGVhZE9wdGlvbjogVHlwZWFoZWFkTWF0Y2gpOiB2b2lkIHtcblxuICAgICAgICAvLyByZW1vdmUgYW55IGN1cnJlbnQgZmlsdGVyc1xuICAgICAgICB0aGlzLnJlbW92ZUZpbHRlcigpO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIGZpbHRlciB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmZpbHRlcnMuZmluZChfZmlsdGVyID0+IF9maWx0ZXIubmFtZSA9PT0gdHlwZWFoZWFkT3B0aW9uLnZhbHVlKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgc2VsZWN0aW9uIGluIHRoZSBzZXJ2aWNlXG4gICAgICAgIHRoaXMuX2ZpbHRlclNlcnZpY2UuYWRkKHRoaXMuc2VsZWN0ZWQpO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSBzZWFyY2ggcXVlcnlcbiAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG5cbiAgICAgICAgLy8gaGlkZSB0aGUgZHJvcGRvd25cbiAgICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XG4gICAgfVxuXG4gICAgLyoqIElmIGEgY2xpY2sgb2NjdXJyZWQgdGhhdCB3YXMgb3V0c2lkZSB0aGUgZHJvcGRvd24gdGhlbiBjbG9zZSB0aGUgZHJvcGRvd24gKi9cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKVxuICAgIGNsaWNrT2ZmKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGUgY2xpY2sgd2FzIG91dHNpZGUgdGhlIGRyb3Bkb3duIHRoZW4gY2xvc2UgaXRcbiAgICAgICAgaWYgKCEodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5JC5uZXh0KCcnKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIElmIGEgZmlsdGVyIG5lZWRzIHJlbW92ZWQsIGFuZCBpcyBub3QgdGhlIGluaXRpYWwgZmlsdGVyIHRoZW4gcmVtb3ZlIGl0ICovXG4gICAgcmVtb3ZlRmlsdGVyKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBmaWx0ZXIgd2Ugd2FudCB0byByZW1vdmUgaXMgdGhlIGluaXRpYWwgZmlsdGVyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICE9PSB0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlclNlcnZpY2UucmVtb3ZlKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIHRoZSBzZWFyY2ggcXVlcnlcbiAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG4gICAgfVxuXG4gICAgLyoqIFNlbGVjdCBhIHNwZWNpZmljIGZpbHRlciAqL1xuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNsZWFyIGFueSBjdXJyZW50IGZpbHRlcnNcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbmV3bHkgc2VsZWN0ZWQgZmlsdGVyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmaWx0ZXI7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGZpbHRlciBpbiB0aGUgc2VydmljZVxuICAgICAgICB0aGlzLl9maWx0ZXJTZXJ2aWNlLmFkZCh0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICAvKiogVXBkYXRlIHR5cGVhaGVhZCBpdGVtcyBhbmQgdmlzaWJpbGl0eSAqL1xuICAgIHVwZGF0ZVR5cGVhaGVhZChxdWVyeTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkT3BlbiA9IHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLl9vcHRpb25zLm1pbkNoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgLyoqIFNlbGVjdCBhIGZpbHRlciBmcm9tIGEgdHlwZWFoZWFkIGl0ZW0gKi9cbiAgICBzZWxlY3QoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIGZpbmQgdGhlIGZpbHRlciB3aXRoIHRoZSBtYXRjaGluZyBuYW1lXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuZmlsdGVycy5maW5kKF9maWx0ZXIgPT4gX2ZpbHRlci5uYW1lID09PSBldmVudC5vcHRpb24pO1xuXG4gICAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=