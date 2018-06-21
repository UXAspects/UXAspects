/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class TypeaheadService {
    constructor() {
        this.open$ = new BehaviorSubject(false);
        this.highlightedElement$ = new BehaviorSubject(null);
    }
}
TypeaheadService.decorators = [
    { type: Injectable },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90eXBlYWhlYWQvdHlwZWFoZWFkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3ZELE1BQU07O3FCQUVNLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzttQ0FFckIsSUFBSSxlQUFlLENBQWMsSUFBSSxDQUFDOzs7O1lBTC9ELFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZFNlcnZpY2Uge1xyXG5cclxuICAgIG9wZW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTEVsZW1lbnQ+KG51bGwpO1xyXG59Il19