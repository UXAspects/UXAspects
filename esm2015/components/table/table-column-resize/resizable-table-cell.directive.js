/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostBinding } from '@angular/core';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';
export class ResizableTableCellDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _table
     */
    constructor(_elementRef, _table) {
        this._elementRef = _elementRef;
        this._table = _table;
    }
    /**
     * The percentage width of the column
     * @return {?}
     */
    get width() {
        return this._table.isResizing || this._table.getColumnDisabled(this.getCellIndex()) ?
            `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel)}px` :
            `${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%`;
    }
    /**
     * The flex width of the column
     * @return {?}
     */
    get flex() {
        // if we are resizing then always return 'none' to allow free movement
        if (this._table.isResizing || this._table.getColumnDisabled(this.getCellIndex())) {
            return 'none';
        }
        return this._table.isInitialised$.value ? `0 1 ${this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage)}%` : '';
    }
    /**
     * Get the column index this cell is part of
     * @return {?}
     */
    getCellIndex() {
        return (/** @type {?} */ (this._elementRef.nativeElement)).cellIndex;
    }
}
ResizableTableCellDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxResizableTableCell]'
            },] }
];
/** @nocollapse */
ResizableTableCellDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizableTableService }
];
ResizableTableCellDirective.propDecorators = {
    width: [{ type: HostBinding, args: ['style.width',] }],
    flex: [{ type: HostBinding, args: ['style.flex',] }]
};
function ResizableTableCellDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ResizableTableCellDirective.prototype._elementRef;
    /** @type {?} */
    ResizableTableCellDirective.prototype._table;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNlbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFibGUvdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUtY2VsbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLOUUsTUFBTTs7Ozs7SUFzQkosWUFBb0IsV0FBdUIsRUFBVSxNQUE2QjtRQUE5RCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCO0tBQUs7Ozs7O0lBbEJ2RixJQUFnQyxLQUFLO1FBRW5DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkYsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztLQUNoRjs7Ozs7SUFHRCxJQUErQixJQUFJOztRQUdqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRixNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2Y7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ2pJOzs7OztJQUtPLFlBQVk7UUFDbEIsTUFBTSxDQUFDLG1CQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBcUMsRUFBQyxDQUFDLFNBQVMsQ0FBQzs7OztZQTdCN0UsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7YUFDbkM7Ozs7WUFMbUIsVUFBVTtZQUNULHFCQUFxQjs7O29CQVN2QyxXQUFXLFNBQUMsYUFBYTttQkFRekIsV0FBVyxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2x1bW5Vbml0LCBSZXNpemFibGVUYWJsZVNlcnZpY2UgfSBmcm9tICcuL3Jlc2l6YWJsZS10YWJsZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3V4UmVzaXphYmxlVGFibGVDZWxsXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlVGFibGVDZWxsRGlyZWN0aXZlIHtcblxuXG4gIC8qKiBUaGUgcGVyY2VudGFnZSB3aWR0aCBvZiB0aGUgY29sdW1uICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBnZXQgd2lkdGgoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLl90YWJsZS5pc1Jlc2l6aW5nIHx8IHRoaXMuX3RhYmxlLmdldENvbHVtbkRpc2FibGVkKHRoaXMuZ2V0Q2VsbEluZGV4KCkpID9cbiAgICAgIGAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGl4ZWwpfXB4YCA6XG4gICAgICBgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBlcmNlbnRhZ2UpfSVgO1xuICB9XG5cbiAgLyoqIFRoZSBmbGV4IHdpZHRoIG9mIHRoZSBjb2x1bW4gKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4JykgZ2V0IGZsZXgoKTogc3RyaW5nIHtcblxuICAgIC8vIGlmIHdlIGFyZSByZXNpemluZyB0aGVuIGFsd2F5cyByZXR1cm4gJ25vbmUnIHRvIGFsbG93IGZyZWUgbW92ZW1lbnRcbiAgICBpZiAodGhpcy5fdGFibGUuaXNSZXNpemluZyB8fCB0aGlzLl90YWJsZS5nZXRDb2x1bW5EaXNhYmxlZCh0aGlzLmdldENlbGxJbmRleCgpKSkge1xuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fdGFibGUuaXNJbml0aWFsaXNlZCQudmFsdWUgPyBgMCAxICR7dGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QZXJjZW50YWdlKX0lYCA6ICcnO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfdGFibGU6IFJlc2l6YWJsZVRhYmxlU2VydmljZSkgeyB9XG5cbiAgLyoqIEdldCB0aGUgY29sdW1uIGluZGV4IHRoaXMgY2VsbCBpcyBwYXJ0IG9mICovXG4gIHByaXZhdGUgZ2V0Q2VsbEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQpLmNlbGxJbmRleDtcbiAgfVxufVxuIl19