/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
export class FacetCheckListComponent extends FacetBaseComponent {
    constructor() {
        super(...arguments);
        this.facets = [];
        this.scrollbar = true;
        this.expanded = true;
    }
}
FacetCheckListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-check-list',
                template: `<ux-facet-header [header]="header" [(expanded)]="expanded"></ux-facet-header>

<!-- Create a container which will show when section is expanded -->
<div class="facet-check-list-container" [class.facet-check-list-scrollbar]="scrollbar" *ngIf="expanded">

    <!-- Iterate through each possible facet -->
    <div class="facet-check-list-item" *ngFor="let facet of facets" [class.facet-active]="isFacetSelected(facet)" tabindex="0"
        (click)="toggleFacetSelection(facet)" (keyup.enter)="toggleFacetSelection(facet)" [class.disabled]="facet.disabled">

        <!-- Show check icon to indicate the state -->
        <span class="facet-check-list-item-check">
            <span class="hpe-icon hpe-active"></span>
        </span>

        <!-- Display the title -->
        <span class="facet-check-list-item-title">{{ facet.title }}</span>

        <!-- Display the count if specified -->
        <span class="facet-check-list-item-count" *ngIf="facet.count !== undefined">({{ facet.count }})</span>
    </div>
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY2hlY2stbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvZmFjZXQtY2hlY2stbGlzdC9mYWNldC1jaGVjay1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUEyQjdFLE1BQU0sOEJBQStCLFNBQVEsa0JBQWtCOzs7c0JBRWhDLEVBQUU7eUJBRUMsSUFBSTt3QkFDTCxJQUFJOzs7O1lBN0JwQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CUDthQUNOOzs7Ozt1QkFHSSxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmFjZXRCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9mYWNldC1iYXNlL2ZhY2V0LWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0IH0gZnJvbSAnLi4vbW9kZWxzL2ZhY2V0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC1jaGVjay1saXN0JyxcbiAgICB0ZW1wbGF0ZTogYDx1eC1mYWNldC1oZWFkZXIgW2hlYWRlcl09XCJoZWFkZXJcIiBbKGV4cGFuZGVkKV09XCJleHBhbmRlZFwiPjwvdXgtZmFjZXQtaGVhZGVyPlxuXG48IS0tIENyZWF0ZSBhIGNvbnRhaW5lciB3aGljaCB3aWxsIHNob3cgd2hlbiBzZWN0aW9uIGlzIGV4cGFuZGVkIC0tPlxuPGRpdiBjbGFzcz1cImZhY2V0LWNoZWNrLWxpc3QtY29udGFpbmVyXCIgW2NsYXNzLmZhY2V0LWNoZWNrLWxpc3Qtc2Nyb2xsYmFyXT1cInNjcm9sbGJhclwiICpuZ0lmPVwiZXhwYW5kZWRcIj5cblxuICAgIDwhLS0gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggcG9zc2libGUgZmFjZXQgLS0+XG4gICAgPGRpdiBjbGFzcz1cImZhY2V0LWNoZWNrLWxpc3QtaXRlbVwiICpuZ0Zvcj1cImxldCBmYWNldCBvZiBmYWNldHNcIiBbY2xhc3MuZmFjZXQtYWN0aXZlXT1cImlzRmFjZXRTZWxlY3RlZChmYWNldClcIiB0YWJpbmRleD1cIjBcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQpXCIgKGtleXVwLmVudGVyKT1cInRvZ2dsZUZhY2V0U2VsZWN0aW9uKGZhY2V0KVwiIFtjbGFzcy5kaXNhYmxlZF09XCJmYWNldC5kaXNhYmxlZFwiPlxuXG4gICAgICAgIDwhLS0gU2hvdyBjaGVjayBpY29uIHRvIGluZGljYXRlIHRoZSBzdGF0ZSAtLT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYWNldC1jaGVjay1saXN0LWl0ZW0tY2hlY2tcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWFjdGl2ZVwiPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDwhLS0gRGlzcGxheSB0aGUgdGl0bGUgLS0+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXQtY2hlY2stbGlzdC1pdGVtLXRpdGxlXCI+e3sgZmFjZXQudGl0bGUgfX08L3NwYW4+XG5cbiAgICAgICAgPCEtLSBEaXNwbGF5IHRoZSBjb3VudCBpZiBzcGVjaWZpZWQgLS0+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXQtY2hlY2stbGlzdC1pdGVtLWNvdW50XCIgKm5nSWY9XCJmYWNldC5jb3VudCAhPT0gdW5kZWZpbmVkXCI+KHt7IGZhY2V0LmNvdW50IH19KTwvc3Bhbj5cbiAgICA8L2Rpdj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRDaGVja0xpc3RDb21wb25lbnQgZXh0ZW5kcyBGYWNldEJhc2VDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFtdID0gW107XG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2Nyb2xsYmFyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XG59Il19