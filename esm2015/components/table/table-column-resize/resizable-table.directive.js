/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ResizeService } from '../../../directives/resize/index';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';
export class ResizableTableDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _table
     * @param {?} resize
     */
    constructor(_elementRef, _table, resize) {
        this._elementRef = _elementRef;
        this._table = _table;
        /**
         * Unsubscribe from the observables
         */
        this._onDestroy = new Subject();
        // watch for the table being resized
        resize.addResizeListener(this._elementRef.nativeElement)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => _table.tableWidth = this.getScrollWidth());
    }
    /**
     * Once we have the columns make them resizable and watch for changes to columns
     * @return {?}
     */
    ngAfterViewInit() {
        // ensure we initially set the table width
        this._table.tableWidth = this.getScrollWidth();
        // set the columns - prevent expression changed error
        requestAnimationFrame(() => this._table.setColumns(this.columns));
        // watch for any future changes to the columns
        this.columns.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this._table.setColumns(this.columns));
    }
    /**
     * Cleanup after the component is destroyed
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Get the smallest tbody width taking into account scrollbars (uxFixedHeaderTable)
     * @return {?}
     */
    getScrollWidth() {
        return Array.from((/** @type {?} */ (this._elementRef.nativeElement)).tBodies)
            .reduce((width, tbody) => Math.min(width, tbody.scrollWidth), (/** @type {?} */ (this._elementRef.nativeElement)).offsetWidth);
    }
}
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
ResizableTableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizableTableService },
    { type: ResizeService }
];
ResizableTableDirective.propDecorators = {
    columns: [{ type: ContentChildren, args: [ResizableTableColumnComponent, { descendants: true },] }]
};
function ResizableTableDirective_tsickle_Closure_declarations() {
    /**
     * Get all the column headers
     * @type {?}
     */
    ResizableTableDirective.prototype.columns;
    /**
     * Unsubscribe from the observables
     * @type {?}
     */
    ResizableTableDirective.prototype._onDestroy;
    /** @type {?} */
    ResizableTableDirective.prototype._elementRef;
    /** @type {?} */
    ResizableTableDirective.prototype._table;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYmxlL3RhYmxlLWNvbHVtbi1yZXNpemUvcmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBU2xFLE1BQU07Ozs7OztJQVFKLFlBQW9CLFdBQXVCLEVBQVUsTUFBNkIsRUFBRSxNQUFxQjtRQUFyRixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCOzs7OzBCQUY3RCxJQUFJLE9BQU8sRUFBUTs7UUFJdEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO2FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0tBQy9EOzs7OztJQUdELGVBQWU7O1FBR2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztRQUcvQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7UUFHbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDN0c7Ozs7O0lBR0QsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM1Qjs7Ozs7SUFHTyxjQUFjO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBaUMsRUFBQyxDQUFDLE9BQU8sQ0FBQzthQUM1RSxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsbUJBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFpQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7WUE1Q3JJLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxvQkFBb0I7aUJBQzVCO2FBQ0Y7Ozs7WUFibUQsVUFBVTtZQUtyRCxxQkFBcUI7WUFGckIsYUFBYTs7O3NCQWNuQixlQUFlLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9pbmRleCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUtdGFibGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eFJlc2l6YWJsZVRhYmxlXScsXG4gIHByb3ZpZGVyczogW1Jlc2l6YWJsZVRhYmxlU2VydmljZV0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3V4LXJlc2l6YWJsZS10YWJsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVUYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgLyoqIEdldCBhbGwgdGhlIGNvbHVtbiBoZWFkZXJzICovXG4gIEBDb250ZW50Q2hpbGRyZW4oUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgY29sdW1uczogUXVlcnlMaXN0PFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50PjtcblxuICAvKiogVW5zdWJzY3JpYmUgZnJvbSB0aGUgb2JzZXJ2YWJsZXMgKi9cbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF90YWJsZTogUmVzaXphYmxlVGFibGVTZXJ2aWNlLCByZXNpemU6IFJlc2l6ZVNlcnZpY2UpIHtcbiAgICAvLyB3YXRjaCBmb3IgdGhlIHRhYmxlIGJlaW5nIHJlc2l6ZWRcbiAgICByZXNpemUuYWRkUmVzaXplTGlzdGVuZXIodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IF90YWJsZS50YWJsZVdpZHRoID0gdGhpcy5nZXRTY3JvbGxXaWR0aCgpKTtcbiAgfVxuXG4gIC8qKiBPbmNlIHdlIGhhdmUgdGhlIGNvbHVtbnMgbWFrZSB0aGVtIHJlc2l6YWJsZSBhbmQgd2F0Y2ggZm9yIGNoYW5nZXMgdG8gY29sdW1ucyAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cbiAgICAvLyBlbnN1cmUgd2UgaW5pdGlhbGx5IHNldCB0aGUgdGFibGUgd2lkdGhcbiAgICB0aGlzLl90YWJsZS50YWJsZVdpZHRoID0gdGhpcy5nZXRTY3JvbGxXaWR0aCgpO1xuXG4gICAgLy8gc2V0IHRoZSBjb2x1bW5zIC0gcHJldmVudCBleHByZXNzaW9uIGNoYW5nZWQgZXJyb3JcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fdGFibGUuc2V0Q29sdW1ucyh0aGlzLmNvbHVtbnMpKTtcblxuICAgIC8vIHdhdGNoIGZvciBhbnkgZnV0dXJlIGNoYW5nZXMgdG8gdGhlIGNvbHVtbnNcbiAgICB0aGlzLmNvbHVtbnMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdGFibGUuc2V0Q29sdW1ucyh0aGlzLmNvbHVtbnMpKTtcbiAgfVxuXG4gIC8qKiBDbGVhbnVwIGFmdGVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBzbWFsbGVzdCB0Ym9keSB3aWR0aCB0YWtpbmcgaW50byBhY2NvdW50IHNjcm9sbGJhcnMgKHV4Rml4ZWRIZWFkZXJUYWJsZSkgKi9cbiAgcHJpdmF0ZSBnZXRTY3JvbGxXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBBcnJheS5mcm9tKCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTFRhYmxlRWxlbWVudCkudEJvZGllcylcbiAgICAgIC5yZWR1Y2UoKHdpZHRoLCB0Ym9keSkgPT4gTWF0aC5taW4od2lkdGgsIHRib2R5LnNjcm9sbFdpZHRoKSwgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MVGFibGVFbGVtZW50KS5vZmZzZXRXaWR0aCk7XG4gIH1cbn1cbiJdfQ==