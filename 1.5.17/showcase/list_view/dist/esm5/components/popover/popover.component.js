/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TooltipComponent } from '../tooltip/index';
var /** @type {?} */ uniquePopoverId = 0;
var PopoverComponent = (function (_super) {
    tslib_1.__extends(PopoverComponent, _super);
    function PopoverComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Define a unique id for each popover
         */
        _this.id = "ux-popover-" + ++uniquePopoverId;
        /**
         * This will emit an event any time the user clicks outside the popover
         */
        _this.clickOutside$ = new Subject();
        return _this;
    }
    /** This will update the title of the popover and trigger change detection */
    /**
     * This will update the title of the popover and trigger change detection
     * @param {?} title
     * @return {?}
     */
    PopoverComponent.prototype.setTitle = /**
     * This will update the title of the popover and trigger change detection
     * @param {?} title
     * @return {?}
     */
    function (title) {
        this.title = title;
        this._changeDetectorRef.markForCheck();
    };
    PopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-popover',
                    template: "<div class=\"popover show\" [ngClass]=\"[placement, customClass]\" [id]=\"id\" [attr.role]=\"role\" (uxClickOutside)=\"clickOutside$.next($event)\">\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-title\" *ngIf=\"title\">{{ title }}</h3>\n    <div class=\"popover-content\" (cdkObserveContent)=\"reposition()\">\n        <ng-container *ngIf=\"!isTemplateRef\">{{ content }}</ng-container>\n        <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"content\" [ngTemplateOutletContext]=\"context\"></ng-container>\n    </div>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    PopoverComponent.ctorParameters = function () { return []; };
    return PopoverComponent;
}(TooltipComponent));
export { PopoverComponent };
function PopoverComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PopoverComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PopoverComponent.ctorParameters;
    /**
     * Define a unique id for each popover
     * @type {?}
     */
    PopoverComponent.prototype.id;
    /**
     * If specified allows the popover to show a title
     * @type {?}
     */
    PopoverComponent.prototype.title;
    /**
     * This will emit an event any time the user clicks outside the popover
     * @type {?}
     */
    PopoverComponent.prototype.clickOutside$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELHFCQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7O0lBY2MsNENBQWdCOzs7Ozs7bUJBR3ZDLGdCQUFjLEVBQUUsZUFBaUI7Ozs7OEJBTTlCLElBQUksT0FBTyxFQUFjOzs7SUFFekMsNkVBQTZFOzs7Ozs7SUFDN0UsbUNBQVE7Ozs7O0lBQVIsVUFBUyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUN4Qzs7Z0JBM0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLHdpQkFPTDtvQkFDTCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7MkJBakJEO0VBa0JzQyxnQkFBZ0I7U0FBekMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBUb29sdGlwQ29tcG9uZW50IH0gZnJvbSAnLi4vdG9vbHRpcC9pbmRleCc7XG5cbmxldCB1bmlxdWVQb3BvdmVySWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1wb3BvdmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicG9wb3ZlciBzaG93XCIgW25nQ2xhc3NdPVwiW3BsYWNlbWVudCwgY3VzdG9tQ2xhc3NdXCIgW2lkXT1cImlkXCIgW2F0dHIucm9sZV09XCJyb2xlXCIgKHV4Q2xpY2tPdXRzaWRlKT1cImNsaWNrT3V0c2lkZSQubmV4dCgkZXZlbnQpXCI+XG4gICAgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+XG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiICpuZ0lmPVwidGl0bGVcIj57eyB0aXRsZSB9fTwvaDM+XG4gICAgPGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiIChjZGtPYnNlcnZlQ29udGVudCk9XCJyZXBvc2l0aW9uKClcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1RlbXBsYXRlUmVmXCI+e3sgY29udGVudCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNUZW1wbGF0ZVJlZlwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbXBvbmVudCBleHRlbmRzIFRvb2x0aXBDb21wb25lbnQge1xuXG4gIC8qKiBEZWZpbmUgYSB1bmlxdWUgaWQgZm9yIGVhY2ggcG9wb3ZlciAqL1xuICBpZDogc3RyaW5nID0gYHV4LXBvcG92ZXItJHsrK3VuaXF1ZVBvcG92ZXJJZH1gO1xuXG4gIC8qKiBJZiBzcGVjaWZpZWQgYWxsb3dzIHRoZSBwb3BvdmVyIHRvIHNob3cgYSB0aXRsZSAqL1xuICB0aXRsZTogc3RyaW5nO1xuXG4gIC8qKiBUaGlzIHdpbGwgZW1pdCBhbiBldmVudCBhbnkgdGltZSB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgcG9wb3ZlciAqL1xuICBjbGlja091dHNpZGUkID0gbmV3IFN1YmplY3Q8TW91c2VFdmVudD4oKTtcblxuICAvKiogVGhpcyB3aWxsIHVwZGF0ZSB0aGUgdGl0bGUgb2YgdGhlIHBvcG92ZXIgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiAqL1xuICBzZXRUaXRsZSh0aXRsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59Il19