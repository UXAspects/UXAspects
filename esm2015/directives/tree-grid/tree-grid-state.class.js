/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class TreeGridState {
    /**
     * @param {?} level
     * @param {?} setSize
     * @param {?} positionInSet
     */
    constructor(level, setSize, positionInSet) {
        this.level = level;
        this.setSize = setSize;
        this.positionInSet = positionInSet;
        this.loading$ = new BehaviorSubject(false);
    }
}
function TreeGridState_tsickle_Closure_declarations() {
    /** @type {?} */
    TreeGridState.prototype.loading$;
    /** @type {?} */
    TreeGridState.prototype.level;
    /** @type {?} */
    TreeGridState.prototype.setSize;
    /** @type {?} */
    TreeGridState.prototype.positionInSet;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLXN0YXRlLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdHJlZS1ncmlkL3RyZWUtZ3JpZC1zdGF0ZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE1BQU07Ozs7OztJQUdGLFlBQ29CLE9BQ0EsU0FDQTtRQUZBLFVBQUssR0FBTCxLQUFLO1FBQ0wsWUFBTyxHQUFQLE9BQU87UUFDUCxrQkFBYSxHQUFiLGFBQWE7d0JBTGIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDO0tBS1Y7Q0FDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlR3JpZFN0YXRlIHtcbiAgICByZWFkb25seSBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsZXZlbDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc2V0U2l6ZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcG9zaXRpb25JblNldDogbnVtYmVyKSB7fVxufVxuIl19