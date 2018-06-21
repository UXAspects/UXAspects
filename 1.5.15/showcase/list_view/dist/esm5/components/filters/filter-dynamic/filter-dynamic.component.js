/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
var FilterDynamicComponent = (function (_super) {
    tslib_1.__extends(FilterDynamicComponent, _super);
    function FilterDynamicComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultOptions = {
            placeholder: '',
            minCharacters: 3
        };
        _this.showTypeahead = true;
        _this.typeaheadItems = [];
        return _this;
    }
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.getItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.filters.filter(function (item) { return item !== _this.initial; }).map(function (item) { return item.name; });
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
        this.searchQuery = '';
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
            this.searchQuery = '';
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
        this.searchQuery = '';
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
    FilterDynamicComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-dynamic',
                    template: "<div class=\"btn-group ux-dynamic-filter\" dropdown #dynamicDropdown=\"bs-dropdown\">\n    <button (click)=\"dynamicDropdown.show()\" type=\"button\" [class.active]=\"selected !== initial\" class=\"filter-dropdown btn dropdown-toggle\">{{ selected?.title }} \n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n    <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n\n        <li class=\"dropdown-list-item\" *ngIf=\"showTypeahead\" role=\"menuitem\">\n            <a class=\"dropdown-item\" (click)=\"removeFilter(); dynamicDropdown.hide();\">\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n            </a>\n        </li>\n\n        <li class=\"dropdown-list-item\" *ngIf=\"selected !== initial && showTypeahead\" role=\"menuitem\">\n            <a class=\"dropdown-item\">\n                <i class=\"hpe-icon hpe-checkmark\"></i>\n                <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n            </a>\n        </li>\n\n        <hr>\n\n        <li *ngIf=\"showTypeahead\" class=\"typeahead-box\">\n            <input [(ngModel)]=\"searchQuery\" [typeahead]=\"typeaheadItems\" class=\"form-control\" \n            (typeaheadOnSelect)=\"selectOption($event)\" \n            [placeholder]=\"options?.placeholder || defaultOptions.placeholder\"\n            [typeaheadMinLength]=\"options?.minCharacters || defaultOptions.minCharacters\"\n            [typeaheadOptionsLimit]=\"options?.maxResults\">\n        </li>\n\n        <span *ngIf=\"!showTypeahead\">\n            <li class=\"dropdown-list-item\" *ngFor=\"let filter of filters\" role=\"menuitem\">\n                <a class=\"dropdown-item\" (click)=\"selectFilter(filter)\">\n                    <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                    <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                </a>\n            </li>\n        </span>\n\n    </ul>\n</div>",
                    host: {
                        '(document:click)': 'clickOff($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    FilterDynamicComponent.propDecorators = {
        "filters": [{ type: Input },],
        "initial": [{ type: Input },],
        "options": [{ type: Input },],
        "dropdown": [{ type: ViewChild, args: [BsDropdownDirective,] },],
    };
    return FilterDynamicComponent;
}(FilterBaseComponent));
export { FilterDynamicComponent };
function FilterDynamicComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterDynamicComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterDynamicComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FilterDynamicComponent.propDecorators;
    /** @type {?} */
    FilterDynamicComponent.prototype.filters;
    /** @type {?} */
    FilterDynamicComponent.prototype.initial;
    /** @type {?} */
    FilterDynamicComponent.prototype.options;
    /** @type {?} */
    FilterDynamicComponent.prototype.dropdown;
    /** @type {?} */
    FilterDynamicComponent.prototype.defaultOptions;
    /** @type {?} */
    FilterDynamicComponent.prototype.searchQuery;
    /** @type {?} */
    FilterDynamicComponent.prototype.selected;
    /** @type {?} */
    FilterDynamicComponent.prototype.showTypeahead;
    /** @type {?} */
    FilterDynamicComponent.prototype.typeaheadItems;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7O0lBa0QvQixrREFBbUI7OzsrQkFRakI7WUFDdEMsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsQ0FBQztTQUNuQjs4QkFHd0IsSUFBSTsrQkFDRixFQUFFOzs7Ozs7SUFFN0IseUNBQVE7OztJQUFSO1FBQUEsaUJBRUM7UUFERyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssS0FBSSxDQUFDLE9BQU8sRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEVBQVQsQ0FBUyxDQUFDLENBQUM7S0FDcEY7Ozs7SUFFRCx5Q0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoSCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM5QjtLQUNKOzs7OztJQUVELDZDQUFZOzs7O0lBQVosVUFBYSxlQUErQjtRQUN4QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsS0FBSyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7Ozs7O0lBRUQseUNBQVE7Ozs7SUFBUixVQUFTLEtBQWlCO1FBRXRCLHFCQUFJLE1BQU0scUJBQUcsS0FBSyxDQUFDLE1BQXFCLENBQUEsQ0FBQztRQUN6QyxxQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXhCLE9BQU8sTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQzthQUNUO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDakM7U0FDSjtRQUVELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3hCO0tBRUo7Ozs7SUFFRCw2Q0FBWTs7O0lBQVo7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLGlCQUFNLFlBQVksWUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7S0FDekI7Ozs7O0lBRUQsNkNBQVk7Ozs7SUFBWixVQUFhLE1BQWM7UUFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDOztnQkF2SEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxvaEVBd0NQO29CQUNILElBQUksRUFBRTt3QkFDRixrQkFBa0IsRUFBRSxrQkFBa0I7cUJBQ3pDO2lCQUNKOzs7OzRCQUdJLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzZCQUVMLFNBQVMsU0FBQyxtQkFBbUI7O2lDQTNEbEM7RUFxRDRDLG1CQUFtQjtTQUFsRCxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJzRHJvcGRvd25EaXJlY3RpdmUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IFR5cGVhaGVhZE1hdGNoIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90eXBlYWhlYWQnO1xuaW1wb3J0IHsgRmlsdGVyQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2ZpbHRlci1iYXNlL2ZpbHRlci1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuLi9maWx0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWR5bmFtaWMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCB1eC1keW5hbWljLWZpbHRlclwiIGRyb3Bkb3duICNkeW5hbWljRHJvcGRvd249XCJicy1kcm9wZG93blwiPlxuICAgIDxidXR0b24gKGNsaWNrKT1cImR5bmFtaWNEcm9wZG93bi5zaG93KClcIiB0eXBlPVwiYnV0dG9uXCIgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RlZCAhPT0gaW5pdGlhbFwiIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duIGJ0biBkcm9wZG93bi10b2dnbGVcIj57eyBzZWxlY3RlZD8udGl0bGUgfX0gXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWRvd25cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHVsICpkcm9wZG93bk1lbnUgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj5cblxuICAgICAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1saXN0LWl0ZW1cIiAqbmdJZj1cInNob3dUeXBlYWhlYWRcIiByb2xlPVwibWVudWl0ZW1cIj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJyZW1vdmVGaWx0ZXIoKTsgZHluYW1pY0Ryb3Bkb3duLmhpZGUoKTtcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uXCIgW2NsYXNzLmhwZS1jaGVja21hcmtdPVwiaW5pdGlhbCA9PT0gc2VsZWN0ZWRcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWx0ZXItZHJvcGRvd24tdGl0bGVcIj57eyBpbml0aWFsLm5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tbGlzdC1pdGVtXCIgKm5nSWY9XCJzZWxlY3RlZCAhPT0gaW5pdGlhbCAmJiBzaG93VHlwZWFoZWFkXCIgcm9sZT1cIm1lbnVpdGVtXCI+XG4gICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1jaGVja21hcmtcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWx0ZXItZHJvcGRvd24tdGl0bGVcIj57eyBzZWxlY3RlZC5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxocj5cblxuICAgICAgICA8bGkgKm5nSWY9XCJzaG93VHlwZWFoZWFkXCIgY2xhc3M9XCJ0eXBlYWhlYWQtYm94XCI+XG4gICAgICAgICAgICA8aW5wdXQgWyhuZ01vZGVsKV09XCJzZWFyY2hRdWVyeVwiIFt0eXBlYWhlYWRdPVwidHlwZWFoZWFkSXRlbXNcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxuICAgICAgICAgICAgKHR5cGVhaGVhZE9uU2VsZWN0KT1cInNlbGVjdE9wdGlvbigkZXZlbnQpXCIgXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwib3B0aW9ucz8ucGxhY2Vob2xkZXIgfHwgZGVmYXVsdE9wdGlvbnMucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgW3R5cGVhaGVhZE1pbkxlbmd0aF09XCJvcHRpb25zPy5taW5DaGFyYWN0ZXJzIHx8IGRlZmF1bHRPcHRpb25zLm1pbkNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgW3R5cGVhaGVhZE9wdGlvbnNMaW1pdF09XCJvcHRpb25zPy5tYXhSZXN1bHRzXCI+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhc2hvd1R5cGVhaGVhZFwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tbGlzdC1pdGVtXCIgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmaWx0ZXJzXCIgcm9sZT1cIm1lbnVpdGVtXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb25cIiBbY2xhc3MuaHBlLWNoZWNrbWFya109XCJmaWx0ZXIgPT09IHNlbGVjdGVkXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZpbHRlci1kcm9wZG93bi10aXRsZVwiPnt7IGZpbHRlci5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgIDwvdWw+XG48L2Rpdj5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhkb2N1bWVudDpjbGljayknOiAnY2xpY2tPZmYoJGV2ZW50KScsXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJEeW5hbWljQ29tcG9uZW50IGV4dGVuZHMgRmlsdGVyQmFzZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXTtcbiAgICBASW5wdXQoKSBpbml0aWFsOiBGaWx0ZXI7XG4gICAgQElucHV0KCkgb3B0aW9uczogRmlsdGVyRHluYW1pY0xpc3RDb25maWc7XG5cbiAgICBAVmlld0NoaWxkKEJzRHJvcGRvd25EaXJlY3RpdmUpIGRyb3Bkb3duOiBCc0Ryb3Bkb3duRGlyZWN0aXZlO1xuXG4gICAgZGVmYXVsdE9wdGlvbnM6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnID0ge1xuICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIG1pbkNoYXJhY3RlcnM6IDNcbiAgICB9O1xuICAgIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG4gICAgc2VsZWN0ZWQ6IEZpbHRlcjtcbiAgICBzaG93VHlwZWFoZWFkOiBib29sZWFuID0gdHJ1ZTtcbiAgICB0eXBlYWhlYWRJdGVtczogc3RyaW5nW10gPSBbXTtcblxuICAgIGdldEl0ZW1zKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0aGlzLmluaXRpYWwpLm1hcChpdGVtID0+IGl0ZW0ubmFtZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubWF4SW5kaXZpZHVhbEl0ZW1zICYmIHRoaXMub3B0aW9ucy5tYXhJbmRpdmlkdWFsSXRlbXMgKyAxID49IHRoaXMuZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1R5cGVhaGVhZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0T3B0aW9uKHR5cGVhaGVhZE9wdGlvbjogVHlwZWFoZWFkTWF0Y2gpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuZmlsdGVycy5maW5kSW5kZXgoZmlsdGVyID0+IGZpbHRlci5uYW1lID09PSB0eXBlYWhlYWRPcHRpb24udmFsdWUpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5maWx0ZXJzW2lkeF07XG4gICAgICAgIHRoaXMuYWRkRmlsdGVyKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gJyc7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgIH1cblxuICAgIGNsaWNrT2ZmKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG5cbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgbGV0IGhpZGVEcm9wZG93biA9IHRydWU7XG5cbiAgICAgICAgd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQubm9kZU5hbWUgIT09ICdCT0RZJykge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3V4LWR5bmFtaWMtZmlsdGVyJykpIHtcbiAgICAgICAgICAgICAgICBoaWRlRHJvcGRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGlkZURyb3Bkb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAhPT0gdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgICBzdXBlci5yZW1vdmVGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSAnJztcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyRHluYW1pY0xpc3RDb25maWcge1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIG1pbkNoYXJhY3RlcnM/OiBudW1iZXI7XG4gICAgbWF4UmVzdWx0cz86IG51bWJlcjtcbiAgICBtYXhJbmRpdmlkdWFsSXRlbXM/OiBudW1iZXI7XG59Il19