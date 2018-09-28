/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';
var ResizableTableDirective = /** @class */ (function () {
    function ResizableTableDirective(_elementRef, _table) {
        this._elementRef = _elementRef;
        this._table = _table;
    }
    /**
     * @return {?}
     */
    ResizableTableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._table.setTable(this._elementRef.nativeElement);
        this._table.setColumns(this.columns);
    };
    ResizableTableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxResizableTable]',
                    providers: [ResizableTableService],
                    host: {
                        class: 'ux-resizable-table'
                    }
                },] }
    ];
    /** @nocollapse */
    ResizableTableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResizableTableService }
    ]; };
    ResizableTableDirective.propDecorators = {
        columns: [{ type: ContentChildren, args: [ResizableTableColumnComponent,] }]
    };
    return ResizableTableDirective;
}());
export { ResizableTableDirective };
function ResizableTableDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ResizableTableDirective.prototype.columns;
    /** @type {?} */
    ResizableTableDirective.prototype._elementRef;
    /** @type {?} */
    ResizableTableDirective.prototype._table;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYmxlL3RhYmxlLWNvbHVtbi1yZXNpemUvcmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBYWhFLGlDQUFvQixXQUF1QixFQUFVLE1BQTZCO1FBQTlELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7S0FBSzs7OztJQUV2RixpREFBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN0Qzs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDbEMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxvQkFBb0I7cUJBQzVCO2lCQUNGOzs7O2dCQVZtRCxVQUFVO2dCQUVyRCxxQkFBcUI7OzswQkFXM0IsZUFBZSxTQUFDLDZCQUE2Qjs7a0NBYmhEOztTQVdhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNpemFibGUtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZVNlcnZpY2UgfSBmcm9tICcuL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3V4UmVzaXphYmxlVGFibGVdJyxcbiAgcHJvdmlkZXJzOiBbUmVzaXphYmxlVGFibGVTZXJ2aWNlXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAndXgtcmVzaXphYmxlLXRhYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZVRhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF90YWJsZTogUmVzaXphYmxlVGFibGVTZXJ2aWNlKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdGFibGUuc2V0VGFibGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLl90YWJsZS5zZXRDb2x1bW5zKHRoaXMuY29sdW1ucyk7XG4gIH1cbn0iXX0=