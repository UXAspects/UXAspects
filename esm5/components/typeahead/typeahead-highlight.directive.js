/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
var TypeaheadHighlightDirective = /** @class */ (function () {
    function TypeaheadHighlightDirective(_service, _elementRef) {
        this._service = _service;
        this._elementRef = _elementRef;
    }
    Object.defineProperty(TypeaheadHighlightDirective.prototype, "highlight", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._service.highlightedElement$.next(this._elementRef.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadHighlightDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTypeaheadHighlight]'
                },] }
    ];
    /** @nocollapse */
    TypeaheadHighlightDirective.ctorParameters = function () { return [
        { type: TypeaheadService },
        { type: ElementRef }
    ]; };
    TypeaheadHighlightDirective.propDecorators = {
        highlight: [{ type: Input, args: ['uxTypeaheadHighlight',] }]
    };
    return TypeaheadHighlightDirective;
}());
export { TypeaheadHighlightDirective };
function TypeaheadHighlightDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TypeaheadHighlightDirective.prototype._service;
    /** @type {?} */
    TypeaheadHighlightDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWhpZ2hsaWdodC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90eXBlYWhlYWQvdHlwZWFoZWFkLWhpZ2hsaWdodC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFjbkQscUNBQW9CLFFBQTBCLEVBQVUsV0FBdUI7UUFBM0QsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtLQUFJO0lBUG5GLHNCQUNJLGtEQUFTOzs7OztRQURiLFVBQ2MsS0FBYztZQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDMUU7U0FDSjs7O09BQUE7O2dCQVZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2lCQUNyQzs7OztnQkFKUSxnQkFBZ0I7Z0JBREwsVUFBVTs7OzRCQVF6QixLQUFLLFNBQUMsc0JBQXNCOztzQ0FSakM7O1NBTWEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRTZXJ2aWNlIH0gZnJvbSAnLi90eXBlYWhlYWQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3V4VHlwZWFoZWFkSGlnaGxpZ2h0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZEhpZ2hsaWdodERpcmVjdGl2ZSB7XHJcblxyXG4gICAgQElucHV0KCd1eFR5cGVhaGVhZEhpZ2hsaWdodCcpXHJcbiAgICBzZXQgaGlnaGxpZ2h0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuaGlnaGxpZ2h0ZWRFbGVtZW50JC5uZXh0KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IFR5cGVhaGVhZFNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XHJcbn1cclxuIl19