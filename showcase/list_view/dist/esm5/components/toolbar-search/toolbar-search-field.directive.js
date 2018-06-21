/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Optional, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
var /** @type {?} */ KEYS = {
    ENTER: 13,
    ESCAPE: 27
};
var ToolbarSearchFieldDirective = (function () {
    function ToolbarSearchFieldDirective(_elementRef, _ngModel) {
        this._elementRef = _elementRef;
        this._ngModel = _ngModel;
        this.cancel = new EventEmitter();
        this.submit = new EventEmitter();
    }
    Object.defineProperty(ToolbarSearchFieldDirective.prototype, "text", {
        get: /**
         * @return {?}
         */
        function () {
            // Use ngModel if specified on the host; otherwise read the DOM
            if (this._ngModel) {
                return this._ngModel.value;
            }
            return this._elementRef.nativeElement.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToolbarSearchFieldDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this._elementRef.nativeElement.focus();
        });
    };
    /**
     * @return {?}
     */
    ToolbarSearchFieldDirective.prototype.blur = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this._elementRef.nativeElement.blur();
        });
    };
    /**
     * @return {?}
     */
    ToolbarSearchFieldDirective.prototype.clear = /**
     * @return {?}
     */
    function () {
        // Use ngModel if specified on the host; otherwise use the DOM
        if (this._ngModel) {
            this._ngModel.reset();
        }
        else {
            this._elementRef.nativeElement.value = '';
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ToolbarSearchFieldDirective.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        setTimeout(function () {
            if (event.keyCode === KEYS.ENTER) {
                _this.submit.emit(_this.text);
            }
            else if (event.keyCode === KEYS.ESCAPE) {
                _this._elementRef.nativeElement.blur();
                _this.cancel.emit();
            }
        });
    };
    ToolbarSearchFieldDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxToolbarSearchField]'
                },] },
    ];
    /** @nocollapse */
    ToolbarSearchFieldDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NgModel, decorators: [{ type: Optional },] },
    ]; };
    ToolbarSearchFieldDirective.propDecorators = {
        "cancel": [{ type: Output },],
        "submit": [{ type: Output },],
        "keydownHandler": [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return ToolbarSearchFieldDirective;
}());
export { ToolbarSearchFieldDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdG9vbGJhci1zZWFyY2gvdG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLHFCQUFNLElBQUksR0FBRztJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsTUFBTSxFQUFFLEVBQUU7Q0FDYixDQUFDOztJQXNCRSxxQ0FDWSxhQUNZO1FBRFosZ0JBQVcsR0FBWCxXQUFXO1FBQ0MsYUFBUSxHQUFSLFFBQVE7c0JBaEJ2QixJQUFJLFlBQVksRUFBUTtzQkFHeEIsSUFBSSxZQUFZLEVBQVU7S0FhVztJQVg5QyxzQkFBSSw2Q0FBSTs7OztRQUFSOztZQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDOUI7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQy9DOzs7T0FBQTs7OztJQU1ELDJDQUFLOzs7SUFBTDtRQUFBLGlCQUlDO1FBSEcsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDMUMsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCwwQ0FBSTs7O0lBQUo7UUFBQSxpQkFJQztRQUhHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsMkNBQUs7OztJQUFMOztRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDN0M7S0FDSjs7Ozs7SUFHRCxvREFBYzs7OztjQUFDLEtBQW9COztRQUMvQixVQUFVLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdEI7U0FDSixDQUFDLENBQUM7OztnQkF0RFYsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ3JDOzs7O2dCQVZtQixVQUFVO2dCQUNyQixPQUFPLHVCQTZCUCxRQUFROzs7MkJBakJaLE1BQU07MkJBR04sTUFBTTttQ0FxQ04sWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7c0NBckR2Qzs7U0FXYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBPcHRpb25hbCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ01vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5jb25zdCBLRVlTID0ge1xuICAgIEVOVEVSOiAxMyxcbiAgICBFU0NBUEU6IDI3XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRvb2xiYXJTZWFyY2hGaWVsZF0nXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJTZWFyY2hGaWVsZERpcmVjdGl2ZSB7XG5cbiAgICBAT3V0cHV0KClcbiAgICBjYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBzdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIGdldCB0ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIC8vIFVzZSBuZ01vZGVsIGlmIHNwZWNpZmllZCBvbiB0aGUgaG9zdDsgb3RoZXJ3aXNlIHJlYWQgdGhlIERPTVxuICAgICAgICBpZiAodGhpcy5fbmdNb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25nTW9kZWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9uZ01vZGVsOiBOZ01vZGVsKSB7IH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBibHVyKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICAvLyBVc2UgbmdNb2RlbCBpZiBzcGVjaWZpZWQgb24gdGhlIGhvc3Q7IG90aGVyd2lzZSB1c2UgdGhlIERPTVxuICAgICAgICBpZiAodGhpcy5fbmdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5fbmdNb2RlbC5yZXNldCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBrZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLRVlTLkVOVEVSKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXQuZW1pdCh0aGlzLnRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSBLRVlTLkVTQ0FQRSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=