/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var SortDirectionToggleNg1Component = /** @class */ (function (_super) {
    tslib_1.__extends(SortDirectionToggleNg1Component, _super);
    function SortDirectionToggleNg1Component(elementRef, injector) {
        return _super.call(this, 'sortDirectionToggle', elementRef, injector) || this;
    }
    SortDirectionToggleNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'sort-direction-toggle'
                },] }
    ];
    /** @nocollapse */
    SortDirectionToggleNg1Component.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector }
    ]; };
    SortDirectionToggleNg1Component.propDecorators = {
        label: [{ type: Input }],
        sorters: [{ type: Input }],
        descend: [{ type: Input }]
    };
    return SortDirectionToggleNg1Component;
}(UpgradeComponent));
export { SortDirectionToggleNg1Component };
function SortDirectionToggleNg1Component_tsickle_Closure_declarations() {
    /** @type {?} */
    SortDirectionToggleNg1Component.prototype.label;
    /** @type {?} */
    SortDirectionToggleNg1Component.prototype.sorters;
    /** @type {?} */
    SortDirectionToggleNg1Component.prototype.descend;
}
/**
 * @record
 */
export function SortDirectionToggleSorter() { }
function SortDirectionToggleSorter_tsickle_Closure_declarations() {
    /** @type {?} */
    SortDirectionToggleSorter.prototype.name;
    /** @type {?} */
    SortDirectionToggleSorter.prototype.sort;
    /** @type {?} */
    SortDirectionToggleSorter.prototype.defaultSorter;
    /** @type {?} */
    SortDirectionToggleSorter.prototype.select;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1kaXJlY3Rpb24tdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9zb3J0LWRpcmVjdGlvbi10b2dnbGUvc29ydC1kaXJlY3Rpb24tdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS04sMkRBQWdCO0lBTWpFLHlDQUFZLFVBQXNCLEVBQUUsUUFBa0I7ZUFDbEQsa0JBQU0scUJBQXFCLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQztLQUNyRDs7Z0JBWEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7aUJBQ3BDOzs7O2dCQUxtQixVQUFVO2dCQUFFLFFBQVE7Ozt3QkFRbkMsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7OzBDQVZWO0VBTXFELGdCQUFnQjtTQUF4RCwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBncmFkZUNvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL3VwZ3JhZGUvc3RhdGljJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdzb3J0LWRpcmVjdGlvbi10b2dnbGUnXG59KVxuZXhwb3J0IGNsYXNzIFNvcnREaXJlY3Rpb25Ub2dnbGVOZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc29ydGVyczogU29ydERpcmVjdGlvblRvZ2dsZVNvcnRlcltdO1xuICAgIEBJbnB1dCgpIGRlc2NlbmQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJ3NvcnREaXJlY3Rpb25Ub2dnbGUnLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnREaXJlY3Rpb25Ub2dnbGVTb3J0ZXIge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzb3J0OiBzdHJpbmc7XG4gICAgZGVmYXVsdFNvcnRlcjogYm9vbGVhbjtcbiAgICBzZWxlY3Q6IEZ1bmN0aW9uO1xufSJdfQ==