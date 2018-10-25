/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';
export class ResizableTableColumnComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _table
     */
    constructor(_elementRef, _table) {
        this._elementRef = _elementRef;
        this._table = _table;
        /**
         * Disabled the column resizing
         */
        this.disabled = false;
    }
    /**
     * The percentage width of the column
     * @return {?}
     */
    get width() {
        if (!this._table.isInitialised.value) {
            return;
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
        if (this._table.isResizing) {
            return 'none';
        }
        return this._table.isInitialised.value ? `0 1 ${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%` : '';
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
     * Get the natural pixel width of the column
     * @return {?}
     */
    getNaturalWidth() {
        return this._elementRef.nativeElement.offsetWidth;
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
     * @return {?}
     */
    onMoveLeft() {
        this._table.resizeColumn(this.getCellIndex(), -10);
    }
    /**
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
    { type: ResizableTableService }
];
ResizableTableColumnComponent.propDecorators = {
    disabled: [{ type: Input }],
    width: [{ type: HostBinding, args: ['style.width',] }],
    flex: [{ type: HostBinding, args: ['style.flex',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVM5RSxNQUFNOzs7OztJQXdDSixZQUFvQixXQUF1QixFQUFVLE1BQTZCO1FBQTlELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7Ozs7d0JBckNyRCxLQUFLO0tBcUNxRDs7Ozs7SUFsQ3ZGLElBQWdDLEtBQUs7UUFFbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQztTQUNSO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztLQUNoRjs7Ozs7SUFHRCxJQUErQixJQUFJOztRQUdqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNmO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNoSTs7Ozs7SUFHRCxJQUFJLFFBQVE7O1FBRVYsdUJBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUd2RixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQ3BHOzs7OztJQVFELGVBQWU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0tBQ25EOzs7Ozs7SUFHRCxXQUFXLENBQUMsS0FBaUI7O1FBRzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxtQkFBQyxLQUFLLENBQUMsTUFBcUIsRUFBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDO0tBQzNGOzs7Ozs7O0lBR0QsVUFBVSxDQUFDLEtBQWlCLEVBQUUsTUFBc0I7O1FBR2xELHVCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQzs7UUFHekMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztRQUdoRCx1QkFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFHN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBRS9COzs7OztJQUdELFNBQVM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoQzs7OztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNwRDs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBR08sWUFBWTtRQUNsQixNQUFNLENBQUMsbUJBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFxQyxFQUFDLENBQUMsU0FBUyxDQUFDOzs7O1lBL0Y3RSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsd2pCQUFzRDtnQkFDdEQsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSwyQkFBMkI7aUJBQ25DO2FBQ0Y7Ozs7WUFUbUIsVUFBVTtZQUNULHFCQUFxQjs7O3VCQVl2QyxLQUFLO29CQUdMLFdBQVcsU0FBQyxhQUFhO21CQVl6QixXQUFXLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2x1bW5Vbml0LCBSZXNpemFibGVUYWJsZVNlcnZpY2UgfSBmcm9tICcuL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW3V4UmVzaXphYmxlVGFibGVDb2x1bW5dJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICd1eC1yZXNpemFibGUtdGFibGUtY29sdW1uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZVRhYmxlQ29sdW1uQ29tcG9uZW50IHtcblxuICAvKiogRGlzYWJsZWQgdGhlIGNvbHVtbiByZXNpemluZyAqL1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgcGVyY2VudGFnZSB3aWR0aCBvZiB0aGUgY29sdW1uICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBnZXQgd2lkdGgoKTogc3RyaW5nIHtcblxuICAgIGlmICghdGhpcy5fdGFibGUuaXNJbml0aWFsaXNlZC52YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90YWJsZS5pc1Jlc2l6aW5nID9cbiAgICAgIGAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGl4ZWwpfXB4YCA6XG4gICAgICBgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBlcmNlbnRhZ2UpfSVgO1xuICB9XG5cbiAgLyoqIFRoZSBmbGV4IHdpZHRoIG9mIHRoZSBjb2x1bW4gKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4JykgZ2V0IGZsZXgoKTogc3RyaW5nIHtcblxuICAgIC8vIGlmIHdlIGFyZSByZXNpemluZyB0aGVuIGFsd2F5cyByZXR1cm4gJ25vbmUnIHRvIGFsbG93IGZyZWUgbW92ZW1lbnRcbiAgICBpZiAodGhpcy5fdGFibGUuaXNSZXNpemluZykge1xuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fdGFibGUuaXNJbml0aWFsaXNlZC52YWx1ZSA/IGAwIDEgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBlcmNlbnRhZ2UpfSVgIDogJyc7XG4gIH1cblxuICAvKiogR2V0IHRoZSBtaW5pbXVtIHdpZHRoIGFsbG93ZWQgYnkgdGhlIGNvbHVtbiAqL1xuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcbiAgICAvLyBkZXRlcm1pbmUgdGhlIG1pbmltdW0gd2lkdGggb2YgdGhlIGNvbHVtbiBiYXNlZCBvbiBpdHMgY29tcHV0ZWQgQ1NTIHZhbHVlXG4gICAgY29uc3QgY29tcHV0ZWQgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5taW5XaWR0aCk7XG5cbiAgICAvLyBpZiBpdCBpcyBkaXNhYmxlZCB1c2UgaXRzIGN1cnJlbnQgd2lkdGggLSBvdGhlcndpc2UgdXNlIGl0cyBDU1MgbWluIHdpZHRoIGlmIGl0IGlzIHZhbGlkXG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggOiBpc05hTihjb21wdXRlZCkgPyAwIDogY29tcHV0ZWQ7XG4gIH1cblxuICAvKiogU3RvcmUgdGhlIHBvc2l0aW9uIG9mIHRoZSBtb3VzZSB3aXRoaW4gdGhlIGRyYWcgaGFubGRlICovXG4gIHByaXZhdGUgX29mZnNldDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3RhYmxlOiBSZXNpemFibGVUYWJsZVNlcnZpY2UpIHsgfVxuXG4gIC8qKiBHZXQgdGhlIG5hdHVyYWwgcGl4ZWwgd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBnZXROYXR1cmFsV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICB9XG5cbiAgLyoqIFdoZW4gdGhlIGRyYWdnaW5nIHN0YXJ0cyAqL1xuICBvbkRyYWdTdGFydChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBtb3VzZSBwb3NpdGlvbiB3aXRoaW4gdGhlIGhhbmRsZVxuICAgIHRoaXMuX29mZnNldCA9IGV2ZW50LmNsaWVudFggLSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICB9XG5cbiAgLyoqIFdoZW4gdGhlIG1vdXNlIGlzIG1vdmVkICovXG4gIG9uRHJhZ01vdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGhhbmRsZTogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcblxuICAgIC8vIGdldCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuICAgIGNvbnN0IG1vdXNlWCA9IGV2ZW50LnBhZ2VYIC0gcGFnZVhPZmZzZXQ7XG5cbiAgICAvLyBwb3NpdGlvbiBvZiB0aGUgZHJhZyBoYW5kbGVcbiAgICBjb25zdCB7IGxlZnQgfSA9IGhhbmRsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIGRldGVybWluZSBob3cgbXVjaCB0aGUgbW91c2UgaGFzIG1vdmVkIHNpbmNlIHRoZSBsYXN0IHVwZGF0ZVxuICAgIGNvbnN0IGRlbHRhID0gbW91c2VYIC0gKGxlZnQgKyB0aGlzLl9vZmZzZXQpO1xuXG4gICAgLy8gcGVyZm9ybSByZXNpemluZ1xuICAgIHRoaXMuX3RhYmxlLnJlc2l6ZUNvbHVtbih0aGlzLmdldENlbGxJbmRleCgpLCBkZWx0YSk7XG5cbiAgICB0aGlzLl90YWJsZS5zZXRSZXNpemluZyh0cnVlKTtcblxuICB9XG5cbiAgLyoqIFdoZW4gdGhlIGRyYWdnaW5nIGVuZHMgKi9cbiAgb25EcmFnRW5kKCk6IHZvaWQge1xuICAgIHRoaXMuX3RhYmxlLnNldFJlc2l6aW5nKGZhbHNlKTtcbiAgfVxuXG4gIG9uTW92ZUxlZnQoKTogdm9pZCB7XG4gICAgdGhpcy5fdGFibGUucmVzaXplQ29sdW1uKHRoaXMuZ2V0Q2VsbEluZGV4KCksIC0xMCk7XG4gIH1cblxuICBvbk1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl90YWJsZS5yZXNpemVDb2x1bW4odGhpcy5nZXRDZWxsSW5kZXgoKSwgMTApO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgY29sdW1uIGluZGV4IHRoaXMgY2VsbCBpcyBwYXJ0IG9mICovXG4gIHByaXZhdGUgZ2V0Q2VsbEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQpLmNlbGxJbmRleDtcbiAgfVxufVxuIl19