/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class HierarchyBarNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('hierarchyBar', elementRef, injector);
    }
}
HierarchyBarNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'hierarchy-bar'
            },] }
];
/** @nocollapse */
HierarchyBarNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
HierarchyBarNg1Component.propDecorators = {
    data: [{ type: Input }],
    options: [{ type: Input }],
    selectNode: [{ type: Input }],
    containerClass: [{ type: Input }]
};
function HierarchyBarNg1Component_tsickle_Closure_declarations() {
    /** @type {?} */
    HierarchyBarNg1Component.prototype.data;
    /** @type {?} */
    HierarchyBarNg1Component.prototype.options;
    /** @type {?} */
    HierarchyBarNg1Component.prototype.selectNode;
    /** @type {?} */
    HierarchyBarNg1Component.prototype.containerClass;
}
/**
 * @record
 */
export function HierarchyBarOptions() { }
function HierarchyBarOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    HierarchyBarOptions.prototype.enabled;
    /** @type {?|undefined} */
    HierarchyBarOptions.prototype.overview;
    /** @type {?} */
    HierarchyBarOptions.prototype.image;
    /** @type {?} */
    HierarchyBarOptions.prototype.valueFormatter;
    /** @type {?|undefined} */
    HierarchyBarOptions.prototype.action;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL2NvbXBvbmVudHMvaGllcmFyY2h5LWJhci9oaWVyYXJjaHktYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUszRCxNQUFNLCtCQUFnQyxTQUFRLGdCQUFnQjs7Ozs7SUFPMUQsWUFBWSxVQUFzQixFQUFFLFFBQWtCO1FBQ2xELEtBQUssQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQy9DOzs7WUFaSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7YUFDNUI7Ozs7WUFMbUIsVUFBVTtZQUFFLFFBQVE7OzttQkFRbkMsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGdyYWRlQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2hpZXJhcmNoeS1iYXInXG59KVxuZXhwb3J0IGNsYXNzIEhpZXJhcmNoeUJhck5nMUNvbXBvbmVudCBleHRlbmRzIFVwZ3JhZGVDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGF0YTogYW55W107XG4gICAgQElucHV0KCkgb3B0aW9uczogSGllcmFyY2h5QmFyT3B0aW9ucztcbiAgICBASW5wdXQoKSBzZWxlY3ROb2RlOiBhbnk7XG4gICAgQElucHV0KCkgY29udGFpbmVyQ2xhc3M6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcignaGllcmFyY2h5QmFyJywgZWxlbWVudFJlZiwgaW5qZWN0b3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBIaWVyYXJjaHlCYXJPcHRpb25zIHtcbiAgICBlbmFibGVkOiBib29sZWFuO1xuICAgIG92ZXJ2aWV3PzogRnVuY3Rpb247XG4gICAgaW1hZ2U6IEZ1bmN0aW9uO1xuICAgIHZhbHVlRm9ybWF0dGVyOiBGdW5jdGlvbjtcbiAgICBhY3Rpb24/OiB7XG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICAgIGV2ZW50OiBGdW5jdGlvbjtcbiAgICB9O1xufSJdfQ==