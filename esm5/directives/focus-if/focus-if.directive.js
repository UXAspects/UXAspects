/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
var FocusIfDirective = (function () {
    function FocusIfDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.focusIfDelay = 0;
        this._timeout = null;
    }
    Object.defineProperty(FocusIfDirective.prototype, "focusIf", {
        set: /**
         * @param {?} focus
         * @return {?}
         */
        function (focus) {
            var _this = this;
            // if a timeout is pending then cancel it
            if (!focus && this._timeout !== null) {
                clearTimeout(this._timeout);
                this._timeout = null;
            }
            if (focus && this._timeout === null) {
                this._timeout = window.setTimeout(function () {
                    _this._elementRef.nativeElement.focus();
                    _this._timeout = null;
                }, this.focusIfDelay);
            }
        },
        enumerable: true,
        configurable: true
    });
    FocusIfDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[focusIf]'
                },] },
    ];
    /** @nocollapse */
    FocusIfDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    FocusIfDirective.propDecorators = {
        "focusIfDelay": [{ type: Input },],
        "focusIf": [{ type: Input },],
    };
    return FocusIfDirective;
}());
export { FocusIfDirective };
function FocusIfDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FocusIfDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FocusIfDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FocusIfDirective.propDecorators;
    /** @type {?} */
    FocusIfDirective.prototype.focusIfDelay;
    /** @type {?} */
    FocusIfDirective.prototype._timeout;
    /** @type {?} */
    FocusIfDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtaWYuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZm9jdXMtaWYvZm9jdXMtaWYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBNEJ6RCwwQkFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7NEJBckJYLENBQUM7d0JBbUJOLElBQUk7S0FFaUI7MEJBbEI1QyxxQ0FBTzs7Ozs7a0JBQUMsS0FBYzs7O1lBR3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDeEI7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN2QyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDeEIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekI7Ozs7OztnQkFyQlIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO2lCQUN4Qjs7OztnQkFKbUIsVUFBVTs7O2lDQU96QixLQUFLOzRCQUVMLEtBQUs7OzJCQVRWOztTQUthLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZm9jdXNJZl0nXG59KVxuZXhwb3J0IGNsYXNzIEZvY3VzSWZEaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCkgZm9jdXNJZkRlbGF5OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgZm9jdXNJZihmb2N1czogYm9vbGVhbikge1xuXG4gICAgICAgIC8vIGlmIGEgdGltZW91dCBpcyBwZW5kaW5nIHRoZW4gY2FuY2VsIGl0XG4gICAgICAgIGlmICghZm9jdXMgJiYgdGhpcy5fdGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9jdXMgJiYgdGhpcy5fdGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIH0sIHRoaXMuZm9jdXNJZkRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3RpbWVvdXQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cbn0iXX0=