/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class ResizableTableService {
    constructor() {
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
        if (this.isInitialised.value === false) {
            this.isInitialised.next(true);
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
     * @return {?}
     */
    resizeColumn(index, delta) {
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
            columns[index] += (100 - total);
        }
        // store the new sizes
        this.columns = columns;
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
const ColumnUnit = {
    Pixel: 0,
    Percentage: 1,
};
export { ColumnUnit };
ColumnUnit[ColumnUnit.Pixel] = "Pixel";
ColumnUnit[ColumnUnit.Percentage] = "Percentage";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUl2RCxNQUFNOzs7Ozs2QkFHWSxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7Ozs7MEJBRzdCLEtBQUs7Ozs7dUJBR00sRUFBRTs7OzswQkFHZCxDQUFDOzs7Ozs7O0lBTXRCLFVBQVUsQ0FBQyxPQUFpRDs7UUFHMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O1FBR3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzs7UUFHekYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtLQUNGOzs7Ozs7SUFHRCxXQUFXLENBQUMsVUFBbUI7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDOUI7Ozs7Ozs7O0lBR0QsY0FBYyxDQUFDLEtBQWEsRUFBRSxJQUFnQixFQUFFLFVBQWlDLElBQUksQ0FBQyxPQUFPO1FBRTNGLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFYixLQUFLLFVBQVUsQ0FBQyxV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QUMsTUFBTSxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBSXBDLGdCQUFnQixDQUFDLEtBQWE7O1FBR3BDLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBRTNELHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNaO1NBQ0Y7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0lBSU4saUJBQWlCLENBQUMsS0FBYTtRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzs7O1lBeEloRSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlVGFibGVTZXJ2aWNlIHtcblxuICAvKiogSW5kaWNhdGUgd2hlbiB0aGUgY29sdW1ucyBhcmUgcmVhZHkgKi9cbiAgaXNJbml0aWFsaXNlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKiBEZXRlcm1pbmUgaWYgd2UgYXJlIGN1cnJlbnRseSByZXNpemluZyAqL1xuICBpc1Jlc2l6aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFN0b3JlIHRoZSBwZXJjZW50YWdlIHdpZHRocyBvZiBlYWNoIGNvbHVtbiAqL1xuICBjb2x1bW5zOiBSZWFkb25seUFycmF5PG51bWJlcj4gPSBbXTtcblxuICAvKiogU3RvcmUgdGhlIGN1cnJlbnQgd2lkdGggb2YgdGhlIHRhYmxlICovXG4gIHRhYmxlV2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqIFN0b3JlIHRoZSBRdWVyeUxpc3Qgb2YgY29sdW1ucyAqL1xuICBwcml2YXRlIF9jb2x1bW5zOiBRdWVyeUxpc3Q8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQ+O1xuXG4gIC8qKiBTdG9yZSB0aGUgc2l6ZSBvZiBlYWNoIGNvbHVtbiAqL1xuICBzZXRDb2x1bW5zKGNvbHVtbnM6IFF1ZXJ5TGlzdDxSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudD4pOiB2b2lkIHtcblxuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IGNvbHVtbnNcbiAgICB0aGlzLl9jb2x1bW5zID0gY29sdW1ucztcblxuICAgIC8vIHN0b3JlIHRoZSBzaXplc1xuICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnMubWFwKGNvbHVtbiA9PiAoY29sdW1uLmdldE5hdHVyYWxXaWR0aCgpIC8gdGhpcy50YWJsZVdpZHRoKSAqIDEwMCk7XG5cbiAgICAvLyBpbmRpY2F0ZSB3ZSBhcmUgbm93IGluaXRpYWxpc2VkXG4gICAgaWYgKHRoaXMuaXNJbml0aWFsaXNlZC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaXNJbml0aWFsaXNlZC5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVcGRhdGUgdGhlIHJlc2l6aW5nIHN0YXRlICovXG4gIHNldFJlc2l6aW5nKGlzUmVzaXppbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzUmVzaXppbmcgPSBpc1Jlc2l6aW5nO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgd2lkdGggb2YgYSBjb2x1bW4gaW4gYSBzcGVjaWZpYyB1bml0ICovXG4gIGdldENvbHVtbldpZHRoKGluZGV4OiBudW1iZXIsIHVuaXQ6IENvbHVtblVuaXQsIGNvbHVtbnM6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPiA9IHRoaXMuY29sdW1ucyk6IG51bWJlciB7XG5cbiAgICBzd2l0Y2ggKHVuaXQpIHtcblxuICAgICAgY2FzZSBDb2x1bW5Vbml0LlBlcmNlbnRhZ2U6XG4gICAgICAgIHJldHVybiBjb2x1bW5zW2luZGV4XTtcblxuICAgICAgY2FzZSBDb2x1bW5Vbml0LlBpeGVsOlxuICAgICAgICByZXR1cm4gKHRoaXMudGFibGVXaWR0aCAvIDEwMCkgKiBjb2x1bW5zW2luZGV4XTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKiBBbGxvdyBzZXR0aW5nIHRoZSBjb2x1bW4gc2l6ZSBpbiBhbnkgdW5pdCAqL1xuICBzZXRDb2x1bW5XaWR0aChpbmRleDogbnVtYmVyLCB2YWx1ZTogbnVtYmVyLCB1bml0OiBDb2x1bW5Vbml0LCBjb2x1bW5zOiBSZWFkb25seUFycmF5PG51bWJlcj4gPSB0aGlzLmNvbHVtbnMpOiBSZWFkb25seUFycmF5PG51bWJlcj4ge1xuXG4gICAgLy8gY3JlYXRlIGEgbmV3IGFycmF5IHNvIHdlIGtlZXAgdGhlIGluc3RhbmNlIGFycmF5IGltbXV0YWJsZVxuICAgIGNvbnN0IHNpemVzID0gWy4uLmNvbHVtbnNdO1xuXG4gICAgc3dpdGNoICh1bml0KSB7XG5cbiAgICAgIGNhc2UgQ29sdW1uVW5pdC5QZXJjZW50YWdlOlxuICAgICAgICBzaXplc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQ29sdW1uVW5pdC5QaXhlbDpcbiAgICAgICAgc2l6ZXNbaW5kZXhdID0gKHZhbHVlIC8gdGhpcy50YWJsZVdpZHRoKSAqIDEwMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRoZSBpbnN0YW5jZSB2YXJpYWJsZVxuICAgIHJldHVybiBzaXplcztcbiAgfVxuXG4gIC8qKiBSZXNpemUgYSBjb2x1bW4gYnkgYSBzcGVjaWZpYyBwaXhlbCBhbW91bnQgKi9cbiAgcmVzaXplQ29sdW1uKGluZGV4OiBudW1iZXIsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcblxuICAgIC8vIGdldCB0aGUgc2libGluZyBjb2x1bW4gdGhhdCB3aWxsIGFsc28gYmUgcmVzaXplZFxuICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLmdldFNpYmxpbmdDb2x1bW4oaW5kZXgpO1xuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gc2libGluZyB0aGF0IGNhbiBiZSByZXNpemVkIHRoZW4gc3RvcCBoZXJlXG4gICAgaWYgKCFzaWJsaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgbmV3IGFycmF5IGZvciB0aGUgc2l6ZXNcbiAgICBsZXQgY29sdW1ucyA9IFsuLi50aGlzLmNvbHVtbnNdIGFzIG51bWJlcltdO1xuXG4gICAgLy8gcmVzaXplIHRoZSBjb2x1bW4gdG8gdGhlIGRlc2lyZWQgc2l6ZVxuICAgIGNvbHVtbnMgPSB0aGlzLnNldENvbHVtbldpZHRoKGluZGV4LCBNYXRoLnJvdW5kKHRoaXMuZ2V0Q29sdW1uV2lkdGgoaW5kZXgsIENvbHVtblVuaXQuUGl4ZWwpICsgZGVsdGEpLCBDb2x1bW5Vbml0LlBpeGVsLCBjb2x1bW5zKSBhcyBudW1iZXJbXTtcbiAgICBjb2x1bW5zID0gdGhpcy5zZXRDb2x1bW5XaWR0aChzaWJsaW5nLCBNYXRoLnJvdW5kKHRoaXMuZ2V0Q29sdW1uV2lkdGgoc2libGluZywgQ29sdW1uVW5pdC5QaXhlbCkgLSBkZWx0YSksIENvbHVtblVuaXQuUGl4ZWwsIGNvbHVtbnMpIGFzIG51bWJlcltdO1xuXG4gICAgLy8gaWYgdGhlIG1vdmUgaXMgbm90IHBvc3NpYmxlIHRoZW4gc3RvcCBoZXJlXG4gICAgaWYgKCF0aGlzLmlzV2lkdGhWYWxpZChpbmRleCwgdGhpcy5nZXRDb2x1bW5XaWR0aChpbmRleCwgQ29sdW1uVW5pdC5QaXhlbCwgY29sdW1ucykpIHx8ICF0aGlzLmlzV2lkdGhWYWxpZChzaWJsaW5nLCB0aGlzLmdldENvbHVtbldpZHRoKHNpYmxpbmcsIENvbHVtblVuaXQuUGl4ZWwsIGNvbHVtbnMpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHRoYXQgd2UgYWRkIHVwIHRvIGV4YWN0bHkgMTAwJVxuICAgIGNvbnN0IHRvdGFsID0gY29sdW1ucy5yZWR1Y2UoKGNvdW50LCBjb2x1bW4pID0+IGNvbHVtbiArIGNvdW50LCAwKTtcblxuICAgIC8vIGlmIHRoZSBjb2x1bW5zIHRvIG5vdCBhZGQgdG8gMTAwIGVuc3VyZSB3ZSBtYWtlIHRoZW1cbiAgICBpZiAodG90YWwgIT09IDEwMCkge1xuICAgICAgY29sdW1uc1tpbmRleF0gKz0gKDEwMCAtIHRvdGFsKTtcbiAgICB9XG5cbiAgICAvLyBzdG9yZSB0aGUgbmV3IHNpemVzXG4gICAgdGhpcy5jb2x1bW5zID0gY29sdW1ucztcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmUgd2hldGhlciBhIGNvbHVtbiBpcyBhYm92ZSBvciBiZWxvdyBpdHMgbWluaW11bSB3aWR0aCAqL1xuICBwcml2YXRlIGlzV2lkdGhWYWxpZChpbmRleDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICAvLyBnZXQgdGhlIGNvbHVtbiBhdCBhIGdpdmVuIHBvc2l0aW9uXG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW5JbnN0YW5jZShpbmRleCk7XG5cbiAgICAvLyBkZXRlcm1pbmUgaWYgdGhlIHNwZWNpZmllZCB3aWR0aCBpcyBncmVhdGVyIHRoYW4gdGhlIG1pbiB3aWR0aFxuICAgIHJldHVybiBjb2x1bW4gJiYgd2lkdGggPj0gY29sdW1uLm1pbldpZHRoO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgbmV4dCBjb2x1bW4gaW4gdGhlIHNlcXVlbmNlIG9mIGNvbHVtbnMgKi9cbiAgcHJpdmF0ZSBnZXRTaWJsaW5nQ29sdW1uKGluZGV4OiBudW1iZXIpOiBudW1iZXIgfCBudWxsIHtcblxuICAgIC8vIGZpbmQgdGhlIGZpcnN0IHNpYmxpbmcgdGhhdCBpcyBub3QgZGlzYWJsZWRcbiAgICBmb3IgKGxldCBpZHggPSBpbmRleCArIDE7IGlkeCA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGlkeCsrKSB7XG5cbiAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLmdldENvbHVtbkluc3RhbmNlKGlkeCk7XG5cbiAgICAgIGlmICghc2libGluZyB8fCAhc2libGluZy5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgY29sdW1uIGNsYXNzIGZyb20gb3VyIHF1ZXJ5IGxpc3QgKi9cbiAgcHJpdmF0ZSBnZXRDb2x1bW5JbnN0YW5jZShpbmRleDogbnVtYmVyKTogUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucyA/IHRoaXMuX2NvbHVtbnMudG9BcnJheSgpW2luZGV4XSA6IG51bGw7XG4gIH1cblxufVxuXG5leHBvcnQgZW51bSBDb2x1bW5Vbml0IHtcbiAgUGl4ZWwsXG4gIFBlcmNlbnRhZ2Vcbn0iXX0=