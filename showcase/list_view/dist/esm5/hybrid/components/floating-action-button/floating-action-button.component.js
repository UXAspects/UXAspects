/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var FloatingActionButtonNg1Component = (function (_super) {
    tslib_1.__extends(FloatingActionButtonNg1Component, _super);
    function FloatingActionButtonNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'floatingActionButton', elementRef, injector) || this;
        _this.items = [];
        return _this;
    }
    FloatingActionButtonNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'floating-action-button'
                },] },
    ];
    /** @nocollapse */
    FloatingActionButtonNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    FloatingActionButtonNg1Component.propDecorators = {
        "items": [{ type: Input },],
        "primary": [{ type: Input },],
        "direction": [{ type: Input },],
        "fabTooltip": [{ type: Input },],
        "fabTooltipPlacement": [{ type: Input },],
    };
    return FloatingActionButtonNg1Component;
}(UpgradeComponent));
export { FloatingActionButtonNg1Component };
function FloatingActionButtonNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FloatingActionButtonNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FloatingActionButtonNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FloatingActionButtonNg1Component.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL2NvbXBvbmVudHMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi9mbG9hdGluZy1hY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS0wsNERBQWdCO0lBUWxFLDBDQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFBdEQsWUFDSSxrQkFBTSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQ3REO3NCQVI0QyxFQUFFOztLQVE5Qzs7Z0JBYkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ3JDOzs7O2dCQUxtQixVQUFVO2dCQUFFLFFBQVE7OzswQkFRbkMsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzt3Q0FDTCxLQUFLOzsyQ0FaVjtFQU1zRCxnQkFBZ0I7U0FBekQsZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZmxvYXRpbmctYWN0aW9uLWJ1dHRvbidcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdBY3Rpb25CdXR0b25OZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGl0ZW1zOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbkl0ZW1bXSA9IFtdO1xuICAgIEBJbnB1dCgpIHByaW1hcnk6IHN0cmluZztcbiAgICBASW5wdXQoKSBkaXJlY3Rpb246ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnO1xuICAgIEBJbnB1dCgpIGZhYlRvb2x0aXA6IHN0cmluZztcbiAgICBASW5wdXQoKSBmYWJUb29sdGlwUGxhY2VtZW50OiAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0JztcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcignZmxvYXRpbmdBY3Rpb25CdXR0b24nLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZsb2F0aW5nQWN0aW9uQnV0dG9uSXRlbSB7XG4gICAgaWNvbjogc3RyaW5nO1xuICAgIGV2ZW50OiBGdW5jdGlvbjtcbiAgICB0b29sdGlwPzogc3RyaW5nO1xuICAgIHRvb2x0aXBQbGFjZW1lbnQ/OiBzdHJpbmc7XG59Il19