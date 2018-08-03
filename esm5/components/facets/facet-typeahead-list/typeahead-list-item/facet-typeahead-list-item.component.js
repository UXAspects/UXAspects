/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Facet } from '../../models/facet';
var FacetTypeaheadListItemComponent = /** @class */ (function () {
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
                }] }
    ];
    FacetTypeaheadListItemComponent.propDecorators = {
        facet: [{ type: Input }],
        selected: [{ type: Input }],
        simplified: [{ type: Input }],
        tabbable: [{ type: Input }],
        itemFocus: [{ type: Output }],
        selectedChange: [{ type: Output }],
        option: [{ type: ViewChild, args: ['option',] }]
    };
    return FacetTypeaheadListItemComponent;
}());
export { FacetTypeaheadListItemComponent };
function FacetTypeaheadListItemComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvZmFjZXQtdHlwZWFoZWFkLWxpc3QvdHlwZWFoZWFkLWxpc3QtaXRlbS9mYWNldC10eXBlYWhlYWQtbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O3dCQVVWLEtBQUs7MEJBQ0gsS0FBSzt3QkFDUCxLQUFLO3lCQUVaLElBQUksWUFBWSxFQUFROzhCQUNuQixJQUFJLFlBQVksRUFBUzs7SUFJcEQsc0JBQUkscURBQVE7Ozs7UUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQzVDOzs7T0FBQTs7OztJQUVELGtEQUFROzs7SUFBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQy9DOzs7O0lBRUQsK0NBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDckM7O2dCQTNCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsK3lCQUF5RDtvQkFDekQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7d0JBR0ksS0FBSzsyQkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFFTCxNQUFNO2lDQUNOLE1BQU07eUJBRU4sU0FBUyxTQUFDLFFBQVE7OzBDQW5CdkI7O1NBU2EsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZhY2V0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2ZhY2V0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC10eXBlYWhlYWQtbGlzdC1pdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmFjZXQtdHlwZWFoZWFkLWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRUeXBlYWhlYWRMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiB7XG5cbiAgICBASW5wdXQoKSBmYWNldDogRmFjZXQ7XG4gICAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaW1wbGlmaWVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgdGFiYmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBpdGVtRm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxGYWNldD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ29wdGlvbicpIG9wdGlvbjogRWxlbWVudFJlZjtcblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXQgJiYgdGhpcy5mYWNldC5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWNldCA/IHRoaXMuZmFjZXQudGl0bGUgOiBudWxsO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wdGlvbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuIl19