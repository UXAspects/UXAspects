/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
var ScrollIntoViewDirective = (function () {
    function ScrollIntoViewDirective(_elementRef) {
        this._elementRef = _elementRef;
        /**
         * Allow a condition around whether or not this should scroll into view
         */
        this.uxScrollIntoView = true;
        /**
         * Allow user to provide the browser supported options
         */
        this.scrollIntoViewOptions = true;
    }
    /**
     * @return {?}
     */
    ScrollIntoViewDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.uxScrollIntoView) {
            this._elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
        }
    };
    ScrollIntoViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxScrollIntoView]'
                },] },
    ];
    /** @nocollapse */
    ScrollIntoViewDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ScrollIntoViewDirective.propDecorators = {
        "uxScrollIntoView": [{ type: Input },],
        "scrollIntoViewOptions": [{ type: Input },],
    };
    return ScrollIntoViewDirective;
}());
export { ScrollIntoViewDirective };
function ScrollIntoViewDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ScrollIntoViewDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ScrollIntoViewDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ScrollIntoViewDirective.propDecorators;
    /**
     * Allow a condition around whether or not this should scroll into view
     * @type {?}
     */
    ScrollIntoViewDirective.prototype.uxScrollIntoView;
    /**
     * Allow user to provide the browser supported options
     * @type {?}
     */
    ScrollIntoViewDirective.prototype.scrollIntoViewOptions;
    /** @type {?} */
    ScrollIntoViewDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLWludG8tdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBYXhFLGlDQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs7OztnQ0FMTixJQUFJOzs7O3FDQUd5QixJQUFJO0tBRXRCOzs7O0lBRWhELGlEQUFlOzs7SUFBZjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzdFO0tBQ0o7O2dCQWpCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtpQkFDakM7Ozs7Z0JBSmtDLFVBQVU7OztxQ0FReEMsS0FBSzswQ0FHTCxLQUFLOztrQ0FYVjs7U0FLYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4U2Nyb2xsSW50b1ZpZXddJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxJbnRvVmlld0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgLyoqIEFsbG93IGEgY29uZGl0aW9uIGFyb3VuZCB3aGV0aGVyIG9yIG5vdCB0aGlzIHNob3VsZCBzY3JvbGwgaW50byB2aWV3ICovXG4gICAgQElucHV0KCkgdXhTY3JvbGxJbnRvVmlldzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQWxsb3cgdXNlciB0byBwcm92aWRlIHRoZSBicm93c2VyIHN1cHBvcnRlZCBvcHRpb25zICovXG4gICAgQElucHV0KCkgc2Nyb2xsSW50b1ZpZXdPcHRpb25zOiBTY3JvbGxJbnRvVmlld09wdGlvbnMgfCBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy51eFNjcm9sbEludG9WaWV3KSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcodGhpcy5zY3JvbGxJbnRvVmlld09wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==