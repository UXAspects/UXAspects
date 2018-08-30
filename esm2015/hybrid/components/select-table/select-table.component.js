/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class SelectTableNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('selectTable', elementRef, injector);
        this.selectedChange = new EventEmitter();
    }
}
SelectTableNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'select-table'
            },] }
];
/** @nocollapse */
SelectTableNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9zZWxlY3QtdGFibGUvc2VsZWN0LXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSzNELE1BQU0sOEJBQStCLFNBQVEsZ0JBQWdCOzs7OztJQWN6RCxZQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFDbEQsS0FBSyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7OEJBSEUsSUFBSSxZQUFZLEVBQVU7S0FJMUU7OztZQW5CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7YUFDM0I7Ozs7WUFMbUIsVUFBVTtZQUFnQixRQUFROzs7cUJBUWpELEtBQUs7NkJBQ0wsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSztnQ0FDTCxLQUFLOzZCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0b3IsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnc2VsZWN0LXRhYmxlJ1xufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RUYWJsZU5nMUNvbXBvbmVudCBleHRlbmRzIFVwZ3JhZGVDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgdmFsdWVzOiBhbnlbXTtcbiAgICBASW5wdXQoKSBtdWx0aXBsZVNlbGVjdDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzZWxlY3RLZXk6IHN0cmluZztcbiAgICBASW5wdXQoKSBzZWxlY3RlZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNlYXJjaFRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSB0YWJsZUhlaWdodDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRlbXBsYXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdGVtcGxhdGVVcmw6IHN0cmluZztcbiAgICBASW5wdXQoKSBzZWxlY3RIaWRkZW5JdGVtczogJ2NsZWFyJyB8ICdyZXNlbGVjdCc7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJ3NlbGVjdFRhYmxlJywgZWxlbWVudFJlZiwgaW5qZWN0b3IpO1xuICAgIH1cbn0iXX0=