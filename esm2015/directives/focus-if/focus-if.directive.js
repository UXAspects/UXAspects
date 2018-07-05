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
                this._elementRef.nativeElement.focus();
                this._timeout = null;
            }, this.focusIfDelay);
        }
    }
}
FocusIfDirective.decorators = [
    { type: Directive, args: [{
                selector: '[focusIf]'
            },] },
];
/** @nocollapse */
FocusIfDirective.ctorParameters = () => [
    { type: ElementRef, },
];
FocusIfDirective.propDecorators = {
    "focusIfDelay": [{ type: Input },],
    "focusIf": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtaWYuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZm9jdXMtaWYvZm9jdXMtaWYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLN0QsTUFBTTs7OztJQXVCRixZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs0QkFyQlgsQ0FBQzt3QkFtQk4sSUFBSTtLQUVpQjs7Ozs7UUFsQjVDLE9BQU8sQ0FBQyxLQUFjOztRQUd0QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDeEIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDekI7Ozs7WUFyQlIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2FBQ3hCOzs7O1lBSm1CLFVBQVU7Ozs2QkFPekIsS0FBSzt3QkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tmb2N1c0lmXSdcbn0pXG5leHBvcnQgY2xhc3MgRm9jdXNJZkRpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoKSBmb2N1c0lmRGVsYXk6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBmb2N1c0lmKGZvY3VzOiBib29sZWFuKSB7XG5cbiAgICAgICAgLy8gaWYgYSB0aW1lb3V0IGlzIHBlbmRpbmcgdGhlbiBjYW5jZWwgaXRcbiAgICAgICAgaWYgKCFmb2N1cyAmJiB0aGlzLl90aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2N1cyAmJiB0aGlzLl90aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgfSwgdGhpcy5mb2N1c0lmRGVsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGltZW91dDogbnVtYmVyID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxufSJdfQ==