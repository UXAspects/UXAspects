/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
export class ResizableTableService {
    constructor() {
        /**
         * determine whether or not we are currently sizing
         */
        this.resizing = false;
        /**
         * store the percentage widths of all the columns
         */
        this.sizes = new ReplaySubject();
        /**
         * store the column sizes as an accessible object
         */
        this._sizes = new Map();
        /**
         * An observable to unsubscribe others automatically
         */
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * a setter to define the table element
     * @param {?} table
     * @return {?}
     */
    setTable(table) {
        this._table = table;
    }
    /**
     * a setter to define the query list of columns
     * @param {?} columns
     * @return {?}
     */
    setColumns(columns) {
        // store a reference to the columns
        this._columns = columns;
        // set up the initial colums sizes
        this.setInitialWidths();
        // subscribe to future column changes
        this._columns.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.setInitialWidths());
    }
    /**
     * We want to convert all units sizes to pixels to prevent browser jitter
     * @return {?}
     */
    startResizing() {
        this.resizing = true;
        // convert all current percentages into pixel values
        this._sizes.forEach((value, key) => this._sizes.set(key, (this._table.offsetWidth / 100) * value));
        // emit the latest values
        this.sizes.next(this._sizes);
    }
    /**
     * Restore values back to percentage values
     * @return {?}
     */
    endResizing() {
        this.resizing = false;
        // convert all values back to percentages
        this._sizes.forEach((value, key) => this._sizes.set(key, (value / this._table.offsetWidth) * 100));
        // emit the latest values
        this.sizes.next(this._sizes);
    }
    /**
     * apply a resize event to a column
     * @param {?} column
     * @param {?} value
     * @return {?}
     */
    resizeColumn(column, value) {
        // get the sibling column that will also be resized
        const /** @type {?} */ sibling = this.getSiblingColumn(column);
        // if there is no sibling that can be resized then stop here
        if (!sibling) {
            return;
        }
        // create a new object for the sizes
        const /** @type {?} */ sizes = new Map(this._sizes);
        // resize the column to the desired size
        this.setColumnWidth(column, this.getColumnWidth(column) + Math.round(value), sizes);
        this.setColumnWidth(sibling, this.getColumnWidth(sibling) - Math.round(value), sizes);
        // if the move is not possible then stop here
        if (!this.isWidthValid(column, this.getColumnWidth(column, sizes)) || !this.isWidthValid(sibling, this.getColumnWidth(sibling, sizes))) {
            return;
        }
        // ensure that the column widths total exactly 100%
        this.verifyColumnWidths(sibling, sizes);
        // store the new sizes
        this._sizes = sizes;
        // emit the latest size values
        this.sizes.next(this._sizes);
    }
    /**
     * initially convert the default pixel widths of each column to percentages
     * @return {?}
     */
    setInitialWidths() {
        // get the table width so we don't have to keep accessing the dom
        const /** @type {?} */ width = this._table.offsetWidth;
        // create a new object containing all column widths
        this._sizes = new Map();
        // calculate the percentage size of each column
        this._columns.forEach(column => this.setColumnWidth(column, ((column.getColumnWidth() / width) * 100)));
        // emit the latest column sizes
        this.sizes.next(this._sizes);
    }
    /**
     * Get the percentage width of a specific column
     * @param {?} column
     * @param {?=} sizes
     * @return {?}
     */
    getColumnWidth(column, sizes = this._sizes) {
        return sizes.get(column);
    }
    /**
     * Set the percentage width for a specific column
     * @param {?} column
     * @param {?} width
     * @param {?=} sizes
     * @return {?}
     */
    setColumnWidth(column, width, sizes = this._sizes) {
        sizes.set(column, width);
    }
    /**
     * Determine whether a column is above or below its minimum width
     * @param {?} column
     * @param {?} width
     * @return {?}
     */
    isWidthValid(column, width) {
        return width >= column.minWidth;
    }
    /**
     * Ensure that the total column widths is exactly 100%
     * @param {?} adjustableColumn
     * @param {?=} sizes
     * @return {?}
     */
    verifyColumnWidths(adjustableColumn, sizes = this._sizes) {
        // get the total widths of all columns combined
        const /** @type {?} */ width = Array.from(sizes.values()).reduce((total, column) => column + total, 0);
        // if the width does not total 100% exactly then adjust the column width
        if (width !== this._table.offsetWidth) {
            this.setColumnWidth(adjustableColumn, this.getColumnWidth(adjustableColumn, sizes) + (this._table.offsetWidth - width), sizes);
        }
    }
    /**
     * Get a column at a given index
     * @param {?} index
     * @return {?}
     */
    getColumnAtIndex(index) {
        return this._columns.toArray()[index];
    }
    /**
     * Get the next column in the sequence of columns
     * @param {?} column
     * @return {?}
     */
    getSiblingColumn(column) {
        // get the index of this column
        const /** @type {?} */ index = this._columns.toArray().indexOf(column);
        // find the first sibling that is not disabled
        for (let /** @type {?} */ idx = index + 1; idx < this._columns.length; idx++) {
            const /** @type {?} */ sibling = this.getColumnAtIndex(idx);
            if (!sibling.disabled) {
                return sibling;
            }
        }
        return null;
    }
}
ResizableTableService.decorators = [
    { type: Injectable }
];
function ResizableTableService_tsickle_Closure_declarations() {
    /**
     * determine whether or not we are currently sizing
     * @type {?}
     */
    ResizableTableService.prototype.resizing;
    /**
     * store the percentage widths of all the columns
     * @type {?}
     */
    ResizableTableService.prototype.sizes;
    /**
     * store the table elements for use when calculating widths
     * @type {?}
     */
    ResizableTableService.prototype._table;
    /**
     * store the column classes
     * @type {?}
     */
    ResizableTableService.prototype._columns;
    /**
     * store the column sizes as an accessible object
     * @type {?}
     */
    ResizableTableService.prototype._sizes;
    /**
     * An observable to unsubscribe others automatically
     * @type {?}
     */
    ResizableTableService.prototype._onDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJdkMsTUFBTTs7Ozs7d0JBR2dCLEtBQUs7Ozs7cUJBR2pCLElBQUksYUFBYSxFQUE4Qzs7OztzQkFTdEQsSUFBSSxHQUFHLEVBQXlDOzs7OzBCQUc1QyxJQUFJLE9BQU8sRUFBUTs7Ozs7SUFFeEMsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM1Qjs7Ozs7O0lBR0QsUUFBUSxDQUFDLEtBQXVCO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOzs7Ozs7SUFHRCxVQUFVLENBQUMsT0FBaUQ7O1FBRTFELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDOztRQUd4QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7UUFHeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztLQUNqRzs7Ozs7SUFHRCxhQUFh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Q0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBR3RELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQzVELHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNoQjtTQUNGO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQzs7OztZQXJLZixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzL1JlcGxheVN1YmplY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlVGFibGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvKiogZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHdlIGFyZSBjdXJyZW50bHkgc2l6aW5nICovXG4gIHJlc2l6aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIHN0b3JlIHRoZSBwZXJjZW50YWdlIHdpZHRocyBvZiBhbGwgdGhlIGNvbHVtbnMgKi9cbiAgc2l6ZXMgPSBuZXcgUmVwbGF5U3ViamVjdDxNYXA8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQsIG51bWJlcj4+KCk7XG5cbiAgLyoqIHN0b3JlIHRoZSB0YWJsZSBlbGVtZW50cyBmb3IgdXNlIHdoZW4gY2FsY3VsYXRpbmcgd2lkdGhzICovXG4gIHByaXZhdGUgX3RhYmxlOiBIVE1MVGFibGVFbGVtZW50O1xuXG4gIC8qKiBzdG9yZSB0aGUgY29sdW1uIGNsYXNzZXMgKi9cbiAgcHJpdmF0ZSBfY29sdW1uczogUXVlcnlMaXN0PFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50PjtcblxuICAvKiogc3RvcmUgdGhlIGNvbHVtbiBzaXplcyBhcyBhbiBhY2Nlc3NpYmxlIG9iamVjdCAqL1xuICBwcml2YXRlIF9zaXplcyA9IG5ldyBNYXA8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQsIG51bWJlcj4oKTtcblxuICAvKiogQW4gb2JzZXJ2YWJsZSB0byB1bnN1YnNjcmliZSBvdGhlcnMgYXV0b21hdGljYWxseSAqL1xuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogYSBzZXR0ZXIgdG8gZGVmaW5lIHRoZSB0YWJsZSBlbGVtZW50ICovXG4gIHNldFRhYmxlKHRhYmxlOiBIVE1MVGFibGVFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5fdGFibGUgPSB0YWJsZTtcbiAgfVxuXG4gIC8qKiBhIHNldHRlciB0byBkZWZpbmUgdGhlIHF1ZXJ5IGxpc3Qgb2YgY29sdW1ucyAqL1xuICBzZXRDb2x1bW5zKGNvbHVtbnM6IFF1ZXJ5TGlzdDxSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudD4pOiB2b2lkIHtcbiAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgY29sdW1uc1xuICAgIHRoaXMuX2NvbHVtbnMgPSBjb2x1bW5zO1xuXG4gICAgLy8gc2V0IHVwIHRoZSBpbml0aWFsIGNvbHVtcyBzaXplc1xuICAgIHRoaXMuc2V0SW5pdGlhbFdpZHRocygpO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIGZ1dHVyZSBjb2x1bW4gY2hhbmdlc1xuICAgIHRoaXMuX2NvbHVtbnMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRJbml0aWFsV2lkdGhzKCkpO1xuICB9XG5cbiAgLyoqIFdlIHdhbnQgdG8gY29udmVydCBhbGwgdW5pdHMgc2l6ZXMgdG8gcGl4ZWxzIHRvIHByZXZlbnQgYnJvd3NlciBqaXR0ZXIgKi9cbiAgc3RhcnRSZXNpemluZygpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2l6aW5nID0gdHJ1ZTtcblxuICAgIC8vIGNvbnZlcnQgYWxsIGN1cnJlbnQgcGVyY2VudGFnZXMgaW50byBwaXhlbCB2YWx1ZXNcbiAgICB0aGlzLl9zaXplcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB0aGlzLl9zaXplcy5zZXQoa2V5LCAodGhpcy5fdGFibGUub2Zmc2V0V2lkdGggLyAxMDApICogdmFsdWUpKTtcblxuICAgIC8vIGVtaXQgdGhlIGxhdGVzdCB2YWx1ZXNcbiAgICB0aGlzLnNpemVzLm5leHQodGhpcy5fc2l6ZXMpO1xuICB9XG5cbiAgLyoqIFJlc3RvcmUgdmFsdWVzIGJhY2sgdG8gcGVyY2VudGFnZSB2YWx1ZXMgKi9cbiAgZW5kUmVzaXppbmcoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNpemluZyA9IGZhbHNlO1xuXG4gICAgLy8gY29udmVydCBhbGwgdmFsdWVzIGJhY2sgdG8gcGVyY2VudGFnZXNcbiAgICB0aGlzLl9zaXplcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB0aGlzLl9zaXplcy5zZXQoa2V5LCAodmFsdWUgLyB0aGlzLl90YWJsZS5vZmZzZXRXaWR0aCkgKiAxMDApKTtcblxuICAgIC8vIGVtaXQgdGhlIGxhdGVzdCB2YWx1ZXNcbiAgICB0aGlzLnNpemVzLm5leHQodGhpcy5fc2l6ZXMpO1xuICB9XG5cbiAgLyoqIGFwcGx5IGEgcmVzaXplIGV2ZW50IHRvIGEgY29sdW1uICovXG4gIHJlc2l6ZUNvbHVtbihjb2x1bW46IFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50LCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAvLyBnZXQgdGhlIHNpYmxpbmcgY29sdW1uIHRoYXQgd2lsbCBhbHNvIGJlIHJlc2l6ZWRcbiAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5nZXRTaWJsaW5nQ29sdW1uKGNvbHVtbik7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBzaWJsaW5nIHRoYXQgY2FuIGJlIHJlc2l6ZWQgdGhlbiBzdG9wIGhlcmVcbiAgICBpZiAoIXNpYmxpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSBuZXcgb2JqZWN0IGZvciB0aGUgc2l6ZXNcbiAgICBjb25zdCBzaXplcyA9IG5ldyBNYXAodGhpcy5fc2l6ZXMpO1xuXG4gICAgLy8gcmVzaXplIHRoZSBjb2x1bW4gdG8gdGhlIGRlc2lyZWQgc2l6ZVxuICAgIHRoaXMuc2V0Q29sdW1uV2lkdGgoY29sdW1uLCB0aGlzLmdldENvbHVtbldpZHRoKGNvbHVtbikgKyBNYXRoLnJvdW5kKHZhbHVlKSwgc2l6ZXMpO1xuICAgIHRoaXMuc2V0Q29sdW1uV2lkdGgoc2libGluZywgdGhpcy5nZXRDb2x1bW5XaWR0aChzaWJsaW5nKSAtIE1hdGgucm91bmQodmFsdWUpLCBzaXplcyk7XG5cbiAgICAvLyBpZiB0aGUgbW92ZSBpcyBub3QgcG9zc2libGUgdGhlbiBzdG9wIGhlcmVcbiAgICBpZiAoIXRoaXMuaXNXaWR0aFZhbGlkKGNvbHVtbiwgdGhpcy5nZXRDb2x1bW5XaWR0aChjb2x1bW4sIHNpemVzKSkgfHwgIXRoaXMuaXNXaWR0aFZhbGlkKHNpYmxpbmcsIHRoaXMuZ2V0Q29sdW1uV2lkdGgoc2libGluZywgc2l6ZXMpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGVuc3VyZSB0aGF0IHRoZSBjb2x1bW4gd2lkdGhzIHRvdGFsIGV4YWN0bHkgMTAwJVxuICAgIHRoaXMudmVyaWZ5Q29sdW1uV2lkdGhzKHNpYmxpbmcsIHNpemVzKTtcblxuICAgIC8vIHN0b3JlIHRoZSBuZXcgc2l6ZXNcbiAgICB0aGlzLl9zaXplcyA9IHNpemVzO1xuXG4gICAgLy8gZW1pdCB0aGUgbGF0ZXN0IHNpemUgdmFsdWVzXG4gICAgdGhpcy5zaXplcy5uZXh0KHRoaXMuX3NpemVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIE1ldGhvZHNcbiAgICovXG5cbiAgLyoqIGluaXRpYWxseSBjb252ZXJ0IHRoZSBkZWZhdWx0IHBpeGVsIHdpZHRocyBvZiBlYWNoIGNvbHVtbiB0byBwZXJjZW50YWdlcyAqL1xuICBwcml2YXRlIHNldEluaXRpYWxXaWR0aHMoKTogdm9pZCB7XG4gICAgLy8gZ2V0IHRoZSB0YWJsZSB3aWR0aCBzbyB3ZSBkb24ndCBoYXZlIHRvIGtlZXAgYWNjZXNzaW5nIHRoZSBkb21cbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuX3RhYmxlLm9mZnNldFdpZHRoO1xuXG4gICAgLy8gY3JlYXRlIGEgbmV3IG9iamVjdCBjb250YWluaW5nIGFsbCBjb2x1bW4gd2lkdGhzXG4gICAgdGhpcy5fc2l6ZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIHBlcmNlbnRhZ2Ugc2l6ZSBvZiBlYWNoIGNvbHVtblxuICAgIHRoaXMuX2NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT5cbiAgICAgIHRoaXMuc2V0Q29sdW1uV2lkdGgoY29sdW1uLCAoKGNvbHVtbi5nZXRDb2x1bW5XaWR0aCgpIC8gd2lkdGgpICogMTAwKSlcbiAgICApO1xuXG4gICAgLy8gZW1pdCB0aGUgbGF0ZXN0IGNvbHVtbiBzaXplc1xuICAgIHRoaXMuc2l6ZXMubmV4dCh0aGlzLl9zaXplcyk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBwZXJjZW50YWdlIHdpZHRoIG9mIGEgc3BlY2lmaWMgY29sdW1uICovXG4gIHByaXZhdGUgZ2V0Q29sdW1uV2lkdGgoY29sdW1uOiBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCwgc2l6ZXM6IE1hcDxSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCwgbnVtYmVyPiA9IHRoaXMuX3NpemVzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2l6ZXMuZ2V0KGNvbHVtbik7XG4gIH1cblxuICAvKiogU2V0IHRoZSBwZXJjZW50YWdlIHdpZHRoIGZvciBhIHNwZWNpZmljIGNvbHVtbiAqL1xuICBwcml2YXRlIHNldENvbHVtbldpZHRoKGNvbHVtbjogUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQsIHdpZHRoOiBudW1iZXIsIHNpemVzOiBNYXA8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQsIG51bWJlcj4gPSB0aGlzLl9zaXplcyk6IHZvaWQge1xuICAgIHNpemVzLnNldChjb2x1bW4sIHdpZHRoKTtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmUgd2hldGhlciBhIGNvbHVtbiBpcyBhYm92ZSBvciBiZWxvdyBpdHMgbWluaW11bSB3aWR0aCAqL1xuICBwcml2YXRlIGlzV2lkdGhWYWxpZChjb2x1bW46IFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50LCB3aWR0aDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHdpZHRoID49IGNvbHVtbi5taW5XaWR0aDtcbiAgfVxuXG4gIC8qKiBFbnN1cmUgdGhhdCB0aGUgdG90YWwgY29sdW1uIHdpZHRocyBpcyBleGFjdGx5IDEwMCUgKi9cbiAgcHJpdmF0ZSB2ZXJpZnlDb2x1bW5XaWR0aHMoYWRqdXN0YWJsZUNvbHVtbjogUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQsIHNpemVzOiBNYXA8UmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQsIG51bWJlcj4gPSB0aGlzLl9zaXplcyk6IHZvaWQge1xuXG4gICAgLy8gZ2V0IHRoZSB0b3RhbCB3aWR0aHMgb2YgYWxsIGNvbHVtbnMgY29tYmluZWRcbiAgICBjb25zdCB3aWR0aCA9IEFycmF5LmZyb20oc2l6ZXMudmFsdWVzKCkpLnJlZHVjZSgodG90YWwsIGNvbHVtbikgPT4gY29sdW1uICsgdG90YWwsIDApO1xuXG4gICAgLy8gaWYgdGhlIHdpZHRoIGRvZXMgbm90IHRvdGFsIDEwMCUgZXhhY3RseSB0aGVuIGFkanVzdCB0aGUgY29sdW1uIHdpZHRoXG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLl90YWJsZS5vZmZzZXRXaWR0aCkge1xuICAgICAgdGhpcy5zZXRDb2x1bW5XaWR0aChhZGp1c3RhYmxlQ29sdW1uLCB0aGlzLmdldENvbHVtbldpZHRoKGFkanVzdGFibGVDb2x1bW4sIHNpemVzKSArICh0aGlzLl90YWJsZS5vZmZzZXRXaWR0aCAtIHdpZHRoKSwgc2l6ZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXQgYSBjb2x1bW4gYXQgYSBnaXZlbiBpbmRleCAqL1xuICBwcml2YXRlIGdldENvbHVtbkF0SW5kZXgoaW5kZXg6IG51bWJlcik6IFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucy50b0FycmF5KClbaW5kZXhdO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgbmV4dCBjb2x1bW4gaW4gdGhlIHNlcXVlbmNlIG9mIGNvbHVtbnMgKi9cbiAgcHJpdmF0ZSBnZXRTaWJsaW5nQ29sdW1uKGNvbHVtbjogUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQpOiBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB8IG51bGwge1xuICAgIC8vIGdldCB0aGUgaW5kZXggb2YgdGhpcyBjb2x1bW5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbHVtbnMudG9BcnJheSgpLmluZGV4T2YoY29sdW1uKTtcblxuICAgIC8vIGZpbmQgdGhlIGZpcnN0IHNpYmxpbmcgdGhhdCBpcyBub3QgZGlzYWJsZWRcbiAgICBmb3IgKGxldCBpZHggPSBpbmRleCArIDE7IGlkeCA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuZ2V0Q29sdW1uQXRJbmRleChpZHgpO1xuXG4gICAgICBpZiAoIXNpYmxpbmcuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHNpYmxpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0iXX0=