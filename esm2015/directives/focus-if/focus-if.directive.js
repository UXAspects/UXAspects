/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
export class FocusIfDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.focusIfDelay = 0;
        this.focusIfScroll = true;
        this._timeout = null;
    }
    /**
     * @param {?} focus
     * @return {?}
     */
    set focusIf(focus) {
        // if a timeout is pending then cancel it
        if (!focus && this._timeout !== null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (focus && this._timeout === null) {
            this._timeout = window.setTimeout(() => {
                this._elementRef.nativeElement.focus({ preventScroll: !this.focusIfScroll });
                this._timeout = null;
            }, this.focusIfDelay);
        }
    }
}
FocusIfDirective.decorators = [
    { type: Directive, args: [{
                selector: '[focusIf]'
            },] }
];
/** @nocollapse */
FocusIfDirective.ctorParameters = () => [
    { type: ElementRef }
];
FocusIfDirective.propDecorators = {
    focusIfDelay: [{ type: Input }],
    focusIfScroll: [{ type: Input }],
    focusIf: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtaWYuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZm9jdXMtaWYvZm9jdXMtaWYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLN0QsTUFBTTs7OztJQXdCRixZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs0QkF0QlgsQ0FBQzs2QkFDQyxJQUFJO3dCQW1CWCxJQUFJO0tBRWlCOzs7OztJQW5CaEQsSUFDSSxPQUFPLENBQUMsS0FBYzs7UUFHdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUN4QixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN6QjtLQUNKOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2FBQ3hCOzs7O1lBSm1CLFVBQVU7OzsyQkFPekIsS0FBSzs0QkFDTCxLQUFLO3NCQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZvY3VzSWZdJ1xufSlcbmV4cG9ydCBjbGFzcyBGb2N1c0lmRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgpIGZvY3VzSWZEZWxheTogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBmb2N1c0lmU2Nyb2xsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZvY3VzSWYoZm9jdXM6IGJvb2xlYW4pIHtcblxuICAgICAgICAvLyBpZiBhIHRpbWVvdXQgaXMgcGVuZGluZyB0aGVuIGNhbmNlbCBpdFxuICAgICAgICBpZiAoIWZvY3VzICYmIHRoaXMuX3RpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvY3VzICYmIHRoaXMuX3RpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogIXRoaXMuZm9jdXNJZlNjcm9sbCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIH0sIHRoaXMuZm9jdXNJZkRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3RpbWVvdXQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cbn0iXX0=