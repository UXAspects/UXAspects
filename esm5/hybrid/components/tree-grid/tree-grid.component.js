/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var TreeGridNg1Component = /** @class */ (function (_super) {
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
                },] }
    ];
    /** @nocollapse */
    TreeGridNg1Component.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector }
    ]; };
    TreeGridNg1Component.propDecorators = {
        data: [{ type: Input }],
        columns: [{ type: Input }],
        treeData: [{ type: Input }],
        selected: [{ type: Input }],
        currentRow: [{ type: Input }],
        options: [{ type: Input }],
        optionsChange: [{ type: Output }],
        selectedChange: [{ type: Output }],
        currentRowChange: [{ type: Output }],
        treeDataChange: [{ type: Output }],
        selectionManager: [{ type: Output }]
    };
    return TreeGridNg1Component;
}(UpgradeComponent));
export { TreeGridNg1Component };
function TreeGridNg1Component_tsickle_Closure_declarations() {
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
    /** @type {?} */
    TreeGridNg1Component.prototype.selectionManager;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy90cmVlLWdyaWQvdHJlZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLakIsZ0RBQWdCO0lBZXRELDhCQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFBdEQsWUFDSSxrQkFBTSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUMxQzs4QkFSeUIsSUFBSSxZQUFZLEVBQW1COytCQUNsQyxJQUFJLFlBQVksRUFBUztpQ0FDdkIsSUFBSSxZQUFZLEVBQU87K0JBQ3pCLElBQUksWUFBWSxFQUFrQjs7S0FLNUQ7O2dCQXBCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCOzs7O2dCQUxtQixVQUFVO2dCQUFnQixRQUFROzs7dUJBUWpELEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzswQkFDTCxLQUFLO2dDQUVMLE1BQU07aUNBQ04sTUFBTTttQ0FDTixNQUFNO2lDQUNOLE1BQU07bUNBQ04sTUFBTTs7K0JBbkJYO0VBTTBDLGdCQUFnQjtTQUE3QyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0b3IsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndHJlZWdyaWQnXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVHcmlkTmcxQ29tcG9uZW50IGV4dGVuZHMgVXBncmFkZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBkYXRhOiBhbnlbXSB8IEZ1bmN0aW9uO1xuICAgIEBJbnB1dCgpIGNvbHVtbnM6IFRyZWVHcmlkQ29sdW1uW107XG4gICAgQElucHV0KCkgdHJlZURhdGE6IFRyZWVHcmlkRGF0YVtdO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBhbnlbXTtcbiAgICBASW5wdXQoKSBjdXJyZW50Um93OiBhbnk7XG4gICAgQElucHV0KCkgb3B0aW9uczogVHJlZUdyaWRPcHRpb25zO1xuXG4gICAgQE91dHB1dCgpIG9wdGlvbnNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVHcmlkT3B0aW9ucz4oKTtcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuICAgIEBPdXRwdXQoKSBjdXJyZW50Um93Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIHRyZWVEYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlR3JpZERhdGFbXT4oKTtcbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uTWFuYWdlcjogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJ3RyZWVncmlkJywgZWxlbWVudFJlZiwgaW5qZWN0b3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmVlR3JpZENvbHVtbiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nIHwgRnVuY3Rpb247XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgaGVhZGVyQ2xhc3M/OiBzdHJpbmc7XG4gICAgY2VsbENsYXNzPzogc3RyaW5nO1xuICAgIHdpZHRoPzogc3RyaW5nO1xuICAgIHRvb2x0aXA/OiBzdHJpbmc7XG4gICAgdG9vbHRpcFBsYWNlbWVudD86ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVHcmlkRGF0YSB7XG4gICAgZGF0YUl0ZW06IGFueTtcbiAgICBjaGlsZHJlbjogYW55W107XG4gICAgZXhwYW5kZWQ6IGJvb2xlYW47XG4gICAgZXhwYW5kaW5nOiBib29sZWFuO1xuICAgIGxldmVsOiBudW1iZXI7XG4gICAgYXBpOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJlZUdyaWRPcHRpb25zIHtcbiAgICBjaGlsZHJlblByb3BlcnR5Pzogc3RyaW5nO1xuICAgIGhhc0NoaWxkcmVuPzogRnVuY3Rpb247XG4gICAgbWF4RGVwdGg/OiBudW1iZXI7XG4gICAgZXhwYW5kVG9wTGV2ZWw/OiBib29sZWFuO1xuICAgIHNlbGVjdD86IGFueTtcbiAgICBleHBhbmRlcj86IGFueTtcbiAgICBpY29ucz86IGFueTtcbiAgICByb3dDbGFzcz86IHN0cmluZyB8IEZ1bmN0aW9uO1xuICAgIHNvcnQ/OiBGdW5jdGlvbjtcbn1cbiJdfQ==