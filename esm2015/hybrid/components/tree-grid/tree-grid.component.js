/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class TreeGridNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('treegrid', elementRef, injector);
        this.optionsChange = new EventEmitter();
        this.selectedChange = new EventEmitter();
        this.currentRowChange = new EventEmitter();
        this.treeDataChange = new EventEmitter();
    }
}
TreeGridNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'treegrid'
            },] }
];
/** @nocollapse */
TreeGridNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
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
    treeDataChange: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy90cmVlLWdyaWQvdHJlZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSzNELE1BQU0sMkJBQTRCLFNBQVEsZ0JBQWdCOzs7OztJQWN0RCxZQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFDbEQsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7NkJBTmEsSUFBSSxZQUFZLEVBQW1COzhCQUM1QyxJQUFJLFlBQVksRUFBUztnQ0FDekIsSUFBSSxZQUFZLEVBQU87OEJBQ2QsSUFBSSxZQUFZLEVBQWtCO0tBSTFGOzs7WUFuQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxVQUFVO2FBQ3ZCOzs7O1lBTG1CLFVBQVU7WUFBZ0IsUUFBUTs7O21CQVFqRCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7c0JBQ0wsS0FBSzs0QkFFTCxNQUFNOzZCQUNOLE1BQU07K0JBQ04sTUFBTTs2QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGdyYWRlQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3RyZWVncmlkJ1xufSlcbmV4cG9ydCBjbGFzcyBUcmVlR3JpZE5nMUNvbXBvbmVudCBleHRlbmRzIFVwZ3JhZGVDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGF0YTogYW55W10gfCBGdW5jdGlvbjtcbiAgICBASW5wdXQoKSBjb2x1bW5zOiBUcmVlR3JpZENvbHVtbltdO1xuICAgIEBJbnB1dCgpIHRyZWVEYXRhOiBUcmVlR3JpZERhdGFbXTtcbiAgICBASW5wdXQoKSBzZWxlY3RlZDogYW55W107XG4gICAgQElucHV0KCkgY3VycmVudFJvdzogYW55O1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IFRyZWVHcmlkT3B0aW9ucztcblxuICAgIEBPdXRwdXQoKSBvcHRpb25zQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VHJlZUdyaWRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZUdyaWRPcHRpb25zPigpO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG4gICAgQE91dHB1dCgpIGN1cnJlbnRSb3dDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIHRyZWVEYXRhQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VHJlZUdyaWREYXRhW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlR3JpZERhdGFbXT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigndHJlZWdyaWQnLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVHcmlkQ29sdW1uIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmcgfCBGdW5jdGlvbjtcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBoZWFkZXJDbGFzcz86IHN0cmluZztcbiAgICBjZWxsQ2xhc3M/OiBzdHJpbmc7XG4gICAgd2lkdGg/OiBzdHJpbmc7XG4gICAgdG9vbHRpcD86IHN0cmluZztcbiAgICB0b29sdGlwUGxhY2VtZW50PzogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJlZUdyaWREYXRhIHtcbiAgICBkYXRhSXRlbTogYW55O1xuICAgIGNoaWxkcmVuOiBhbnlbXTtcbiAgICBleHBhbmRlZDogYm9vbGVhbjtcbiAgICBleHBhbmRpbmc6IGJvb2xlYW47XG4gICAgbGV2ZWw6IG51bWJlcjtcbiAgICBhcGk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmVlR3JpZE9wdGlvbnMge1xuICAgIGNoaWxkcmVuUHJvcGVydHk/OiBzdHJpbmc7XG4gICAgaGFzQ2hpbGRyZW4/OiBGdW5jdGlvbjtcbiAgICBtYXhEZXB0aD86IG51bWJlcjtcbiAgICBleHBhbmRUb3BMZXZlbD86IGJvb2xlYW47XG4gICAgc2VsZWN0PzogYW55O1xuICAgIGV4cGFuZGVyPzogYW55O1xuICAgIGljb25zPzogYW55O1xuICAgIHJvd0NsYXNzPzogc3RyaW5nIHwgRnVuY3Rpb247XG4gICAgc29ydD86IEZ1bmN0aW9uO1xufVxuIl19