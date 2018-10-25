/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TypeaheadKeyService } from '../../typeahead/index';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterService } from '../filter.service';
var /** @type {?} */ uniqueId = 1;
var FilterDynamicComponent = /** @class */ (function () {
    function FilterDynamicComponent(typeaheadKeyService, _filterService, _elementRef) {
        var _this = this;
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
        this.typeaheadId = "ux-filter-dynamic-typeahead-" + uniqueId++;
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
        this._options = tslib_1.__assign({}, this._defaultOptions);
        /**
         * Unsubscribe from all subscriptions
         */
        this._onDestroy = new Subject();
        // listen for remove all events in which case we should deselect event initial filters
        _filterService.events$.pipe(takeUntil(this._onDestroy), rxFilter(function (event) { return event instanceof FilterRemoveAllEvent; }))
            .subscribe(function () { return _this.removeFilter(); });
        // ensure that the current selected filter is still selected when the active filters change
        _filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(function (filters) {
            if (_this.selected && filters.indexOf(_this.selected) === -1) {
                _this.removeFilter();
            }
        });
    }
    Object.defineProperty(FilterDynamicComponent.prototype, "options", {
        /** Get the options with the defaults for any missing options */
        get: /**
         * Get the options with the defaults for any missing options
         * @return {?}
         */
        function () {
            return tslib_1.__assign({}, this._defaultOptions, this._options);
        },
        /** Specify the typeahead options */
        set: /**
         * Specify the typeahead options
         * @param {?} options
         * @return {?}
         */
        function (options) { this._options = options; },
        enumerable: true,
        configurable: true
    });
    /** Set up the initial conditions */
    /**
     * Set up the initial conditions
     * @return {?}
     */
    FilterDynamicComponent.prototype.ngOnInit = /**
     * Set up the initial conditions
     * @return {?}
     */
    function () {
        var _this = this;
        // The initially selected item should be set the the specified initial item
        this.selected = this.initial;
        // watch for changes to the selected filters
        this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(function (filters) {
            filters.forEach(function (filter) {
                if (_this.filters.indexOf(filter) !== -1) {
                    _this.selected = filter;
                }
            });
        });
        // get the items to be displayed in the typeahead
        this.typeaheadItems = this.getItems();
        // determine if we should show the typeahead control
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    };
    /** Cleanup all subscriptions */
    /**
     * Cleanup all subscriptions
     * @return {?}
     */
    FilterDynamicComponent.prototype.ngOnDestroy = /**
     * Cleanup all subscriptions
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Get the items to display in the typeahead based on the search query */
    /**
     * Get the items to display in the typeahead based on the search query
     * @return {?}
     */
    FilterDynamicComponent.prototype.getItems = /**
     * Get the items to display in the typeahead based on the search query
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ query = this.query$.value.toLowerCase();
        return this.filters.filter(function (item) { return item !== _this.initial && item.name.toLowerCase().indexOf(query) !== -1; })
            .map(function (item) { return item.name; })
            .slice(0, this._options.maxResults);
    };
    /** Handle selection of a typeahead options */
    /**
     * Handle selection of a typeahead options
     * @param {?} typeaheadOption
     * @return {?}
     */
    FilterDynamicComponent.prototype.selectOption = /**
     * Handle selection of a typeahead options
     * @param {?} typeaheadOption
     * @return {?}
     */
    function (typeaheadOption) {
        // remove any current filters
        this.removeFilter();
        // find the filter that corresponds to the selected item
        this.selected = this.filters.find(function (_filter) { return _filter.name === typeaheadOption.value; });
        // store the selection in the service
        this._filterService.add(this.selected);
        // clear the search query
        this.query$.next('');
        // hide the dropdown
        this.dropdown.hide();
    };
    /** If a click occurred that was outside the dropdown then close the dropdown */
    /**
     * If a click occurred that was outside the dropdown then close the dropdown
     * @param {?} target
     * @return {?}
     */
    FilterDynamicComponent.prototype.clickOff = /**
     * If a click occurred that was outside the dropdown then close the dropdown
     * @param {?} target
     * @return {?}
     */
    function (target) {
        // if the click was outside the dropdown then close it
        if (!(/** @type {?} */ (this._elementRef.nativeElement)).contains(target)) {
            this.query$.next('');
            this.dropdown.hide();
        }
    };
    /** If a filter needs removed, and is not the initial filter then remove it */
    /**
     * If a filter needs removed, and is not the initial filter then remove it
     * @return {?}
     */
    FilterDynamicComponent.prototype.removeFilter = /**
     * If a filter needs removed, and is not the initial filter then remove it
     * @return {?}
     */
    function () {
        // check if the filter we want to remove is the initial filter
        if (this.selected !== this.initial) {
            this._filterService.remove(this.selected);
            this.selected = this.initial;
        }
        // clear the search query
        this.query$.next('');
    };
    /** Select a specific filter */
    /**
     * Select a specific filter
     * @param {?} filter
     * @return {?}
     */
    FilterDynamicComponent.prototype.selectFilter = /**
     * Select a specific filter
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        // clear any current filters
        this.removeFilter();
        // store the newly selected filter
        this.selected = filter;
        // store the filter in the service
        this._filterService.add(this.selected);
    };
    /** Update typeahead items and visibility */
    /**
     * Update typeahead items and visibility
     * @param {?} query
     * @return {?}
     */
    FilterDynamicComponent.prototype.updateTypeahead = /**
     * Update typeahead items and visibility
     * @param {?} query
     * @return {?}
     */
    function (query) {
        this.typeaheadOpen = query.length >= this._options.minCharacters;
        this.typeaheadItems = this.getItems();
    };
    /** Select a filter from a typeahead item */
    /**
     * Select a filter from a typeahead item
     * @param {?} event
     * @return {?}
     */
    FilterDynamicComponent.prototype.select = /**
     * Select a filter from a typeahead item
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // find the filter with the matching name
        var /** @type {?} */ filter = this.filters.find(function (_filter) { return _filter.name === event.option; });
        if (filter) {
            this.selectFilter(filter);
        }
    };
    FilterDynamicComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-dynamic',
                    template: "<div class=\"btn-group ux-dynamic-filter\"\n    dropdown\n    [autoClose]=\"true\"\n    #dynamicDropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        aria-haspopup=\"true\"\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dynamicDropdown.isOpen\"\n        [attr.aria-expanded]=\"dynamicDropdown.isOpen\"\n        [class.active]=\"selected !== initial\"\n        class=\"filter-dropdown btn dropdown-toggle\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"initial === selected\"\n                (click)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.escape)=\"menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n            </a>\n        </li>\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"selected !== initial && showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem>\n                <i class=\"hpe-icon hpe-checkmark\"></i>\n                <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n            </a>\n        </li>\n\n        <hr>\n\n        <li *ngIf=\"showTypeahead\" class=\"typeahead-box\" role=\"none\">\n\n                <input type=\"text\"\n                    class=\"form-control\"\n                    [placeholder]=\"options?.placeholder\"\n                    [attr.aria-activedescendant]=\"highlightedElement?.id\"\n                    [attr.aria-controls]=\"typeaheadId\"\n                    aria-autocomplete=\"list\"\n                    aria-multiline=\"false\"\n                    [ngModel]=\"query$ | async\"\n                    (ngModelChange)=\"query$.next($event); updateTypeahead($event)\"\n                    (keydown)=\"typeaheadKeyService.handleKey($event, typeahead); $event.stopPropagation();\"\n                    (keydown.enter)=\"$event.preventDefault()\"\n                    (blur)=\"typeaheadOpen = false\"\n                    (click)=\"$event.stopPropagation()\">\n\n                <ux-typeahead #typeahead\n                    [id]=\"typeaheadId\"\n                    [(open)]=\"typeaheadOpen\"\n                    display=\"title\"\n                    [selectOnEnter]=\"true\"\n                    [options]=\"typeaheadItems\"\n                    [optionTemplate]=\"filterOptionTemplate\"\n                    (optionSelected)=\"select($event); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (highlightedElementChange)=\"highlightedElement = $event\">\n                </ux-typeahead>\n        </li>\n\n        <ng-container *ngIf=\"!showTypeahead\">\n\n            <li class=\"dropdown-list-item\"\n                *ngFor=\"let filter of filters\"\n                role=\"none\">\n\n                <a class=\"dropdown-item\"\n                    role=\"menuitem\"\n                    tabindex=\"-1\"\n                    uxMenuNavigationItem\n                    [attr.aria-selected]=\"filter === selected\"\n                    (click)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (keydown.enter)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\">\n\n                    <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                    <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                </a>\n            </li>\n\n        </ng-container>\n\n    </ul>\n</div>\n\n<ng-template #filterOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span [attr.aria-label]=\"option\" [innerHTML]=\"option | filterTypeaheadHighlight: (query$ | async)\"></span>\n</ng-template>"
                }] }
    ];
    /** @nocollapse */
    FilterDynamicComponent.ctorParameters = function () { return [
        { type: TypeaheadKeyService },
        { type: FilterService },
        { type: ElementRef }
    ]; };
    FilterDynamicComponent.propDecorators = {
        filters: [{ type: Input }],
        initial: [{ type: Input }],
        options: [{ type: Input }],
        dropdown: [{ type: ViewChild, args: [BsDropdownDirective,] }],
        clickOff: [{ type: HostListener, args: ['document:click', ['$event.target'],] }]
    };
    return FilterDynamicComponent;
}());
export { FilterDynamicComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sSUFBSSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsbUJBQW1CLEVBQXdCLE1BQU0sdUJBQXVCLENBQUM7QUFDbEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSWxELHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7O0lBdURiLGdDQUFtQixtQkFBd0MsRUFBVSxjQUE2QixFQUFVLFdBQXVCO1FBQW5JLGlCQVdDO1FBWGtCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZOzs7O3VCQTlDdEcsRUFBRTs7OzsyQkFpQlQsaUNBQStCLFFBQVEsRUFBSTs7OztzQkFHeEQsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDOzs7OzZCQU1mLElBQUk7Ozs7OEJBR0YsRUFBRTs7Ozs2QkFNSixLQUFLOzs7OytC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akQ7Ozs7Z0JBWFEsbUJBQW1CO2dCQUVuQixhQUFhO2dCQVJGLFVBQVU7OzswQkFxQnpCLEtBQUs7MEJBR0wsS0FBSzswQkFHTCxLQUFLOzJCQVFMLFNBQVMsU0FBQyxtQkFBbUI7MkJBd0c3QixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUM7O2lDQTNJckQ7O1NBa0JhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJzRHJvcGRvd25EaXJlY3RpdmUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IFR5cGVhaGVhZE1hdGNoIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90eXBlYWhlYWQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgZmlsdGVyIGFzIHJ4RmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFR5cGVhaGVhZEtleVNlcnZpY2UsIFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi4vLi4vdHlwZWFoZWFkL2luZGV4JztcbmltcG9ydCB7IEZpbHRlclJlbW92ZUFsbEV2ZW50IH0gZnJvbSAnLi4vZXZlbnRzL2ZpbHRlci1yZW1vdmUtYWxsLWV2ZW50JztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmlsdGVyLWR5bmFtaWMtbGlzdC1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5cbmxldCB1bmlxdWVJZCA9IDE7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWR5bmFtaWMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItZHluYW1pYy5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyRHluYW1pY0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICAvKiogVGhlIGxpc3Qgb2YgcG9zc2libGUgZmlsdGVyIG9wdGlvbnMgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXSA9IFtdO1xuXG4gICAgLyoqIFNwZWNpZnkgaWYgdGhlcmUgc2hvdWxkIGJlIGFuIGluaXRpYWxseSBzZWxlY3RlZCBmaWx0ZXIgKi9cbiAgICBASW5wdXQoKSBpbml0aWFsOiBGaWx0ZXI7XG5cbiAgICAvKiogU3BlY2lmeSB0aGUgdHlwZWFoZWFkIG9wdGlvbnMgKi9cbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZykgeyB0aGlzLl9vcHRpb25zID0gb3B0aW9uczsgfVxuXG4gICAgLyoqIEdldCB0aGUgb3B0aW9ucyB3aXRoIHRoZSBkZWZhdWx0cyBmb3IgYW55IG1pc3Npbmcgb3B0aW9ucyAqL1xuICAgIGdldCBvcHRpb25zKCk6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uIHRoaXMuX2RlZmF1bHRPcHRpb25zLCAuLi50aGlzLl9vcHRpb25zIH07XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgZHJvcGRvd24gZGlyZWN0aXZlICovXG4gICAgQFZpZXdDaGlsZChCc0Ryb3Bkb3duRGlyZWN0aXZlKSBkcm9wZG93bjogQnNEcm9wZG93bkRpcmVjdGl2ZTtcblxuICAgIC8qKiBHZW5lcmF0ZSBhIHVuaXF1ZSBpZCBmb3IgdGhlIHR5cGVhaGVhZCAqL1xuICAgIHR5cGVhaGVhZElkOiBzdHJpbmcgPSBgdXgtZmlsdGVyLWR5bmFtaWMtdHlwZWFoZWFkLSR7dW5pcXVlSWQrK31gO1xuXG4gICAgLyoqIFN0b3JlIHRoZSBjdXJyZW50IHNlYXJjaCBxdWVyeSAqL1xuICAgIHF1ZXJ5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgICAvKiogU3RvcmUgdGhlIHNlbGVjdGVkIGZpbHRlciAqL1xuICAgIHNlbGVjdGVkOiBGaWx0ZXI7XG5cbiAgICAvKiogSW5kaWNhdGUgd2hldGhlciBvciBub3QgdGhlIHR5cGVhaGVhZCBzaG91bGQgYmUgc2hvd24gKi9cbiAgICBzaG93VHlwZWFoZWFkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBTdG9yZSB0aGUgaXRlbXMgdGhhdCBzaG91bGQgYmUgZGlzcGxheWVkIGluIHRoZSB0eXBlYWhlYWQgKi9cbiAgICB0eXBlYWhlYWRJdGVtczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8qKiBTdG9yZSB0aGUgY3VycmVudGx5IGhpZ2hsaWdodGVkIGVsZW1lbnQgKi9cbiAgICBoaWdobGlnaHRlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqIFN0b3JlIHRoZSBvcGVuIHN0YXRlIG9mIHRoZSB0eXBlYWhlYWQgKi9cbiAgICB0eXBlYWhlYWRPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIGRlZmF1bHQgb3B0aW9ucyAqL1xuICAgIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZyA9IHsgcGxhY2Vob2xkZXI6ICcnLCBtaW5DaGFyYWN0ZXJzOiAzLCBtYXhSZXN1bHRzOiBJbmZpbml0eSB9O1xuXG4gICAgLyoqIFN0b3JlIHRoZSB1c2VyIHNwZWNpZmllZCB0eXBlYWhlYWQgb3B0aW9ucyAqL1xuICAgIHByaXZhdGUgX29wdGlvbnM6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnID0geyAuLi50aGlzLl9kZWZhdWx0T3B0aW9ucyB9O1xuXG4gICAgLyoqIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnMgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGVhaGVhZEtleVNlcnZpY2U6IFR5cGVhaGVhZEtleVNlcnZpY2UsIHByaXZhdGUgX2ZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgLy8gbGlzdGVuIGZvciByZW1vdmUgYWxsIGV2ZW50cyBpbiB3aGljaCBjYXNlIHdlIHNob3VsZCBkZXNlbGVjdCBldmVudCBpbml0aWFsIGZpbHRlcnNcbiAgICAgICAgX2ZpbHRlclNlcnZpY2UuZXZlbnRzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCByeEZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEZpbHRlclJlbW92ZUFsbEV2ZW50KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVGaWx0ZXIoKSk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgZmlsdGVyIGlzIHN0aWxsIHNlbGVjdGVkIHdoZW4gdGhlIGFjdGl2ZSBmaWx0ZXJzIGNoYW5nZVxuICAgICAgICBfZmlsdGVyU2VydmljZS5maWx0ZXJzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZmlsdGVycyA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiBmaWx0ZXJzLmluZGV4T2YodGhpcy5zZWxlY3RlZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFNldCB1cCB0aGUgaW5pdGlhbCBjb25kaXRpb25zICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gVGhlIGluaXRpYWxseSBzZWxlY3RlZCBpdGVtIHNob3VsZCBiZSBzZXQgdGhlIHRoZSBzcGVjaWZpZWQgaW5pdGlhbCBpdGVtXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIGNoYW5nZXMgdG8gdGhlIHNlbGVjdGVkIGZpbHRlcnNcbiAgICAgICAgdGhpcy5fZmlsdGVyU2VydmljZS5maWx0ZXJzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZmlsdGVycyA9PiB7XG4gICAgICAgICAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmluZGV4T2YoZmlsdGVyKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBpdGVtcyB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHR5cGVhaGVhZFxuICAgICAgICB0aGlzLnR5cGVhaGVhZEl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xuXG4gICAgICAgIC8vIGRldGVybWluZSBpZiB3ZSBzaG91bGQgc2hvdyB0aGUgdHlwZWFoZWFkIGNvbnRyb2xcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubWF4SW5kaXZpZHVhbEl0ZW1zICYmIHRoaXMub3B0aW9ucy5tYXhJbmRpdmlkdWFsSXRlbXMgKyAxID49IHRoaXMuZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1R5cGVhaGVhZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsZWFudXAgYWxsIHN1YnNjcmlwdGlvbnMgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgaXRlbXMgdG8gZGlzcGxheSBpbiB0aGUgdHlwZWFoZWFkIGJhc2VkIG9uIHRoZSBzZWFyY2ggcXVlcnkgKi9cbiAgICBnZXRJdGVtcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeSQudmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IHRoaXMuaW5pdGlhbCAmJiBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5KSAhPT0gLTEpXG4gICAgICAgICAgICAubWFwKGl0ZW0gPT4gaXRlbS5uYW1lKVxuICAgICAgICAgICAgLnNsaWNlKDAsIHRoaXMuX29wdGlvbnMubWF4UmVzdWx0cyk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSBzZWxlY3Rpb24gb2YgYSB0eXBlYWhlYWQgb3B0aW9ucyAqL1xuICAgIHNlbGVjdE9wdGlvbih0eXBlYWhlYWRPcHRpb246IFR5cGVhaGVhZE1hdGNoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGFueSBjdXJyZW50IGZpbHRlcnNcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBmaWx0ZXIgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5maWx0ZXJzLmZpbmQoX2ZpbHRlciA9PiBfZmlsdGVyLm5hbWUgPT09IHR5cGVhaGVhZE9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHNlbGVjdGlvbiBpbiB0aGUgc2VydmljZVxuICAgICAgICB0aGlzLl9maWx0ZXJTZXJ2aWNlLmFkZCh0aGlzLnNlbGVjdGVkKTtcblxuICAgICAgICAvLyBjbGVhciB0aGUgc2VhcmNoIHF1ZXJ5XG4gICAgICAgIHRoaXMucXVlcnkkLm5leHQoJycpO1xuXG4gICAgICAgIC8vIGhpZGUgdGhlIGRyb3Bkb3duXG4gICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgIH1cblxuICAgIC8qKiBJZiBhIGNsaWNrIG9jY3VycmVkIHRoYXQgd2FzIG91dHNpZGUgdGhlIGRyb3Bkb3duIHRoZW4gY2xvc2UgdGhlIGRyb3Bkb3duICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcbiAgICBjbGlja09mZih0YXJnZXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGNsaWNrIHdhcyBvdXRzaWRlIHRoZSBkcm9wZG93biB0aGVuIGNsb3NlIGl0XG4gICAgICAgIGlmICghKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBJZiBhIGZpbHRlciBuZWVkcyByZW1vdmVkLCBhbmQgaXMgbm90IHRoZSBpbml0aWFsIGZpbHRlciB0aGVuIHJlbW92ZSBpdCAqL1xuICAgIHJlbW92ZUZpbHRlcigpOiB2b2lkIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZmlsdGVyIHdlIHdhbnQgdG8gcmVtb3ZlIGlzIHRoZSBpbml0aWFsIGZpbHRlclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAhPT0gdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJTZXJ2aWNlLnJlbW92ZSh0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciB0aGUgc2VhcmNoIHF1ZXJ5XG4gICAgICAgIHRoaXMucXVlcnkkLm5leHQoJycpO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3QgYSBzcGVjaWZpYyBmaWx0ZXIgKi9cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyBjbGVhciBhbnkgY3VycmVudCBmaWx0ZXJzXG4gICAgICAgIHRoaXMucmVtb3ZlRmlsdGVyKCk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIG5ld2x5IHNlbGVjdGVkIGZpbHRlclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmlsdGVyO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBmaWx0ZXIgaW4gdGhlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5fZmlsdGVyU2VydmljZS5hZGQodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZSB0eXBlYWhlYWQgaXRlbXMgYW5kIHZpc2liaWxpdHkgKi9cbiAgICB1cGRhdGVUeXBlYWhlYWQocXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnR5cGVhaGVhZE9wZW4gPSBxdWVyeS5sZW5ndGggPj0gdGhpcy5fb3B0aW9ucy5taW5DaGFyYWN0ZXJzO1xuICAgICAgICB0aGlzLnR5cGVhaGVhZEl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3QgYSBmaWx0ZXIgZnJvbSBhIHR5cGVhaGVhZCBpdGVtICovXG4gICAgc2VsZWN0KGV2ZW50OiBUeXBlYWhlYWRPcHRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIHRoZSBmaWx0ZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZVxuICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmZpbHRlcnMuZmluZChfZmlsdGVyID0+IF9maWx0ZXIubmFtZSA9PT0gZXZlbnQub3B0aW9uKTtcblxuICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19