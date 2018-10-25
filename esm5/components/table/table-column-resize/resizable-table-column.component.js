/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';
var ResizableTableColumnComponent = /** @class */ (function () {
    function ResizableTableColumnComponent(_elementRef, _table) {
        this._elementRef = _elementRef;
        this._table = _table;
        /**
         * Disabled the column resizing
         */
        this.disabled = false;
    }
    Object.defineProperty(ResizableTableColumnComponent.prototype, "width", {
        /** The percentage width of the column */
        get: /**
         * The percentage width of the column
         * @return {?}
         */
        function () {
            if (!this._table.isInitialised.value) {
                return;
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
            if (this._table.isResizing) {
                return 'none';
            }
            return this._table.isInitialised.value ? "0 1 " + this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage) + "%" : '';
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
        return this._elementRef.nativeElement.offsetWidth;
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
    /**
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.onMoveLeft = /**
     * @return {?}
     */
    function () {
        this._table.resizeColumn(this.getCellIndex(), -10);
    };
    /**
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.onMoveRight = /**
     * @return {?}
     */
    function () {
        this._table.resizeColumn(this.getCellIndex(), 10);
    };
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
        { type: ResizableTableService }
    ]; };
    ResizableTableColumnComponent.propDecorators = {
        disabled: [{ type: Input }],
        width: [{ type: HostBinding, args: ['style.width',] }],
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
     * Store the position of the mouse within the drag hanlde
     * @type {?}
     */
    ResizableTableColumnComponent.prototype._offset;
    /** @type {?} */
    ResizableTableColumnComponent.prototype._elementRef;
    /** @type {?} */
    ResizableTableColumnComponent.prototype._table;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFpRDVFLHVDQUFvQixXQUF1QixFQUFVLE1BQTZCO1FBQTlELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7Ozs7d0JBckNyRCxLQUFLO0tBcUNxRDtJQWxDdkYsc0JBQWdDLGdEQUFLO1FBRHJDLHlDQUF5Qzs7Ozs7UUFDekM7WUFFRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQzthQUNSO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQUksQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFHLENBQUM7U0FDaEY7OztPQUFBO0lBR0Qsc0JBQStCLCtDQUFJO1FBRG5DLG1DQUFtQzs7Ozs7UUFDbkM7O1lBR0UsRUFBRSxDQUFDLENB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ImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2x1bW5Vbml0LCBSZXNpemFibGVUYWJsZVNlcnZpY2UgfSBmcm9tICcuL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW3V4UmVzaXphYmxlVGFibGVDb2x1bW5dJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICd1eC1yZXNpemFibGUtdGFibGUtY29sdW1uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50IHtcblxuICAvKiogRGlzYWJsZWQgdGhlIGNvbHVtbiByZXNpemluZyAqL1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgcGVyY2VudGFnZSB3aWR0aCBvZiB0aGUgY29sdW1uICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBnZXQgd2lkdGgoKTogc3RyaW5nIHtcblxuICAgIGlmICghdGhpcy5fdGFibGUuaXNJbml0aWFsaXNlZC52YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90YWJsZS5pc1Jlc2l6aW5nID9cbiAgICAgIGAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGl4ZWwpfXB4YCA6XG4gICAgICBgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBlcmNlbnRhZ2UpfSVgO1xuICB9XG5cbiAgLyoqIFRoZSBmbGV4IHdpZHRoIG9mIHRoZSBjb2x1bW4gKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4JykgZ2V0IGZsZXgoKTogc3RyaW5nIHtcblxuICAgIC8vIGlmIHdlIGFyZSByZXNpemluZyB0aGVuIGFsd2F5cyByZXR1cm4gJ25vbmUnIHRvIGFsbG93IGZyZWUgbW92ZW1lbnRcbiAgICBpZiAodGhpcy5fdGFibGUuaXNSZXNpemluZykge1xuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fdGFibGUuaXNJbml0aWFsaXNlZC52YWx1ZSA/IGAwIDEgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBlcmNlbnRhZ2UpfSVgIDogJyc7XG4gIH1cblxuICAvKiogR2V0IHRoZSBtaW5pbXVtIHdpZHRoIGFsbG93ZWQgYnkgdGhlIGNvbHVtbiAqL1xuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcbiAgICAvLyBkZXRlcm1pbmUgdGhlIG1pbmltdW0gd2lkdGggb2YgdGhlIGNvbHVtbiBiYXNlZCBvbiBpdHMgY29tcHV0ZWQgQ1NTIHZhbHVlXG4gICAgY29uc3QgY29tcHV0ZWQgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5taW5XaWR0aCk7XG5cbiAgICAvLyBpZiBpdCBpcyBkaXNhYmxlZCB1c2UgaXRzIGN1cnJlbnQgd2lkdGggLSBvdGhlcndpc2UgdXNlIGl0cyBDU1MgbWluIHdpZHRoIGlmIGl0IGlzIHZhbGlkXG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggOiBpc05hTihjb21wdXRlZCkgPyAwIDogY29tcHV0ZWQ7XG4gIH1cblxuICAvKiogU3RvcmUgdGhlIHBvc2l0aW9uIG9mIHRoZSBtb3VzZSB3aXRoaW4gdGhlIGRyYWcgaGFubGRlICovXG4gIHByaXZhdGUgX29mZnNldDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3RhYmxlOiBSZXNpemFibGVUYWJsZVNlcnZpY2UpIHsgfVxuXG4gIC8qKiBHZXQgdGhlIG5hdHVyYWwgcGl4ZWwgd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBnZXROYXR1cmFsV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICB9XG5cbiAgLyoqIFdoZW4gdGhlIGRyYWdnaW5nIHN0YXJ0cyAqL1xuICBvbkRyYWdTdGFydChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBtb3VzZSBwb3NpdGlvbiB3aXRoaW4gdGhlIGhhbmRsZVxuICAgIHRoaXMuX29mZnNldCA9IGV2ZW50LmNsaWVudFggLSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICB9XG5cbiAgLyoqIFdoZW4gdGhlIG1vdXNlIGlzIG1vdmVkICovXG4gIG9uRHJhZ01vdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGhhbmRsZTogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcblxuICAgIC8vIGdldCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuICAgIGNvbnN0IG1vdXNlWCA9IGV2ZW50LnBhZ2VYIC0gcGFnZVhPZmZzZXQ7XG5cbiAgICAvLyBwb3NpdGlvbiBvZiB0aGUgZHJhZyBoYW5kbGVcbiAgICBjb25zdCB7IGxlZnQgfSA9IGhhbmRsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIGRldGVybWluZSBob3cgbXVjaCB0aGUgbW91c2UgaGFzIG1vdmVkIHNpbmNlIHRoZSBsYXN0IHVwZGF0ZVxuICAgIGNvbnN0IGRlbHRhID0gbW91c2VYIC0gKGxlZnQgKyB0aGlzLl9vZmZzZXQpO1xuXG4gICAgLy8gcGVyZm9ybSByZXNpemluZ1xuICAgIHRoaXMuX3RhYmxlLnJlc2l6ZUNvbHVtbih0aGlzLmdldENlbGxJbmRleCgpLCBkZWx0YSk7XG5cbiAgICB0aGlzLl90YWJsZS5zZXRSZXNpemluZyh0cnVlKTtcblxuICB9XG5cbiAgLyoqIFdoZW4gdGhlIGRyYWdnaW5nIGVuZHMgKi9cbiAgb25EcmFnRW5kKCk6IHZvaWQge1xuICAgIHRoaXMuX3RhYmxlLnNldFJlc2l6aW5nKGZhbHNlKTtcbiAgfVxuXG4gIG9uTW92ZUxlZnQoKTogdm9pZCB7XG4gICAgdGhpcy5fdGFibGUucmVzaXplQ29sdW1uKHRoaXMuZ2V0Q2VsbEluZGV4KCksIC0xMCk7XG4gIH1cblxuICBvbk1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl90YWJsZS5yZXNpemVDb2x1bW4odGhpcy5nZXRDZWxsSW5kZXgoKSwgMTApO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgY29sdW1uIGluZGV4IHRoaXMgY2VsbCBpcyBwYXJ0IG9mICovXG4gIHByaXZhdGUgZ2V0Q2VsbEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQpLmNlbGxJbmRleDtcbiAgfVxufVxuIl19