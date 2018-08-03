/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class SortDirectionToggleNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('sortDirectionToggle', elementRef, injector);
    }
}
SortDirectionToggleNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'sort-direction-toggle'
            },] }
];
/** @nocollapse */
SortDirectionToggleNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
SortDirectionToggleNg1Component.propDecorators = {
    label: [{ type: Input }],
    sorters: [{ type: Input }],
    descend: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1kaXJlY3Rpb24tdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9zb3J0LWRpcmVjdGlvbi10b2dnbGUvc29ydC1kaXJlY3Rpb24tdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUszRCxNQUFNLHNDQUF1QyxTQUFRLGdCQUFnQjs7Ozs7SUFNakUsWUFBWSxVQUFzQixFQUFFLFFBQWtCO1FBQ2xELEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDdEQ7OztZQVhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2FBQ3BDOzs7O1lBTG1CLFVBQVU7WUFBRSxRQUFROzs7b0JBUW5DLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnc29ydC1kaXJlY3Rpb24tdG9nZ2xlJ1xufSlcbmV4cG9ydCBjbGFzcyBTb3J0RGlyZWN0aW9uVG9nZ2xlTmcxQ29tcG9uZW50IGV4dGVuZHMgVXBncmFkZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNvcnRlcnM6IFNvcnREaXJlY3Rpb25Ub2dnbGVTb3J0ZXJbXTtcbiAgICBASW5wdXQoKSBkZXNjZW5kOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCdzb3J0RGlyZWN0aW9uVG9nZ2xlJywgZWxlbWVudFJlZiwgaW5qZWN0b3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3J0RGlyZWN0aW9uVG9nZ2xlU29ydGVyIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc29ydDogc3RyaW5nO1xuICAgIGRlZmF1bHRTb3J0ZXI6IGJvb2xlYW47XG4gICAgc2VsZWN0OiBGdW5jdGlvbjtcbn0iXX0=