/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
var ClickOutsideDirective = /** @class */ (function () {
    function ClickOutsideDirective(_elementRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this.uxClickOutside = new EventEmitter();
        /**
         * Often a click event makes the element appear - if so we can end up closing it immediately
         */
        this._initialised = false;
        setTimeout(function () { return _this._initialised = true; });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ClickOutsideDirective.prototype.click = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._initialised && this._elementRef.nativeElement !== event.target && !this._elementRef.nativeElement.contains(event.target)) {
            this.uxClickOutside.emit(event);
        }
    };
    ClickOutsideDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxClickOutside]'
                },] }
    ];
    /** @nocollapse */
    ClickOutsideDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ClickOutsideDirective.propDecorators = {
        uxClickOutside: [{ type: Output }],
        click: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return ClickOutsideDirective;
}());
export { ClickOutsideDirective };
function ClickOutsideDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ClickOutsideDirective.prototype.uxClickOutside;
    /**
     * Often a click event makes the element appear - if so we can end up closing it immediately
     * @type {?}
     */
    ClickOutsideDirective.prototype._initialised;
    /** @type {?} */
    ClickOutsideDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFZdEYsK0JBQW9CLFdBQXVCO1FBQTNDLGlCQUVDO1FBRm1CLGdCQUFXLEdBQVgsV0FBVyxDQUFZOzhCQUxoQixJQUFJLFlBQVksRUFBYzs7Ozs0QkFHekIsS0FBSztRQUdqQyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxFQUF4QixDQUF3QixDQUFDLENBQUM7S0FDOUM7Ozs7O0lBR0QscUNBQUs7Ozs7SUFETCxVQUNNLEtBQWlCO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7O2dCQW5CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtpQkFDL0I7Ozs7Z0JBSm1CLFVBQVU7OztpQ0FPekIsTUFBTTt3QkFTTixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2dDQWhCOUM7O1NBS2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4Q2xpY2tPdXRzaWRlXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIHtcblxuICAgIEBPdXRwdXQoKSB1eENsaWNrT3V0c2lkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIC8qKiBPZnRlbiBhIGNsaWNrIGV2ZW50IG1ha2VzIHRoZSBlbGVtZW50IGFwcGVhciAtIGlmIHNvIHdlIGNhbiBlbmQgdXAgY2xvc2luZyBpdCBpbW1lZGlhdGVseSAqL1xuICAgIHByaXZhdGUgX2luaXRpYWxpc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5faW5pdGlhbGlzZWQgPSB0cnVlKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpc2VkICYmIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmICF0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy51eENsaWNrT3V0c2lkZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=