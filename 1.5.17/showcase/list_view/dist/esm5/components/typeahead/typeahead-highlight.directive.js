/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
var TypeaheadHighlightDirective = (function () {
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
                },] },
    ];
    /** @nocollapse */
    TypeaheadHighlightDirective.ctorParameters = function () { return [
        { type: TypeaheadService, },
        { type: ElementRef, },
    ]; };
    TypeaheadHighlightDirective.propDecorators = {
        "highlight": [{ type: Input, args: ['uxTypeaheadHighlight',] },],
    };
    return TypeaheadHighlightDirective;
}());
export { TypeaheadHighlightDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWhpZ2hsaWdodC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90eXBlYWhlYWQvdHlwZWFoZWFkLWhpZ2hsaWdodC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFjbkQscUNBQW9CLFFBQTBCLEVBQVUsV0FBdUI7UUFBM0QsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtLQUFJOzBCQU4vRSxrREFBUzs7Ozs7a0JBQUMsS0FBYztZQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDMUU7Ozs7OztnQkFUUixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtpQkFDckM7Ozs7Z0JBSlEsZ0JBQWdCO2dCQURMLFVBQVU7Ozs4QkFRekIsS0FBSyxTQUFDLHNCQUFzQjs7c0NBUmpDOztTQU1hLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHlwZWFoZWFkU2VydmljZSB9IGZyb20gJy4vdHlwZWFoZWFkLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t1eFR5cGVhaGVhZEhpZ2hsaWdodF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRIaWdobGlnaHREaXJlY3RpdmUge1xyXG5cclxuICAgIEBJbnB1dCgndXhUeXBlYWhlYWRIaWdobGlnaHQnKVxyXG4gICAgc2V0IGhpZ2hsaWdodCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmhpZ2hsaWdodGVkRWxlbWVudCQubmV4dCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBUeXBlYWhlYWRTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxyXG59XHJcbiJdfQ==