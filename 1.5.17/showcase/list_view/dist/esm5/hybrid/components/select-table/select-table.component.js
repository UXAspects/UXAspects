/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var SelectTableNg1Component = (function (_super) {
    tslib_1.__extends(SelectTableNg1Component, _super);
    function SelectTableNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'selectTable', elementRef, injector) || this;
        _this.selectedChange = new EventEmitter();
        return _this;
    }
    SelectTableNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'select-table'
                },] },
    ];
    /** @nocollapse */
    SelectTableNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SelectTableNg1Component.propDecorators = {
        "values": [{ type: Input },],
        "multipleSelect": [{ type: Input },],
        "selectKey": [{ type: Input },],
        "selected": [{ type: Input },],
        "searchText": [{ type: Input },],
        "tableHeight": [{ type: Input },],
        "selectHiddenItems": [{ type: Input },],
        "selectedChange": [{ type: Output },],
    };
    return SelectTableNg1Component;
}(UpgradeComponent));
export { SelectTableNg1Component };
function SelectTableNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectTableNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectTableNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SelectTableNg1Component.propDecorators;
    /** @type {?} */
    SelectTableNg1Component.prototype.values;
    /** @type {?} */
    SelectTableNg1Component.prototype.multipleSelect;
    /** @type {?} */
    SelectTableNg1Component.prototype.selectKey;
    /** @type {?} */
    SelectTableNg1Component.prototype.selected;
    /** @type {?} */
    SelectTableNg1Component.prototype.searchText;
    /** @type {?} */
    SelectTableNg1Component.prototype.tableHeight;
    /** @type {?} */
    SelectTableNg1Component.prototype.selectHiddenItems;
    /** @type {?} */
    SelectTableNg1Component.prototype.selectedChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9zZWxlY3QtdGFibGUvc2VsZWN0LXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLZCxtREFBZ0I7SUFZekQsaUNBQVksVUFBc0IsRUFBRSxRQUFrQjtRQUF0RCxZQUNJLGtCQUFNLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQzdDOytCQUpnRCxJQUFJLFlBQVksRUFBVTs7S0FJMUU7O2dCQWpCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7aUJBQzNCOzs7O2dCQUxtQixVQUFVO2dCQUFFLFFBQVE7OzsyQkFRbkMsS0FBSzttQ0FDTCxLQUFLOzhCQUNMLEtBQUs7NkJBQ0wsS0FBSzsrQkFDTCxLQUFLO2dDQUNMLEtBQUs7c0NBQ0wsS0FBSzttQ0FFTCxNQUFNOztrQ0FoQlg7RUFNNkMsZ0JBQWdCO1NBQWhELHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBncmFkZUNvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL3VwZ3JhZGUvc3RhdGljJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdzZWxlY3QtdGFibGUnXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFRhYmxlTmcxQ29tcG9uZW50IGV4dGVuZHMgVXBncmFkZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZXM6IGFueVtdO1xuICAgIEBJbnB1dCgpIG11bHRpcGxlU2VsZWN0OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNlbGVjdEtleTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2VhcmNoVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRhYmxlSGVpZ2h0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2VsZWN0SGlkZGVuSXRlbXM6ICdjbGVhcicgfCAncmVzZWxlY3QnO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCdzZWxlY3RUYWJsZScsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG59Il19