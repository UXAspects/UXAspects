/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var TreeGridNg1Component = (function (_super) {
    tslib_1.__extends(TreeGridNg1Component, _super);
    function TreeGridNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'treegrid', elementRef, injector) || this;
        _this.optionsChange = new EventEmitter();
        _this.selectedChange = new EventEmitter();
        _this.currentRowChange = new EventEmitter();
        _this.treeDataChange = new EventEmitter();
        return _this;
    }
    TreeGridNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'treegrid'
                },] },
    ];
    /** @nocollapse */
    TreeGridNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    TreeGridNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "columns": [{ type: Input },],
        "treeData": [{ type: Input },],
        "selected": [{ type: Input },],
        "currentRow": [{ type: Input },],
        "options": [{ type: Input },],
        "optionsChange": [{ type: Output },],
        "selectedChange": [{ type: Output },],
        "currentRowChange": [{ type: Output },],
        "treeDataChange": [{ type: Output },],
    };
    return TreeGridNg1Component;
}(UpgradeComponent));
export { TreeGridNg1Component };
function TreeGridNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TreeGridNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TreeGridNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TreeGridNg1Component.propDecorators;
    /** @type {?} */
    TreeGridNg1Component.prototype.data;
    /** @type {?} */
    TreeGridNg1Component.prototype.columns;
    /** @type {?} */
    TreeGridNg1Component.prototype.treeData;
    /** @type {?} */
    TreeGridNg1Component.prototype.selected;
    /** @type {?} */
    TreeGridNg1Component.prototype.currentRow;
    /** @type {?} */
    TreeGridNg1Component.prototype.options;
    /** @type {?} */
    TreeGridNg1Component.prototype.optionsChange;
    /** @type {?} */
    TreeGridNg1Component.prototype.selectedChange;
    /** @type {?} */
    TreeGridNg1Component.prototype.currentRowChange;
    /** @type {?} */
    TreeGridNg1Component.prototype.treeDataChange;
}
/**
 * @record
 */
export function TreeGridColumn() { }
function TreeGridColumn_tsickle_Closure_declarations() {
    /** @type {?} */
    TreeGridColumn.prototype.name;
    /** @type {?|undefined} */
    TreeGridColumn.prototype.value;
    /** @type {?|undefined} */
    TreeGridColumn.prototype.template;
    /** @type {?|undefined} */
    TreeGridColumn.prototype.headerClass;
    /** @type {?|undefined} */
    TreeGridColumn.prototype.cellClass;
    /** @type {?|undefined} */
    TreeGridColumn.prototype.width;
    /** @type {?|undefined} */
    TreeGridColumn.prototype.tooltip;
    /** @type {?|undefined} */
    TreeGridColumn.prototype.tooltipPlacement;
}
/**
 * @record
 */
export function TreeGridData() { }
function TreeGridData_tsickle_Closure_declarations() {
    /** @type {?} */
    TreeGridData.prototype.dataItem;
    /** @type {?} */
    TreeGridData.prototype.children;
    /** @type {?} */
    TreeGridData.prototype.expanded;
    /** @type {?} */
    TreeGridData.prototype.expanding;
    /** @type {?} */
    TreeGridData.prototype.level;
    /** @type {?} */
    TreeGridData.prototype.api;
}
/**
 * @record
 */
export function TreeGridOptions() { }
function TreeGridOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    TreeGridOptions.prototype.childrenProperty;
    /** @type {?|undefined} */
    TreeGridOptions.prototype.hasChildren;
    /** @type {?|undefined} */
    TreeGridOptions.prototype.maxDepth;
    /** @type {?|undefined} */
    TreeGridOptions.prototype.expandTopLevel;
    /** @type {?|undefined} */
    TreeGridOptions.prototype.select;
    /** @type {?|undefined} */
    TreeGridOptions.prototype.expander;
    /** @type {?|undefined} */
    TreeGridOptions.prototype.icons;
    /** @type {?|undefined} */
    TreeGridOptions.prototype.rowClass;
    /** @type {?|undefined} */
    TreeGridOptions.prototype.sort;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy90cmVlLWdyaWQvdHJlZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLakIsZ0RBQWdCO0lBY3RELDhCQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFBdEQsWUFDSSxrQkFBTSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUMxQzs4QkFQd0QsSUFBSSxZQUFZLEVBQW1COytCQUM1QyxJQUFJLFlBQVksRUFBUztpQ0FDekIsSUFBSSxZQUFZLEVBQU87K0JBQ2QsSUFBSSxZQUFZLEVBQWtCOztLQUkxRjs7Z0JBbkJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtpQkFDdkI7Ozs7Z0JBTG1CLFVBQVU7Z0JBQWdCLFFBQVE7Ozt5QkFRakQsS0FBSzs0QkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzRCQUNMLEtBQUs7a0NBRUwsTUFBTTttQ0FDTixNQUFNO3FDQUNOLE1BQU07bUNBQ04sTUFBTTs7K0JBbEJYO0VBTTBDLGdCQUFnQjtTQUE3QyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0b3IsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndHJlZWdyaWQnXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVHcmlkTmcxQ29tcG9uZW50IGV4dGVuZHMgVXBncmFkZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBkYXRhOiBhbnlbXSB8IEZ1bmN0aW9uO1xuICAgIEBJbnB1dCgpIGNvbHVtbnM6IFRyZWVHcmlkQ29sdW1uW107XG4gICAgQElucHV0KCkgdHJlZURhdGE6IFRyZWVHcmlkRGF0YVtdO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBhbnlbXTtcbiAgICBASW5wdXQoKSBjdXJyZW50Um93OiBhbnk7XG4gICAgQElucHV0KCkgb3B0aW9uczogVHJlZUdyaWRPcHRpb25zO1xuXG4gICAgQE91dHB1dCgpIG9wdGlvbnNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmVlR3JpZE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlR3JpZE9wdGlvbnM+KCk7XG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcbiAgICBAT3V0cHV0KCkgY3VycmVudFJvd0NoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgdHJlZURhdGFDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUcmVlR3JpZERhdGFbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVHcmlkRGF0YVtdPigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCd0cmVlZ3JpZCcsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJlZUdyaWRDb2x1bW4ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZyB8IEZ1bmN0aW9uO1xuICAgIHRlbXBsYXRlPzogc3RyaW5nO1xuICAgIGhlYWRlckNsYXNzPzogc3RyaW5nO1xuICAgIGNlbGxDbGFzcz86IHN0cmluZztcbiAgICB3aWR0aD86IHN0cmluZztcbiAgICB0b29sdGlwPzogc3RyaW5nO1xuICAgIHRvb2x0aXBQbGFjZW1lbnQ/OiAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0Jztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmVlR3JpZERhdGEge1xuICAgIGRhdGFJdGVtOiBhbnk7XG4gICAgY2hpbGRyZW46IGFueVtdO1xuICAgIGV4cGFuZGVkOiBib29sZWFuO1xuICAgIGV4cGFuZGluZzogYm9vbGVhbjtcbiAgICBsZXZlbDogbnVtYmVyO1xuICAgIGFwaTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVHcmlkT3B0aW9ucyB7XG4gICAgY2hpbGRyZW5Qcm9wZXJ0eT86IHN0cmluZztcbiAgICBoYXNDaGlsZHJlbj86IEZ1bmN0aW9uO1xuICAgIG1heERlcHRoPzogbnVtYmVyO1xuICAgIGV4cGFuZFRvcExldmVsPzogYm9vbGVhbjtcbiAgICBzZWxlY3Q/OiBhbnk7XG4gICAgZXhwYW5kZXI/OiBhbnk7XG4gICAgaWNvbnM/OiBhbnk7XG4gICAgcm93Q2xhc3M/OiBzdHJpbmcgfCBGdW5jdGlvbjtcbiAgICBzb3J0PzogRnVuY3Rpb247XG59XG4iXX0=