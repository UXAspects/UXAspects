/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var HierarchyBarNg1Component = /** @class */ (function (_super) {
    tslib_1.__extends(HierarchyBarNg1Component, _super);
    function HierarchyBarNg1Component(elementRef, injector) {
        return _super.call(this, 'hierarchyBar', elementRef, injector) || this;
    }
    HierarchyBarNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'hierarchy-bar'
                },] }
    ];
    /** @nocollapse */
    HierarchyBarNg1Component.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector }
    ]; };
    HierarchyBarNg1Component.propDecorators = {
        data: [{ type: Input }],
        options: [{ type: Input }],
        selectNode: [{ type: Input }],
        containerClass: [{ type: Input }]
    };
    return HierarchyBarNg1Component;
}(UpgradeComponent));
export { HierarchyBarNg1Component };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL2NvbXBvbmVudHMvaGllcmFyY2h5LWJhci9oaWVyYXJjaHktYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS2Isb0RBQWdCO0lBTzFELGtDQUFZLFVBQXNCLEVBQUUsUUFBa0I7ZUFDbEQsa0JBQU0sY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7S0FDOUM7O2dCQVpKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtpQkFDNUI7Ozs7Z0JBTG1CLFVBQVU7Z0JBQUUsUUFBUTs7O3VCQVFuQyxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSztpQ0FDTCxLQUFLOzttQ0FYVjtFQU04QyxnQkFBZ0I7U0FBakQsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaGllcmFyY2h5LWJhcidcbn0pXG5leHBvcnQgY2xhc3MgSGllcmFyY2h5QmFyTmcxQ29tcG9uZW50IGV4dGVuZHMgVXBncmFkZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBkYXRhOiBhbnlbXTtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBIaWVyYXJjaHlCYXJPcHRpb25zO1xuICAgIEBJbnB1dCgpIHNlbGVjdE5vZGU6IGFueTtcbiAgICBASW5wdXQoKSBjb250YWluZXJDbGFzczogYW55O1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCdoaWVyYXJjaHlCYXInLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhpZXJhcmNoeUJhck9wdGlvbnMge1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgb3ZlcnZpZXc/OiBGdW5jdGlvbjtcbiAgICBpbWFnZTogRnVuY3Rpb247XG4gICAgdmFsdWVGb3JtYXR0ZXI6IEZ1bmN0aW9uO1xuICAgIGFjdGlvbj86IHtcbiAgICAgICAgdGl0bGU6IHN0cmluZztcbiAgICAgICAgZXZlbnQ6IEZ1bmN0aW9uO1xuICAgIH07XG59Il19