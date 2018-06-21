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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELHFCQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7O0lBY2MsNENBQWdCOzs7Ozs7bUJBR3ZDLGdCQUFjLEVBQUUsZUFBaUI7Ozs7OEJBTTlCLElBQUksT0FBTyxFQUFjOzs7SUFFekMsNkVBQTZFOzs7Ozs7SUFDN0UsbUNBQVE7Ozs7O0lBQVIsVUFBUyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUN4Qzs7Z0JBM0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLHdpQkFPTDtvQkFDTCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OzJCQWpCRDtFQWtCc0MsZ0JBQWdCO1NBQXpDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVG9vbHRpcENvbXBvbmVudCB9IGZyb20gJy4uL3Rvb2x0aXAvaW5kZXgnO1xuXG5sZXQgdW5pcXVlUG9wb3ZlcklkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtcG9wb3ZlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBvcG92ZXIgc2hvd1wiIFtuZ0NsYXNzXT1cIltwbGFjZW1lbnQsIGN1c3RvbUNsYXNzXVwiIFtpZF09XCJpZFwiIFthdHRyLnJvbGVdPVwicm9sZVwiICh1eENsaWNrT3V0c2lkZSk9XCJjbGlja091dHNpZGUkLm5leHQoJGV2ZW50KVwiPlxuICAgIDxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PlxuICAgIDxoMyBjbGFzcz1cInBvcG92ZXItdGl0bGVcIiAqbmdJZj1cInRpdGxlXCI+e3sgdGl0bGUgfX08L2gzPlxuICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIiAoY2RrT2JzZXJ2ZUNvbnRlbnQpPVwicmVwb3NpdGlvbigpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNUZW1wbGF0ZVJlZlwiPnt7IGNvbnRlbnQgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVGVtcGxhdGVSZWZcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb21wb25lbnQgZXh0ZW5kcyBUb29sdGlwQ29tcG9uZW50IHtcblxuICAvKiogRGVmaW5lIGEgdW5pcXVlIGlkIGZvciBlYWNoIHBvcG92ZXIgKi9cbiAgaWQ6IHN0cmluZyA9IGB1eC1wb3BvdmVyLSR7Kyt1bmlxdWVQb3BvdmVySWR9YDtcblxuICAvKiogSWYgc3BlY2lmaWVkIGFsbG93cyB0aGUgcG9wb3ZlciB0byBzaG93IGEgdGl0bGUgKi9cbiAgdGl0bGU6IHN0cmluZztcblxuICAvKiogVGhpcyB3aWxsIGVtaXQgYW4gZXZlbnQgYW55IHRpbWUgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgdGhlIHBvcG92ZXIgKi9cbiAgY2xpY2tPdXRzaWRlJCA9IG5ldyBTdWJqZWN0PE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqIFRoaXMgd2lsbCB1cGRhdGUgdGhlIHRpdGxlIG9mIHRoZSBwb3BvdmVyIGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gKi9cbiAgc2V0VGl0bGUodGl0bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufSJdfQ==