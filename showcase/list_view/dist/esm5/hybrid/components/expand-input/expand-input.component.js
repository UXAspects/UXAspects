/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var ExpandInputNg1Component = (function (_super) {
    tslib_1.__extends(ExpandInputNg1Component, _super);
    function ExpandInputNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'expandInput', elementRef, injector) || this;
        _this.focus = new EventEmitter();
        return _this;
    }
    ExpandInputNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'expand-input'
                },] },
    ];
    /** @nocollapse */
    ExpandInputNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
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
    return ExpandInputNg1Component;
}(UpgradeComponent));
export { ExpandInputNg1Component };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9leHBhbmQtaW5wdXQvZXhwYW5kLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLZCxtREFBZ0I7SUFZekQsaUNBQVksVUFBc0IsRUFBRSxRQUFrQjtRQUF0RCxZQUNJLGtCQUFNLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQzdDO3NCQUp1QyxJQUFJLFlBQVksRUFBVTs7S0FJakU7O2dCQWpCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7aUJBQzNCOzs7O2dCQUxtQixVQUFVO2dCQUFFLFFBQVE7OzsyQkFRbkMsS0FBSztnQ0FDTCxLQUFLOzhCQUNMLEtBQUs7a0NBQ0wsS0FBSztnQ0FDTCxLQUFLO2lDQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFFTCxNQUFNOztrQ0FoQlg7RUFNNkMsZ0JBQWdCO1NBQWhELHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBncmFkZUNvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL3VwZ3JhZGUvc3RhdGljJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdleHBhbmQtaW5wdXQnXG59KVxuZXhwb3J0IGNsYXNzIEV4cGFuZElucHV0TmcxQ29tcG9uZW50IGV4dGVuZHMgVXBncmFkZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBlbG5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBwbGFjZUhvbGRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsYXNzTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsZWFyVGV4dEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBjbG9zZVNlYXJjaDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGV4cGFuZEFsd2F5czogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBvbkVudGVyOiBGdW5jdGlvbjtcblxuICAgIEBPdXRwdXQoKSBmb2N1czogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcignZXhwYW5kSW5wdXQnLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufSJdfQ==