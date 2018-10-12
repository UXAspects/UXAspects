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
            .subscribe(dimensions => _table.tableWidth = this.getScrollWidth());
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYmxlL3RhYmxlLWNvbHVtbi1yZXNpemUvcmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBU2pFLE1BQU07Ozs7OztJQVFKLFlBQW9CLFdBQXVCLEVBQVUsTUFBNkIsRUFBRSxNQUFxQjtRQUFyRixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCOzs7OzBCQUY3RCxJQUFJLE9BQU8sRUFBUTs7UUFJdEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO2FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDdkU7Ozs7O0lBR0QsZUFBZTs7UUFHYixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O1FBRy9DLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztRQUdsRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUM3Rzs7Ozs7SUFHRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUdPLGNBQWM7UUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFpQyxFQUFDLENBQUMsT0FBTyxDQUFDO2FBQzVFLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxtQkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWlDLEVBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7OztZQTVDckksU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNsQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG9CQUFvQjtpQkFDNUI7YUFDRjs7OztZQWJtRCxVQUFVO1lBSXJELHFCQUFxQjtZQUNyQixhQUFhOzs7c0JBWW5CLGVBQWUsU0FBQyw2QkFBNkIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IFJlc2l6YWJsZVRhYmxlU2VydmljZSB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplL2luZGV4JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3V4UmVzaXphYmxlVGFibGVdJyxcbiAgcHJvdmlkZXJzOiBbUmVzaXphYmxlVGFibGVTZXJ2aWNlXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAndXgtcmVzaXphYmxlLXRhYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZVRhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvKiogR2V0IGFsbCB0aGUgY29sdW1uIGhlYWRlcnMgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBjb2x1bW5zOiBRdWVyeUxpc3Q8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQ+O1xuXG4gIC8qKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBvYnNlcnZhYmxlcyAqL1xuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3RhYmxlOiBSZXNpemFibGVUYWJsZVNlcnZpY2UsIHJlc2l6ZTogUmVzaXplU2VydmljZSkge1xuICAgIC8vIHdhdGNoIGZvciB0aGUgdGFibGUgYmVpbmcgcmVzaXplZFxuICAgIHJlc2l6ZS5hZGRSZXNpemVMaXN0ZW5lcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoZGltZW5zaW9ucyA9PiBfdGFibGUudGFibGVXaWR0aCA9IHRoaXMuZ2V0U2Nyb2xsV2lkdGgoKSk7XG4gIH1cblxuICAvKiogT25jZSB3ZSBoYXZlIHRoZSBjb2x1bW5zIG1ha2UgdGhlbSByZXNpemFibGUgYW5kIHdhdGNoIGZvciBjaGFuZ2VzIHRvIGNvbHVtbnMgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuXG4gICAgLy8gZW5zdXJlIHdlIGluaXRpYWxseSBzZXQgdGhlIHRhYmxlIHdpZHRoXG4gICAgdGhpcy5fdGFibGUudGFibGVXaWR0aCA9IHRoaXMuZ2V0U2Nyb2xsV2lkdGgoKTtcblxuICAgIC8vIHNldCB0aGUgY29sdW1ucyAtIHByZXZlbnQgZXhwcmVzc2lvbiBjaGFuZ2VkIGVycm9yXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3RhYmxlLnNldENvbHVtbnModGhpcy5jb2x1bW5zKSk7XG5cbiAgICAvLyB3YXRjaCBmb3IgYW55IGZ1dHVyZSBjaGFuZ2VzIHRvIHRoZSBjb2x1bW5zXG4gICAgdGhpcy5jb2x1bW5zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3RhYmxlLnNldENvbHVtbnModGhpcy5jb2x1bW5zKSk7XG4gIH1cblxuICAvKiogQ2xlYW51cCBhZnRlciB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZCAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgc21hbGxlc3QgdGJvZHkgd2lkdGggdGFraW5nIGludG8gYWNjb3VudCBzY3JvbGxiYXJzICh1eEZpeGVkSGVhZGVyVGFibGUpICovXG4gIHByaXZhdGUgZ2V0U2Nyb2xsV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSgodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxUYWJsZUVsZW1lbnQpLnRCb2RpZXMpXG4gICAgICAucmVkdWNlKCh3aWR0aCwgdGJvZHkpID0+IE1hdGgubWluKHdpZHRoLCB0Ym9keS5zY3JvbGxXaWR0aCksICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTFRhYmxlRWxlbWVudCkub2Zmc2V0V2lkdGgpO1xuICB9XG59XG4iXX0=