/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
export class FilterDropdownComponent extends FilterBaseComponent {
    /**
     * @return {?}
     */
    removeFilter() {
        super.removeFilter(this.selected);
        this.selected = this.initial;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selected = this.initial;
    }
    /**
     * @param {?} filter
     * @param {?} event
     * @return {?}
     */
    selectFilter(filter, event) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
        event.stopPropagation();
        event.preventDefault();
    }
}
FilterDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dropdown',
                template: `<div class="btn-group" dropdown [autoClose]="true" #dropdown="bs-dropdown">

    <button
        type="button"
        tabindex="0"
        dropdownToggle
        uxMenuNavigationToggle
        #menuNavigationToggle="uxMenuNavigationToggle"
        [(menuOpen)]="dropdown.isOpen"
        aria-haspopup="true"
        [attr.aria-expanded]="dropdown.isOpen"
        class="filter-dropdown btn dropdown-toggle"
        [class.active]="selected !== initial">
        {{ selected?.title }}
        <span class="hpe-icon hpe-down"></span>
    </button>

    <ul *dropdownMenu
        uxMenuNavigation
        [toggleButton]="menuNavigationToggle"
        class="dropdown-menu" role="menu">

        <li class="dropdown-list-item"
            *ngFor="let filter of filters"
            role="none">

            <a class="dropdown-item"
                role="listitem"
                tabindex="-1"
                uxMenuNavigationItem
                [attr.aria-selected]="filter === selected"
                (click)="selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()"
                (keydown.enter)="selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()">

                <i class="hpe-icon" [class.hpe-checkmark]="filter === selected"></i>
                <span class="filter-dropdown-title">{{ filter.name }}</span>
            </a>
        </li>
    </ul>
</div>`,
            },] },
];
/** @nocollapse */
FilterDropdownComponent.ctorParameters = () => [];
FilterDropdownComponent.propDecorators = {
    "initial": [{ type: Input },],
};
function FilterDropdownComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterDropdownComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterDropdownComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FilterDropdownComponent.propDecorators;
    /** @type {?} */
    FilterDropdownComponent.prototype.initial;
    /** @type {?} */
    FilterDropdownComponent.prototype.selected;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLWRyb3Bkb3duL2ZpbHRlci1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBOEMzRSxNQUFNLDhCQUErQixTQUFRLG1CQUFtQjs7OztJQU01RCxZQUFZO1FBQ1IsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ2hDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNoQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQWMsRUFBRSxLQUFpQjtRQUMxQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7O1lBakVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVDUDthQUNOOzs7Ozt3QkFHSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2ZpbHRlci1iYXNlL2ZpbHRlci1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuLi9maWx0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWRyb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiBkcm9wZG93biBbYXV0b0Nsb3NlXT1cInRydWVcIiAjZHJvcGRvd249XCJicy1kcm9wZG93blwiPlxuXG4gICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgZHJvcGRvd25Ub2dnbGVcbiAgICAgICAgdXhNZW51TmF2aWdhdGlvblRvZ2dsZVxuICAgICAgICAjbWVudU5hdmlnYXRpb25Ub2dnbGU9XCJ1eE1lbnVOYXZpZ2F0aW9uVG9nZ2xlXCJcbiAgICAgICAgWyhtZW51T3BlbildPVwiZHJvcGRvd24uaXNPcGVuXCJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRyb3Bkb3duLmlzT3BlblwiXG4gICAgICAgIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duIGJ0biBkcm9wZG93bi10b2dnbGVcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdGVkICE9PSBpbml0aWFsXCI+XG4gICAgICAgIHt7IHNlbGVjdGVkPy50aXRsZSB9fVxuICAgICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1kb3duXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPHVsICpkcm9wZG93bk1lbnVcbiAgICAgICAgdXhNZW51TmF2aWdhdGlvblxuICAgICAgICBbdG9nZ2xlQnV0dG9uXT1cIm1lbnVOYXZpZ2F0aW9uVG9nZ2xlXCJcbiAgICAgICAgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj5cblxuICAgICAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1saXN0LWl0ZW1cIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmaWx0ZXJzXCJcbiAgICAgICAgICAgIHJvbGU9XCJub25lXCI+XG5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXG4gICAgICAgICAgICAgICAgcm9sZT1cImxpc3RpdGVtXCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uSXRlbVxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiZmlsdGVyID09PSBzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIsICRldmVudCk7IGRyb3Bkb3duLmhpZGUoKTsgbWVudU5hdmlnYXRpb25Ub2dnbGUuZm9jdXMoKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwic2VsZWN0RmlsdGVyKGZpbHRlciwgJGV2ZW50KTsgZHJvcGRvd24uaGlkZSgpOyBtZW51TmF2aWdhdGlvblRvZ2dsZS5mb2N1cygpXCI+XG5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uXCIgW2NsYXNzLmhwZS1jaGVja21hcmtdPVwiZmlsdGVyID09PSBzZWxlY3RlZFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZpbHRlci1kcm9wZG93bi10aXRsZVwiPnt7IGZpbHRlci5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgIDwvdWw+XG48L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJEcm9wZG93bkNvbXBvbmVudCBleHRlbmRzIEZpbHRlckJhc2VDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaW5pdGlhbDogRmlsdGVyO1xuXG4gICAgc2VsZWN0ZWQ6IEZpbHRlcjtcblxuICAgIHJlbW92ZUZpbHRlcigpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIucmVtb3ZlRmlsdGVyKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgIH1cblxuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpbHRlciwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG59Il19