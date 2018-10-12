/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var ResizableTableService = /** @class */ (function () {
    function ResizableTableService() {
        /**
         * Indicate when the columns are ready
         */
        this.isInitialised = new BehaviorSubject(false);
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
    }
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
        if (this.isInitialised.value === false) {
            this.isInitialised.next(true);
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
     * @return {?}
     */
    ResizableTableService.prototype.resizeColumn = /**
     * Resize a column by a specific pixel amount
     * @param {?} index
     * @param {?} delta
     * @return {?}
     */
    function (index, delta) {
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
            columns[index] += (100 - total);
        }
        // store the new sizes
        this.columns = columns;
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
    ResizableTableService.prototype.isInitialised;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs2QkFPckMsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzs7OzBCQUc3QixLQUFLOzs7O3VCQUdNLEVBQUU7Ozs7MEJBR2QsQ0FBQzs7SUFLdEIsb0NBQW9DOzs7Ozs7SUFDcEMsMENBQVU7Ozs7O0lBQVYsVUFBVyxPQUFpRDtRQUE1RCxpQkFZQzs7UUFUQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7UUFHeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsRUFBbEQsQ0FBa0QsQ0FBQyxDQUFDOztRQUd6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7SUFFRCxnQ0FBZ0M7Ozs7OztJQUNoQywyQ0FBVzs7Ozs7SUFBWCxVQUFZLFVBQW1CO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0tBQzlCO0lBRUQsbURBQW1EOzs7Ozs7OztJQUNuRCw4Q0FBYzs7Ozs7OztJQUFkLFVBQWUsS0FBYSxFQUFFLElBQWdCLEVB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LEtBQUssQ0FBQyxDQUFDO1NBQ2pDOztRQUdELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQ3hCOzs7Ozs7O0lBR08sNENBQVk7Ozs7OztjQUFDLEtBQWEsRUFBRSxLQUFhOztRQUcvQyxxQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUc3QyxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBSXBDLGdEQUFnQjs7Ozs7Y0FBQyxLQUFhOztRQUdwQyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUUzRCxxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWjtTQUNGO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7OztJQUlOLGlEQUFpQjs7Ozs7Y0FBQyxLQUFhO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7OztnQkF4SWhFLFVBQVU7O2dDQUpYOztTQUthLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZVRhYmxlU2VydmljZSB7XG5cbiAgLyoqIEluZGljYXRlIHdoZW4gdGhlIGNvbHVtbnMgYXJlIHJlYWR5ICovXG4gIGlzSW5pdGlhbGlzZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKiogRGV0ZXJtaW5lIGlmIHdlIGFyZSBjdXJyZW50bHkgcmVzaXppbmcgKi9cbiAgaXNSZXNpemluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTdG9yZSB0aGUgcGVyY2VudGFnZSB3aWR0aHMgb2YgZWFjaCBjb2x1bW4gKi9cbiAgY29sdW1uczogUmVhZG9ubHlBcnJheTxudW1iZXI+ID0gW107XG5cbiAgLyoqIFN0b3JlIHRoZSBjdXJyZW50IHdpZHRoIG9mIHRoZSB0YWJsZSAqL1xuICB0YWJsZVdpZHRoOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBTdG9yZSB0aGUgUXVlcnlMaXN0IG9mIGNvbHVtbnMgKi9cbiAgcHJpdmF0ZSBfY29sdW1uczogUXVlcnlMaXN0PFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50PjtcblxuICAvKiogU3RvcmUgdGhlIHNpemUgb2YgZWFjaCBjb2x1bW4gKi9cbiAgc2V0Q29sdW1ucyhjb2x1bW5zOiBRdWVyeUxpc3Q8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQ+KTogdm9pZCB7XG5cbiAgICAvLyBzdG9yZSB0aGUgY3VycmVudCBjb2x1bW5zXG4gICAgdGhpcy5fY29sdW1ucyA9IGNvbHVtbnM7XG5cbiAgICAvLyBzdG9yZSB0aGUgc2l6ZXNcbiAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zLm1hcChjb2x1bW4gPT4gKGNvbHVtbi5nZXROYXR1cmFsV2lkdGgoKSAvIHRoaXMudGFibGVXaWR0aCkgKiAxMDApO1xuXG4gICAgLy8gaW5kaWNhdGUgd2UgYXJlIG5vdyBpbml0aWFsaXNlZFxuICAgIGlmICh0aGlzLmlzSW5pdGlhbGlzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmlzSW5pdGlhbGlzZWQubmV4dCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogVXBkYXRlIHRoZSByZXNpemluZyBzdGF0ZSAqL1xuICBzZXRSZXNpemluZyhpc1Jlc2l6aW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Jlc2l6aW5nID0gaXNSZXNpemluZztcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIHdpZHRoIG9mIGEgY29sdW1uIGluIGEgc3BlY2lmaWMgdW5pdCAqL1xuICBnZXRDb2x1bW5XaWR0aChpbmRleDogbnVtYmVyLCB1bml0OiBDb2x1bW5Vbml0LCBjb2x1bW5zOiBSZWFkb25seUFycmF5PG51bWJlcj4gPSB0aGlzLmNvbHVtbnMpOiBudW1iZXIge1xuXG4gICAgc3dpdGNoICh1bml0KSB7XG5cbiAgICAgIGNhc2UgQ29sdW1uVW5pdC5QZXJjZW50YWdlOlxuICAgICAgICByZXR1cm4gY29sdW1uc1tpbmRleF07XG5cbiAgICAgIGNhc2UgQ29sdW1uVW5pdC5QaXhlbDpcbiAgICAgICAgcmV0dXJuICh0aGlzLnRhYmxlV2lkdGggLyAxMDApICogY29sdW1uc1tpbmRleF07XG4gICAgfVxuXG4gIH1cblxuICAvKiogQWxsb3cgc2V0dGluZyB0aGUgY29sdW1uIHNpemUgaW4gYW55IHVuaXQgKi9cbiAgc2V0Q29sdW1uV2lkdGgoaW5kZXg6IG51bWJlciwgdmFsdWU6IG51bWJlciwgdW5pdDogQ29sdW1uVW5pdCwgY29sdW1uczogUmVhZG9ubHlBcnJheTxudW1iZXI+ID0gdGhpcy5jb2x1bW5zKTogUmVhZG9ubHlBcnJheTxudW1iZXI+IHtcblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBhcnJheSBzbyB3ZSBrZWVwIHRoZSBpbnN0YW5jZSBhcnJheSBpbW11dGFibGVcbiAgICBjb25zdCBzaXplcyA9IFsuLi5jb2x1bW5zXTtcblxuICAgIHN3aXRjaCAodW5pdCkge1xuXG4gICAgICBjYXNlIENvbHVtblVuaXQuUGVyY2VudGFnZTpcbiAgICAgICAgc2l6ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIENvbHVtblVuaXQuUGl4ZWw6XG4gICAgICAgIHNpemVzW2luZGV4XSA9ICh2YWx1ZSAvIHRoaXMudGFibGVXaWR0aCkgKiAxMDA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0aGUgaW5zdGFuY2UgdmFyaWFibGVcbiAgICByZXR1cm4gc2l6ZXM7XG4gIH1cblxuICAvKiogUmVzaXplIGEgY29sdW1uIGJ5IGEgc3BlY2lmaWMgcGl4ZWwgYW1vdW50ICovXG4gIHJlc2l6ZUNvbHVtbihpbmRleDogbnVtYmVyLCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAvLyBnZXQgdGhlIHNpYmxpbmcgY29sdW1uIHRoYXQgd2lsbCBhbHNvIGJlIHJlc2l6ZWRcbiAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5nZXRTaWJsaW5nQ29sdW1uKGluZGV4KTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIHNpYmxpbmcgdGhhdCBjYW4gYmUgcmVzaXplZCB0aGVuIHN0b3AgaGVyZVxuICAgIGlmICghc2libGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBhcnJheSBmb3IgdGhlIHNpemVzXG4gICAgbGV0IGNvbHVtbnMgPSBbLi4udGhpcy5jb2x1bW5zXSBhcyBudW1iZXJbXTtcblxuICAgIC8vIHJlc2l6ZSB0aGUgY29sdW1uIHRvIHRoZSBkZXNpcmVkIHNpemVcbiAgICBjb2x1bW5zID0gdGhpcy5zZXRDb2x1bW5XaWR0aChpbmRleCwgTWF0aC5yb3VuZCh0aGlzLmdldENvbHVtbldpZHRoKGluZGV4LCBDb2x1bW5Vbml0LlBpeGVsKSArIGRlbHRhKSwgQ29sdW1uVW5pdC5QaXhlbCwgY29sdW1ucykgYXMgbnVtYmVyW107XG4gICAgY29sdW1ucyA9IHRoaXMuc2V0Q29sdW1uV2lkdGgoc2libGluZywgTWF0aC5yb3VuZCh0aGlzLmdldENvbHVtbldpZHRoKHNpYmxpbmcsIENvbHVtblVuaXQuUGl4ZWwpIC0gZGVsdGEpLCBDb2x1bW5Vbml0LlBpeGVsLCBjb2x1bW5zKSBhcyBudW1iZXJbXTtcblxuICAgIC8vIGlmIHRoZSBtb3ZlIGlzIG5vdCBwb3NzaWJsZSB0aGVuIHN0b3AgaGVyZVxuICAgIGlmICghdGhpcy5pc1dpZHRoVmFsaWQoaW5kZXgsIHRoaXMuZ2V0Q29sdW1uV2lkdGgoaW5kZXgsIENvbHVtblVuaXQuUGl4ZWwsIGNvbHVtbnMpKSB8fCAhdGhpcy5pc1dpZHRoVmFsaWQoc2libGluZywgdGhpcy5nZXRDb2x1bW5XaWR0aChzaWJsaW5nLCBDb2x1bW5Vbml0LlBpeGVsLCBjb2x1bW5zKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB0aGF0IHdlIGFkZCB1cCB0byBleGFjdGx5IDEwMCVcbiAgICBjb25zdCB0b3RhbCA9IGNvbHVtbnMucmVkdWNlKChjb3VudCwgY29sdW1uKSA9PiBjb2x1bW4gKyBjb3VudCwgMCk7XG5cbiAgICAvLyBpZiB0aGUgY29sdW1ucyB0byBub3QgYWRkIHRvIDEwMCBlbnN1cmUgd2UgbWFrZSB0aGVtXG4gICAgaWYgKHRvdGFsICE9PSAxMDApIHtcbiAgICAgIGNvbHVtbnNbaW5kZXhdICs9ICgxMDAgLSB0b3RhbCk7XG4gICAgfVxuXG4gICAgLy8gc3RvcmUgdGhlIG5ldyBzaXplc1xuICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnM7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2x1bW4gaXMgYWJvdmUgb3IgYmVsb3cgaXRzIG1pbmltdW0gd2lkdGggKi9cbiAgcHJpdmF0ZSBpc1dpZHRoVmFsaWQoaW5kZXg6IG51bWJlciwgd2lkdGg6IG51bWJlcik6IGJvb2xlYW4ge1xuXG4gICAgLy8gZ2V0IHRoZSBjb2x1bW4gYXQgYSBnaXZlbiBwb3NpdGlvblxuICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uSW5zdGFuY2UoaW5kZXgpO1xuXG4gICAgLy8gZGV0ZXJtaW5lIGlmIHRoZSBzcGVjaWZpZWQgd2lkdGggaXMgZ3JlYXRlciB0aGFuIHRoZSBtaW4gd2lkdGhcbiAgICByZXR1cm4gY29sdW1uICYmIHdpZHRoID49IGNvbHVtbi5taW5XaWR0aDtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIG5leHQgY29sdW1uIGluIHRoZSBzZXF1ZW5jZSBvZiBjb2x1bW5zICovXG4gIHByaXZhdGUgZ2V0U2libGluZ0NvbHVtbihpbmRleDogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBzaWJsaW5nIHRoYXQgaXMgbm90IGRpc2FibGVkXG4gICAgZm9yIChsZXQgaWR4ID0gaW5kZXggKyAxOyBpZHggPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpZHgrKykge1xuXG4gICAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5nZXRDb2x1bW5JbnN0YW5jZShpZHgpO1xuXG4gICAgICBpZiAoIXNpYmxpbmcgfHwgIXNpYmxpbmcuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIGNvbHVtbiBjbGFzcyBmcm9tIG91ciBxdWVyeSBsaXN0ICovXG4gIHByaXZhdGUgZ2V0Q29sdW1uSW5zdGFuY2UoaW5kZXg6IG51bWJlcik6IFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnMgPyB0aGlzLl9jb2x1bW5zLnRvQXJyYXkoKVtpbmRleF0gOiBudWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGVudW0gQ29sdW1uVW5pdCB7XG4gIFBpeGVsLFxuICBQZXJjZW50YWdlXG59Il19