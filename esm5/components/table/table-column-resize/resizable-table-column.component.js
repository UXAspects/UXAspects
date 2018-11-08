/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';
var ResizableTableColumnComponent = /** @class */ (function () {
    function ResizableTableColumnComponent(_elementRef, _table, _renderer) {
        var _this = this;
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
        _table.isInitialised$.pipe(takeUntil(this._onDestroy), filter(function (isInitialised) { return isInitialised; }))
            .subscribe(function () { return _this.widthChange.emit(_table.getColumnWidth(_this.getCellIndex(), ColumnUnit.Pixel)); });
        // ensure the correct width gets emitted on column size change
        _table.onResize$.pipe(takeUntil(this._onDestroy))
            .subscribe(function () { return _this.widthChange.emit(_table.getColumnWidth(_this.getCellIndex(), ColumnUnit.Pixel)); });
    }
    Object.defineProperty(ResizableTableColumnComponent.prototype, "width", {
        /** Define the width of a column */
        set: /**
         * Define the width of a column
         * @param {?} width
         * @return {?}
         */
        function (width) {
            // ensure width is a valid number
            this._width = coerceNumberProperty(width);
            // note that this column has a fixed width
            this.isFixedWidth = true;
            // if we have not initialised then set the element width
            if (!this._table.isInitialised$.value) {
                this._renderer.setStyle(this._elementRef.nativeElement, 'width', this._width + "px");
            }
            else {
                // if it is initialised then resize the column
                var /** @type {?} */ currentWidth = this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel);
                // resize the column by the difference in size
                this._table.resizeColumn(this.getCellIndex(), this._width - currentWidth, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableTableColumnComponent.prototype, "columnWidth", {
        /** The percentage width of the column */
        get: /**
         * The percentage width of the column
         * @return {?}
         */
        function () {
            if (!this._table.isInitialised$.value) {
                return;
            }
            if (this.disabled) {
                return this._width + "px";
            }
            return this._table.isResizing ?
                this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel) + "px" :
                this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage) + "%";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableTableColumnComponent.prototype, "flex", {
        /** The flex width of the column */
        get: /**
         * The flex width of the column
         * @return {?}
         */
        function () {
            // if we are resizing then always return 'none' to allow free movement
            if (this._table.isResizing || this.disabled) {
                return 'none';
            }
            return this._table.isInitialised$.value ? "0 1 " + this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage) + "%" : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableTableColumnComponent.prototype, "minWidth", {
        /** Get the minimum width allowed by the column */
        get: /**
         * Get the minimum width allowed by the column
         * @return {?}
         */
        function () {
            // determine the minimum width of the column based on its computed CSS value
            var /** @type {?} */ computed = parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);
            // if it is disabled use its current width - otherwise use its CSS min width if it is valid
            return this.disabled ? this._elementRef.nativeElement.offsetWidth : isNaN(computed) ? 0 : computed;
        },
        enumerable: true,
        configurable: true
    });
    /** Cleanup when component is destroyed */
    /**
     * Cleanup when component is destroyed
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.ngOnDestroy = /**
     * Cleanup when component is destroyed
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Get the natural pixel width of the column */
    /**
     * Get the natural pixel width of the column
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.getNaturalWidth = /**
     * Get the natural pixel width of the column
     * @return {?}
     */
    function () {
        return this._width || this._elementRef.nativeElement.offsetWidth;
    };
    /** When the dragging starts */
    /**
     * When the dragging starts
     * @param {?} event
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.onDragStart = /**
     * When the dragging starts
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // determine the mouse position within the handle
        this._offset = event.clientX - (/** @type {?} */ (event.target)).getBoundingClientRect().left;
    };
    /** When the mouse is moved */
    /**
     * When the mouse is moved
     * @param {?} event
     * @param {?} handle
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.onDragMove = /**
     * When the mouse is moved
     * @param {?} event
     * @param {?} handle
     * @return {?}
     */
    function (event, handle) {
        // get the current mouse position
        var /** @type {?} */ mouseX = event.pageX - pageXOffset;
        // position of the drag handle
        var left = handle.getBoundingClientRect().left;
        // determine how much the mouse has moved since the last update
        var /** @type {?} */ delta = mouseX - (left + this._offset);
        // perform resizing
        this._table.resizeColumn(this.getCellIndex(), delta);
        // set the resizing state
        this._table.setResizing(true);
    };
    /** When the dragging ends */
    /**
     * When the dragging ends
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.onDragEnd = /**
     * When the dragging ends
     * @return {?}
     */
    function () {
        this._table.setResizing(false);
    };
    /** Shrink the column when the left arrow key is pressed */
    /**
     * Shrink the column when the left arrow key is pressed
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.onMoveLeft = /**
     * Shrink the column when the left arrow key is pressed
     * @return {?}
     */
    function () {
        this._table.resizeColumn(this.getCellIndex(), -10);
    };
    /** Grow the column when the right arrow key is pressed */
    /**
     * Grow the column when the right arrow key is pressed
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.onMoveRight = /**
     * Grow the column when the right arrow key is pressed
     * @return {?}
     */
    function () {
        this._table.resizeColumn(this.getCellIndex(), 10);
    };
    /** Get the column index this cell is part of */
    /**
     * Get the column index this cell is part of
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.getCellIndex = /**
     * Get the column index this cell is part of
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this._elementRef.nativeElement)).cellIndex;
    };
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
    ResizableTableColumnComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResizableTableService },
        { type: Renderer2 }
    ]; };
    ResizableTableColumnComponent.propDecorators = {
        disabled: [{ type: Input }],
        width: [{ type: Input }],
        widthChange: [{ type: Output }],
        columnWidth: [{ type: HostBinding, args: ['style.width',] }],
        flex: [{ type: HostBinding, args: ['style.flex',] }]
    };
    return ResizableTableColumnComponent;
}());
export { ResizableTableColumnComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RILE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBdUY1RSx1Q0FBb0IsV0FBdUIsRUFBVSxNQUE2QixFQUFVLFNBQW9CO1FBQWhILGlCQVNDO1FBVG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXOzs7O3dCQTNFbkYsS0FBSzs7OzsyQkF5QlYsSUFBSSxZQUFZLEVBQVU7Ozs7NEJBdUMxQixLQUFLOzs7OzBCQVNSLElBQUksT0FBTyxFQUFROztRQUt0QyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFBLGFBQWEsSUFBSSxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUMsQ0FBQzthQUMzRixTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFB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SSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDOztRQUdyRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQjtJQUVELDZCQUE2Qjs7Ozs7SUFDN0IsaURBQVM7Ozs7SUFBVDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hDO0lBRUQsMkRBQTJEOzs7OztJQUMzRCxrREFBVTs7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDcEQ7SUFFRCwwREFBMEQ7Ozs7O0lBQzFELG1EQUFXOzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkQ7SUFFRCxnREFBZ0Q7Ozs7O0lBQ2hELG9EQUFZOzs7O0lBQVo7UUFDRSxNQUFNLENBQUMsbUJBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFxQyxFQUFDLENBQUMsU0FBUyxDQUFDO0tBQzNFOztnQkF2SkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLHdqQkFBc0Q7b0JBQ3RELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsMkJBQTJCO3FCQUNuQztpQkFDRjs7OztnQkFYbUIsVUFBVTtnQkFHVCxxQkFBcUI7Z0JBSDJDLFNBQVM7OzsyQkFlM0YsS0FBSzt3QkFHTCxLQUFLOzhCQXNCTCxNQUFNOzhCQUdOLFdBQVcsU0FBQyxhQUFhO3VCQWdCekIsV0FBVyxTQUFDLFlBQVk7O3dDQTVEM0I7O1NBYWEsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IENvbHVtblVuaXQsIFJlc2l6YWJsZVRhYmxlU2VydmljZSB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbdXhSZXNpemFibGVUYWJsZUNvbHVtbl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3V4LXJlc2l6YWJsZS10YWJsZS1jb2x1bW4nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIC8qKiBEaXNhYmxlZCB0aGUgY29sdW1uIHJlc2l6aW5nICovXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIERlZmluZSB0aGUgd2lkdGggb2YgYSBjb2x1bW4gKi9cbiAgQElucHV0KCkgc2V0IHdpZHRoKHdpZHRoOiBudW1iZXIpIHtcblxuICAgIC8vIGVuc3VyZSB3aWR0aCBpcyBhIHZhbGlkIG51bWJlclxuICAgIHRoaXMuX3dpZHRoID0gY29lcmNlTnVtYmVyUHJvcGVydHkod2lkdGgpO1xuXG4gICAgLy8gbm90ZSB0aGF0IHRoaXMgY29sdW1uIGhhcyBhIGZpeGVkIHdpZHRoXG4gICAgdGhpcy5pc0ZpeGVkV2lkdGggPSB0cnVlO1xuXG4gICAgLy8gaWYgd2UgaGF2ZSBub3QgaW5pdGlhbGlzZWQgdGhlbiBzZXQgdGhlIGVsZW1lbnQgd2lkdGhcbiAgICBpZiAoIXRoaXMuX3RhYmxlLmlzSW5pdGlhbGlzZWQkLnZhbHVlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3RoaXMuX3dpZHRofXB4YCk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gaWYgaXQgaXMgaW5pdGlhbGlzZWQgdGhlbiByZXNpemUgdGhlIGNvbHVtblxuICAgICAgY29uc3QgY3VycmVudFdpZHRoID0gdGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCk7XG5cbiAgICAgIC8vIHJlc2l6ZSB0aGUgY29sdW1uIGJ5IHRoZSBkaWZmZXJlbmNlIGluIHNpemVcbiAgICAgIHRoaXMuX3RhYmxlLnJlc2l6ZUNvbHVtbih0aGlzLmdldENlbGxJbmRleCgpLCB0aGlzLl93aWR0aCAtIGN1cnJlbnRXaWR0aCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBFbWl0IHRoZSBjdXJyZW50IGNvbHVtbiB3aWR0aCAqL1xuICBAT3V0cHV0KCkgd2lkdGhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogVGhlIHBlcmNlbnRhZ2Ugd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ2V0IGNvbHVtbldpZHRoKCk6IHN0cmluZyB7XG5cbiAgICBpZiAoIXRoaXMuX3RhYmxlLmlzSW5pdGlhbGlzZWQkLnZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLl93aWR0aH1weGA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlLmlzUmVzaXppbmcgP1xuICAgICAgYCR7dGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCl9cHhgIDpcbiAgICAgIGAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGVyY2VudGFnZSl9JWA7XG4gIH1cblxuICAvKiogVGhlIGZsZXggd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgnKSBnZXQgZmxleCgpOiBzdHJpbmcge1xuXG4gICAgLy8gaWYgd2UgYXJlIHJlc2l6aW5nIHRoZW4gYWx3YXlzIHJldHVybiAnbm9uZScgdG8gYWxsb3cgZnJlZSBtb3ZlbWVudFxuICAgIGlmICh0aGlzLl90YWJsZS5pc1Jlc2l6aW5nIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlLmlzSW5pdGlhbGlzZWQkLnZhbHVlID8gYDAgMSAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGVyY2VudGFnZSl9JWAgOiAnJztcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIG1pbmltdW0gd2lkdGggYWxsb3dlZCBieSB0aGUgY29sdW1uICovXG4gIGdldCBtaW5XaWR0aCgpOiBudW1iZXIge1xuICAgIC8vIGRldGVybWluZSB0aGUgbWluaW11bSB3aWR0aCBvZiB0aGUgY29sdW1uIGJhc2VkIG9uIGl0cyBjb21wdXRlZCBDU1MgdmFsdWVcbiAgICBjb25zdCBjb21wdXRlZCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLm1pbldpZHRoKTtcblxuICAgIC8vIGlmIGl0IGlzIGRpc2FibGVkIHVzZSBpdHMgY3VycmVudCB3aWR0aCAtIG90aGVyd2lzZSB1c2UgaXRzIENTUyBtaW4gd2lkdGggaWYgaXQgaXMgdmFsaWRcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA6IGlzTmFOKGNvbXB1dGVkKSA/IDAgOiBjb21wdXRlZDtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmUgaWYgdGhpcyBjb2x1bW4gaXMgYSB2YXJpYWJsZSB3aWR0aCBjb2x1bW4gKi9cbiAgaXNGaXhlZFdpZHRoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFN0b3JlIHRoZSB3aWR0aCBzcGVjaWZpY2FsbHkgc2V0IGJ5IHRoZSBpbnB1dCAqL1xuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuXG4gIC8qKiBTdG9yZSB0aGUgcG9zaXRpb24gb2YgdGhlIG1vdXNlIHdpdGhpbiB0aGUgZHJhZyBoYW5sZGUgKi9cbiAgcHJpdmF0ZSBfb2Zmc2V0OiBudW1iZXI7XG5cbiAgLyoqIEVtaXQgd2hlbiBhbGwgb2JzZXJ2YWJsZXMgc2hvdWxkIGJlIHVuc3Vic2NyaWJlZCAqL1xuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3RhYmxlOiBSZXNpemFibGVUYWJsZVNlcnZpY2UsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICAgIC8vIGluaXRpYWxseSBlbWl0IHRoZSBzaXplIHdoZW4gd2UgaGF2ZSBpbml0aWFsaXNlZFxuICAgIF90YWJsZS5pc0luaXRpYWxpc2VkJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoaXNJbml0aWFsaXNlZCA9PiBpc0luaXRpYWxpc2VkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy53aWR0aENoYW5nZS5lbWl0KF90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBpeGVsKSkpO1xuXG4gICAgLy8gZW5zdXJlIHRoZSBjb3JyZWN0IHdpZHRoIGdldHMgZW1pdHRlZCBvbiBjb2x1bW4gc2l6ZSBjaGFuZ2VcbiAgICBfdGFibGUub25SZXNpemUkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMud2lkdGhDaGFuZ2UuZW1pdChfdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCkpKTtcbiAgfVxuXG4gIC8qKiBDbGVhbnVwIHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZCAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgbmF0dXJhbCBwaXhlbCB3aWR0aCBvZiB0aGUgY29sdW1uICovXG4gIGdldE5hdHVyYWxXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl93aWR0aCB8fCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH1cblxuICAvKiogV2hlbiB0aGUgZHJhZ2dpbmcgc3RhcnRzICovXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG5cbiAgICAvLyBkZXRlcm1pbmUgdGhlIG1vdXNlIHBvc2l0aW9uIHdpdGhpbiB0aGUgaGFuZGxlXG4gICAgdGhpcy5fb2Zmc2V0ID0gZXZlbnQuY2xpZW50WCAtIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gIH1cblxuICAvKiogV2hlbiB0aGUgbW91c2UgaXMgbW92ZWQgKi9cbiAgb25EcmFnTW92ZShldmVudDogTW91c2VFdmVudCwgaGFuZGxlOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xuXG4gICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgY29uc3QgbW91c2VYID0gZXZlbnQucGFnZVggLSBwYWdlWE9mZnNldDtcblxuICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBkcmFnIGhhbmRsZVxuICAgIGNvbnN0IHsgbGVmdCB9ID0gaGFuZGxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gZGV0ZXJtaW5lIGhvdyBtdWNoIHRoZSBtb3VzZSBoYXMgbW92ZWQgc2luY2UgdGhlIGxhc3QgdXBkYXRlXG4gICAgY29uc3QgZGVsdGEgPSBtb3VzZVggLSAobGVmdCArIHRoaXMuX29mZnNldCk7XG5cbiAgICAvLyBwZXJmb3JtIHJlc2l6aW5nXG4gICAgdGhpcy5fdGFibGUucmVzaXplQ29sdW1uKHRoaXMuZ2V0Q2VsbEluZGV4KCksIGRlbHRhKTtcblxuICAgIC8vIHNldCB0aGUgcmVzaXppbmcgc3RhdGVcbiAgICB0aGlzLl90YWJsZS5zZXRSZXNpemluZyh0cnVlKTtcbiAgfVxuXG4gIC8qKiBXaGVuIHRoZSBkcmFnZ2luZyBlbmRzICovXG4gIG9uRHJhZ0VuZCgpOiB2b2lkIHtcbiAgICB0aGlzLl90YWJsZS5zZXRSZXNpemluZyhmYWxzZSk7XG4gIH1cblxuICAvKiogU2hyaW5rIHRoZSBjb2x1bW4gd2hlbiB0aGUgbGVmdCBhcnJvdyBrZXkgaXMgcHJlc3NlZCAqL1xuICBvbk1vdmVMZWZ0KCk6IHZvaWQge1xuICAgIHRoaXMuX3RhYmxlLnJlc2l6ZUNvbHVtbih0aGlzLmdldENlbGxJbmRleCgpLCAtMTApO1xuICB9XG5cbiAgLyoqIEdyb3cgdGhlIGNvbHVtbiB3aGVuIHRoZSByaWdodCBhcnJvdyBrZXkgaXMgcHJlc3NlZCAqL1xuICBvbk1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl90YWJsZS5yZXNpemVDb2x1bW4odGhpcy5nZXRDZWxsSW5kZXgoKSwgMTApO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgY29sdW1uIGluZGV4IHRoaXMgY2VsbCBpcyBwYXJ0IG9mICovXG4gIGdldENlbGxJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50KS5jZWxsSW5kZXg7XG4gIH1cbn1cbiJdfQ==