/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class FloatingActionButtonNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('floatingActionButton', elementRef, injector);
        this.items = [];
    }
}
FloatingActionButtonNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'floating-action-button'
            },] }
];
/** @nocollapse */
FloatingActionButtonNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
FloatingActionButtonNg1Component.propDecorators = {
    items: [{ type: Input }],
    primary: [{ type: Input }],
    direction: [{ type: Input }],
    fabTooltip: [{ type: Input }],
    fabTooltipPlacement: [{ type: Input }]
};
function FloatingActionButtonNg1Component_tsickle_Closure_declarations() {
    /** @type {?} */
    FloatingActionButtonNg1Component.prototype.items;
    /** @type {?} */
    FloatingActionButtonNg1Component.prototype.primary;
    /** @type {?} */
    FloatingActionButtonNg1Component.prototype.direction;
    /** @type {?} */
    FloatingActionButtonNg1Component.prototype.fabTooltip;
    /** @type {?} */
    FloatingActionButtonNg1Component.prototype.fabTooltipPlacement;
}
/**
 * @record
 */
export function FloatingActionButtonItem() { }
function FloatingActionButtonItem_tsickle_Closure_declarations() {
    /** @type {?} */
    FloatingActionButtonItem.prototype.icon;
    /** @type {?} */
    FloatingActionButtonItem.prototype.event;
    /** @type {?|undefined} */
    FloatingActionButtonItem.prototype.tooltip;
    /** @type {?|undefined} */
    FloatingActionButtonItem.prototype.tooltipPlacement;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL2NvbXBvbmVudHMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi9mbG9hdGluZy1hY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUszRCxNQUFNLHVDQUF3QyxTQUFRLGdCQUFnQjs7Ozs7SUFRbEUsWUFBWSxVQUFzQixFQUFFLFFBQWtCO1FBQ2xELEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBUFgsRUFBRTtLQVE5Qzs7O1lBYkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7YUFDckM7Ozs7WUFMbUIsVUFBVTtZQUFFLFFBQVE7OztvQkFRbkMsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSztrQ0FDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZmxvYXRpbmctYWN0aW9uLWJ1dHRvbidcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdBY3Rpb25CdXR0b25OZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGl0ZW1zOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbkl0ZW1bXSA9IFtdO1xuICAgIEBJbnB1dCgpIHByaW1hcnk6IHN0cmluZztcbiAgICBASW5wdXQoKSBkaXJlY3Rpb246ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnO1xuICAgIEBJbnB1dCgpIGZhYlRvb2x0aXA6IHN0cmluZztcbiAgICBASW5wdXQoKSBmYWJUb29sdGlwUGxhY2VtZW50OiAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0JztcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcignZmxvYXRpbmdBY3Rpb25CdXR0b24nLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZsb2F0aW5nQWN0aW9uQnV0dG9uSXRlbSB7XG4gICAgaWNvbjogc3RyaW5nO1xuICAgIGV2ZW50OiBGdW5jdGlvbjtcbiAgICB0b29sdGlwPzogc3RyaW5nO1xuICAgIHRvb2x0aXBQbGFjZW1lbnQ/OiBzdHJpbmc7XG59Il19