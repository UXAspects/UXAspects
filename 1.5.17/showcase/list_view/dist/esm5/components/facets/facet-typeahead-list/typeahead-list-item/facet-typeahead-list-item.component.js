/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Facet } from '../../models/facet';
var FacetTypeaheadListItemComponent = (function () {
    function FacetTypeaheadListItemComponent() {
        this.selected = false;
        this.simplified = false;
        this.tabbable = false;
        this.itemFocus = new EventEmitter();
        this.selectedChange = new EventEmitter();
    }
    Object.defineProperty(FacetTypeaheadListItemComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.facet && this.facet.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FacetTypeaheadListItemComponent.prototype.getLabel = /**
     * @return {?}
     */
    function () {
        return this.facet ? this.facet.title : null;
    };
    /**
     * @return {?}
     */
    FacetTypeaheadListItemComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.option.nativeElement.focus();
    };
    FacetTypeaheadListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-typeahead-list-item',
                    template: "<div #option\n    role=\"option\"\n    class=\"facet-typeahead-list-selected-option\"\n    [attr.aria-checked]=\"selected\"\n    [tabindex]=\"tabbable ? 0 : -1\"\n    (focus)=\"itemFocus.emit()\"\n    (click)=\"selectedChange.emit(facet)\"\n    (keydown.enter)=\"selectedChange.emit(facet)\"\n    (keydown.space)=\"selectedChange.emit(facet); $event.preventDefault()\"\n    (keydown.spacebar)=\"selectedChange.emit(facet); $event.preventDefault()\">\n\n    <ux-checkbox [clickable]=\"false\" [value]=\"selected\" [simplified]=\"simplified\" [tabindex]=\"-1\" [disabled]=\"disabled\">\n        <span class=\"facet-typeahead-list-selected-option-title\">{{ facet?.title }}</span>\n        <span class=\"facet-typeahead-list-selected-option-count\">({{ facet?.count }})</span>\n    </ux-checkbox>\n\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    FacetTypeaheadListItemComponent.ctorParameters = function () { return []; };
    FacetTypeaheadListItemComponent.propDecorators = {
        "facet": [{ type: Input },],
        "selected": [{ type: Input },],
        "simplified": [{ type: Input },],
        "tabbable": [{ type: Input },],
        "itemFocus": [{ type: Output },],
        "selectedChange": [{ type: Output },],
        "option": [{ type: ViewChild, args: ['option',] },],
    };
    return FacetTypeaheadListItemComponent;
}());
export { FacetTypeaheadListItemComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvZmFjZXQtdHlwZWFoZWFkLWxpc3QvdHlwZWFoZWFkLWxpc3QtaXRlbS9mYWNldC10eXBlYWhlYWQtbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O3dCQTBCVixLQUFLOzBCQUNILEtBQUs7d0JBQ1AsS0FBSzt5QkFFWixJQUFJLFlBQVksRUFBUTs4QkFDbkIsSUFBSSxZQUFZLEVBQVM7O0lBSXBELHNCQUFJLHFEQUFROzs7O1FBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztTQUM1Qzs7O09BQUE7Ozs7SUFFRCxrREFBUTs7O0lBQVI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDL0M7Ozs7SUFFRCwrQ0FBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNyQzs7Z0JBM0NKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxRQUFRLEVBQUUscXlCQWdCUDtvQkFDSCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQ7Ozs7OzBCQUdJLEtBQUs7NkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBRUwsTUFBTTttQ0FDTixNQUFNOzJCQUVOLFNBQVMsU0FBQyxRQUFROzswQ0FuQ3ZCOztTQXlCYSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmFjZXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvZmFjZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LXR5cGVhaGVhZC1saXN0LWl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAjb3B0aW9uXG4gICAgcm9sZT1cIm9wdGlvblwiXG4gICAgY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1zZWxlY3RlZC1vcHRpb25cIlxuICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJzZWxlY3RlZFwiXG4gICAgW3RhYmluZGV4XT1cInRhYmJhYmxlID8gMCA6IC0xXCJcbiAgICAoZm9jdXMpPVwiaXRlbUZvY3VzLmVtaXQoKVwiXG4gICAgKGNsaWNrKT1cInNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFjZXQpXCJcbiAgICAoa2V5ZG93bi5lbnRlcik9XCJzZWxlY3RlZENoYW5nZS5lbWl0KGZhY2V0KVwiXG4gICAgKGtleWRvd24uc3BhY2UpPVwic2VsZWN0ZWRDaGFuZ2UuZW1pdChmYWNldCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAoa2V5ZG93bi5zcGFjZWJhcik9XCJzZWxlY3RlZENoYW5nZS5lbWl0KGZhY2V0KTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIj5cblxuICAgIDx1eC1jaGVja2JveCBbY2xpY2thYmxlXT1cImZhbHNlXCIgW3ZhbHVlXT1cInNlbGVjdGVkXCIgW3NpbXBsaWZpZWRdPVwic2ltcGxpZmllZFwiIFt0YWJpbmRleF09XCItMVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0LXR5cGVhaGVhZC1saXN0LXNlbGVjdGVkLW9wdGlvbi10aXRsZVwiPnt7IGZhY2V0Py50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYWNldC10eXBlYWhlYWQtbGlzdC1zZWxlY3RlZC1vcHRpb24tY291bnRcIj4oe3sgZmFjZXQ/LmNvdW50IH19KTwvc3Bhbj5cbiAgICA8L3V4LWNoZWNrYm94PlxuXG48L2Rpdj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VHlwZWFoZWFkTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBGb2N1c2FibGVPcHRpb24ge1xuXG4gICAgQElucHV0KCkgZmFjZXQ6IEZhY2V0O1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2ltcGxpZmllZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHRhYmJhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgaXRlbUZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdvcHRpb24nKSBvcHRpb246IEVsZW1lbnRSZWY7XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2V0ICYmIHRoaXMuZmFjZXQuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXQgPyB0aGlzLmZhY2V0LnRpdGxlIDogbnVsbDtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcHRpb24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==