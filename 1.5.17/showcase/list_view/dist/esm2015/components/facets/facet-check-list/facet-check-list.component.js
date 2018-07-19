/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { FacetCheckListItemComponent } from './check-list-item/facet-check-list-item.component';
export class FacetCheckListComponent extends FacetBaseComponent {
    constructor() {
        super(...arguments);
        this.facets = [];
        this.scrollbar = true;
        this.expanded = true;
        this.isFocused = false;
        this.activeIndex = 0;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._focusKeyManager = new FocusKeyManager(this.options)
            .withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onFocus(index) {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._focusKeyManager.onKeydown(event);
    }
    /**
     * @param {?} index
     * @param {?} facet
     * @return {?}
     */
    toggleFacet(index, facet) {
        this.toggleFacetSelection(facet);
        this._focusKeyManager.setActiveItem(index);
    }
}
FacetCheckListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-check-list',
                template: `<ux-facet-header [header]="header" [(expanded)]="expanded"></ux-facet-header>

<!-- Create a container which will show when section is expanded -->
<div class="facet-check-list-container"
    tabindex="-1"
    role="listbox"
    [class.facet-check-list-scrollbar]="scrollbar"
    [class.facet-check-list-scrollbar-focused]="isFocused"
    *ngIf="expanded">

    <!-- Iterate through each possible facet -->
    <ux-facet-check-list-item *ngFor="let facet of facets; let index = index"
        [facet]="facet"
        [tabbable]="activeIndex === index"
        [selected]="isFacetSelected(facet)"
        (selectedChange)="toggleFacet(index, facet)"
        (keydown)="onKeydown($event)"
        (itemFocus)="isFocused = true; onFocus(index)"
        (itemBlur)="isFocused = false">
    </ux-facet-check-list-item>

</div>`
            },] },
];
/** @nocollapse */
FacetCheckListComponent.ctorParameters = () => [];
FacetCheckListComponent.propDecorators = {
    "facets": [{ type: Input },],
    "header": [{ type: Input },],
    "scrollbar": [{ type: Input },],
    "expanded": [{ type: Input },],
    "options": [{ type: ViewChildren, args: [FacetCheckListItemComponent,] },],
};
function FacetCheckListComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetCheckListComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetCheckListComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetCheckListComponent.propDecorators;
    /** @type {?} */
    FacetCheckListComponent.prototype.facets;
    /** @type {?} */
    FacetCheckListComponent.prototype.header;
    /** @type {?} */
    FacetCheckListComponent.prototype.scrollbar;
    /** @type {?} */
    FacetCheckListComponent.prototype.expanded;
    /** @type {?} */
    FacetCheckListComponent.prototype.options;
    /** @type {?} */
    FacetCheckListComponent.prototype.isFocused;
    /** @type {?} */
    FacetCheckListComponent.prototype.activeIndex;
    /** @type {?} */
    FacetCheckListComponent.prototype._focusKeyManager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY2hlY2stbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvZmFjZXQtY2hlY2stbGlzdC9mYWNldC1jaGVjay1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBaUIsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQTJCaEcsTUFBTSw4QkFBK0IsU0FBUSxrQkFBa0I7OztzQkFFaEMsRUFBRTt5QkFFQyxJQUFJO3dCQUNMLElBQUk7eUJBSVosS0FBSzsyQkFDSixDQUFDOzs7OztJQUl2QixlQUFlO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDcEQsdUJBQXVCLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO0tBQzlHOzs7OztJQUVELE9BQU8sQ0FBQyxLQUFhO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUM7S0FDSjs7Ozs7SUFFRCxTQUFTLENBQUMsS0FBb0I7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMxQzs7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQWEsRUFBRSxLQUFZO1FBQ25DLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlDOzs7WUEzREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJQO2FBQ047Ozs7O3VCQUdJLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBRUwsWUFBWSxTQUFDLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGYWNldEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2ZhY2V0LWJhc2UvZmFjZXQtYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXQgfSBmcm9tICcuLi9tb2RlbHMvZmFjZXQnO1xuaW1wb3J0IHsgRmFjZXRDaGVja0xpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVjay1saXN0LWl0ZW0vZmFjZXQtY2hlY2stbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmFjZXQtY2hlY2stbGlzdCcsXG4gICAgdGVtcGxhdGU6IGA8dXgtZmFjZXQtaGVhZGVyIFtoZWFkZXJdPVwiaGVhZGVyXCIgWyhleHBhbmRlZCldPVwiZXhwYW5kZWRcIj48L3V4LWZhY2V0LWhlYWRlcj5cblxuPCEtLSBDcmVhdGUgYSBjb250YWluZXIgd2hpY2ggd2lsbCBzaG93IHdoZW4gc2VjdGlvbiBpcyBleHBhbmRlZCAtLT5cbjxkaXYgY2xhc3M9XCJmYWNldC1jaGVjay1saXN0LWNvbnRhaW5lclwiXG4gICAgdGFiaW5kZXg9XCItMVwiXG4gICAgcm9sZT1cImxpc3Rib3hcIlxuICAgIFtjbGFzcy5mYWNldC1jaGVjay1saXN0LXNjcm9sbGJhcl09XCJzY3JvbGxiYXJcIlxuICAgIFtjbGFzcy5mYWNldC1jaGVjay1saXN0LXNjcm9sbGJhci1mb2N1c2VkXT1cImlzRm9jdXNlZFwiXG4gICAgKm5nSWY9XCJleHBhbmRlZFwiPlxuXG4gICAgPCEtLSBJdGVyYXRlIHRocm91Z2ggZWFjaCBwb3NzaWJsZSBmYWNldCAtLT5cbiAgICA8dXgtZmFjZXQtY2hlY2stbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBmYWNldCBvZiBmYWNldHM7IGxldCBpbmRleCA9IGluZGV4XCJcbiAgICAgICAgW2ZhY2V0XT1cImZhY2V0XCJcbiAgICAgICAgW3RhYmJhYmxlXT1cImFjdGl2ZUluZGV4ID09PSBpbmRleFwiXG4gICAgICAgIFtzZWxlY3RlZF09XCJpc0ZhY2V0U2VsZWN0ZWQoZmFjZXQpXCJcbiAgICAgICAgKHNlbGVjdGVkQ2hhbmdlKT1cInRvZ2dsZUZhY2V0KGluZGV4LCBmYWNldClcIlxuICAgICAgICAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgIChpdGVtRm9jdXMpPVwiaXNGb2N1c2VkID0gdHJ1ZTsgb25Gb2N1cyhpbmRleClcIlxuICAgICAgICAoaXRlbUJsdXIpPVwiaXNGb2N1c2VkID0gZmFsc2VcIj5cbiAgICA8L3V4LWZhY2V0LWNoZWNrLWxpc3QtaXRlbT5cblxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldENoZWNrTGlzdENvbXBvbmVudCBleHRlbmRzIEZhY2V0QmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdID0gW107XG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2Nyb2xsYmFyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAVmlld0NoaWxkcmVuKEZhY2V0Q2hlY2tMaXN0SXRlbUNvbXBvbmVudCkgb3B0aW9uczogUXVlcnlMaXN0PEZhY2V0Q2hlY2tMaXN0SXRlbUNvbXBvbmVudD47XG5cbiAgICBpc0ZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgX2ZvY3VzS2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPEZhY2V0Q2hlY2tMaXN0SXRlbUNvbXBvbmVudD47XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXIodGhpcy5vcHRpb25zKVxuICAgICAgICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoaW5kZXggPT4gdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4KTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRmFjZXQoaW5kZXg6IG51bWJlciwgZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQpO1xuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgfVxufSJdfQ==