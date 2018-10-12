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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNlbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFibGUvdGFibGUtY29sdW1uLXJlc2l6ZS9yZXNpemFibGUtdGFibGUtY2VsbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLOUUsTUFBTTs7Ozs7SUFxQkosWUFBb0IsV0FBdUIsRUFBVSxNQUE2QjtRQUE5RCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXVCO0tBQUs7Ozs7O0lBakJ2RixJQUFnQyxLQUFLO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7S0FDaEY7Ozs7O0lBR0QsSUFBK0IsSUFBSTs7UUFHakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDZjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDaEk7Ozs7O0lBS08sWUFBWTtRQUNsQixNQUFNLENBQUMsbUJBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFxQyxFQUFDLENBQUMsU0FBUyxDQUFDOzs7O1lBNUI3RSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjthQUNuQzs7OztZQUxtQixVQUFVO1lBQ1QscUJBQXFCOzs7b0JBU3ZDLFdBQVcsU0FBQyxhQUFhO21CQU96QixXQUFXLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbHVtblVuaXQsIFJlc2l6YWJsZVRhYmxlU2VydmljZSB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhSZXNpemFibGVUYWJsZUNlbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVUYWJsZUNlbGxEaXJlY3RpdmUge1xuXG5cbiAgLyoqIFRoZSBwZXJjZW50YWdlIHdpZHRoIG9mIHRoZSBjb2x1bW4gKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIGdldCB3aWR0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90YWJsZS5pc1Jlc2l6aW5nID9cbiAgICAgIGAke3RoaXMuX3RhYmxlLmdldENvbHVtbldpZHRoKHRoaXMuZ2V0Q2VsbEluZGV4KCksIENvbHVtblVuaXQuUGl4ZWwpfXB4YCA6XG4gICAgICBgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBlcmNlbnRhZ2UpfSVgO1xuICB9XG5cbiAgLyoqIFRoZSBmbGV4IHdpZHRoIG9mIHRoZSBjb2x1bW4gKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4JykgZ2V0IGZsZXgoKTogc3RyaW5nIHtcblxuICAgIC8vIGlmIHdlIGFyZSByZXNpemluZyB0aGVuIGFsd2F5cyByZXR1cm4gJ25vbmUnIHRvIGFsbG93IGZyZWUgbW92ZW1lbnRcbiAgICBpZiAodGhpcy5fdGFibGUuaXNSZXNpemluZykge1xuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fdGFibGUuaXNJbml0aWFsaXNlZC52YWx1ZSA/IGAwIDEgJHt0aGlzLl90YWJsZS5nZXRDb2x1bW5XaWR0aCh0aGlzLmdldENlbGxJbmRleCgpLCBDb2x1bW5Vbml0LlBlcmNlbnRhZ2UpfSVgIDogJyc7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF90YWJsZTogUmVzaXphYmxlVGFibGVTZXJ2aWNlKSB7IH1cblxuICAvKiogR2V0IHRoZSBjb2x1bW4gaW5kZXggdGhpcyBjZWxsIGlzIHBhcnQgb2YgKi9cbiAgcHJpdmF0ZSBnZXRDZWxsSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MVGFibGVDZWxsRWxlbWVudCkuY2VsbEluZGV4O1xuICB9XG59XG4iXX0=