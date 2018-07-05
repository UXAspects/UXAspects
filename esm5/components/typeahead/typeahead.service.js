/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var TypeaheadService = (function () {
    function TypeaheadService() {
        this.open$ = new BehaviorSubject(false);
        this.highlightedElement$ = new BehaviorSubject(null);
    }
    TypeaheadService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TypeaheadService.ctorParameters = function () { return []; };
    return TypeaheadService;
}());
export { TypeaheadService };
function TypeaheadService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TypeaheadService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TypeaheadService.ctorParameters;
    /** @type {?} */
    TypeaheadService.prototype.open$;
    /** @type {?} */
    TypeaheadService.prototype.highlightedElement$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90eXBlYWhlYWQvdHlwZWFoZWFkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7cUJBSzNDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzttQ0FFckIsSUFBSSxlQUFlLENBQWMsSUFBSSxDQUFDOzs7Z0JBTC9ELFVBQVU7Ozs7MkJBSFg7O1NBSWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRTZXJ2aWNlIHtcclxuXHJcbiAgICBvcGVuJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIGhpZ2hsaWdodGVkRWxlbWVudCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxFbGVtZW50PihudWxsKTtcclxufSJdfQ==