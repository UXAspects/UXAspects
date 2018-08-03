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
            },] }
];
/** @nocollapse */
ToolbarSearchFieldDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgModel, decorators: [{ type: Optional }] }
];
ToolbarSearchFieldDirective.propDecorators = {
    cancel: [{ type: Output }],
    submit: [{ type: Output }],
    keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
function ToolbarSearchFieldDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ToolbarSearchFieldDirective.prototype.cancel;
    /** @type {?} */
    ToolbarSearchFieldDirective.prototype.submit;
    /** @type {?} */
    ToolbarSearchFieldDirective.prototype._elementRef;
    /** @type {?} */
    ToolbarSearchFieldDirective.prototype._ngModel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdG9vbGJhci1zZWFyY2gvdG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLHVCQUFNLElBQUksR0FBRztJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsTUFBTSxFQUFFLEVBQUU7Q0FDYixDQUFDO0FBS0YsTUFBTTs7Ozs7SUFpQkYsWUFDWSxhQUNZLFFBQWlCO1FBRDdCLGdCQUFXLEdBQVgsV0FBVztRQUNDLGFBQVEsR0FBUixRQUFRLENBQVM7c0JBaEJoQyxJQUFJLFlBQVksRUFBUTtzQkFHeEIsSUFBSSxZQUFZLEVBQVU7S0FhVzs7OztJQVg5QyxJQUFJLElBQUk7O1FBRUosRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQzlCO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztLQUMvQzs7OztJQU1ELEtBQUs7UUFDRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDMUMsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCxJQUFJO1FBQ0EsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsS0FBSzs7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3pCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQzdDO0tBQ0o7Ozs7O0lBR0QsY0FBYyxDQUFDLEtBQW9CO1FBQy9CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdEI7U0FDSixDQUFDLENBQUM7S0FDTjs7O1lBdkRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2FBQ3JDOzs7O1lBVm1CLFVBQVU7WUFDckIsT0FBTyx1QkE2QlAsUUFBUTs7O3FCQWpCWixNQUFNO3FCQUdOLE1BQU07NkJBcUNOLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBPcHRpb25hbCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ01vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5jb25zdCBLRVlTID0ge1xuICAgIEVOVEVSOiAxMyxcbiAgICBFU0NBUEU6IDI3XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRvb2xiYXJTZWFyY2hGaWVsZF0nXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJTZWFyY2hGaWVsZERpcmVjdGl2ZSB7XG5cbiAgICBAT3V0cHV0KClcbiAgICBjYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBzdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIGdldCB0ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIC8vIFVzZSBuZ01vZGVsIGlmIHNwZWNpZmllZCBvbiB0aGUgaG9zdDsgb3RoZXJ3aXNlIHJlYWQgdGhlIERPTVxuICAgICAgICBpZiAodGhpcy5fbmdNb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25nTW9kZWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9uZ01vZGVsOiBOZ01vZGVsKSB7IH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBibHVyKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICAvLyBVc2UgbmdNb2RlbCBpZiBzcGVjaWZpZWQgb24gdGhlIGhvc3Q7IG90aGVyd2lzZSB1c2UgdGhlIERPTVxuICAgICAgICBpZiAodGhpcy5fbmdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5fbmdNb2RlbC5yZXNldCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBrZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLRVlTLkVOVEVSKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXQuZW1pdCh0aGlzLnRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSBLRVlTLkVTQ0FQRSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=