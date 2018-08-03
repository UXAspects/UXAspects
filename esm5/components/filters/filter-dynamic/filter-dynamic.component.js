/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, Pipe, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TypeaheadKeyService } from '../../typeahead/index';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
import { FilterContainerComponent } from '../filter-container.component';
var /** @type {?} */ uniqueId = 1;
var FilterDynamicComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FilterDynamicComponent, _super);
    function FilterDynamicComponent(typeaheadKeyService, container, announcer) {
        var _this = _super.call(this, container, announcer) || this;
        _this.typeaheadKeyService = typeaheadKeyService;
        _this.defaultOptions = {
            placeholder: '',
            minCharacters: 3,
            maxResults: Infinity
        };
        _this.typeaheadId = "ux-filter-dynamic-typeahead-" + uniqueId++;
        _this.query$ = new BehaviorSubject('');
        _this.showTypeahead = true;
        _this.typeaheadItems = [];
        _this.typeaheadOpen = false;
        _this._config = tslib_1.__assign({}, _this.defaultOptions);
        return _this;
    }
    Object.defineProperty(FilterDynamicComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            this._config = tslib_1.__assign({}, this.defaultOptions, options);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.getItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ query = this.query$.value.toLowerCase();
        return this.filters.filter(function (item) { return item !== _this.initial && item.name.toLowerCase().indexOf(query) !== -1; })
            .map(function (item) { return item.name; })
            .slice(0, this._config.maxResults);
    };
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    };
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    FilterDynamicComponent.prototype.selectOption = /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    function (typeaheadOption) {
        this.removeFilter();
        var /** @type {?} */ idx = this.filters.findIndex(function (filter) { return filter.name === typeaheadOption.value; });
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.query$.next('');
        this.dropdown.hide();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FilterDynamicComponent.prototype.clickOff = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ target = /** @type {?} */ (event.target);
        var /** @type {?} */ hideDropdown = true;
        while (target && target.nodeName !== 'BODY') {
            if (target.classList.contains('ux-dynamic-filter')) {
                hideDropdown = false;
                break;
            }
            else {
                target = target.parentElement;
            }
        }
        if (hideDropdown) {
            this.query$.next('');
            this.dropdown.hide();
        }
    };
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.removeFilter = /**
     * @return {?}
     */
    function () {
        if (this.selected !== this.initial) {
            _super.prototype.removeFilter.call(this, this.selected);
            this.selected = this.initial;
        }
        this.query$.next('');
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterDynamicComponent.prototype.selectFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    };
    /**
     * @param {?} query
     * @return {?}
     */
    FilterDynamicComponent.prototype.updateTypeahead = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        this.typeaheadOpen = query.length >= this._config.minCharacters;
        this.typeaheadItems = this.getItems();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FilterDynamicComponent.prototype.select = /**
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
                    template: "<div class=\"btn-group ux-dynamic-filter\"\n    dropdown\n    [autoClose]=\"true\"\n    #dynamicDropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        aria-haspopup=\"true\"\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dynamicDropdown.isOpen\"\n        [attr.aria-expanded]=\"dynamicDropdown.isOpen\"\n        [class.active]=\"selected !== initial\"\n        class=\"filter-dropdown btn dropdown-toggle\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"initial === selected\"\n                (click)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n            </a>\n        </li>\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"selected !== initial && showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem>\n                <i class=\"hpe-icon hpe-checkmark\"></i>\n                <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n            </a>\n        </li>\n\n        <hr>\n\n        <li *ngIf=\"showTypeahead\" class=\"typeahead-box\" role=\"none\">\n\n                <input type=\"text\"\n                    class=\"form-control\"\n                    [placeholder]=\"options?.placeholder || defaultOptions.placeholder\"\n                    [attr.aria-activedescendant]=\"highlightedElement?.id\"\n                    [attr.aria-controls]=\"typeaheadId\"\n                    aria-autocomplete=\"list\"\n                    aria-multiline=\"false\"\n                    [ngModel]=\"query$ | async\"\n                    (ngModelChange)=\"query$.next($event); updateTypeahead($event)\"\n                    (keydown)=\"typeaheadKeyService.handleKey($event, typeahead); $event.stopPropagation();\"\n                    (keydown.enter)=\"$event.preventDefault()\"\n                    (blur)=\"typeaheadOpen = false\"\n                    (click)=\"$event.stopPropagation()\">\n\n                <ux-typeahead #typeahead\n                    [id]=\"typeaheadId\"\n                    [(open)]=\"typeaheadOpen\"\n                    display=\"title\"\n                    [selectOnEnter]=\"true\"\n                    [options]=\"typeaheadItems\"\n                    [optionTemplate]=\"filterOptionTemplate\"\n                    (optionSelected)=\"select($event); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (highlightedElementChange)=\"highlightedElement = $event\">\n                </ux-typeahead>\n        </li>\n\n        <ng-container *ngIf=\"!showTypeahead\">\n\n            <li class=\"dropdown-list-item\"\n                *ngFor=\"let filter of filters\"\n                role=\"none\">\n\n                <a class=\"dropdown-item\"\n                    role=\"menuitem\"\n                    tabindex=\"-1\"\n                    uxMenuNavigationItem\n                    [attr.aria-selected]=\"filter === selected\"\n                    (click)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (keydown.enter)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\">\n\n                    <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                    <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                </a>\n            </li>\n\n        </ng-container>\n\n    </ul>\n</div>\n\n<ng-template #filterOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span [attr.aria-label]=\"option\" [innerHTML]=\"option | filterTypeaheadHighlight: (query$ | async)\"></span>\n</ng-template>",
                    host: {
                        '(document:click)': 'clickOff($event)',
                    }
                }] }
    ];
    /** @nocollapse */
    FilterDynamicComponent.ctorParameters = function () { return [
        { type: TypeaheadKeyService },
        { type: FilterContainerComponent },
        { type: LiveAnnouncer }
    ]; };
    FilterDynamicComponent.propDecorators = {
        filters: [{ type: Input }],
        initial: [{ type: Input }],
        options: [{ type: Input }],
        dropdown: [{ type: ViewChild, args: [BsDropdownDirective,] }]
    };
    return FilterDynamicComponent;
}(FilterBaseComponent));
export { FilterDynamicComponent };
function FilterDynamicComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterDynamicComponent.prototype.filters;
    /** @type {?} */
    FilterDynamicComponent.prototype.initial;
    /** @type {?} */
    FilterDynamicComponent.prototype.dropdown;
    /** @type {?} */
    FilterDynamicComponent.prototype.defaultOptions;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadId;
    /** @type {?} */
    FilterDynamicComponent.prototype.query$;
    /** @type {?} */
    FilterDynamicComponent.prototype.selected;
    /** @type {?} */
    FilterDynamicComponent.prototype.showTypeahead;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadItems;
    /** @type {?} */
    FilterDynamicComponent.prototype.highlightedElement;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadOpen;
    /** @type {?} */
    FilterDynamicComponent.prototype._config;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadKeyService;
}
/**
 * @record
 */
export function FilterDynamicListConfig() { }
function FilterDynamicListConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    FilterDynamicListConfig.prototype.placeholder;
    /** @type {?|undefined} */
    FilterDynamicListConfig.prototype.minCharacters;
    /** @type {?|undefined} */
    FilterDynamicListConfig.prototype.maxResults;
    /** @type {?|undefined} */
    FilterDynamicListConfig.prototype.maxIndividualItems;
}
var FilterTypeaheadHighlight = /** @class */ (function () {
    function FilterTypeaheadHighlight() {
    }
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    FilterTypeaheadHighlight.prototype.transform = /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    function (value, searchQuery) {
        var /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, "<b class=\"filter-typeahead-highlighted\">" + value.match(regex) + "</b>");
    };
    FilterTypeaheadHighlight.decorators = [
        { type: Pipe, args: [{
                    name: 'filterTypeaheadHighlight'
                },] }
    ];
    return FilterTypeaheadHighlight;
}());
export { FilterTypeaheadHighlight };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBd0IsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQVUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVqRixxQkFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDOztJQVMyQixrREFBbUI7SUErQjNELGdDQUFtQixtQkFBd0MsRUFBRSxTQUFtQyxFQUFFLFNBQXdCO1FBQTFILFlBQ0ksa0JBQU0sU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUM5QjtRQUZrQix5QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCOytCQWhCakI7WUFDdEMsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsQ0FBQztZQUNoQixVQUFVLEVBQUUsUUFBUTtTQUN2Qjs0QkFFcUIsaUNBQStCLFFBQVEsRUFBSTt1QkFDeEQsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDOzhCQUVmLElBQUk7K0JBQ0YsRUFBRTs4QkFFSixLQUFLOzZDQUVrQixLQUFJLENBQUMsY0FBYzs7S0FJbEU7SUE1QkQs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RTt3QkFDRixrQkFBa0IsRUFBRSxrQkFBa0I7cUJBQ3pDO2lCQUNKOzs7O2dCQVpRLG1CQUFtQjtnQkFFWCx3QkFBd0I7Z0JBUGhDLGFBQWE7OzswQkFvQmpCLEtBQUs7MEJBQ0wsS0FBSzswQkFFTCxLQUFLOzJCQVFMLFNBQVMsU0FBQyxtQkFBbUI7O2lDQS9CbEM7RUFrQjRDLG1CQUFtQjtTQUFsRCxzQkFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTJIL0IsNENBQVM7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsV0FBbUI7UUFDeEMscUJBQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsK0NBQTJDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQU0sQ0FBQyxDQUFDO0tBQ3BHOztnQkFQSixJQUFJLFNBQUM7b0JBQ0YsSUFBSSxFQUFFLDBCQUEwQjtpQkFDbkM7O21DQTNJRDs7U0E0SWEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGl2ZUFubm91bmNlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFBpcGUsIFBpcGVUcmFuc2Zvcm0sIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnNEcm9wZG93bkRpcmVjdGl2ZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuaW1wb3J0IHsgVHlwZWFoZWFkTWF0Y2ggfSBmcm9tICduZ3gtYm9vdHN0cmFwL3R5cGVhaGVhZCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBUeXBlYWhlYWRLZXlTZXJ2aWNlLCBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uLy4uL3R5cGVhaGVhZC9pbmRleCc7XG5pbXBvcnQgeyBGaWx0ZXJCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWJhc2UvZmlsdGVyLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlciwgRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5sZXQgdW5pcXVlSWQgPSAxO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZpbHRlci1keW5hbWljJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhkb2N1bWVudDpjbGljayknOiAnY2xpY2tPZmYoJGV2ZW50KScsXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJEeW5hbWljQ29tcG9uZW50IGV4dGVuZHMgRmlsdGVyQmFzZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXTtcbiAgICBASW5wdXQoKSBpbml0aWFsOiBGaWx0ZXI7XG5cbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSB7Li4uIHRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgICB9XG5cbiAgICBnZXQgb3B0aW9ucygpOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChCc0Ryb3Bkb3duRGlyZWN0aXZlKSBkcm9wZG93bjogQnNEcm9wZG93bkRpcmVjdGl2ZTtcblxuICAgIGRlZmF1bHRPcHRpb25zOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZyA9IHtcbiAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICBtaW5DaGFyYWN0ZXJzOiAzLFxuICAgICAgICBtYXhSZXN1bHRzOiBJbmZpbml0eVxuICAgIH07XG5cbiAgICB0eXBlYWhlYWRJZDogc3RyaW5nID0gYHV4LWZpbHRlci1keW5hbWljLXR5cGVhaGVhZC0ke3VuaXF1ZUlkKyt9YDtcbiAgICBxdWVyeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICAgIHNlbGVjdGVkOiBGaWx0ZXI7XG4gICAgc2hvd1R5cGVhaGVhZDogYm9vbGVhbiA9IHRydWU7XG4gICAgdHlwZWFoZWFkSXRlbXM6IHN0cmluZ1tdID0gW107XG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICB0eXBlYWhlYWRPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9jb25maWc6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zIH07XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSwgY29udGFpbmVyOiBGaWx0ZXJDb250YWluZXJDb21wb25lbnQsIGFubm91bmNlcjogTGl2ZUFubm91bmNlcikge1xuICAgICAgICBzdXBlcihjb250YWluZXIsIGFubm91bmNlcik7XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnkkLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0aGlzLmluaXRpYWwgJiYgaXRlbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeSkgIT09IC0xKVxuICAgICAgICAgICAgLm1hcChpdGVtID0+IGl0ZW0ubmFtZSlcbiAgICAgICAgICAgIC5zbGljZSgwLCB0aGlzLl9jb25maWcubWF4UmVzdWx0cyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubWF4SW5kaXZpZHVhbEl0ZW1zICYmIHRoaXMub3B0aW9ucy5tYXhJbmRpdmlkdWFsSXRlbXMgKyAxID49IHRoaXMuZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1R5cGVhaGVhZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0T3B0aW9uKHR5cGVhaGVhZE9wdGlvbjogVHlwZWFoZWFkTWF0Y2gpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5maWx0ZXJzLmZpbmRJbmRleChmaWx0ZXIgPT4gZmlsdGVyLm5hbWUgPT09IHR5cGVhaGVhZE9wdGlvbi52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmZpbHRlcnNbaWR4XTtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIHRoaXMucXVlcnkkLm5leHQoJycpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICB9XG5cbiAgICBjbGlja09mZihldmVudDogTW91c2VFdmVudCkge1xuXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGxldCBoaWRlRHJvcGRvd24gPSB0cnVlO1xuXG4gICAgICAgIHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0Lm5vZGVOYW1lICE9PSAnQk9EWScpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1eC1keW5hbWljLWZpbHRlcicpKSB7XG4gICAgICAgICAgICAgICAgaGlkZURyb3Bkb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhpZGVEcm9wZG93bikge1xuICAgICAgICAgICAgdGhpcy5xdWVyeSQubmV4dCgnJyk7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAhPT0gdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgICBzdXBlci5yZW1vdmVGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkkLm5leHQoJycpO1xuICAgIH1cblxuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpbHRlcikge1xuICAgICAgICB0aGlzLnJlbW92ZUZpbHRlcigpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmFkZEZpbHRlcih0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUeXBlYWhlYWQocXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnR5cGVhaGVhZE9wZW4gPSBxdWVyeS5sZW5ndGggPj0gdGhpcy5fY29uZmlnLm1pbkNoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGV2ZW50OiBUeXBlYWhlYWRPcHRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIHRoZSBmaWx0ZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZVxuICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmZpbHRlcnMuZmluZChfZmlsdGVyID0+IF9maWx0ZXIubmFtZSA9PT0gZXZlbnQub3B0aW9uKTtcblxuICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyRHluYW1pY0xpc3RDb25maWcge1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIG1pbkNoYXJhY3RlcnM/OiBudW1iZXI7XG4gICAgbWF4UmVzdWx0cz86IG51bWJlcjtcbiAgICBtYXhJbmRpdmlkdWFsSXRlbXM/OiBudW1iZXI7XG59XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZmlsdGVyVHlwZWFoZWFkSGlnaGxpZ2h0J1xufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJUeXBlYWhlYWRIaWdobGlnaHQgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgc2VhcmNoUXVlcnk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChzZWFyY2hRdWVyeSwgJ2knKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnZXgsIGA8YiBjbGFzcz1cImZpbHRlci10eXBlYWhlYWQtaGlnaGxpZ2h0ZWRcIj4ke3ZhbHVlLm1hdGNoKHJlZ2V4KX08L2I+YCk7XG4gICAgfVxufSJdfQ==