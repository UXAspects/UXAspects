/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Optional, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
const /** @type {?} */ KEYS = {
    ENTER: 13,
    ESCAPE: 27
};
export class ToolbarSearchFieldDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _ngModel
     */
    constructor(_elementRef, _ngModel) {
        this._elementRef = _elementRef;
        this._ngModel = _ngModel;
        this.cancel = new EventEmitter();
        this.submit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get text() {
        // Use ngModel if specified on the host; otherwise read the DOM
        if (this._ngModel) {
            return this._ngModel.value;
        }
        return this._elementRef.nativeElement.value;
    }
    /**
     * @return {?}
     */
    focus() {
        setTimeout(() => {
            this._elementRef.nativeElement.focus();
        });
    }
    /**
     * @return {?}
     */
    blur() {
        setTimeout(() => {
            this._elementRef.nativeElement.blur();
        });
    }
    /**
     * @return {?}
     */
    clear() {
        // Use ngModel if specified on the host; otherwise use the DOM
        if (this._ngModel) {
            this._ngModel.reset();
        }
        else {
            this._elementRef.nativeElement.value = '';
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydownHandler(event) {
        setTimeout(() => {
            if (event.keyCode === KEYS.ENTER) {
                this.submit.emit(this.text);
            }
            else if (event.keyCode === KEYS.ESCAPE) {
                this._elementRef.nativeElement.blur();
                this.cancel.emit();
            }
        });
    }
}
ToolbarSearchFieldDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxToolbarSearchField]'
            },] },
];
/** @nocollapse */
ToolbarSearchFieldDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgModel, decorators: [{ type: Optional },] },
];
ToolbarSearchFieldDirective.propDecorators = {
    "cancel": [{ type: Output },],
    "submit": [{ type: Output },],
    "keydownHandler": [{ type: HostListener, args: ['keydown', ['$event'],] },],
};
function ToolbarSearchFieldDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ToolbarSearchFieldDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ToolbarSearchFieldDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ToolbarSearchFieldDirective.propDecorators;
    /** @type {?} */
    ToolbarSearchFieldDirective.prototype.cancel;
    /** @type {?} */
    ToolbarSearchFieldDirective.prototype.submit;
    /** @type {?} */
    ToolbarSearchFieldDirective.prototype._elementRef;
    /** @type {?} */
    ToolbarSearchFieldDirective.prototype._ngModel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdG9vbGJhci1zZWFyY2gvdG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLHVCQUFNLElBQUksR0FBRztJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsTUFBTSxFQUFFLEVBQUU7Q0FDYixDQUFDO0FBS0YsTUFBTTs7Ozs7SUFpQkYsWUFDWSxhQUNZO1FBRFosZ0JBQVcsR0FBWCxXQUFXO1FBQ0MsYUFBUSxHQUFSLFFBQVE7c0JBaEJ2QixJQUFJLFlBQVksRUFBUTtzQkFHeEIsSUFBSSxZQUFZLEVBQVU7S0FhVzs7OztJQVg5QyxJQUFJLElBQUk7O1FBRUosRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQzlCO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztLQUMvQzs7OztJQU1ELEtBQUs7UUFDRCxVQUFVLENBQUM7WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMxQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELElBQUk7UUFDQSxVQUFVLENBQUM7WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QyxDQUFDLENBQUM7S0FDTjs7OztJQUVELEtBQUs7O1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUM3QztLQUNKOzs7OztJQUdELGNBQWMsQ0FBQyxLQUFvQjtRQUMvQixVQUFVLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdEI7U0FDSixDQUFDLENBQUM7Ozs7WUF0RFYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7YUFDckM7Ozs7WUFWbUIsVUFBVTtZQUNyQixPQUFPLHVCQTZCUCxRQUFROzs7dUJBakJaLE1BQU07dUJBR04sTUFBTTsrQkFxQ04sWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIE9wdGlvbmFsLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nTW9kZWwgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmNvbnN0IEtFWVMgPSB7XG4gICAgRU5URVI6IDEzLFxuICAgIEVTQ0FQRTogMjdcbn07XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VG9vbGJhclNlYXJjaEZpZWxkXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlYXJjaEZpZWxkRGlyZWN0aXZlIHtcblxuICAgIEBPdXRwdXQoKVxuICAgIGNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgZ2V0IHRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgLy8gVXNlIG5nTW9kZWwgaWYgc3BlY2lmaWVkIG9uIHRoZSBob3N0OyBvdGhlcndpc2UgcmVhZCB0aGUgRE9NXG4gICAgICAgIGlmICh0aGlzLl9uZ01vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmdNb2RlbC52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX25nTW9kZWw6IE5nTW9kZWwpIHsgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJsdXIoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIC8vIFVzZSBuZ01vZGVsIGlmIHNwZWNpZmllZCBvbiB0aGUgaG9zdDsgb3RoZXJ3aXNlIHVzZSB0aGUgRE9NXG4gICAgICAgIGlmICh0aGlzLl9uZ01vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9uZ01vZGVsLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIGtleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtFWVMuRU5URVIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMudGV4dCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtFWVMuRVNDQVBFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbC5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==