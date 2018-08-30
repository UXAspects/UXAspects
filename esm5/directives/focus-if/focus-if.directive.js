/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
var FocusIfDirective = /** @class */ (function () {
    function FocusIfDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.focusIfDelay = 0;
        this.focusIfScroll = true;
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
                    _this._elementRef.nativeElement.focus({ preventScroll: !_this.focusIfScroll });
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
                },] }
    ];
    /** @nocollapse */
    FocusIfDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FocusIfDirective.propDecorators = {
        focusIfDelay: [{ type: Input }],
        focusIfScroll: [{ type: Input }],
        focusIf: [{ type: Input }]
    };
    return FocusIfDirective;
}());
export { FocusIfDirective };
function FocusIfDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusIfDirective.prototype.focusIfDelay;
    /** @type {?} */
    FocusIfDirective.prototype.focusIfScroll;
    /** @type {?} */
    FocusIfDirective.prototype._timeout;
    /** @type {?} */
    FocusIfDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtaWYuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZm9jdXMtaWYvZm9jdXMtaWYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBNkJ6RCwwQkFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7NEJBdEJYLENBQUM7NkJBQ0MsSUFBSTt3QkFtQlgsSUFBSTtLQUVpQjtJQW5CaEQsc0JBQ0kscUNBQU87Ozs7O1FBRFgsVUFDWSxLQUFjO1lBRDFCLGlCQWVDOztZQVhHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDeEI7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO29CQUM3RSxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDeEIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekI7U0FDSjs7O09BQUE7O2dCQXZCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7aUJBQ3hCOzs7O2dCQUptQixVQUFVOzs7K0JBT3pCLEtBQUs7Z0NBQ0wsS0FBSzswQkFFTCxLQUFLOzsyQkFWVjs7U0FLYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZvY3VzSWZdJ1xufSlcbmV4cG9ydCBjbGFzcyBGb2N1c0lmRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgpIGZvY3VzSWZEZWxheTogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBmb2N1c0lmU2Nyb2xsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZvY3VzSWYoZm9jdXM6IGJvb2xlYW4pIHtcblxuICAgICAgICAvLyBpZiBhIHRpbWVvdXQgaXMgcGVuZGluZyB0aGVuIGNhbmNlbCBpdFxuICAgICAgICBpZiAoIWZvY3VzICYmIHRoaXMuX3RpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvY3VzICYmIHRoaXMuX3RpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogIXRoaXMuZm9jdXNJZlNjcm9sbCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIH0sIHRoaXMuZm9jdXNJZkRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3RpbWVvdXQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cbn0iXX0=