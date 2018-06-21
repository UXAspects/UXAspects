/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
export class TypeaheadHighlightDirective {
    /**
     * @param {?} _service
     * @param {?} _elementRef
     */
    constructor(_service, _elementRef) {
        this._service = _service;
        this._elementRef = _elementRef;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set highlight(value) {
        if (value) {
            this._service.highlightedElement$.next(this._elementRef.nativeElement);
        }
    }
}
TypeaheadHighlightDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTypeaheadHighlight]'
            },] },
];
/** @nocollapse */
TypeaheadHighlightDirective.ctorParameters = () => [
    { type: TypeaheadService, },
    { type: ElementRef, },
];
TypeaheadHighlightDirective.propDecorators = {
    "highlight": [{ type: Input, args: ['uxTypeaheadHighlight',] },],
};
function TypeaheadHighlightDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TypeaheadHighlightDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TypeaheadHighlightDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TypeaheadHighlightDirective.propDecorators;
    /** @type {?} */
    TypeaheadHighlightDirective.prototype._service;
    /** @type {?} */
    TypeaheadHighlightDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWhpZ2hsaWdodC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90eXBlYWhlYWQvdHlwZWFoZWFkLWhpZ2hsaWdodC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUt2RCxNQUFNOzs7OztJQVNGLFlBQW9CLFFBQTBCLEVBQVUsV0FBdUI7UUFBM0QsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtLQUFJOzs7OztRQU4vRSxTQUFTLENBQUMsS0FBYztRQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMxRTs7OztZQVRSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2FBQ3JDOzs7O1lBSlEsZ0JBQWdCO1lBREwsVUFBVTs7OzBCQVF6QixLQUFLLFNBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRTZXJ2aWNlIH0gZnJvbSAnLi90eXBlYWhlYWQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3V4VHlwZWFoZWFkSGlnaGxpZ2h0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZEhpZ2hsaWdodERpcmVjdGl2ZSB7XHJcblxyXG4gICAgQElucHV0KCd1eFR5cGVhaGVhZEhpZ2hsaWdodCcpXHJcbiAgICBzZXQgaGlnaGxpZ2h0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuaGlnaGxpZ2h0ZWRFbGVtZW50JC5uZXh0KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IFR5cGVhaGVhZFNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XHJcbn1cclxuIl19