/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';
import { ResizeService } from '../../../directives/resize/index';
var ResizableTableDirective = /** @class */ (function () {
    function ResizableTableDirective(_elementRef, _table, resize) {
        var _this = this;
        this._elementRef = _elementRef;
        this._table = _table;
        /**
         * Unsubscribe from the observables
         */
        this._onDestroy = new Subject();
        // watch for the table being resized
        resize.addResizeListener(this._elementRef.nativeElement)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function (dimensions) { return _table.tableWidth = _this.getScrollWidth(); });
    }
    /** Once we have the columns make them resizable and watch for changes to columns */
    /**
     * Once we have the columns make them resizable and watch for changes to columns
     * @return {?}
     */
    ResizableTableDirective.prototype.ngAfterViewInit = /**
     * Once we have the columns make them resizable and watch for changes to columns
     * @return {?}
     */
    function () {
        var _this = this;
        // ensure we initially set the table width
        this._table.tableWidth = this.getScrollWidth();
        // set the columns - prevent expression changed error
        requestAnimationFrame(function () { return _this._table.setColumns(_this.columns); });
        // watch for any future changes to the columns
        this.columns.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this._table.setColumns(_this.columns); });
    };
    /** Cleanup after the component is destroyed */
    /**
     * Cleanup after the component is destroyed
     * @return {?}
     */
    ResizableTableDirective.prototype.ngOnDestroy = /**
     * Cleanup after the component is destroyed
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * Get the smallest tbody width taking into account scrollbars (uxFixedHeaderTable)
     * @return {?}
     */
    ResizableTableDirective.prototype.getScrollWidth = /**
     * Get the smallest tbody width taking into account scrollbars (uxFixedHeaderTable)
     * @return {?}
     */
    function () {
        return Array.from((/** @type {?} */ (this._elementRef.nativeElement)).tBodies)
            .reduce(function (width, tbody) { return Math.min(width, tbody.scrollWidth); }, (/** @type {?} */ (this._elementRef.nativeElement)).offsetWidth);
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
        { type: ResizableTableService },
        { type: ResizeService }
    ]; };
    ResizableTableDirective.propDecorators = {
        columns: [{ type: ContentChildren, args: [ResizableTableColumnComponent, { descendants: true },] }]
    };
    return ResizableTableDirective;
}());
export { ResizableTableDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYmxlL3RhYmxlLWNvbHVtbi1yZXNpemUvcmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztJQWlCL0QsaUNBQW9CLFdBQXVCLEVBQVUsTUFBNkIsRUFBRSxNQUFxQjtRQUF6RyxpQkFLQztRQUxtQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCOzs7OzBCQUY3RCxJQUFJLE9BQU8sRUFBUTs7UUFJdEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO2FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVMsQ0FBQyxVQUFBLFVBQVUsSUFBSSxPQUFBLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7S0FDdkU7SUFFRCxvRkFBb0Y7Ozs7O0lBQ3BGLGlEQUFlOzs7O0lBQWY7UUFBQSxpQkFVQzs7UUFQQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O1FBRy9DLHFCQUFxQixDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQzs7UUFHbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO0tBQzdHO0lBRUQsK0NBQStDOzs7OztJQUMvQyw2Q0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUdPLGdEQUFjOzs7OztRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWlDLEVBQUMsQ0FBQyxPQUFPLENBQUM7YUFDNUUsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBbEMsQ0FBa0MsRUFBRSxtQkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWlDLEVBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7O2dCQTVDckksU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNsQyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLG9CQUFvQjtxQkFDNUI7aUJBQ0Y7Ozs7Z0JBYm1ELFVBQVU7Z0JBSXJELHFCQUFxQjtnQkFDckIsYUFBYTs7OzBCQVluQixlQUFlLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOztrQ0FqQnZFOztTQWNhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUtdGFibGUuc2VydmljZSc7XG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvaW5kZXgnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhSZXNpemFibGVUYWJsZV0nLFxuICBwcm92aWRlcnM6IFtSZXNpemFibGVUYWJsZVNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICd1eC1yZXNpemFibGUtdGFibGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlVGFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8qKiBHZXQgYWxsIHRoZSBjb2x1bW4gaGVhZGVycyAqL1xuICBAQ29udGVudENoaWxkcmVuKFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGNvbHVtbnM6IFF1ZXJ5TGlzdDxSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudD47XG5cbiAgLyoqIFVuc3Vic2NyaWJlIGZyb20gdGhlIG9ic2VydmFibGVzICovXG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfdGFibGU6IFJlc2l6YWJsZVRhYmxlU2VydmljZSwgcmVzaXplOiBSZXNpemVTZXJ2aWNlKSB7XG4gICAgLy8gd2F0Y2ggZm9yIHRoZSB0YWJsZSBiZWluZyByZXNpemVkXG4gICAgcmVzaXplLmFkZFJlc2l6ZUxpc3RlbmVyKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZShkaW1lbnNpb25zID0+IF90YWJsZS50YWJsZVdpZHRoID0gdGhpcy5nZXRTY3JvbGxXaWR0aCgpKTtcbiAgfVxuXG4gIC8qKiBPbmNlIHdlIGhhdmUgdGhlIGNvbHVtbnMgbWFrZSB0aGVtIHJlc2l6YWJsZSBhbmQgd2F0Y2ggZm9yIGNoYW5nZXMgdG8gY29sdW1ucyAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cbiAgICAvLyBlbnN1cmUgd2UgaW5pdGlhbGx5IHNldCB0aGUgdGFibGUgd2lkdGhcbiAgICB0aGlzLl90YWJsZS50YWJsZVdpZHRoID0gdGhpcy5nZXRTY3JvbGxXaWR0aCgpO1xuXG4gICAgLy8gc2V0IHRoZSBjb2x1bW5zIC0gcHJldmVudCBleHByZXNzaW9uIGNoYW5nZWQgZXJyb3JcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fdGFibGUuc2V0Q29sdW1ucyh0aGlzLmNvbHVtbnMpKTtcblxuICAgIC8vIHdhdGNoIGZvciBhbnkgZnV0dXJlIGNoYW5nZXMgdG8gdGhlIGNvbHVtbnNcbiAgICB0aGlzLmNvbHVtbnMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdGFibGUuc2V0Q29sdW1ucyh0aGlzLmNvbHVtbnMpKTtcbiAgfVxuXG4gIC8qKiBDbGVhbnVwIGFmdGVyIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBzbWFsbGVzdCB0Ym9keSB3aWR0aCB0YWtpbmcgaW50byBhY2NvdW50IHNjcm9sbGJhcnMgKHV4Rml4ZWRIZWFkZXJUYWJsZSkgKi9cbiAgcHJpdmF0ZSBnZXRTY3JvbGxXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBBcnJheS5mcm9tKCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTFRhYmxlRWxlbWVudCkudEJvZGllcylcbiAgICAgIC5yZWR1Y2UoKHdpZHRoLCB0Ym9keSkgPT4gTWF0aC5taW4od2lkdGgsIHRib2R5LnNjcm9sbFdpZHRoKSwgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MVGFibGVFbGVtZW50KS5vZmZzZXRXaWR0aCk7XG4gIH1cbn1cbiJdfQ==