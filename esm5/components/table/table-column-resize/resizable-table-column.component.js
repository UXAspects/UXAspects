/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { ResizableTableService } from './resizable-table.service';
var ResizableTableColumnComponent = /** @class */ (function () {
    function ResizableTableColumnComponent(table, _elementRef) {
        this.table = table;
        this._elementRef = _elementRef;
        this.disabled = false;
        /**
         * Ensure observables get destroyed correctly
         */
        this._onDestroy = new Subject();
    }
    Object.defineProperty(ResizableTableColumnComponent.prototype, "width", {
        /** The percentage width of the column */
        get: /**
         * The percentage width of the column
         * @return {?}
         */
        function () {
            return this.table.resizing ? this._width + "px" : this._width + "%";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableTableColumnComponent.prototype, "minWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled ? this._elementRef.nativeElement.offsetWidth : parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.getColumnWidth = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement.offsetWidth;
    };
    /**
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.table.sizes.pipe(map(function (sizes) { return sizes.get(_this); }), distinctUntilChanged(), takeUntil(this._onDestroy), tick() // prevents expression has changed error
        ).subscribe(function (width) { return _this._width = width; });
    };
    /**
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.dragstart = /**
     * @return {?}
     */
    function () {
        this.table.startResizing();
    };
    /**
     * @param {?} event
     * @param {?} handle
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.drag = /**
     * @param {?} event
     * @param {?} handle
     * @return {?}
     */
    function (event, handle) {
        // get the current mouse position
        var /** @type {?} */ mouseX = event.pageX - pageXOffset;
        // position of the drag handle
        var _a = handle.getBoundingClientRect(), left = _a.left, width = _a.width;
        // determine how much the mouse has moved since the last update
        var /** @type {?} */ movement = mouseX - (left + (width / 2));
        // perform resizing
        this.table.resizeColumn(this, movement);
    };
    /**
     * @return {?}
     */
    ResizableTableColumnComponent.prototype.dragend = /**
     * @return {?}
     */
    function () {
        this.table.endResizing();
    };
    ResizableTableColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: '[uxResizableTableColumn]',
                    template: "<ng-content></ng-content>\n\n<div #handle\n     uxDrag\n     class=\"ux-resizable-table-column-handle\"\n     *ngIf=\"!disabled\"\n     (onDragStart)=\"dragstart()\"\n     (onDrag)=\"drag($event, handle)\"\n     (onDragEnd)=\"dragend()\">\n</div>",
                    host: {
                        class: 'ux-resizable-table-column'
                    }
                }] }
    ];
    /** @nocollapse */
    ResizableTableColumnComponent.ctorParameters = function () { return [
        { type: ResizableTableService },
        { type: ElementRef }
    ]; };
    ResizableTableColumnComponent.propDecorators = {
        disabled: [{ type: Input }],
        width: [{ type: HostBinding, args: ['style.width',] }]
    };
    return ResizableTableColumnComponent;
}());
export { ResizableTableColumnComponent };
function ResizableTableColumnComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ResizableTableColumnComponent.prototype.disabled;
    /** @type {?} */
    ResizableTableColumnComponent.prototype._width;
    /**
     * Ensure observables get destroyed correctly
     * @type {?}
     */
    ResizableTableColumnComponent.prototype._onDestroy;
    /** @type {?} */
    ResizableTableColumnComponent.prototype.table;
    /** @type {?} */
    ResizableTableColumnComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBMkJoRSx1Q0FBbUIsS0FBNEIsRUFBVSxXQUF1QjtRQUE3RCxVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO3dCQWhCbkQsS0FBSzs7OzswQkFjYixJQUFJLE9BQU8sRUFBUTtLQUU2QztJQWJyRixzQkFBZ0MsZ0RBQUs7UUFEckMseUNBQXlDOzs7OztRQUN6QztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUksSUFBSSxDQUFDLE1BQU0sT0FBSSxDQUFDLENBQUMsQ0FBSSxJQUFJLENBQUMsTUFBTSxNQUFHLENBQUM7U0FDckU7OztPQUFBO0lBRUQsc0JBQUksbURBQVE7Ozs7UUFBWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNJOzs7T0FBQTs7OztJQVNELHNEQUFjOzs7SUFBZDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7S0FDbkQ7Ozs7SUFFRCxnREFBUTs7O0lBQVI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDbkIsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsRUFBZixDQUFlLENBQUMsRUFDN0Isb0JBQW9CLEVBQUUsRUFDdEIsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDMUIsSUFBSSxFQUFFO1NBQ1AsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFhLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0tBQ3JEOzs7O0lBRUQsbURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRUQsaURBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUM1Qjs7Ozs7O0lBRUQsNENBQUk7Ozs7O0lBQUosVUFBSyxLQUFpQixFQUFFLE1BQXNCOztRQUc1QyxxQkFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7O1FBR3pDLHlDQUFRLGNBQUksRUFBRSxnQkFBSyxDQUFvQzs7UUFHdkQscUJBQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUcvQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDekM7Ozs7SUFFRCwrQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzFCOztnQkFsRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLGtRQUFzRDtvQkFDdEQsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSwyQkFBMkI7cUJBQ25DO2lCQUNGOzs7O2dCQVJRLHFCQUFxQjtnQkFKVixVQUFVOzs7MkJBZTNCLEtBQUs7d0JBR0wsV0FBVyxTQUFDLGFBQWE7O3dDQWxCNUI7O1NBYWEsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyB0aWNrIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2luZGV4JztcbmltcG9ydCB7IFJlc2l6YWJsZVRhYmxlU2VydmljZSB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbdXhSZXNpemFibGVUYWJsZUNvbHVtbl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3V4LXJlc2l6YWJsZS10YWJsZS1jb2x1bW4nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBwZXJjZW50YWdlIHdpZHRoIG9mIHRoZSBjb2x1bW4gKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIGdldCB3aWR0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRhYmxlLnJlc2l6aW5nID8gYCR7dGhpcy5fd2lkdGh9cHhgIDogYCR7dGhpcy5fd2lkdGh9JWA7XG4gIH1cblxuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCA6IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLm1pbldpZHRoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG5cbiAgLyoqIEVuc3VyZSBvYnNlcnZhYmxlcyBnZXQgZGVzdHJveWVkIGNvcnJlY3RseSAqL1xuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJsZTogUmVzaXphYmxlVGFibGVTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICBnZXRDb2x1bW5XaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLnNpemVzLnBpcGUoXG4gICAgICBtYXAoc2l6ZXMgPT4gc2l6ZXMuZ2V0KHRoaXMpKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSxcbiAgICAgIHRpY2soKSAvLyBwcmV2ZW50cyBleHByZXNzaW9uIGhhcyBjaGFuZ2VkIGVycm9yXG4gICAgKS5zdWJzY3JpYmUoKHdpZHRoOiBudW1iZXIpID0+IHRoaXMuX3dpZHRoID0gd2lkdGgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIGRyYWdzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLnN0YXJ0UmVzaXppbmcoKTtcbiAgfVxuXG4gIGRyYWcoZXZlbnQ6IE1vdXNlRXZlbnQsIGhhbmRsZTogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcblxuICAgIC8vIGdldCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuICAgIGNvbnN0IG1vdXNlWCA9IGV2ZW50LnBhZ2VYIC0gcGFnZVhPZmZzZXQ7XG5cbiAgICAvLyBwb3NpdGlvbiBvZiB0aGUgZHJhZyBoYW5kbGVcbiAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSBoYW5kbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBkZXRlcm1pbmUgaG93IG11Y2ggdGhlIG1vdXNlIGhhcyBtb3ZlZCBzaW5jZSB0aGUgbGFzdCB1cGRhdGVcbiAgICBjb25zdCBtb3ZlbWVudCA9IG1vdXNlWCAtIChsZWZ0ICsgKHdpZHRoIC8gMikpO1xuXG4gICAgLy8gcGVyZm9ybSByZXNpemluZ1xuICAgIHRoaXMudGFibGUucmVzaXplQ29sdW1uKHRoaXMsIG1vdmVtZW50KTtcbiAgfVxuXG4gIGRyYWdlbmQoKTogdm9pZCB7XG4gICAgdGhpcy50YWJsZS5lbmRSZXNpemluZygpO1xuICB9XG5cbn0iXX0=