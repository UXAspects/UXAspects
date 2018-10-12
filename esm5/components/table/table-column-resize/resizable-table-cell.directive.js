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
            return this._table.isResizing ?
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
            if (this._table.isResizing) {
                return 'none';
            }
            return this._table.isInitialised.value ? "0 1 " + this._table.getColumnWidth(this.getCellIndex(), ColumnUnit.Percentage) + "%" : '';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNlbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFibGUvdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUtY2VsbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBMEI1RSxxQ0FBb0IsV0FBdUIsRUFBVSxNQUE2QjtRQUE5RCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCO0tBQUs7SUFqQnZGLHNCQUFnQyw4Q0FBSztRQURyQyx5Q0FBeUM7Ozs7O1FBQ3pDO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQUksQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFHLENBQUM7U0FDaEY7OztPQUFBO0lBR0Qsc0JBQStCLDZDQUFJO1FBRG5DLG1DQUFtQzs7Ozs7UUFDbkM7O1lBR0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2Y7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ2hJOzs7T0FBQTs7Ozs7SUFLTyxrREFBWTs7Ozs7UUFDbEIsTUFBTSxDQUFDLG1CQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBcUMsRUFBQyxDQUFDLFNBQVMsQ0FBQzs7O2dCQTVCN0UsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DOzs7O2dCQUxtQixVQUFVO2dCQUNULHFCQUFxQjs7O3dCQVN2QyxXQUFXLFNBQUMsYUFBYTt1QkFPekIsV0FBVyxTQUFDLFlBQVk7O3NDQWpCM0I7O1NBTWEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sdW1uVW5pdCwgUmVzaXphYmxlVGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUtdGFibGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eFJlc2l6YWJsZVRhYmxlQ2VsbF0nXG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZVRhYmxlQ2VsbERpcmVjdGl2ZSB7XG5cblxuICAvKiogVGhlIHBlcmNlbnRhZ2Ugd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ2V0IHdpZHRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlLmlzUmVzaXppbmcgP1xuICAgICAgYCR7dGhpcy5fdGFibGUuZ2V0Q29sdW1uV2lkdGgodGhpcy5nZXRDZWxsSW5kZXgoKSwgQ29sdW1uVW5pdC5QaXhlbCl9cHhgIDpcbiAgICAgIGAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGVyY2VudGFnZSl9JWA7XG4gIH1cblxuICAvKiogVGhlIGZsZXggd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgnKSBnZXQgZmxleCgpOiBzdHJpbmcge1xuXG4gICAgLy8gaWYgd2UgYXJlIHJlc2l6aW5nIHRoZW4gYWx3YXlzIHJldHVybiAnbm9uZScgdG8gYWxsb3cgZnJlZSBtb3ZlbWVudFxuICAgIGlmICh0aGlzLl90YWJsZS5pc1Jlc2l6aW5nKSB7XG4gICAgICByZXR1cm4gJ25vbmUnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90YWJsZS5pc0luaXRpYWxpc2VkLnZhbHVlID8gYDAgMSAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGVyY2VudGFnZSl9JWAgOiAnJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3RhYmxlOiBSZXNpemFibGVUYWJsZVNlcnZpY2UpIHsgfVxuXG4gIC8qKiBHZXQgdGhlIGNvbHVtbiBpbmRleCB0aGlzIGNlbGwgaXMgcGFydCBvZiAqL1xuICBwcml2YXRlIGdldENlbGxJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50KS5jZWxsSW5kZXg7XG4gIH1cbn1cbiJdfQ==