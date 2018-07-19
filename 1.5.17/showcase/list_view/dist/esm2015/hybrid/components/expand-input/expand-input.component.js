/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class ExpandInputNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('expandInput', elementRef, injector);
        this.focus = new EventEmitter();
    }
}
ExpandInputNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'expand-input'
            },] },
];
/** @nocollapse */
ExpandInputNg1Component.ctorParameters = () => [
    { type: ElementRef, },
    { type: Injector, },
];
ExpandInputNg1Component.propDecorators = {
    "elname": [{ type: Input },],
    "placeHolder": [{ type: Input },],
    "className": [{ type: Input },],
    "clearTextIcon": [{ type: Input },],
    "closeSearch": [{ type: Input },],
    "expandAlways": [{ type: Input },],
    "onEnter": [{ type: Input },],
    "focus": [{ type: Output },],
};
function ExpandInputNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ExpandInputNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ExpandInputNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ExpandInputNg1Component.propDecorators;
    /** @type {?} */
    ExpandInputNg1Component.prototype.elname;
    /** @type {?} */
    ExpandInputNg1Component.prototype.placeHolder;
    /** @type {?} */
    ExpandInputNg1Component.prototype.className;
    /** @type {?} */
    ExpandInputNg1Component.prototype.clearTextIcon;
    /** @type {?} */
    ExpandInputNg1Component.prototype.closeSearch;
    /** @type {?} */
    ExpandInputNg1Component.prototype.expandAlways;
    /** @type {?} */
    ExpandInputNg1Component.prototype.onEnter;
    /** @type {?} */
    ExpandInputNg1Component.prototype.focus;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9leHBhbmQtaW5wdXQvZXhwYW5kLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSzNELE1BQU0sOEJBQStCLFNBQVEsZ0JBQWdCOzs7OztJQVl6RCxZQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFDbEQsS0FBSyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBSFAsSUFBSSxZQUFZLEVBQVU7S0FJakU7OztZQWpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7YUFDM0I7Ozs7WUFMbUIsVUFBVTtZQUFFLFFBQVE7Ozt1QkFRbkMsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzZCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGdyYWRlQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2V4cGFuZC1pbnB1dCdcbn0pXG5leHBvcnQgY2xhc3MgRXhwYW5kSW5wdXROZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGVsbmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHBsYWNlSG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2xlYXJUZXh0SWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsb3NlU2VhcmNoOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZXhwYW5kQWx3YXlzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIG9uRW50ZXI6IEZ1bmN0aW9uO1xuXG4gICAgQE91dHB1dCgpIGZvY3VzOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCdleHBhbmRJbnB1dCcsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG59Il19