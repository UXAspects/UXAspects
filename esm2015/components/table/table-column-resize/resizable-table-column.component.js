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
                template: "<ng-content></ng-content>\n\n<div #handle\n     uxDrag\n     class=\"ux-resizable-table-column-handle\"\n     *ngIf=\"!disabled\"\n     (onDragStart)=\"onDragStart($event)\"\n     (onDrag)=\"onDragMove($event, handle)\"\n     (onDragEnd)=\"onDragEnd()\">\n</div>\n",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVM5RSxNQUFNOzs7OztJQXdDSixZQUFvQixXQUF1QixFQUFVLE1BQTZCO1FBQTlELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7Ozs7d0JBckNyRCxLQUFLO0tBcUNxRDs7Ozs7SUFsQ3ZGLElBQWdDLEtBQUs7UUFFbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQztTQUNSO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztLQUNoRjs7Ozs7SUFHRCxJQUErQixJQUFJOztRQUdqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNmO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNoSTs7Ozs7SUFHRCxJQUFJLFFBQVE7O1FBRVYsdUJBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUd2RixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQ3BHOzs7OztJQVFELGVBQWU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0tBQ25EOzs7Ozs7SUFHRCxXQUFXLENBQUMsS0FBaUI7O1FBRzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxtQkFBQyxLQUFLLENBQUMsTUFBcUIsRUFBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDO0tBQzNGOzs7Ozs7O0lBR0QsVUFBVSxDQUFDLEtBQWlCLEVBQUUsTUFBc0I7O1FBR2xELHVCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQzs7UUFHekMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztRQUdoRCx1QkFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFHN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBRS9COzs7OztJQUdELFNBQVM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoQzs7Ozs7SUFHTyxZQUFZO1FBQ2xCLE1BQU0sQ0FBQyxtQkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQXFDLEVBQUMsQ0FBQyxTQUFTLENBQUM7Ozs7WUF2RjdFLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxvUkFBc0Q7Z0JBQ3RELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsMkJBQTJCO2lCQUNuQzthQUNGOzs7O1lBVG1CLFVBQVU7WUFDVCxxQkFBcUI7Ozt1QkFZdkMsS0FBSztvQkFHTCxXQUFXLFNBQUMsYUFBYTttQkFZekIsV0FBVyxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sdW1uVW5pdCwgUmVzaXphYmxlVGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUtdGFibGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1t1eFJlc2l6YWJsZVRhYmxlQ29sdW1uXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXNpemFibGUtdGFibGUtY29sdW1uLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAndXgtcmVzaXphYmxlLXRhYmxlLWNvbHVtbidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB7XG5cbiAgLyoqIERpc2FibGVkIHRoZSBjb2x1bW4gcmVzaXppbmcgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIHBlcmNlbnRhZ2Ugd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ2V0IHdpZHRoKCk6IHN0cmluZyB7XG5cbiAgICBpZiAoIXRoaXMuX3RhYmxlLmlzSW5pdGlhbGlzZWQudmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fdGFibGUuaXNSZXNpemluZyA/XG4gICAgICBgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBpeGVsKX1weGAgOlxuICAgICAgYCR7dGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QZXJjZW50YWdlKX0lYDtcbiAgfVxuXG4gIC8qKiBUaGUgZmxleCB3aWR0aCBvZiB0aGUgY29sdW1uICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleCcpIGdldCBmbGV4KCk6IHN0cmluZyB7XG5cbiAgICAvLyBpZiB3ZSBhcmUgcmVzaXppbmcgdGhlbiBhbHdheXMgcmV0dXJuICdub25lJyB0byBhbGxvdyBmcmVlIG1vdmVtZW50XG4gICAgaWYgKHRoaXMuX3RhYmxlLmlzUmVzaXppbmcpIHtcbiAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlLmlzSW5pdGlhbGlzZWQudmFsdWUgPyBgMCAxICR7dGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QZXJjZW50YWdlKX0lYCA6ICcnO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgbWluaW11bSB3aWR0aCBhbGxvd2VkIGJ5IHRoZSBjb2x1bW4gKi9cbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBtaW5pbXVtIHdpZHRoIG9mIHRoZSBjb2x1bW4gYmFzZWQgb24gaXRzIGNvbXB1dGVkIENTUyB2YWx1ZVxuICAgIGNvbnN0IGNvbXB1dGVkID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkubWluV2lkdGgpO1xuXG4gICAgLy8gaWYgaXQgaXMgZGlzYWJsZWQgdXNlIGl0cyBjdXJyZW50IHdpZHRoIC0gb3RoZXJ3aXNlIHVzZSBpdHMgQ1NTIG1pbiB3aWR0aCBpZiBpdCBpcyB2YWxpZFxuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIDogaXNOYU4oY29tcHV0ZWQpID8gMCA6IGNvbXB1dGVkO1xuICB9XG5cbiAgLyoqIFN0b3JlIHRoZSBwb3NpdGlvbiBvZiB0aGUgbW91c2Ugd2l0aGluIHRoZSBkcmFnIGhhbmxkZSAqL1xuICBwcml2YXRlIF9vZmZzZXQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF90YWJsZTogUmVzaXphYmxlVGFibGVTZXJ2aWNlKSB7IH1cblxuICAvKiogR2V0IHRoZSBuYXR1cmFsIHBpeGVsIHdpZHRoIG9mIHRoZSBjb2x1bW4gKi9cbiAgZ2V0TmF0dXJhbFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgfVxuXG4gIC8qKiBXaGVuIHRoZSBkcmFnZ2luZyBzdGFydHMgKi9cbiAgb25EcmFnU3RhcnQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcblxuICAgIC8vIGRldGVybWluZSB0aGUgbW91c2UgcG9zaXRpb24gd2l0aGluIHRoZSBoYW5kbGVcbiAgICB0aGlzLl9vZmZzZXQgPSBldmVudC5jbGllbnRYIC0gKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgfVxuXG4gIC8qKiBXaGVuIHRoZSBtb3VzZSBpcyBtb3ZlZCAqL1xuICBvbkRyYWdNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50LCBoYW5kbGU6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG5cbiAgICAvLyBnZXQgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cbiAgICBjb25zdCBtb3VzZVggPSBldmVudC5wYWdlWCAtIHBhZ2VYT2Zmc2V0O1xuXG4gICAgLy8gcG9zaXRpb24gb2YgdGhlIGRyYWcgaGFuZGxlXG4gICAgY29uc3QgeyBsZWZ0IH0gPSBoYW5kbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBkZXRlcm1pbmUgaG93IG11Y2ggdGhlIG1vdXNlIGhhcyBtb3ZlZCBzaW5jZSB0aGUgbGFzdCB1cGRhdGVcbiAgICBjb25zdCBkZWx0YSA9IG1vdXNlWCAtIChsZWZ0ICsgdGhpcy5fb2Zmc2V0KTtcblxuICAgIC8vIHBlcmZvcm0gcmVzaXppbmdcbiAgICB0aGlzLl90YWJsZS5yZXNpemVDb2x1bW4odGhpcy5nZXRDZWxsSW5kZXgoKSwgZGVsdGEpO1xuXG4gICAgdGhpcy5fdGFibGUuc2V0UmVzaXppbmcodHJ1ZSk7XG5cbiAgfVxuXG4gIC8qKiBXaGVuIHRoZSBkcmFnZ2luZyBlbmRzICovXG4gIG9uRHJhZ0VuZCgpOiB2b2lkIHtcbiAgICB0aGlzLl90YWJsZS5zZXRSZXNpemluZyhmYWxzZSk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBjb2x1bW4gaW5kZXggdGhpcyBjZWxsIGlzIHBhcnQgb2YgKi9cbiAgcHJpdmF0ZSBnZXRDZWxsSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MVGFibGVDZWxsRWxlbWVudCkuY2VsbEluZGV4O1xuICB9XG59XG4iXX0=