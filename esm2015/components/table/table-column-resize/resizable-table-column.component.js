/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';
export class ResizableTableColumnComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _table
     * @param {?} _renderer
     */
    constructor(_elementRef, _table, _renderer) {
        this._elementRef = _elementRef;
        this._table = _table;
        this._renderer = _renderer;
        /**
         * Disabled the column resizing
         */
        this.disabled = false;
        /**
         * Emit the current column width
         */
        this.widthChange = new EventEmitter();
        /**
         * Determine if this column is a variable width column
         */
        this.isFixedWidth = false;
        /**
         * Emit when all observables should be unsubscribed
         */
        this._onDestroy = new Subject();
        // initially emit the size when we have initialised
        _table.isInitialised$.pipe(takeUntil(this._onDestroy), filter(isInitialised => isInitialised))
            .subscribe(() => this.widthChange.emit(_table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)));
        // ensure the correct width gets emitted on column size change
        _table.onResize$.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.widthChange.emit(_table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)));
    }
    /**
     * Define the width of a column
     * @param {?} width
     * @return {?}
     */
    set width(width) {
        // ensure width is a valid number
        this._width = coerceNumberProperty(width);
        // note that this column has a fixed width
        this.isFixedWidth = true;
        // if we have not initialised then set the element width
        if (!this._table.isInitialised$.value) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'width', `${this._width}px`);
        }
        else {
            // if it is initialised then resize the column
            const /** @type {?} */ currentWidth = this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel);
            // resize the column by the difference in size
            this._table.resizeColumn(this.getCellIndex(), this._width - currentWidth, false);
        }
    }
    /**
     * The percentage width of the column
     * @return {?}
     */
    get columnWidth() {
        if (!this._table.isInitialised$.value) {
            return;
        }
        if (this.disabled) {
            return `${this._width}px`;
        }
        return this._table.isResizing ?
            `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)}px` :
            `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%`;
    }
    /**
     * The flex width of the column
     * @return {?}
     */
    get flex() {
        // if we are resizing then always return 'none' to allow free movement
        if (this._table.isResizing || this.disabled) {
            return 'none';
        }
        return this._table.isInitialised$.value ? `0 1 ${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%` : '';
    }
    /**
     * Get the minimum width allowed by the column
     * @return {?}
     */
    get minWidth() {
        // determine the minimum width of the column based on its computed CSS value
        const /** @type {?} */ computed = parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);
        // if it is disabled use its current width - otherwise use its CSS min width if it is valid
        return this.disabled ? this._elementRef.nativeElement.offsetWidth : isNaN(computed) ? 0 : computed;
    }
    /**
     * Cleanup when component is destroyed
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Get the natural pixel width of the column
     * @return {?}
     */
    getNaturalWidth() {
        return this._width || this._elementRef.nativeElement.offsetWidth;
    }
    /**
     * When the dragging starts
     * @param {?} event
     * @return {?}
     */
    onDragStart(event) {
        // determine the mouse position within the handle
        this._offset = event.clientX - (/** @type {?} */ (event.target)).getBoundingClientRect().left;
    }
    /**
     * When the mouse is moved
     * @param {?} event
     * @param {?} handle
     * @return {?}
     */
    onDragMove(event, handle) {
        // get the current mouse position
        const /** @type {?} */ mouseX = event.pageX - pageXOffset;
        // position of the drag handle
        const { left } = handle.getBoundingClientRect();
        // determine how much the mouse has moved since the last update
        const /** @type {?} */ delta = mouseX - (left + this._offset);
        // perform resizing
        this._table.resizeColumn(this.getCellIndex(), delta);
        // set the resizing state
        this._table.setResizing(true);
    }
    /**
     * When the dragging ends
     * @return {?}
     */
    onDragEnd() {
        this._table.setResizing(false);
    }
    /**
     * Shrink the column when the left arrow key is pressed
     * @return {?}
     */
    onMoveLeft() {
        this._table.resizeColumn(this.getCellIndex(), -10);
    }
    /**
     * Grow the column when the right arrow key is pressed
     * @return {?}
     */
    onMoveRight() {
        this._table.resizeColumn(this.getCellIndex(), 10);
    }
    /**
     * Get the column index this cell is part of
     * @return {?}
     */
    getCellIndex() {
        return (/** @type {?} */ (this._elementRef.nativeElement)).cellIndex;
    }
}
ResizableTableColumnComponent.decorators = [
    { type: Component, args: [{
                selector: '[uxResizableTableColumn]',
                template: "<ng-content></ng-content>\n\n<div #handle\n     uxDrag\n     cdkMonitorElementFocus\n     tabindex=\"0\"\n     aria-label=\"Column resize handle. Use arrow keys to change the column width.\"\n     class=\"ux-resizable-table-column-handle\"\n     *ngIf=\"!disabled\"\n     (onDragStart)=\"onDragStart($event)\"\n     (onDrag)=\"onDragMove($event, handle)\"\n     (onDragEnd)=\"onDragEnd()\"\n     (keydown.ArrowLeft)=\"onMoveLeft()\"\n     (keydown.ArrowRight)=\"onMoveRight()\">\n\n     <div class=\"ux-resizable-table-column-handle-icon\"></div>\n</div>\n",
                host: {
                    class: 'ux-resizable-table-column'
                }
            }] }
];
/** @nocollapse */
ResizableTableColumnComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizableTableService },
    { type: Renderer2 }
];
ResizableTableColumnComponent.propDecorators = {
    disabled: [{ type: Input }],
    width: [{ type: Input }],
    widthChange: [{ type: Output }],
    columnWidth: [{ type: HostBinding, args: ['style.width',] }],
    flex: [{ type: HostBinding, args: ['style.flex',] }]
};
function ResizableTableColumnComponent_tsickle_Closure_declarations() {
    /**
     * Disabled the column resizing
     * @type {?}
     */
    ResizableTableColumnComponent.prototype.disabled;
    /**
     * Emit the current column width
     * @type {?}
     */
    ResizableTableColumnComponent.prototype.widthChange;
    /**
     * Determine if this column is a variable width column
     * @type {?}
     */
    ResizableTableColumnComponent.prototype.isFixedWidth;
    /**
     * Store the width specifically set by the input
     * @type {?}
     */
    ResizableTableColumnComponent.prototype._width;
    /**
     * Store the position of the mouse within the drag hanlde
     * @type {?}
     */
    ResizableTableColumnComponent.prototype._offset;
    /**
     * Emit when all observables should be unsubscribed
     * @type {?}
     */
    ResizableTableColumnComponent.prototype._onDestroy;
    /** @type {?} */
    ResizableTableColumnComponent.prototype._elementRef;
    /** @type {?} */
    ResizableTableColumnComponent.prototype._table;
    /** @type {?} */
    ResizableTableColumnComponent.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RILE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTOUUsTUFBTTs7Ozs7O0lBOEVKLFlBQW9CLFdBQXVCLEVBQVUsTUFBNkIsRUFBVSxTQUFvQjtRQUE1RixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVzs7Ozt3QkEzRW5GLEtBQUs7Ozs7MkJBeUJWLElBQUksWUFBWSxFQUFVOzs7OzRCQXVDMUIsS0FBSzs7OzswQkFTUixJQUFJLE9BQU8sRUFBUTs7UUFLdEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMzRixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENB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VTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEOzs7OztJQUdELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBR0QsWUFBWTtRQUNWLE1BQU0sQ0FBQyxtQkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQXFDLEVBQUMsQ0FBQyxTQUFTLENBQUM7S0FDM0U7OztZQXZKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsd2pCQUFzRDtnQkFDdEQsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSwyQkFBMkI7aUJBQ25DO2FBQ0Y7Ozs7WUFYbUIsVUFBVTtZQUdULHFCQUFxQjtZQUgyQyxTQUFTOzs7dUJBZTNGLEtBQUs7b0JBR0wsS0FBSzswQkFzQkwsTUFBTTswQkFHTixXQUFXLFNBQUMsYUFBYTttQkFnQnpCLFdBQVcsU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IENvbHVtblVuaXQsIFJlc2l6YWJsZVRhYmxlU2VydmljZSB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbdXhSZXNpemFibGVUYWJsZUNvbHVtbl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3V4LXJlc2l6YWJsZS10YWJsZS1jb2x1bW4nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIC8qKiBEaXNhYmxlZCB0aGUgY29sdW1uIHJlc2l6aW5nICovXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIERlZmluZSB0aGUgd2lkdGggb2YgYSBjb2x1bW4gKi9cbiAgQElucHV0KCkgc2V0IHdpZHRoKHdpZHRoOiBudW1iZXIpIHtcblxuICAgIC8vIGVuc3VyZSB3aWR0aCBpcyBhIHZhbGlkIG51bWJlclxuICAgIHRoaXMuX3dpZHRoID0gY29lcmNlTnVtYmVyUHJvcGVydHkod2lkdGgpO1xuXG4gICAgLy8gbm90ZSB0aGF0IHRoaXMgY29sdW1uIGhhcyBhIGZpeGVkIHdpZHRoXG4gICAgdGhpcy5pc0ZpeGVkV2lkdGggPSB0cnVlO1xuXG4gICAgLy8gaWYgd2UgaGF2ZSBub3QgaW5pdGlhbGlzZWQgdGhlbiBzZXQgdGhlIGVsZW1lbnQgd2lkdGhcbiAgICBpZiAoIXRoaXMuX3RhYmxlLmlzSW5pdGlhbGlzZWQkLnZhbHVlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3RoaXMuX3dpZHRofXB4YCk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gaWYgaXQgaXMgaW5pdGlhbGlzZWQgdGhlbiByZXNpemUgdGhlIGNvbHVtblxuICAgICAgY29uc3QgY3VycmVudFdpZHRoID0gdGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCk7XG5cbiAgICAgIC8vIHJlc2l6ZSB0aGUgY29sdW1uIGJ5IHRoZSBkaWZmZXJlbmNlIGluIHNpemVcbiAgICAgIHRoaXMuX3RhYmxlLnJlc2l6ZUNvbHVtbih0aGlzLmdldENlbGxJbmRleCgpLCB0aGlzLl93aWR0aCAtIGN1cnJlbnRXaWR0aCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBFbWl0IHRoZSBjdXJyZW50IGNvbHVtbiB3aWR0aCAqL1xuICBAT3V0cHV0KCkgd2lkdGhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogVGhlIHBlcmNlbnRhZ2Ugd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ2V0IGNvbHVtbldpZHRoKCk6IHN0cmluZyB7XG5cbiAgICBpZiAoIXRoaXMuX3RhYmxlLmlzSW5pdGlhbGlzZWQkLnZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLl93aWR0aH1weGA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlLmlzUmVzaXppbmcgP1xuICAgICAgYCR7dGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCl9cHhgIDpcbiAgICAgIGAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGVyY2VudGFnZSl9JWA7XG4gIH1cblxuICAvKiogVGhlIGZsZXggd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgnKSBnZXQgZmxleCgpOiBzdHJpbmcge1xuXG4gICAgLy8gaWYgd2UgYXJlIHJlc2l6aW5nIHRoZW4gYWx3YXlzIHJldHVybiAnbm9uZScgdG8gYWxsb3cgZnJlZSBtb3ZlbWVudFxuICAgIGlmICh0aGlzLl90YWJsZS5pc1Jlc2l6aW5nIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlLmlzSW5pdGlhbGlzZWQkLnZhbHVlID8gYDAgMSAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGVyY2VudGFnZSl9JWAgOiAnJztcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIG1pbmltdW0gd2lkdGggYWxsb3dlZCBieSB0aGUgY29sdW1uICovXG4gIGdldCBtaW5XaWR0aCgpOiBudW1iZXIge1xuICAgIC8vIGRldGVybWluZSB0aGUgbWluaW11bSB3aWR0aCBvZiB0aGUgY29sdW1uIGJhc2VkIG9uIGl0cyBjb21wdXRlZCBDU1MgdmFsdWVcbiAgICBjb25zdCBjb21wdXRlZCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLm1pbldpZHRoKTtcblxuICAgIC8vIGlmIGl0IGlzIGRpc2FibGVkIHVzZSBpdHMgY3VycmVudCB3aWR0aCAtIG90aGVyd2lzZSB1c2UgaXRzIENTUyBtaW4gd2lkdGggaWYgaXQgaXMgdmFsaWRcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA6IGlzTmFOKGNvbXB1dGVkKSA/IDAgOiBjb21wdXRlZDtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmUgaWYgdGhpcyBjb2x1bW4gaXMgYSB2YXJpYWJsZSB3aWR0aCBjb2x1bW4gKi9cbiAgaXNGaXhlZFdpZHRoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFN0b3JlIHRoZSB3aWR0aCBzcGVjaWZpY2FsbHkgc2V0IGJ5IHRoZSBpbnB1dCAqL1xuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuXG4gIC8qKiBTdG9yZSB0aGUgcG9zaXRpb24gb2YgdGhlIG1vdXNlIHdpdGhpbiB0aGUgZHJhZyBoYW5sZGUgKi9cbiAgcHJpdmF0ZSBfb2Zmc2V0OiBudW1iZXI7XG5cbiAgLyoqIEVtaXQgd2hlbiBhbGwgb2JzZXJ2YWJsZXMgc2hvdWxkIGJlIHVuc3Vic2NyaWJlZCAqL1xuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3RhYmxlOiBSZXNpemFibGVUYWJsZVNlcnZpY2UsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICAgIC8vIGluaXRpYWxseSBlbWl0IHRoZSBzaXplIHdoZW4gd2UgaGF2ZSBpbml0aWFsaXNlZFxuICAgIF90YWJsZS5pc0luaXRpYWxpc2VkJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoaXNJbml0aWFsaXNlZCA9PiBpc0luaXRpYWxpc2VkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy53aWR0aENoYW5nZS5lbWl0KF90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBpeGVsKSkpO1xuXG4gICAgLy8gZW5zdXJlIHRoZSBjb3JyZWN0IHdpZHRoIGdldHMgZW1pdHRlZCBvbiBjb2x1bW4gc2l6ZSBjaGFuZ2VcbiAgICBfdGFibGUub25SZXNpemUkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMud2lkdGhDaGFuZ2UuZW1pdChfdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCkpKTtcbiAgfVxuXG4gIC8qKiBDbGVhbnVwIHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZCAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgbmF0dXJhbCBwaXhlbCB3aWR0aCBvZiB0aGUgY29sdW1uICovXG4gIGdldE5hdHVyYWxXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl93aWR0aCB8fCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH1cblxuICAvKiogV2hlbiB0aGUgZHJhZ2dpbmcgc3RhcnRzICovXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG5cbiAgICAvLyBkZXRlcm1pbmUgdGhlIG1vdXNlIHBvc2l0aW9uIHdpdGhpbiB0aGUgaGFuZGxlXG4gICAgdGhpcy5fb2Zmc2V0ID0gZXZlbnQuY2xpZW50WCAtIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gIH1cblxuICAvKiogV2hlbiB0aGUgbW91c2UgaXMgbW92ZWQgKi9cbiAgb25EcmFnTW92ZShldmVudDogTW91c2VFdmVudCwgaGFuZGxlOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xuXG4gICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgY29uc3QgbW91c2VYID0gZXZlbnQucGFnZVggLSBwYWdlWE9mZnNldDtcblxuICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBkcmFnIGhhbmRsZVxuICAgIGNvbnN0IHsgbGVmdCB9ID0gaGFuZGxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gZGV0ZXJtaW5lIGhvdyBtdWNoIHRoZSBtb3VzZSBoYXMgbW92ZWQgc2luY2UgdGhlIGxhc3QgdXBkYXRlXG4gICAgY29uc3QgZGVsdGEgPSBtb3VzZVggLSAobGVmdCArIHRoaXMuX29mZnNldCk7XG5cbiAgICAvLyBwZXJmb3JtIHJlc2l6aW5nXG4gICAgdGhpcy5fdGFibGUucmVzaXplQ29sdW1uKHRoaXMuZ2V0Q2VsbEluZGV4KCksIGRlbHRhKTtcblxuICAgIC8vIHNldCB0aGUgcmVzaXppbmcgc3RhdGVcbiAgICB0aGlzLl90YWJsZS5zZXRSZXNpemluZyh0cnVlKTtcbiAgfVxuXG4gIC8qKiBXaGVuIHRoZSBkcmFnZ2luZyBlbmRzICovXG4gIG9uRHJhZ0VuZCgpOiB2b2lkIHtcbiAgICB0aGlzLl90YWJsZS5zZXRSZXNpemluZyhmYWxzZSk7XG4gIH1cblxuICAvKiogU2hyaW5rIHRoZSBjb2x1bW4gd2hlbiB0aGUgbGVmdCBhcnJvdyBrZXkgaXMgcHJlc3NlZCAqL1xuICBvbk1vdmVMZWZ0KCk6IHZvaWQge1xuICAgIHRoaXMuX3RhYmxlLnJlc2l6ZUNvbHVtbih0aGlzLmdldENlbGxJbmRleCgpLCAtMTApO1xuICB9XG5cbiAgLyoqIEdyb3cgdGhlIGNvbHVtbiB3aGVuIHRoZSByaWdodCBhcnJvdyBrZXkgaXMgcHJlc3NlZCAqL1xuICBvbk1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl90YWJsZS5yZXNpemVDb2x1bW4odGhpcy5nZXRDZWxsSW5kZXgoKSwgMTApO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgY29sdW1uIGluZGV4IHRoaXMgY2VsbCBpcyBwYXJ0IG9mICovXG4gIGdldENlbGxJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50KS5jZWxsSW5kZXg7XG4gIH1cbn1cbiJdfQ==