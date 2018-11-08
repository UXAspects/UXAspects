/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostBinding } from '@angular/core';
import { ColumnUnit, ResizableTableService } from './resizable-table.service';
var ResizableTableCellDirective = /** @class */ (function () {
    function ResizableTableCellDirective(_elementRef, _table) {
        this._elementRef = _elementRef;
        this._table = _table;
    }
    Object.defineProperty(ResizableTableCellDirective.prototype, "width", {
        /** The percentage width of the column */
        get: /**
         * The percentage width of the column
         * @return {?}
         */
        function () {
            return this._table.isResizing || this._table.getColumnDisabled(this.getCellIndex()) ?
                this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Pixel) + "px" :
                this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage) + "%";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableTableCellDirective.prototype, "flex", {
        /** The flex width of the column */
        get: /**
         * The flex width of the column
         * @return {?}
         */
        function () {
            // if we are resizing then always return 'none' to allow free movement
            if (this._table.isResizing || this._table.getColumnDisabled(this.getCellIndex())) {
                return 'none';
            }
            return this._table.isInitialised$.value ? "0 1 " + this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage) + "%" : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the column index this cell is part of
     * @return {?}
     */
    ResizableTableCellDirective.prototype.getCellIndex = /**
     * Get the column index this cell is part of
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this._elementRef.nativeElement)).cellIndex;
    };
    ResizableTableCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxResizableTableCell]'
                },] }
    ];
    /** @nocollapse */
    ResizableTableCellDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResizableTableService }
    ]; };
    ResizableTableCellDirective.propDecorators = {
        width: [{ type: HostBinding, args: ['style.width',] }],
        flex: [{ type: HostBinding, args: ['style.flex',] }]
    };
    return ResizableTableCellDirective;
}());
export { ResizableTableCellDirective };
function ResizableTableCellDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ResizableTableCellDirective.prototype._elementRef;
    /** @type {?} */
    ResizableTableCellDirective.prototype._table;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNlbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFibGUvdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUtY2VsbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBMkI1RSxxQ0FBb0IsV0FBdUIsRUFBVSxNQUE2QjtRQUE5RCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCO0tBQUs7SUFsQnZGLHNCQUFnQyw4Q0FBSztRQURyQyx5Q0FBeUM7Ozs7O1FBQ3pDO1lBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBSSxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQUcsQ0FBQztTQUNoRjs7O09BQUE7SUFHRCxzQkFBK0IsNkNBQUk7UUFEbkMsbUNBQW1DOzs7OztRQUNuQzs7WUFHRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakYsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNmO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNqSTs7O09BQUE7Ozs7O0lBS08sa0RBQVk7Ozs7O1FBQ2xCLE1BQU0sQ0FBQyxtQkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQXFDLEVBQUMsQ0FBQyxTQUFTLENBQUM7OztnQkE3QjdFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2lCQUNuQzs7OztnQkFMbUIsVUFBVTtnQkFDVCxxQkFBcUI7Ozt3QkFTdkMsV0FBVyxTQUFDLGFBQWE7dUJBUXpCLFdBQVcsU0FBQyxZQUFZOztzQ0FsQjNCOztTQU1hLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbHVtblVuaXQsIFJlc2l6YWJsZVRhYmxlU2VydmljZSB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhSZXNpemFibGVUYWJsZUNlbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVUYWJsZUNlbGxEaXJlY3RpdmUge1xuXG5cbiAgLyoqIFRoZSBwZXJjZW50YWdlIHdpZHRoIG9mIHRoZSBjb2x1bW4gKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIGdldCB3aWR0aCgpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlLmlzUmVzaXppbmcgfHwgdGhpcy5fdGFibGUuZ2V0Q29sdW1uRGlzYWJsZWQodGhpcy5nZXRDZWxsSW5kZXgoKSkgP1xuICAgICAgYCR7dGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCl9cHhgIDpcbiAgICAgIGAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGVyY2VudGFnZSl9JWA7XG4gIH1cblxuICAvKiogVGhlIGZsZXggd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgnKSBnZXQgZmxleCgpOiBzdHJpbmcge1xuXG4gICAgLy8gaWYgd2UgYXJlIHJlc2l6aW5nIHRoZW4gYWx3YXlzIHJldHVybiAnbm9uZScgdG8gYWxsb3cgZnJlZSBtb3ZlbWVudFxuICAgIGlmICh0aGlzLl90YWJsZS5pc1Jlc2l6aW5nIHx8IHRoaXMuX3RhYmxlLmdldENvbHVtbkRpc2FibGVkKHRoaXMuZ2V0Q2VsbEluZGV4KCkpKSB7XG4gICAgICByZXR1cm4gJ25vbmUnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90YWJsZS5pc0luaXRpYWxpc2VkJC52YWx1ZSA/IGAwIDEgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBlcmNlbnRhZ2UpfSVgIDogJyc7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF90YWJsZTogUmVzaXphYmxlVGFibGVTZXJ2aWNlKSB7IH1cblxuICAvKiogR2V0IHRoZSBjb2x1bW4gaW5kZXggdGhpcyBjZWxsIGlzIHBhcnQgb2YgKi9cbiAgcHJpdmF0ZSBnZXRDZWxsSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MVGFibGVDZWxsRWxlbWVudCkuY2VsbEluZGV4O1xuICB9XG59XG4iXX0=