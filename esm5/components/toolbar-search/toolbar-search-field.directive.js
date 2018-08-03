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
var ToolbarSearchFieldDirective = /** @class */ (function () {
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
                },] }
    ];
    /** @nocollapse */
    ToolbarSearchFieldDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgModel, decorators: [{ type: Optional }] }
    ]; };
    ToolbarSearchFieldDirective.propDecorators = {
        cancel: [{ type: Output }],
        submit: [{ type: Output }],
        keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return ToolbarSearchFieldDirective;
}());
export { ToolbarSearchFieldDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdG9vbGJhci1zZWFyY2gvdG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLHFCQUFNLElBQUksR0FBRztJQUNULEtBQUssRUFBRSxFQUFFO0lBQ1QsTUFBTSxFQUFFLEVBQUU7Q0FDYixDQUFDOztJQXNCRSxxQ0FDWSxhQUNZLFFBQWlCO1FBRDdCLGdCQUFXLEdBQVgsV0FBVztRQUNDLGFBQVEsR0FBUixRQUFRLENBQVM7c0JBaEJoQyxJQUFJLFlBQVksRUFBUTtzQkFHeEIsSUFBSSxZQUFZLEVBQVU7S0FhVztJQVg5QyxzQkFBSSw2Q0FBSTs7OztRQUFSOztZQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDOUI7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQy9DOzs7T0FBQTs7OztJQU1ELDJDQUFLOzs7SUFBTDtRQUFBLGlCQUlDO1FBSEcsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDMUMsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCwwQ0FBSTs7O0lBQUo7UUFBQSxpQkFJQztRQUhHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsMkNBQUs7OztJQUFMOztRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDN0M7S0FDSjs7Ozs7SUFHRCxvREFBYzs7OztJQURkLFVBQ2UsS0FBb0I7UUFEbkMsaUJBVUM7UUFSRyxVQUFVLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdEI7U0FDSixDQUFDLENBQUM7S0FDTjs7Z0JBdkRKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2lCQUNyQzs7OztnQkFWbUIsVUFBVTtnQkFDckIsT0FBTyx1QkE2QlAsUUFBUTs7O3lCQWpCWixNQUFNO3lCQUdOLE1BQU07aUNBcUNOLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3NDQXJEdkM7O1NBV2EsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgT3B0aW9uYWwsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdNb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuY29uc3QgS0VZUyA9IHtcbiAgICBFTlRFUjogMTMsXG4gICAgRVNDQVBFOiAyN1xufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUb29sYmFyU2VhcmNoRmllbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBUb29sYmFyU2VhcmNoRmllbGREaXJlY3RpdmUge1xuXG4gICAgQE91dHB1dCgpXG4gICAgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICAvLyBVc2UgbmdNb2RlbCBpZiBzcGVjaWZpZWQgb24gdGhlIGhvc3Q7IG90aGVyd2lzZSByZWFkIHRoZSBET01cbiAgICAgICAgaWYgKHRoaXMuX25nTW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZ01vZGVsLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfbmdNb2RlbDogTmdNb2RlbCkgeyB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmx1cigpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgLy8gVXNlIG5nTW9kZWwgaWYgc3BlY2lmaWVkIG9uIHRoZSBob3N0OyBvdGhlcndpc2UgdXNlIHRoZSBET01cbiAgICAgICAgaWYgKHRoaXMuX25nTW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX25nTW9kZWwucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAga2V5ZG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS0VZUy5FTlRFUikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy50ZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS0VZUy5FU0NBUEUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsLmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19