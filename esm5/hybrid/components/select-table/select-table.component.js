/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var SelectTableNg1Component = /** @class */ (function (_super) {
    tslib_1.__extends(SelectTableNg1Component, _super);
    function SelectTableNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'selectTable', elementRef, injector) || this;
        _this.selectedChange = new EventEmitter();
        return _this;
    }
    SelectTableNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'select-table'
                },] }
    ];
    /** @nocollapse */
    SelectTableNg1Component.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector }
    ]; };
    SelectTableNg1Component.propDecorators = {
        values: [{ type: Input }],
        multipleSelect: [{ type: Input }],
        selectKey: [{ type: Input }],
        selected: [{ type: Input }],
        searchText: [{ type: Input }],
        tableHeight: [{ type: Input }],
        template: [{ type: Input }],
        templateUrl: [{ type: Input }],
        selectHiddenItems: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return SelectTableNg1Component;
}(UpgradeComponent));
export { SelectTableNg1Component };
function SelectTableNg1Component_tsickle_Closure_declarations() {
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
    SelectTableNg1Component.prototype.template;
    /** @type {?} */
    SelectTableNg1Component.prototype.templateUrl;
    /** @type {?} */
    SelectTableNg1Component.prototype.selectHiddenItems;
    /** @type {?} */
    SelectTableNg1Component.prototype.selectedChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9zZWxlY3QtdGFibGUvc2VsZWN0LXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLZCxtREFBZ0I7SUFjekQsaUNBQVksVUFBc0IsRUFBRSxRQUFrQjtRQUF0RCxZQUNJLGtCQUFNLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQzdDOytCQUpnRCxJQUFJLFlBQVksRUFBVTs7S0FJMUU7O2dCQW5CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7aUJBQzNCOzs7O2dCQUxtQixVQUFVO2dCQUFnQixRQUFROzs7eUJBUWpELEtBQUs7aUNBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSztvQ0FDTCxLQUFLO2lDQUVMLE1BQU07O2tDQWxCWDtFQU02QyxnQkFBZ0I7U0FBaEQsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGdyYWRlQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3NlbGVjdC10YWJsZSdcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0VGFibGVOZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIHZhbHVlczogYW55W107XG4gICAgQElucHV0KCkgbXVsdGlwbGVTZWxlY3Q6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2VsZWN0S2V5OiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2VsZWN0ZWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBzZWFyY2hUZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgdGFibGVIZWlnaHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRlbXBsYXRlVXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2VsZWN0SGlkZGVuSXRlbXM6ICdjbGVhcicgfCAncmVzZWxlY3QnO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCdzZWxlY3RUYWJsZScsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG59Il19