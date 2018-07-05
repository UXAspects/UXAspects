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
FilterDynamicComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWR5bmFtaWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVycy9maWx0ZXItZHluYW1pYy9maWx0ZXItZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQWtEM0UsTUFBTSw2QkFBOEIsU0FBUSxtQkFBbUI7Ozs4QkFRakI7WUFDdEMsV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsQ0FBQztTQUNuQjs2QkFHd0IsSUFBSTs4QkFDRixFQUFFOzs7OztJQUU3QixRQUFRO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BGOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hILElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzlCO0tBQ0o7Ozs7O0lBRUQsWUFBWSxDQUFDLGVBQStCO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFpQjtRQUV0QixxQkFBSSxNQUFNLHFCQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFBLENBQUM7UUFDekMscUJBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUV4QixPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixLQUFLLENBQUM7YUFDVDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO2FBQ2pDO1NBQ0o7UUFFRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtLQUVKOzs7O0lBRUQsWUFBWTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7S0FDekI7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQWM7UUFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pDOzs7WUF2SEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdDUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0Ysa0JBQWtCLEVBQUUsa0JBQWtCO2lCQUN6QzthQUNKOzs7Ozt3QkFHSSxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFFTCxTQUFTLFNBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duRGlyZWN0aXZlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9kcm9wZG93bic7XG5pbXBvcnQgeyBUeXBlYWhlYWRNYXRjaCB9IGZyb20gJ25neC1ib290c3RyYXAvdHlwZWFoZWFkJztcbmltcG9ydCB7IEZpbHRlckJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9maWx0ZXItYmFzZS9maWx0ZXItYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZpbHRlci1keW5hbWljJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgdXgtZHluYW1pYy1maWx0ZXJcIiBkcm9wZG93biAjZHluYW1pY0Ryb3Bkb3duPVwiYnMtZHJvcGRvd25cIj5cbiAgICA8YnV0dG9uIChjbGljayk9XCJkeW5hbWljRHJvcGRvd24uc2hvdygpXCIgdHlwZT1cImJ1dHRvblwiIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWQgIT09IGluaXRpYWxcIiBjbGFzcz1cImZpbHRlci1kcm9wZG93biBidG4gZHJvcGRvd24tdG9nZ2xlXCI+e3sgc2VsZWN0ZWQ/LnRpdGxlIH19IFxuICAgICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1kb3duXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDx1bCAqZHJvcGRvd25NZW51IGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+XG5cbiAgICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tbGlzdC1pdGVtXCIgKm5nSWY9XCJzaG93VHlwZWFoZWFkXCIgcm9sZT1cIm1lbnVpdGVtXCI+XG4gICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwicmVtb3ZlRmlsdGVyKCk7IGR5bmFtaWNEcm9wZG93bi5oaWRlKCk7XCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvblwiIFtjbGFzcy5ocGUtY2hlY2ttYXJrXT1cImluaXRpYWwgPT09IHNlbGVjdGVkXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duLXRpdGxlXCI+e3sgaW5pdGlhbC5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLWxpc3QtaXRlbVwiICpuZ0lmPVwic2VsZWN0ZWQgIT09IGluaXRpYWwgJiYgc2hvd1R5cGVhaGVhZFwiIHJvbGU9XCJtZW51aXRlbVwiPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvbiBocGUtY2hlY2ttYXJrXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duLXRpdGxlXCI+e3sgc2VsZWN0ZWQubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cblxuICAgICAgICA8aHI+XG5cbiAgICAgICAgPGxpICpuZ0lmPVwic2hvd1R5cGVhaGVhZFwiIGNsYXNzPVwidHlwZWFoZWFkLWJveFwiPlxuICAgICAgICAgICAgPGlucHV0IFsobmdNb2RlbCldPVwic2VhcmNoUXVlcnlcIiBbdHlwZWFoZWFkXT1cInR5cGVhaGVhZEl0ZW1zXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBcbiAgICAgICAgICAgICh0eXBlYWhlYWRPblNlbGVjdCk9XCJzZWxlY3RPcHRpb24oJGV2ZW50KVwiIFxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/LnBsYWNlaG9sZGVyIHx8IGRlZmF1bHRPcHRpb25zLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgIFt0eXBlYWhlYWRNaW5MZW5ndGhdPVwib3B0aW9ucz8ubWluQ2hhcmFjdGVycyB8fCBkZWZhdWx0T3B0aW9ucy5taW5DaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgIFt0eXBlYWhlYWRPcHRpb25zTGltaXRdPVwib3B0aW9ucz8ubWF4UmVzdWx0c1wiPlxuICAgICAgICA8L2xpPlxuXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXNob3dUeXBlYWhlYWRcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLWxpc3QtaXRlbVwiICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZmlsdGVyc1wiIHJvbGU9XCJtZW51aXRlbVwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uXCIgW2NsYXNzLmhwZS1jaGVja21hcmtdPVwiZmlsdGVyID09PSBzZWxlY3RlZFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWx0ZXItZHJvcGRvd24tdGl0bGVcIj57eyBmaWx0ZXIubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3NwYW4+XG5cbiAgICA8L3VsPlxuPC9kaXY+YCxcbiAgICBob3N0OiB7XG4gICAgICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ2NsaWNrT2ZmKCRldmVudCknLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyRHluYW1pY0NvbXBvbmVudCBleHRlbmRzIEZpbHRlckJhc2VDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZmlsdGVyczogRmlsdGVyW107XG4gICAgQElucHV0KCkgaW5pdGlhbDogRmlsdGVyO1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnO1xuXG4gICAgQFZpZXdDaGlsZChCc0Ryb3Bkb3duRGlyZWN0aXZlKSBkcm9wZG93bjogQnNEcm9wZG93bkRpcmVjdGl2ZTtcblxuICAgIGRlZmF1bHRPcHRpb25zOiBGaWx0ZXJEeW5hbWljTGlzdENvbmZpZyA9IHtcbiAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICBtaW5DaGFyYWN0ZXJzOiAzXG4gICAgfTtcbiAgICBzZWFyY2hRdWVyeTogc3RyaW5nO1xuICAgIHNlbGVjdGVkOiBGaWx0ZXI7XG4gICAgc2hvd1R5cGVhaGVhZDogYm9vbGVhbiA9IHRydWU7XG4gICAgdHlwZWFoZWFkSXRlbXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBnZXRJdGVtcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcnMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdGhpcy5pbml0aWFsKS5tYXAoaXRlbSA9PiBpdGVtLm5hbWUpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgICAgICB0aGlzLnR5cGVhaGVhZEl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLm1heEluZGl2aWR1YWxJdGVtcyAmJiB0aGlzLm9wdGlvbnMubWF4SW5kaXZpZHVhbEl0ZW1zICsgMSA+PSB0aGlzLmZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dUeXBlYWhlYWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE9wdGlvbih0eXBlYWhlYWRPcHRpb246IFR5cGVhaGVhZE1hdGNoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRmlsdGVyKCk7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLmZpbHRlcnMuZmluZEluZGV4KGZpbHRlciA9PiBmaWx0ZXIubmFtZSA9PT0gdHlwZWFoZWFkT3B0aW9uLnZhbHVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZmlsdGVyc1tpZHhdO1xuICAgICAgICB0aGlzLmFkZEZpbHRlcih0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9ICcnO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICB9XG5cbiAgICBjbGlja09mZihldmVudDogTW91c2VFdmVudCkge1xuXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGxldCBoaWRlRHJvcGRvd24gPSB0cnVlO1xuXG4gICAgICAgIHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0Lm5vZGVOYW1lICE9PSAnQk9EWScpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1eC1keW5hbWljLWZpbHRlcicpKSB7XG4gICAgICAgICAgICAgICAgaGlkZURyb3Bkb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhpZGVEcm9wZG93bikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgIT09IHRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgICAgc3VwZXIucmVtb3ZlRmlsdGVyKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gJyc7XG4gICAgfVxuXG4gICAgc2VsZWN0RmlsdGVyKGZpbHRlcjogRmlsdGVyKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRmlsdGVyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmaWx0ZXI7XG4gICAgICAgIHRoaXMuYWRkRmlsdGVyKHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckR5bmFtaWNMaXN0Q29uZmlnIHtcbiAgICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgICBtaW5DaGFyYWN0ZXJzPzogbnVtYmVyO1xuICAgIG1heFJlc3VsdHM/OiBudW1iZXI7XG4gICAgbWF4SW5kaXZpZHVhbEl0ZW1zPzogbnVtYmVyO1xufSJdfQ==