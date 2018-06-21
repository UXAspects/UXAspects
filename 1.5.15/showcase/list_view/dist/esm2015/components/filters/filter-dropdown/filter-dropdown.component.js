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
     * @return {?}
     */
    selectFilter(filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    }
}
FilterDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dropdown',
                template: `<div class="btn-group" dropdown>
    <button dropdownToggle type="button" class="filter-dropdown btn dropdown-toggle" [class.active]="selected !== initial">{{ selected?.title }} 
        <span class="hpe-icon hpe-down"></span>
    </button>
    <ul *dropdownMenu class="dropdown-menu" role="menu">
        <li class="dropdown-list-item" *ngFor="let filter of filters" role="menuitem">
            <a class="dropdown-item" (click)="selectFilter(filter)">
                <i class="hpe-icon" [class.hpe-checkmark]="filter === selected"></i>
                <span class="filter-dropdown-title">{{ filter.name }}</span>
            </a>
        </li>
    </ul>
</div>`,
            },] },
];
/** @nocollapse */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLWRyb3Bkb3duL2ZpbHRlci1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBbUIzRSxNQUFNLDhCQUErQixTQUFRLG1CQUFtQjs7OztJQU01RCxZQUFZO1FBQ1IsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ2hDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNoQzs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBYztRQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDakM7OztZQW5DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7T0FZUDthQUNOOzs7O3dCQUdJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWJhc2UvZmlsdGVyLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIGRyb3Bkb3duPlxuICAgIDxidXR0b24gZHJvcGRvd25Ub2dnbGUgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duIGJ0biBkcm9wZG93bi10b2dnbGVcIiBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdGVkICE9PSBpbml0aWFsXCI+e3sgc2VsZWN0ZWQ/LnRpdGxlIH19IFxuICAgICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1kb3duXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDx1bCAqZHJvcGRvd25NZW51IGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+XG4gICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLWxpc3QtaXRlbVwiICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZmlsdGVyc1wiIHJvbGU9XCJtZW51aXRlbVwiPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIpXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvblwiIFtjbGFzcy5ocGUtY2hlY2ttYXJrXT1cImZpbHRlciA9PT0gc2VsZWN0ZWRcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWx0ZXItZHJvcGRvd24tdGl0bGVcIj57eyBmaWx0ZXIubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyRHJvcGRvd25Db21wb25lbnQgZXh0ZW5kcyBGaWx0ZXJCYXNlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGluaXRpYWw6IEZpbHRlcjtcblxuICAgIHNlbGVjdGVkOiBGaWx0ZXI7XG5cbiAgICByZW1vdmVGaWx0ZXIoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnJlbW92ZUZpbHRlcih0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG59Il19