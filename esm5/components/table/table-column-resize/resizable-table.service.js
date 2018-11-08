/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
var ResizableTableService = /** @class */ (function () {
    function ResizableTableService() {
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
    /** Cleanup when service is disposed */
    /**
     * Cleanup when service is disposed
     * @return {?}
     */
    ResizableTableService.prototype.ngOnDestroy = /**
     * Cleanup when service is disposed
     * @return {?}
     */
    function () {
        this.onResize$.complete();
    };
    /** Store the size of each column */
    /**
     * Store the size of each column
     * @param {?} columns
     * @return {?}
     */
    ResizableTableService.prototype.setColumns = /**
     * Store the size of each column
     * @param {?} columns
     * @return {?}
     */
    function (columns) {
        var _this = this;
        // store the current columns
        this._columns = columns;
        // store the sizes
        this.columns = columns.map(function (column) { return (column.getNaturalWidth() / _this.tableWidth) * 100; });
        // indicate we are now initialised
        if (this.isInitialised$.value === false) {
            this.isInitialised$.next(true);
        }
    };
    /** Update the resizing state */
    /**
     * Update the resizing state
     * @param {?} isResizing
     * @return {?}
     */
    ResizableTableService.prototype.setResizing = /**
     * Update the resizing state
     * @param {?} isResizing
     * @return {?}
     */
    function (isResizing) {
        this.isResizing = isResizing;
    };
    /** Get the width of a column in a specific unit */
    /**
     * Get the width of a column in a specific unit
     * @param {?} index
     * @param {?} unit
     * @param {?=} columns
     * @return {?}
     */
    ResizableTableService.prototype.getColumnWidth = /**
     * Get the width of a column in a specific unit
     * @param {?} index
     * @param {?} unit
     * @param {?=} columns
     * @return {?}
     */
    function (index, unit, columns) {
        if (columns === void 0) { columns = this.columns; }
        switch (unit) {
            case ColumnUnit.Percentage:
                return columns[index];
            case ColumnUnit.Pixel:
                return (this.tableWidth / 100) * columns[index];
        }
    };
    /** Allow setting the column size in any unit */
    /**
     * Allow setting the column size in any unit
     * @param {?} index
     * @param {?} value
     * @param {?} unit
     * @param {?=} columns
     * @return {?}
     */
    ResizableTableService.prototype.setColumnWidth = /**
     * Allow setting the column size in any unit
     * @param {?} index
     * @param {?} value
     * @param {?} unit
     * @param {?=} columns
     * @return {?}
     */
    function (index, value, unit, columns) {
        if (columns === void 0) { columns = this.columns; }
        // create a new array so we keep the instance array immutable
        var /** @type {?} */ sizes = tslib_1.__spread(columns);
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
    };
    /** Resize a column by a specific pixel amount */
    /**
     * Resize a column by a specific pixel amount
     * @param {?} index
     * @param {?} delta
     * @param {?=} isDragging
     * @return {?}
     */
    ResizableTableService.prototype.resizeColumn = /**
     * Resize a column by a specific pixel amount
     * @param {?} index
     * @param {?} delta
     * @param {?=} isDragging
     * @return {?}
     */
    function (index, delta, isDragging) {
        if (isDragging === void 0) { isDragging = true; }
        // get the sibling column that will also be resized
        var /** @type {?} */ sibling = this.getSiblingColumn(index);
        // if there is no sibling that can be resized then stop here
        if (!sibling) {
            return;
        }
        // create a new array for the sizes
        var /** @type {?} */ columns = /** @type {?} */ (tslib_1.__spread(this.columns));
        // resize the column to the desired size
        columns = /** @type {?} */ (this.setColumnWidth(index, Math.round(this.getColumnWidth(index, ColumnUnit.Pixel) + delta), ColumnUnit.Pixel, columns));
        columns = /** @type {?} */ (this.setColumnWidth(sibling, Math.round(this.getColumnWidth(sibling, ColumnUnit.Pixel) - delta), ColumnUnit.Pixel, columns));
        // if the move is not possible then stop here
        if (!this.isWidthValid(index, this.getColumnWidth(index, ColumnUnit.Pixel, columns)) || !this.isWidthValid(sibling, this.getColumnWidth(sibling, ColumnUnit.Pixel, columns))) {
            return;
        }
        // check that we add up to exactly 100%
        var /** @type {?} */ total = columns.reduce(function (count, column) { return column + count; }, 0);
        // if the columns to not add to 100 ensure we make them
        if (total !== 100) {
            // get the column with a variable width
            var /** @type {?} */ target = this.getVariableColumn(100 - total);
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
    };
    /**
     * @param {?} delta
     * @return {?}
     */
    ResizableTableService.prototype.getVariableColumn = /**
     * @param {?} delta
     * @return {?}
     */
    function (delta) {
        var _this = this;
        // get all variable width columns that are not disabled
        var /** @type {?} */ variableColumns = this._columns.filter(function (column) { return !column.isFixedWidth && !column.disabled; });
        // find one that is greater than its min width by enough
        return variableColumns.reverse().find(function (column) { return _this.getColumnWidth(column.getCellIndex(), ColumnUnit.Pixel) >= column.minWidth + delta; });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ResizableTableService.prototype.getColumn = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this._columns ? this._columns.toArray()[index] : null;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ResizableTableService.prototype.getColumnDisabled = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.getColumn(index) ? this.getColumn(index).disabled : false;
    };
    /**
     * Determine whether a column is above or below its minimum width
     * @param {?} index
     * @param {?} width
     * @return {?}
     */
    ResizableTableService.prototype.isWidthValid = /**
     * Determine whether a column is above or below its minimum width
     * @param {?} index
     * @param {?} width
     * @return {?}
     */
    function (index, width) {
        // get the column at a given position
        var /** @type {?} */ column = this.getColumnInstance(index);
        // determine if the specified width is greater than the min width
        return column && width >= column.minWidth;
    };
    /**
     * Get the next column in the sequence of columns
     * @param {?} index
     * @return {?}
     */
    ResizableTableService.prototype.getSiblingColumn = /**
     * Get the next column in the sequence of columns
     * @param {?} index
     * @return {?}
     */
    function (index) {
        // find the first sibling that is not disabled
        for (var /** @type {?} */ idx = index + 1; idx < this.columns.length; idx++) {
            var /** @type {?} */ sibling = this.getColumnInstance(idx);
            if (!sibling || !sibling.disabled) {
                return idx;
            }
        }
        return null;
    };
    /**
     * Get the column class from our query list
     * @param {?} index
     * @return {?}
     */
    ResizableTableService.prototype.getColumnInstance = /**
     * Get the column class from our query list
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this._columns ? this._columns.toArray()[index] : null;
    };
    ResizableTableService.decorators = [
        { type: Injectable }
    ];
    return ResizableTableService;
}());
export { ResizableTableService };
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
var ColumnUnit = {
    Pixel: 0,
    Percentage: 1,
};
export { ColumnUnit };
ColumnUnit[ColumnUnit.Pixel] = "Pixel";
ColumnUnit[ColumnUnit.Percentage] = "Percentage";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs4QkFPcEIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzs7OzBCQUc5QixLQUFLOzs7O3VCQUdNLEVBQUU7Ozs7MEJBR2QsQ0FBQzs7Ozt5QkFHVixJQUFJLE9BQU8sRUFBUTs7SUFLL0IsdUNBQXVDOzs7OztJQUN2QywyQ0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMzQjtJQUVELG9DQUFvQzs7Ozs7O0lBQ3BDLDBDQUFVOzs7OztJQUFWLFVBQVcsT0FBaUQ7UUFBNUQsaUJBWUM7O1FBVEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O1FBR3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLEVBQWxELENBQWtELENBQUMsQ0FBQzs7UUFHekYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztLQUNGO0lBRUQsZ0NB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QUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzs7Z0JBNUtoRSxVQUFVOztnQ0FMWDs7U0FNYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlVGFibGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvKiogSW5kaWNhdGUgd2hlbiB0aGUgY29sdW1ucyBhcmUgcmVhZHkgKi9cbiAgaXNJbml0aWFsaXNlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKiogRGV0ZXJtaW5lIGlmIHdlIGFyZSBjdXJyZW50bHkgcmVzaXppbmcgKi9cbiAgaXNSZXNpemluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTdG9yZSB0aGUgcGVyY2VudGFnZSB3aWR0aHMgb2YgZWFjaCBjb2x1bW4gKi9cbiAgY29sdW1uczogUmVhZG9ubHlBcnJheTxudW1iZXI+ID0gW107XG5cbiAgLyoqIFN0b3JlIHRoZSBjdXJyZW50IHdpZHRoIG9mIHRoZSB0YWJsZSAqL1xuICB0YWJsZVdpZHRoOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBFbWl0IGFuIGV2ZW50IHdoZW5ldmVyIGEgY29sdW1uIGlzIHJlc2l6ZWQgKi9cbiAgb25SZXNpemUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogU3RvcmUgdGhlIFF1ZXJ5TGlzdCBvZiBjb2x1bW5zICovXG4gIHByaXZhdGUgX2NvbHVtbnM6IFF1ZXJ5TGlzdDxSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudD47XG5cbiAgLyoqIENsZWFudXAgd2hlbiBzZXJ2aWNlIGlzIGRpc3Bvc2VkICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMub25SZXNpemUkLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogU3RvcmUgdGhlIHNpemUgb2YgZWFjaCBjb2x1bW4gKi9cbiAgc2V0Q29sdW1ucyhjb2x1bW5zOiBRdWVyeUxpc3Q8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQ+KTogdm9pZCB7XG5cbiAgICAvLyBzdG9yZSB0aGUgY3VycmVudCBjb2x1bW5zXG4gICAgdGhpcy5fY29sdW1ucyA9IGNvbHVtbnM7XG5cbiAgICAvLyBzdG9yZSB0aGUgc2l6ZXNcbiAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zLm1hcChjb2x1bW4gPT4gKGNvbHVtbi5nZXROYXR1cmFsV2lkdGgoKSAvIHRoaXMudGFibGVXaWR0aCkgKiAxMDApO1xuXG4gICAgLy8gaW5kaWNhdGUgd2UgYXJlIG5vdyBpbml0aWFsaXNlZFxuICAgIGlmICh0aGlzLmlzSW5pdGlhbGlzZWQkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5pc0luaXRpYWxpc2VkJC5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVcGRhdGUgdGhlIHJlc2l6aW5nIHN0YXRlICovXG4gIHNldFJlc2l6aW5nKGlzUmVzaXppbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzUmVzaXppbmcgPSBpc1Jlc2l6aW5nO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgd2lkdGggb2YgYSBjb2x1bW4gaW4gYSBzcGVjaWZpYyB1bml0ICovXG4gIGdldENvbHVtbldpZHRoKGluZGV4OiBudW1iZXIsIHVuaXQ6IENvbHVtblVuaXQsIGNvbHVtbnM6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPiA9IHRoaXMuY29sdW1ucyk6IG51bWJlciB7XG5cbiAgICBzd2l0Y2ggKHVuaXQpIHtcblxuICAgICAgY2FzZSBDb2x1bW5Vbml0LlBlcmNlbnRhZ2U6XG4gICAgICAgIHJldHVybiBjb2x1bW5zW2luZGV4XTtcblxuICAgICAgY2FzZSBDb2x1bW5Vbml0LlBpeGVsOlxuICAgICAgICByZXR1cm4gKHRoaXMudGFibGVXaWR0aCAvIDEwMCkgKiBjb2x1bW5zW2luZGV4XTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKiBBbGxvdyBzZXR0aW5nIHRoZSBjb2x1bW4gc2l6ZSBpbiBhbnkgdW5pdCAqL1xuICBzZXRDb2x1bW5XaWR0aChpbmRleDogbnVtYmVyLCB2YWx1ZTogbnVtYmVyLCB1bml0OiBDb2x1bW5Vbml0LCBjb2x1bW5zOiBSZWFkb25seUFycmF5PG51bWJlcj4gPSB0aGlzLmNvbHVtbnMpOiBSZWFkb25seUFycmF5PG51bWJlcj4ge1xuXG4gICAgLy8gY3JlYXRlIGEgbmV3IGFycmF5IHNvIHdlIGtlZXAgdGhlIGluc3RhbmNlIGFycmF5IGltbXV0YWJsZVxuICAgIGNvbnN0IHNpemVzID0gWy4uLmNvbHVtbnNdO1xuXG4gICAgc3dpdGNoICh1bml0KSB7XG5cbiAgICAgIGNhc2UgQ29sdW1uVW5pdC5QZXJjZW50YWdlOlxuICAgICAgICBzaXplc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQ29sdW1uVW5pdC5QaXhlbDpcbiAgICAgICAgc2l6ZXNbaW5kZXhdID0gKHZhbHVlIC8gdGhpcy50YWJsZVdpZHRoKSAqIDEwMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRoZSBpbnN0YW5jZSB2YXJpYWJsZVxuICAgIHJldHVybiBzaXplcztcbiAgfVxuXG4gIC8qKiBSZXNpemUgYSBjb2x1bW4gYnkgYSBzcGVjaWZpYyBwaXhlbCBhbW91bnQgKi9cbiAgcmVzaXplQ29sdW1uKGluZGV4OiBudW1iZXIsIGRlbHRhOiBudW1iZXIsIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG5cbiAgICAvLyBnZXQgdGhlIHNpYmxpbmcgY29sdW1uIHRoYXQgd2lsbCBhbHNvIGJlIHJlc2l6ZWRcbiAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5nZXRTaWJsaW5nQ29sdW1uKGluZGV4KTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIHNpYmxpbmcgdGhhdCBjYW4gYmUgcmVzaXplZCB0aGVuIHN0b3AgaGVyZVxuICAgIGlmICghc2libGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBhcnJheSBmb3IgdGhlIHNpemVzXG4gICAgbGV0IGNvbHVtbnMgPSBbLi4udGhpcy5jb2x1bW5zXSBhcyBudW1iZXJbXTtcblxuICAgIC8vIHJlc2l6ZSB0aGUgY29sdW1uIHRvIHRoZSBkZXNpcmVkIHNpemVcbiAgICBjb2x1bW5zID0gdGhpcy5zZXRDb2x1bW5XaWR0aChpbmRleCwgTWF0aC5yb3VuZCh0aGlzLmdldENvbHVtbldpZHRoKGluZGV4LCBDb2x1bW5Vbml0LlBpeGVsKSArIGRlbHRhKSwgQ29sdW1uVW5pdC5QaXhlbCwgY29sdW1ucykgYXMgbnVtYmVyW107XG4gICAgY29sdW1ucyA9IHRoaXMuc2V0Q29sdW1uV2lkdGgoc2libGluZywgTWF0aC5yb3VuZCh0aGlzLmdldENvbHVtbldpZHRoKHNpYmxpbmcsIENvbHVtblVuaXQuUGl4ZWwpIC0gZGVsdGEpLCBDb2x1bW5Vbml0LlBpeGVsLCBjb2x1bW5zKSBhcyBudW1iZXJbXTtcblxuICAgIC8vIGlmIHRoZSBtb3ZlIGlzIG5vdCBwb3NzaWJsZSB0aGVuIHN0b3AgaGVyZVxuICAgIGlmICghdGhpcy5pc1dpZHRoVmFsaWQoaW5kZXgsIHRoaXMuZ2V0Q29sdW1uV2lkdGgoaW5kZXgsIENvbHVtblVuaXQuUGl4ZWwsIGNvbHVtbnMpKSB8fCAhdGhpcy5pc1dpZHRoVmFsaWQoc2libGluZywgdGhpcy5nZXRDb2x1bW5XaWR0aChzaWJsaW5nLCBDb2x1bW5Vbml0LlBpeGVsLCBjb2x1bW5zKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB0aGF0IHdlIGFkZCB1cCB0byBleGFjdGx5IDEwMCVcbiAgICBjb25zdCB0b3RhbCA9IGNvbHVtbnMucmVkdWNlKChjb3VudCwgY29sdW1uKSA9PiBjb2x1bW4gKyBjb3VudCwgMCk7XG5cbiAgICAvLyBpZiB0aGUgY29sdW1ucyB0byBub3QgYWRkIHRvIDEwMCBlbnN1cmUgd2UgbWFrZSB0aGVtXG4gICAgaWYgKHRvdGFsICE9PSAxMDApIHtcblxuICAgICAgLy8gZ2V0IHRoZSBjb2x1bW4gd2l0aCBhIHZhcmlhYmxlIHdpZHRoXG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldFZhcmlhYmxlQ29sdW1uKDEwMCAtIHRvdGFsKTtcblxuICAgICAgaWYgKHRhcmdldCAmJiAhaXNEcmFnZ2luZykge1xuICAgICAgICBjb2x1bW5zW3RoaXMuX2NvbHVtbnMudG9BcnJheSgpLmluZGV4T2YodGFyZ2V0KV0gKz0gKDEwMCAtIHRvdGFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbnNbaW5kZXhdICs9ICgxMDAgLSB0b3RhbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc3RvcmUgdGhlIG5ldyBzaXplc1xuICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnM7XG5cbiAgICAvLyBlbWl0IHRoZSByZXNpemUgZXZlbnQgZm9yIGVhY2ggY29sdW1uXG4gICAgdGhpcy5vblJlc2l6ZSQubmV4dCgpO1xuICB9XG5cbiAgZ2V0VmFyaWFibGVDb2x1bW4oZGVsdGE6IG51bWJlcik6IFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50IHwgbnVsbCB7XG5cbiAgICAvLyBnZXQgYWxsIHZhcmlhYmxlIHdpZHRoIGNvbHVtbnMgdGhhdCBhcmUgbm90IGRpc2FibGVkXG4gICAgY29uc3QgdmFyaWFibGVDb2x1bW5zID0gdGhpcy5fY29sdW1ucy5maWx0ZXIoY29sdW1uID0+ICFjb2x1bW4uaXNGaXhlZFdpZHRoICYmICFjb2x1bW4uZGlzYWJsZWQpO1xuXG4gICAgLy8gZmluZCBvbmUgdGhhdCBpcyBncmVhdGVyIHRoYW4gaXRzIG1pbiB3aWR0aCBieSBlbm91Z2hcbiAgICByZXR1cm4gdmFyaWFibGVDb2x1bW5zLnJldmVyc2UoKS5maW5kKGNvbHVtbiA9PiB0aGlzLmdldENvbHVtbldpZHRoKGNvbHVtbi5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCkgPj0gY29sdW1uLm1pbldpZHRoICsgZGVsdGEpO1xuICB9XG5cbiAgZ2V0Q29sdW1uKGluZGV4OiBudW1iZXIpOiBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zID8gdGhpcy5fY29sdW1ucy50b0FycmF5KClbaW5kZXhdIDogbnVsbDtcbiAgfVxuXG4gIGdldENvbHVtbkRpc2FibGVkKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb2x1bW4oaW5kZXgpID8gdGhpcy5nZXRDb2x1bW4oaW5kZXgpLmRpc2FibGVkIDogZmFsc2U7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2x1bW4gaXMgYWJvdmUgb3IgYmVsb3cgaXRzIG1pbmltdW0gd2lkdGggKi9cbiAgcHJpdmF0ZSBpc1dpZHRoVmFsaWQoaW5kZXg6IG51bWJlciwgd2lkdGg6IG51bWJlcik6IGJvb2xlYW4ge1xuXG4gICAgLy8gZ2V0IHRoZSBjb2x1bW4gYXQgYSBnaXZlbiBwb3NpdGlvblxuICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uSW5zdGFuY2UoaW5kZXgpO1xuXG4gICAgLy8gZGV0ZXJtaW5lIGlmIHRoZSBzcGVjaWZpZWQgd2lkdGggaXMgZ3JlYXRlciB0aGFuIHRoZSBtaW4gd2lkdGhcbiAgICByZXR1cm4gY29sdW1uICYmIHdpZHRoID49IGNvbHVtbi5taW5XaWR0aDtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIG5leHQgY29sdW1uIGluIHRoZSBzZXF1ZW5jZSBvZiBjb2x1bW5zICovXG4gIHByaXZhdGUgZ2V0U2libGluZ0NvbHVtbihpbmRleDogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBzaWJsaW5nIHRoYXQgaXMgbm90IGRpc2FibGVkXG4gICAgZm9yIChsZXQgaWR4ID0gaW5kZXggKyAxOyBpZHggPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpZHgrKykge1xuXG4gICAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5nZXRDb2x1bW5JbnN0YW5jZShpZHgpO1xuXG4gICAgICBpZiAoIXNpYmxpbmcgfHwgIXNpYmxpbmcuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIGNvbHVtbiBjbGFzcyBmcm9tIG91ciBxdWVyeSBsaXN0ICovXG4gIHByaXZhdGUgZ2V0Q29sdW1uSW5zdGFuY2UoaW5kZXg6IG51bWJlcik6IFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnMgPyB0aGlzLl9jb2x1bW5zLnRvQXJyYXkoKVtpbmRleF0gOiBudWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGVudW0gQ29sdW1uVW5pdCB7XG4gIFBpeGVsLFxuICBQZXJjZW50YWdlXG59Il19