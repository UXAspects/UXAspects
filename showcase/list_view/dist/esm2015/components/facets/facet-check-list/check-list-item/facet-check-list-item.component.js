/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Facet } from '../../models/facet';
export class FacetCheckListItemComponent {
    constructor() {
        this.facet = null;
        this.selected = false;
        this.tabbable = false;
        this.selectedChange = new EventEmitter();
        this.itemFocus = new EventEmitter();
        this.itemBlur = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.facet && this.facet.disabled;
    }
    /**
     * @return {?}
     */
    getLabel() {
        return this.facet ? this.facet.title : '';
    }
    /**
     * @return {?}
     */
    focus() {
        this.option.nativeElement.focus();
    }
}
FacetCheckListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-check-list-item',
                template: `<div #option
    class="facet-check-list-item"
    [class.facet-active]="selected"
    [attr.aria-checked]="selected"
    role="option"
    [tabindex]="tabbable ? 0 : -1"
    (focus)="itemFocus.emit()"
    (blur)="itemBlur.emit()"
    (click)="selectedChange.emit(facet)"
    (keydown.enter)="selectedChange.emit(facet)"
    (keydown.space)="selectedChange.emit(facet); $event.preventDefault()"
    (keydown.spacebar)="selectedChange.emit(facet); $event.preventDefault()"
    [class.disabled]="facet?.disabled">

    <!-- Show check icon to indicate the state -->
    <span class="facet-check-list-item-check" aria-hidden="true">
        <span class="hpe-icon hpe-active"></span>
    </span>

    <!-- Display the title -->
    <span class="facet-check-list-item-title">
        {{ facet?.title }}
    </span>

    <!-- Display the count if specified -->
    <span class="facet-check-list-item-count"
        *ngIf="facet?.count !== undefined"
        attr.aria-label="{{ facet?.count }}"
        i18n-aria-label>
        ({{ facet?.count }})
    </span>
</div>`,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
FacetCheckListItemComponent.ctorParameters = () => [];
FacetCheckListItemComponent.propDecorators = {
    "facet": [{ type: Input },],
    "selected": [{ type: Input },],
    "tabbable": [{ type: Input },],
    "selectedChange": [{ type: Output },],
    "itemFocus": [{ type: Output },],
    "itemBlur": [{ type: Output },],
    "option": [{ type: ViewChild, args: ['option',] },],
};
function FacetCheckListItemComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetCheckListItemComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetCheckListItemComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetCheckListItemComponent.propDecorators;
    /** @type {?} */
    FacetCheckListItemComponent.prototype.facet;
    /** @type {?} */
    FacetCheckListItemComponent.prototype.selected;
    /** @type {?} */
    FacetCheckListItemComponent.prototype.tabbable;
    /** @type {?} */
    FacetCheckListItemComponent.prototype.selectedChange;
    /** @type {?} */
    FacetCheckListItemComponent.prototype.itemFocus;
    /** @type {?} */
    FacetCheckListItemComponent.prototype.itemBlur;
    /** @type {?} */
    FacetCheckListItemComponent.prototype.option;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY2hlY2stbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9mYWNldC1jaGVjay1saXN0L2NoZWNrLWxpc3QtaXRlbS9mYWNldC1jaGVjay1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBc0MzQyxNQUFNOztxQkFFc0IsSUFBSTt3QkFDQyxLQUFLO3dCQUNMLEtBQUs7OEJBQ1AsSUFBSSxZQUFZLEVBQVM7eUJBQzlCLElBQUksWUFBWSxFQUFRO3dCQUN6QixJQUFJLFlBQVksRUFBUTs7Ozs7SUFHN0MsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7S0FDNUM7Ozs7SUFFRCxRQUFRO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQzdDOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3JDOzs7WUF4REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStCUDtnQkFDSCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7Ozs7c0JBR0ksS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7K0JBQ0wsTUFBTTswQkFDTixNQUFNO3lCQUNOLE1BQU07dUJBQ04sU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmFjZXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvZmFjZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LWNoZWNrLWxpc3QtaXRlbScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICNvcHRpb25cbiAgICBjbGFzcz1cImZhY2V0LWNoZWNrLWxpc3QtaXRlbVwiXG4gICAgW2NsYXNzLmZhY2V0LWFjdGl2ZV09XCJzZWxlY3RlZFwiXG4gICAgW2F0dHIuYXJpYS1jaGVja2VkXT1cInNlbGVjdGVkXCJcbiAgICByb2xlPVwib3B0aW9uXCJcbiAgICBbdGFiaW5kZXhdPVwidGFiYmFibGUgPyAwIDogLTFcIlxuICAgIChmb2N1cyk9XCJpdGVtRm9jdXMuZW1pdCgpXCJcbiAgICAoYmx1cik9XCJpdGVtQmx1ci5lbWl0KClcIlxuICAgIChjbGljayk9XCJzZWxlY3RlZENoYW5nZS5lbWl0KGZhY2V0KVwiXG4gICAgKGtleWRvd24uZW50ZXIpPVwic2VsZWN0ZWRDaGFuZ2UuZW1pdChmYWNldClcIlxuICAgIChrZXlkb3duLnNwYWNlKT1cInNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFjZXQpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgKGtleWRvd24uc3BhY2ViYXIpPVwic2VsZWN0ZWRDaGFuZ2UuZW1pdChmYWNldCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZmFjZXQ/LmRpc2FibGVkXCI+XG5cbiAgICA8IS0tIFNob3cgY2hlY2sgaWNvbiB0byBpbmRpY2F0ZSB0aGUgc3RhdGUgLS0+XG4gICAgPHNwYW4gY2xhc3M9XCJmYWNldC1jaGVjay1saXN0LWl0ZW0tY2hlY2tcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtYWN0aXZlXCI+PC9zcGFuPlxuICAgIDwvc3Bhbj5cblxuICAgIDwhLS0gRGlzcGxheSB0aGUgdGl0bGUgLS0+XG4gICAgPHNwYW4gY2xhc3M9XCJmYWNldC1jaGVjay1saXN0LWl0ZW0tdGl0bGVcIj5cbiAgICAgICAge3sgZmFjZXQ/LnRpdGxlIH19XG4gICAgPC9zcGFuPlxuXG4gICAgPCEtLSBEaXNwbGF5IHRoZSBjb3VudCBpZiBzcGVjaWZpZWQgLS0+XG4gICAgPHNwYW4gY2xhc3M9XCJmYWNldC1jaGVjay1saXN0LWl0ZW0tY291bnRcIlxuICAgICAgICAqbmdJZj1cImZhY2V0Py5jb3VudCAhPT0gdW5kZWZpbmVkXCJcbiAgICAgICAgYXR0ci5hcmlhLWxhYmVsPVwie3sgZmFjZXQ/LmNvdW50IH19XCJcbiAgICAgICAgaTE4bi1hcmlhLWxhYmVsPlxuICAgICAgICAoe3sgZmFjZXQ/LmNvdW50IH19KVxuICAgIDwvc3Bhbj5cbjwvZGl2PmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRDaGVja0xpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgRm9jdXNhYmxlT3B0aW9uIHtcblxuICAgIEBJbnB1dCgpIGZhY2V0OiBGYWNldCA9IG51bGw7XG4gICAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB0YWJiYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXQ+KCk7XG4gICAgQE91dHB1dCgpIGl0ZW1Gb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgaXRlbUJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQFZpZXdDaGlsZCgnb3B0aW9uJykgb3B0aW9uOiBFbGVtZW50UmVmO1xuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWNldCAmJiB0aGlzLmZhY2V0LmRpc2FibGVkO1xuICAgIH1cblxuICAgIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2V0ID8gdGhpcy5mYWNldC50aXRsZSA6ICcnO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wdGlvbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuIl19