/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
export class FilterDynamicComponent extends FilterBaseComponent {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            placeholder: '',
            minCharacters: 3
        };
        this.showTypeahead = true;
        this.typeaheadItems = [];
    }
    /**
     * @return {?}
     */
    getItems() {
        return this.filters.filter(item => item !== this.initial).map(item => item.name);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    }
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    selectOption(typeaheadOption) {
        this.removeFilter();
        let /** @type {?} */ idx = this.filters.findIndex(filter => filter.name === typeaheadOption.value);
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.searchQuery = '';
        this.dropdown.hide();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickOff(event) {
        let /** @type {?} */ target = /** @type {?} */ (event.target);
        let /** @type {?} */ hideDropdown = true;
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
    }
    /**
     * @return {?}
     */
    removeFilter() {
        if (this.selected !== this.initial) {
            super.removeFilter(this.selected);
            this.selected = this.initial;
        }
        this.searchQuery = '';
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    selectFilter(filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    }
}
FilterDynamicComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dynamic',
                template: `<div class="btn-group ux-dynamic-filter" dropdown #dynamicDropdown="bs-dropdown">
    <button (click)="dynamicDropdown.show()" type="button" [class.active]="selected !== initial" class="filter-dropdown btn dropdown-toggle">{{ selected?.title }} 
        <span class="hpe-icon hpe-down"></span>
    </button>
    <ul *dropdownMenu class="dropdown-menu" role="menu">

        <li class="dropdown-list-item" *ngIf="showTypeahead" role="menuitem">
            <a class="dropdown-item" (click)="removeFilter(); dynamicDropdown.hide();">
                <i class="hpe-icon" [class.hpe-checkmark]="initial === selected"></i>
                <span class="filter-dropdown-title">{{ initial.name }}</span>
            </a>
        </li>

        <li class="dropdown-list-item" *ngIf="selected !== initial && showTypeahead" role="menuitem">
            <a class="dropdown-item">
                <i class="hpe-icon hpe-checkmark"></i>
                <span class="filter-dropdown-title">{{ selected.name }}</span>
            </a>
        </li>

        <hr>

        <li *ngIf="showTypeahead" class="typeahead-box">
            <input [(ngModel)]="searchQuery" [typeahead]="typeaheadItems" class="form-control" 
            (typeaheadOnSelect)="selectOption($event)" 
            [placeholder]="options?.placeholder || defaultOptions.placeholder"
            [typeaheadMinLength]="options?.minCharacters || defaultOptions.minCharacters"
            [typeaheadOptionsLimit]="options?.maxResults">
        </li>

        <span *ngIf="!showTypeahead">
            <li class="dropdown-list-item" *ngFor="let filter of filters" role="menuitem">
                <a class="dropdown-item" (click)="selectFilter(filter)">
                    <i class="hpe-icon" [class.hpe-checkmark]="filter === selected"></i>
                    <span class="filter-dropdown-title">{{ filter.name }}</span>
                </a>
            </li>
        </span>

    </ul>
</div>`,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQWtEM0UsTUFBTSw2QkFBOEIsU0FBUSxtQkFBbUI7Ozs4QkFRakI7WUFDdEMsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsQ0FBQztTQUNuQjs2QkFHd0IsSUFBSTs4QkFDRixFQUFFOzs7OztJQUU3QixRQUFRO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BGOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hILElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzlCO0tBQ0o7Ozs7O0lBRUQsWUFBWSxDQUFDLGVBQStCO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFpQjtRQUV0QixxQkFBSSxNQUFNLHFCQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFBLENBQUM7UUFDekMscUJBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUV4QixPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixLQUFLLENBQUM7YUFDVDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO2FBQ2pDO1NBQ0o7UUFFRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtLQUVKOzs7O0lBRUQsWUFBWTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7S0FDekI7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQWM7UUFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDOzs7WUF2SEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdDUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0Ysa0JBQWtCLEVBQUUsa0JBQWtCO2lCQUN6QzthQUNKOzs7O3dCQUdJLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3lCQUVMLFNBQVMsU0FBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJzRHJvcGRvd25EaXJlY3RpdmUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IFR5cGVhaGVhZE1hdGNoIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90eXBlYWhlYWQnO1xuaW1wb3J0IHsgRmlsdGVyQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2ZpbHRlci1iYXNlL2ZpbHRlci1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuLi9maWx0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWR5bmFtaWMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCB1eC1keW5hbWljLWZpbHRlclwiIGRyb3Bkb3duICNkeW5hbWljRHJvcGRvd249XCJicy1kcm9wZG93blwiPlxuICAgIDxidXR0b24gKGNsaWNrKT1cImR5bmFtaWNEcm9wZG93bi5zaG93KClcIiB0eXBlPVwiYnV0dG9uXCIgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RlZCAhPT0gaW5pdGlhbFwiIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duIGJ0biBkcm9wZG93bi10b2dnbGVcIj57eyBzZWxlY3RlZD8udGl0bGUgfX0gXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWRvd25cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHVsICpkcm9wZG93bk1lbnUgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj5cblxuICAgICAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1saXN0LWl0ZW1cIiAqbmdJZj1cInNob3dUeXBlYWhlYWRcIiByb2xlPVwibWVudWl0ZW1cIj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJyZW1vdmVGaWx0ZXIoKTsgZHluYW1pY0Ryb3Bkb3duLmhpZGUoKTtcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uXCIgW2NsYXNzLmhwZS1jaGVja21hcmtdPVwiaW5pdGlhbCA9PT0gc2VsZWN0ZWRcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWx0ZXItZHJvcGRvd24tdGl0bGVcIj57eyBpbml0aWFsLm5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tbGlzdC1pdGVtXCIgKm5nSWY9XCJzZWxlY3RlZCAhPT0gaW5pdGlhbCAmJiBzaG93VHlwZWFoZWFkXCIgcm9sZT1cIm1lbnVpdGVtXCI+XG4gICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1jaGVja21hcmtcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWx0ZXItZHJvcGRvd24tdGl0bGVcIj57eyBzZWxlY3RlZC5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxocj5cblxuICAgICAgICA8bGkgKm5nSWY9XCJzaG93VHlwZWFoZWFkXCIgY2xhc3M9XCJ0eXBlYWhlYWQtYm94XCI+XG4gICAgICAgICAgICA8aW5wdXQgWyhuZ01vZGVsKV09XCJzZWFyY2hRdWVyeVwiIFt0eXBlYWhlYWRdPVwidHlwZWFoZWFkSXRlbXNcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxuICAgICAgICAgICAgKHR5cGVhaGVhZE9uU2VsZWN0KT1cInNlbGVjdE9wdGlvbigkZXZlbnQpXCIgXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwib3B0aW9ucz8ucGxhY2Vob2xkZXIgfHwgZGVmYXVsdE9wdGlvbnMucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgW3R5cGVhaGVhZE1pbkxlbmd0aF09XCJvcHRpb25zPy5taW5DaGFyYWN0ZXJzIHx8IGRlZmF1bHRPcHRpb25zLm1pbkNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgW3R5cGVhaGVhZE9wdGlvbnNMaW1pdF09XCJvcHRpb25zPy5tYXhSZXN1bHRzXCI+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhc2hvd1R5cGVhaGVhZFwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tbGlzdC1pdGVtXCIgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmaWx0ZXJzXCIgcm9sZT1cIm1lbnVpdGVtXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb25cIiBbY2xhc3MuaHBlLWNoZWNrbWFya109XCJmaWx0ZXIgPT09IHNlbGVjdGVkXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZpbHRlci1kcm9wZG93bi10aXRsZVwiPnt7IGZpbHRlci5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgIDwvdWw+XG48L2Rpdj5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhkb2N1bWVudDpjbGljayknOiAnY2xpY2tPZmYoJGV2ZW50KScsXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJEeW5hbWljQ29tcG9uZW50IGV4dGVuZHMgRmlsdGVyQmFzZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXTtcbiAgICBASW5wdXQoKSBpbml0aWFsOiBGaWx0ZXI7XG4gICAgQElucHV0KCkgb3B0aW9uczogRmlsdGVyRHluYW1pY0xpc3RDb25maWc7XG5cbiAgICBAVmlld0NoaWxkKEJzRHJvcGRvd25EaXJlY3RpdmUpIGRyb3Bkb3duOiBCc0Ryb3Bkb3duRGlyZWN0aXZlO1xuXG4gICAgZGVmYXVsdE9wdGlvbnM6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnID0ge1xuICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIG1pbkNoYXJhY3RlcnM6IDNcbiAgICB9O1xuICAgIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG4gICAgc2VsZWN0ZWQ6IEZpbHRlcjtcbiAgICBzaG93VHlwZWFoZWFkOiBib29sZWFuID0gdHJ1ZTtcbiAgICB0eXBlYWhlYWRJdGVtczogc3RyaW5nW10gPSBbXTtcblxuICAgIGdldEl0ZW1zKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0aGlzLmluaXRpYWwpLm1hcChpdGVtID0+IGl0ZW0ubmFtZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmluaXRpYWw7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubWF4SW5kaXZpZHVhbEl0ZW1zICYmIHRoaXMub3B0aW9ucy5tYXhJbmRpdmlkdWFsSXRlbXMgKyAxID49IHRoaXMuZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1R5cGVhaGVhZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0T3B0aW9uKHR5cGVhaGVhZE9wdGlvbjogVHlwZWFoZWFkTWF0Y2gpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuZmlsdGVycy5maW5kSW5kZXgoZmlsdGVyID0+IGZpbHRlci5uYW1lID09PSB0eXBlYWhlYWRPcHRpb24udmFsdWUpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5maWx0ZXJzW2lkeF07XG4gICAgICAgIHRoaXMuYWRkRmlsdGVyKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gJyc7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgIH1cblxuICAgIGNsaWNrT2ZmKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG5cbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgbGV0IGhpZGVEcm9wZG93biA9IHRydWU7XG5cbiAgICAgICAgd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQubm9kZU5hbWUgIT09ICdCT0RZJykge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3V4LWR5bmFtaWMtZmlsdGVyJykpIHtcbiAgICAgICAgICAgICAgICBoaWRlRHJvcGRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGlkZURyb3Bkb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAhPT0gdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgICBzdXBlci5yZW1vdmVGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSAnJztcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyRHluYW1pY0xpc3RDb25maWcge1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIG1pbkNoYXJhY3RlcnM/OiBudW1iZXI7XG4gICAgbWF4UmVzdWx0cz86IG51bWJlcjtcbiAgICBtYXhJbmRpdmlkdWFsSXRlbXM/OiBudW1iZXI7XG59Il19