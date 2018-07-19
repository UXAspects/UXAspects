/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Facet } from '../../models/facet';
export class FacetTypeaheadListItemComponent {
    constructor() {
        this.selected = false;
        this.simplified = false;
        this.tabbable = false;
        this.itemFocus = new EventEmitter();
        this.selectedChange = new EventEmitter();
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
        return this.facet ? this.facet.title : null;
    }
    /**
     * @return {?}
     */
    focus() {
        this.option.nativeElement.focus();
    }
}
FacetTypeaheadListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-typeahead-list-item',
                template: `<div #option
    role="option"
    class="facet-typeahead-list-selected-option"
    [attr.aria-checked]="selected"
    [tabindex]="tabbable ? 0 : -1"
    (focus)="itemFocus.emit()"
    (click)="selectedChange.emit(facet)"
    (keydown.enter)="selectedChange.emit(facet)"
    (keydown.space)="selectedChange.emit(facet); $event.preventDefault()"
    (keydown.spacebar)="selectedChange.emit(facet); $event.preventDefault()">

    <ux-checkbox [clickable]="false" [value]="selected" [simplified]="simplified" [tabindex]="-1" [disabled]="disabled">
        <span class="facet-typeahead-list-selected-option-title">{{ facet?.title }}</span>
        <span class="facet-typeahead-list-selected-option-count">({{ facet?.count }})</span>
    </ux-checkbox>

</div>`,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
FacetTypeaheadListItemComponent.ctorParameters = () => [];
FacetTypeaheadListItemComponent.propDecorators = {
    "facet": [{ type: Input },],
    "selected": [{ type: Input },],
    "simplified": [{ type: Input },],
    "tabbable": [{ type: Input },],
    "itemFocus": [{ type: Output },],
    "selectedChange": [{ type: Output },],
    "option": [{ type: ViewChild, args: ['option',] },],
};
function FacetTypeaheadListItemComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetTypeaheadListItemComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetTypeaheadListItemComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetTypeaheadListItemComponent.propDecorators;
    /** @type {?} */
    FacetTypeaheadListItemComponent.prototype.facet;
    /** @type {?} */
    FacetTypeaheadListItemComponent.prototype.selected;
    /** @type {?} */
    FacetTypeaheadListItemComponent.prototype.simplified;
    /** @type {?} */
    FacetTypeaheadListItemComponent.prototype.tabbable;
    /** @type {?} */
    FacetTypeaheadListItemComponent.prototype.itemFocus;
    /** @type {?} */
    FacetTypeaheadListItemComponent.prototype.selectedChange;
    /** @type {?} */
    FacetTypeaheadListItemComponent.prototype.option;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvZmFjZXQtdHlwZWFoZWFkLWxpc3QvdHlwZWFoZWFkLWxpc3QtaXRlbS9mYWNldC10eXBlYWhlYWQtbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQXVCM0MsTUFBTTs7d0JBRzJCLEtBQUs7MEJBQ0gsS0FBSzt3QkFDUCxLQUFLO3lCQUVaLElBQUksWUFBWSxFQUFROzhCQUNuQixJQUFJLFlBQVksRUFBUzs7Ozs7SUFJcEQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7S0FDNUM7Ozs7SUFFRCxRQUFRO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQy9DOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3JDOzs7WUEzQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztPQWdCUDtnQkFDSCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7Ozs7c0JBR0ksS0FBSzt5QkFDTCxLQUFLOzJCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFFTCxNQUFNOytCQUNOLE1BQU07dUJBRU4sU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmFjZXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvZmFjZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LXR5cGVhaGVhZC1saXN0LWl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAjb3B0aW9uXG4gICAgcm9sZT1cIm9wdGlvblwiXG4gICAgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1zZWxlY3RlZC1vcHRpb25cIlxuICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJzZWxlY3RlZFwiXG4gICAgW3RhYmluZGV4XT1cInRhYmJhYmxlID8gMCA6IC0xXCJcbiAgICAoZm9jdXMpPVwiaXRlbUZvY3VzLmVtaXQoKVwiXG4gICAgKGNsaWNrKT1cInNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFjZXQpXCJcbiAgICAoa2V5ZG93bi5lbnRlcik9XCJzZWxlY3RlZENoYW5nZS5lbWl0KGZhY2V0KVwiXG4gICAgKGtleWRvd24uc3BhY2UpPVwic2VsZWN0ZWRDaGFuZ2UuZW1pdChmYWNldCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAoa2V5ZG93bi5zcGFjZWJhcik9XCJzZWxlY3RlZENoYW5nZS5lbWl0KGZhY2V0KTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIj5cblxuICAgIDx1eC1jaGVja2JveCBbY2xpY2thYmxlXT1cImZhbHNlXCIgW3ZhbHVlXT1cInNlbGVjdGVkXCIgW3NpbXBsaWZpZWRdPVwic2ltcGxpZmllZFwiIFt0YWJpbmRleF09XCItMVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LXNlbGVjdGVkLW9wdGlvbi10aXRsZVwiPnt7IGZhY2V0Py50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1zZWxlY3RlZC1vcHRpb24tY291bnRcIj4oe3sgZmFjZXQ/LmNvdW50IH19KTwvc3Bhbj5cbiAgICA8L3V4LWNoZWNrYm94PlxuXG48L2Rpdj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBGb2N1c2FibGVPcHRpb24ge1xuXG4gICAgQElucHV0KCkgZmFjZXQ6IEZhY2V0O1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2ltcGxpZmllZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHRhYmJhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgaXRlbUZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdvcHRpb24nKSBvcHRpb246IEVsZW1lbnRSZWY7XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2V0ICYmIHRoaXMuZmFjZXQuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXQgPyB0aGlzLmZhY2V0LnRpdGxlIDogbnVsbDtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcHRpb24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==