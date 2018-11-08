/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
export class ResizableTableService {
    constructor() {
        /**
         * Indicate when the columns are ready
         */
        this.isInitialised$ = new BehaviorSubject(false);
        /**
         * Determine if we are currently resizing
         */
        this.isResizing = false;
        /**
         * Store the percentage widths of each column
         */
        this.columns = [];
        /**
         * Store the current width of the table
         */
        this.tableWidth = 0;
        /**
         * Emit an event whenever a column is resized
         */
        this.onResize$ = new Subject();
    }
    /**
     * Cleanup when service is disposed
     * @return {?}
     */
    ngOnDestroy() {
        this.onResize$.complete();
    }
    /**
     * Store the size of each column
     * @param {?} columns
     * @return {?}
     */
    setColumns(columns) {
        // store the current columns
        this._columns = columns;
        // store the sizes
        this.columns = columns.map(column => (column.getNaturalWidth() / this.tableWidth) * 100);
        // indicate we are now initialised
        if (this.isInitialised$.value === false) {
            this.isInitialised$.next(true);
        }
    }
    /**
     * Update the resizing state
     * @param {?} isResizing
     * @return {?}
     */
    setResizing(isResizing) {
        this.isResizing = isResizing;
    }
    /**
     * Get the width of a column in a specific unit
     * @param {?} index
     * @param {?} unit
     * @param {?=} columns
     * @return {?}
     */
    getColumnWidth(index, unit, columns = this.columns) {
        switch (unit) {
            case ColumnUnit.Percentage:
                return columns[index];
            case ColumnUnit.Pixel:
                return (this.tableWidth / 100) * columns[index];
        }
    }
    /**
     * Allow setting the column size in any unit
     * @param {?} index
     * @param {?} value
     * @param {?} unit
     * @param {?=} columns
     * @return {?}
     */
    setColumnWidth(index, value, unit, columns = this.columns) {
        // create a new array so we keep the instance array immutable
        const /** @type {?} */ sizes = [...columns];
        switch (unit) {
            case ColumnUnit.Percentage:
                sizes[index] = value;
                break;
            case ColumnUnit.Pixel:
                sizes[index] = (value / this.tableWidth) * 100;
                break;
        }
        // update the instance variable
        return sizes;
    }
    /**
     * Resize a column by a specific pixel amount
     * @param {?} index
     * @param {?} delta
     * @param {?=} isDragging
     * @return {?}
     */
    resizeColumn(index, delta, isDragging = true) {
        // get the sibling column that will also be resized
        const /** @type {?} */ sibling = this.getSiblingColumn(index);
        // if there is no sibling that can be resized then stop here
        if (!sibling) {
            return;
        }
        // create a new array for the sizes
        let /** @type {?} */ columns = /** @type {?} */ ([...this.columns]);
        // resize the column to the desired size
        columns = /** @type {?} */ (this.setColumnWidth(index, Math.round(this.getColumnWidth(index, ColumnUnit.Pixel) + delta), ColumnUnit.Pixel, columns));
        columns = /** @type {?} */ (this.setColumnWidth(sibling, Math.round(this.getColumnWidth(sibling, ColumnUnit.Pixel) - delta), ColumnUnit.Pixel, columns));
        // if the move is not possible then stop here
        if (!this.isWidthValid(index, this.getColumnWidth(index, ColumnUnit.Pixel, columns)) || !this.isWidthValid(sibling, this.getColumnWidth(sibling, ColumnUnit.Pixel, columns))) {
            return;
        }
        // check that we add up to exactly 100%
        const /** @type {?} */ total = columns.reduce((count, column) => column + count, 0);
        // if the columns to not add to 100 ensure we make them
        if (total !== 100) {
            // get the column with a variable width
            const /** @type {?} */ target = this.getVariableColumn(100 - total);
            if (target && !isDragging) {
                columns[this._columns.toArray().indexOf(target)] += (100 - total);
            }
            else {
                columns[index] += (100 - total);
            }
        }
        // store the new sizes
        this.columns = columns;
        // emit the resize event for each column
        this.onResize$.next();
    }
    /**
     * @param {?} delta
     * @return {?}
     */
    getVariableColumn(delta) {
        // get all variable width columns that are not disabled
        const /** @type {?} */ variableColumns = this._columns.filter(column => !column.isFixedWidth && !column.disabled);
        // find one that is greater than its min width by enough
        return variableColumns.reverse().find(column => this.getColumnWidth(column.getCellIndex(), ColumnUnit.Pixel) >= column.minWidth + delta);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getColumn(index) {
        return this._columns ? this._columns.toArray()[index] : null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getColumnDisabled(index) {
        return this.getColumn(index) ? this.getColumn(index).disabled : false;
    }
    /**
     * Determine whether a column is above or below its minimum width
     * @param {?} index
     * @param {?} width
     * @return {?}
     */
    isWidthValid(index, width) {
        // get the column at a given position
        const /** @type {?} */ column = this.getColumnInstance(index);
        // determine if the specified width is greater than the min width
        return column && width >= column.minWidth;
    }
    /**
     * Get the next column in the sequence of columns
     * @param {?} index
     * @return {?}
     */
    getSiblingColumn(index) {
        // find the first sibling that is not disabled
        for (let /** @type {?} */ idx = index + 1; idx < this.columns.length; idx++) {
            const /** @type {?} */ sibling = this.getColumnInstance(idx);
            if (!sibling || !sibling.disabled) {
                return idx;
            }
        }
        return null;
    }
    /**
     * Get the column class from our query list
     * @param {?} index
     * @return {?}
     */
    getColumnInstance(index) {
        return this._columns ? this._columns.toArray()[index] : null;
    }
}
ResizableTableService.decorators = [
    { type: Injectable }
];
function ResizableTableService_tsickle_Closure_declarations() {
    /**
     * Indicate when the columns are ready
     * @type {?}
     */
    ResizableTableService.prototype.isInitialised$;
    /**
     * Determine if we are currently resizing
     * @type {?}
     */
    ResizableTableService.prototype.isResizing;
    /**
     * Store the percentage widths of each column
     * @type {?}
     */
    ResizableTableService.prototype.columns;
    /**
     * Store the current width of the table
     * @type {?}
     */
    ResizableTableService.prototype.tableWidth;
    /**
     * Emit an event whenever a column is resized
     * @type {?}
     */
    ResizableTableService.prototype.onResize$;
    /**
     * Store the QueryList of columns
     * @type {?}
     */
    ResizableTableService.prototype._columns;
}
/** @enum {number} */
const ColumnUnit = {
    Pixel: 0,
    Percentage: 1,
};
export { ColumnUnit };
ColumnUnit[ColumnUnit.Pixel] = "Pixel";
ColumnUnit[ColumnUnit.Percentage] = "Percentage";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUl2QyxNQUFNOzs7Ozs4QkFHYSxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7Ozs7MEJBRzlCLEtBQUs7Ozs7dUJBR00sRUFBRTs7OzswQkFHZCxDQUFDOzs7O3lCQUdWLElBQUksT0FBTyxFQUFROzs7Ozs7SUFNL0IsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDM0I7Ozs7OztJQUdELFVBQVUsQ0FBQyxPQUFpRDs7UUFHMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O1FBR3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzs7UUFHekYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztLQUNGOzs7Ozs7SUFHRCxXQUFXLENBQUMsVUFBbUI7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDOUI7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QUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ3ZFOzs7Ozs7O0lBR08sWUFBWSxDQUFDLEtBQWEsRUFBRSxLQUFhOztRQUcvQyx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUc3QyxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBSXBDLGdCQUFnQixDQUFDLEtBQWE7O1FBR3BDLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBRTNELHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNaO1NBQ0Y7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0lBSU4saUJBQWlCLENBQUMsS0FBYTtRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzs7O1lBNUtoRSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZVRhYmxlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgLyoqIEluZGljYXRlIHdoZW4gdGhlIGNvbHVtbnMgYXJlIHJlYWR5ICovXG4gIGlzSW5pdGlhbGlzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLyoqIERldGVybWluZSBpZiB3ZSBhcmUgY3VycmVudGx5IHJlc2l6aW5nICovXG4gIGlzUmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU3RvcmUgdGhlIHBlcmNlbnRhZ2Ugd2lkdGhzIG9mIGVhY2ggY29sdW1uICovXG4gIGNvbHVtbnM6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPiA9IFtdO1xuXG4gIC8qKiBTdG9yZSB0aGUgY3VycmVudCB3aWR0aCBvZiB0aGUgdGFibGUgKi9cbiAgdGFibGVXaWR0aDogbnVtYmVyID0gMDtcblxuICAvKiogRW1pdCBhbiBldmVudCB3aGVuZXZlciBhIGNvbHVtbiBpcyByZXNpemVkICovXG4gIG9uUmVzaXplJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFN0b3JlIHRoZSBRdWVyeUxpc3Qgb2YgY29sdW1ucyAqL1xuICBwcml2YXRlIF9jb2x1bW5zOiBRdWVyeUxpc3Q8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQ+O1xuXG4gIC8qKiBDbGVhbnVwIHdoZW4gc2VydmljZSBpcyBkaXNwb3NlZCAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm9uUmVzaXplJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIFN0b3JlIHRoZSBzaXplIG9mIGVhY2ggY29sdW1uICovXG4gIHNldENvbHVtbnMoY29sdW1uczogUXVlcnlMaXN0PFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50Pik6IHZvaWQge1xuXG4gICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgY29sdW1uc1xuICAgIHRoaXMuX2NvbHVtbnMgPSBjb2x1bW5zO1xuXG4gICAgLy8gc3RvcmUgdGhlIHNpemVzXG4gICAgdGhpcy5jb2x1bW5zID0gY29sdW1ucy5tYXAoY29sdW1uID0+IChjb2x1bW4uZ2V0TmF0dXJhbFdpZHRoKCkgLyB0aGlzLnRhYmxlV2lkdGgpICogMTAwKTtcblxuICAgIC8vIGluZGljYXRlIHdlIGFyZSBub3cgaW5pdGlhbGlzZWRcbiAgICBpZiAodGhpcy5pc0luaXRpYWxpc2VkJC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaXNJbml0aWFsaXNlZCQubmV4dCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogVXBkYXRlIHRoZSByZXNpemluZyBzdGF0ZSAqL1xuICBzZXRSZXNpemluZyhpc1Jlc2l6aW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Jlc2l6aW5nID0gaXNSZXNpemluZztcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIHdpZHRoIG9mIGEgY29sdW1uIGluIGEgc3BlY2lmaWMgdW5pdCAqL1xuICBnZXRDb2x1bW5XaWR0aChpbmRleDogbnVtYmVyLCB1bml0OiBDb2x1bW5Vbml0LCBjb2x1bW5zOiBSZWFkb25seUFycmF5PG51bWJlcj4gPSB0aGlzLmNvbHVtbnMpOiBudW1iZXIge1xuXG4gICAgc3dpdGNoICh1bml0KSB7XG5cbiAgICAgIGNhc2UgQ29sdW1uVW5pdC5QZXJjZW50YWdlOlxuICAgICAgICByZXR1cm4gY29sdW1uc1tpbmRleF07XG5cbiAgICAgIGNhc2UgQ29sdW1uVW5pdC5QaXhlbDpcbiAgICAgICAgcmV0dXJuICh0aGlzLnRhYmxlV2lkdGggLyAxMDApICogY29sdW1uc1tpbmRleF07XG4gICAgfVxuXG4gIH1cblxuICAvKiogQWxsb3cgc2V0dGluZyB0aGUgY29sdW1uIHNpemUgaW4gYW55IHVuaXQgKi9cbiAgc2V0Q29sdW1uV2lkdGgoaW5kZXg6IG51bWJlciwgdmFsdWU6IG51bWJlciwgdW5pdDogQ29sdW1uVW5pdCwgY29sdW1uczogUmVhZG9ubHlBcnJheTxudW1iZXI+ID0gdGhpcy5jb2x1bW5zKTogUmVhZG9ubHlBcnJheTxudW1iZXI+IHtcblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBhcnJheSBzbyB3ZSBrZWVwIHRoZSBpbnN0YW5jZSBhcnJheSBpbW11dGFibGVcbiAgICBjb25zdCBzaXplcyA9IFsuLi5jb2x1bW5zXTtcblxuICAgIHN3aXRjaCAodW5pdCkge1xuXG4gICAgICBjYXNlIENvbHVtblVuaXQuUGVyY2VudGFnZTpcbiAgICAgICAgc2l6ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIENvbHVtblVuaXQuUGl4ZWw6XG4gICAgICAgIHNpemVzW2luZGV4XSA9ICh2YWx1ZSAvIHRoaXMudGFibGVXaWR0aCkgKiAxMDA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0aGUgaW5zdGFuY2UgdmFyaWFibGVcbiAgICByZXR1cm4gc2l6ZXM7XG4gIH1cblxuICAvKiogUmVzaXplIGEgY29sdW1uIGJ5IGEgc3BlY2lmaWMgcGl4ZWwgYW1vdW50ICovXG4gIHJlc2l6ZUNvbHVtbihpbmRleDogbnVtYmVyLCBkZWx0YTogbnVtYmVyLCBpc0RyYWdnaW5nOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgLy8gZ2V0IHRoZSBzaWJsaW5nIGNvbHVtbiB0aGF0IHdpbGwgYWxzbyBiZSByZXNpemVkXG4gICAgY29uc3Qgc2libGluZyA9IHRoaXMuZ2V0U2libGluZ0NvbHVtbihpbmRleCk7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBzaWJsaW5nIHRoYXQgY2FuIGJlIHJlc2l6ZWQgdGhlbiBzdG9wIGhlcmVcbiAgICBpZiAoIXNpYmxpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSBuZXcgYXJyYXkgZm9yIHRoZSBzaXplc1xuICAgIGxldCBjb2x1bW5zID0gWy4uLnRoaXMuY29sdW1uc10gYXMgbnVtYmVyW107XG5cbiAgICAvLyByZXNpemUgdGhlIGNvbHVtbiB0byB0aGUgZGVzaXJlZCBzaXplXG4gICAgY29sdW1ucyA9IHRoaXMuc2V0Q29sdW1uV2lkdGgoaW5kZXgsIE1hdGgucm91bmQodGhpcy5nZXRDb2x1bW5XaWR0aChpbmRleCwgQ29sdW1uVW5pdC5QaXhlbCkgKyBkZWx0YSksIENvbHVtblVuaXQuUGl4ZWwsIGNvbHVtbnMpIGFzIG51bWJlcltdO1xuICAgIGNvbHVtbnMgPSB0aGlzLnNldENvbHVtbldpZHRoKHNpYmxpbmcsIE1hdGgucm91bmQodGhpcy5nZXRDb2x1bW5XaWR0aChzaWJsaW5nLCBDb2x1bW5Vbml0LlBpeGVsKSAtIGRlbHRhKSwgQ29sdW1uVW5pdC5QaXhlbCwgY29sdW1ucykgYXMgbnVtYmVyW107XG5cbiAgICAvLyBpZiB0aGUgbW92ZSBpcyBub3QgcG9zc2libGUgdGhlbiBzdG9wIGhlcmVcbiAgICBpZiAoIXRoaXMuaXNXaWR0aFZhbGlkKGluZGV4LCB0aGlzLmdldENvbHVtbldpZHRoKGluZGV4LCBDb2x1bW5Vbml0LlBpeGVsLCBjb2x1bW5zKSkgfHwgIXRoaXMuaXNXaWR0aFZhbGlkKHNpYmxpbmcsIHRoaXMuZ2V0Q29sdW1uV2lkdGgoc2libGluZywgQ29sdW1uVW5pdC5QaXhlbCwgY29sdW1ucykpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdGhhdCB3ZSBhZGQgdXAgdG8gZXhhY3RseSAxMDAlXG4gICAgY29uc3QgdG90YWwgPSBjb2x1bW5zLnJlZHVjZSgoY291bnQsIGNvbHVtbikgPT4gY29sdW1uICsgY291bnQsIDApO1xuXG4gICAgLy8gaWYgdGhlIGNvbHVtbnMgdG8gbm90IGFkZCB0byAxMDAgZW5zdXJlIHdlIG1ha2UgdGhlbVxuICAgIGlmICh0b3RhbCAhPT0gMTAwKSB7XG5cbiAgICAgIC8vIGdldCB0aGUgY29sdW1uIHdpdGggYSB2YXJpYWJsZSB3aWR0aFxuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRWYXJpYWJsZUNvbHVtbigxMDAgLSB0b3RhbCk7XG5cbiAgICAgIGlmICh0YXJnZXQgJiYgIWlzRHJhZ2dpbmcpIHtcbiAgICAgICAgY29sdW1uc1t0aGlzLl9jb2x1bW5zLnRvQXJyYXkoKS5pbmRleE9mKHRhcmdldCldICs9ICgxMDAgLSB0b3RhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5zW2luZGV4XSArPSAoMTAwIC0gdG90YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN0b3JlIHRoZSBuZXcgc2l6ZXNcbiAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zO1xuXG4gICAgLy8gZW1pdCB0aGUgcmVzaXplIGV2ZW50IGZvciBlYWNoIGNvbHVtblxuICAgIHRoaXMub25SZXNpemUkLm5leHQoKTtcbiAgfVxuXG4gIGdldFZhcmlhYmxlQ29sdW1uKGRlbHRhOiBudW1iZXIpOiBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB8IG51bGwge1xuXG4gICAgLy8gZ2V0IGFsbCB2YXJpYWJsZSB3aWR0aCBjb2x1bW5zIHRoYXQgYXJlIG5vdCBkaXNhYmxlZFxuICAgIGNvbnN0IHZhcmlhYmxlQ29sdW1ucyA9IHRoaXMuX2NvbHVtbnMuZmlsdGVyKGNvbHVtbiA9PiAhY29sdW1uLmlzRml4ZWRXaWR0aCAmJiAhY29sdW1uLmRpc2FibGVkKTtcblxuICAgIC8vIGZpbmQgb25lIHRoYXQgaXMgZ3JlYXRlciB0aGFuIGl0cyBtaW4gd2lkdGggYnkgZW5vdWdoXG4gICAgcmV0dXJuIHZhcmlhYmxlQ29sdW1ucy5yZXZlcnNlKCkuZmluZChjb2x1bW4gPT4gdGhpcy5nZXRDb2x1bW5XaWR0aChjb2x1bW4uZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGl4ZWwpID49IGNvbHVtbi5taW5XaWR0aCArIGRlbHRhKTtcbiAgfVxuXG4gIGdldENvbHVtbihpbmRleDogbnVtYmVyKTogUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucyA/IHRoaXMuX2NvbHVtbnMudG9BcnJheSgpW2luZGV4XSA6IG51bGw7XG4gIH1cblxuICBnZXRDb2x1bW5EaXNhYmxlZChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29sdW1uKGluZGV4KSA/IHRoaXMuZ2V0Q29sdW1uKGluZGV4KS5kaXNhYmxlZCA6IGZhbHNlO1xuICB9XG5cbiAgLyoqIERldGVybWluZSB3aGV0aGVyIGEgY29sdW1uIGlzIGFib3ZlIG9yIGJlbG93IGl0cyBtaW5pbXVtIHdpZHRoICovXG4gIHByaXZhdGUgaXNXaWR0aFZhbGlkKGluZGV4OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpOiBib29sZWFuIHtcblxuICAgIC8vIGdldCB0aGUgY29sdW1uIGF0IGEgZ2l2ZW4gcG9zaXRpb25cbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbkluc3RhbmNlKGluZGV4KTtcblxuICAgIC8vIGRldGVybWluZSBpZiB0aGUgc3BlY2lmaWVkIHdpZHRoIGlzIGdyZWF0ZXIgdGhhbiB0aGUgbWluIHdpZHRoXG4gICAgcmV0dXJuIGNvbHVtbiAmJiB3aWR0aCA+PSBjb2x1bW4ubWluV2lkdGg7XG4gIH1cblxuICAvKiogR2V0IHRoZSBuZXh0IGNvbHVtbiBpbiB0aGUgc2VxdWVuY2Ugb2YgY29sdW1ucyAqL1xuICBwcml2YXRlIGdldFNpYmxpbmdDb2x1bW4oaW5kZXg6IG51bWJlcik6IG51bWJlciB8IG51bGwge1xuXG4gICAgLy8gZmluZCB0aGUgZmlyc3Qgc2libGluZyB0aGF0IGlzIG5vdCBkaXNhYmxlZFxuICAgIGZvciAobGV0IGlkeCA9IGluZGV4ICsgMTsgaWR4IDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaWR4KyspIHtcblxuICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuZ2V0Q29sdW1uSW5zdGFuY2UoaWR4KTtcblxuICAgICAgaWYgKCFzaWJsaW5nIHx8ICFzaWJsaW5nLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogR2V0IHRoZSBjb2x1bW4gY2xhc3MgZnJvbSBvdXIgcXVlcnkgbGlzdCAqL1xuICBwcml2YXRlIGdldENvbHVtbkluc3RhbmNlKGluZGV4OiBudW1iZXIpOiBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zID8gdGhpcy5fY29sdW1ucy50b0FycmF5KClbaW5kZXhdIDogbnVsbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBlbnVtIENvbHVtblVuaXQge1xuICBQaXhlbCxcbiAgUGVyY2VudGFnZVxufSJdfQ==