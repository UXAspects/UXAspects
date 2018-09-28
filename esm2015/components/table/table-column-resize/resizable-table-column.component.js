/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { ResizableTableService } from './resizable-table.service';
export class ResizableTableColumnComponent {
    /**
     * @param {?} table
     * @param {?} _elementRef
     */
    constructor(table, _elementRef) {
        this.table = table;
        this._elementRef = _elementRef;
        this.disabled = false;
        /**
         * Ensure observables get destroyed correctly
         */
        this._onDestroy = new Subject();
    }
    /**
     * The percentage width of the column
     * @return {?}
     */
    get width() {
        return this.table.resizing ? `${this._width}px` : `${this._width}%`;
    }
    /**
     * @return {?}
     */
    get minWidth() {
        return this.disabled ? this._elementRef.nativeElement.offsetWidth : parseFloat(getComputedStyle(this._elementRef.nativeElement).minWidth);
    }
    /**
     * @return {?}
     */
    getColumnWidth() {
        return this._elementRef.nativeElement.offsetWidth;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.table.sizes.pipe(map(sizes => sizes.get(this)), distinctUntilChanged(), takeUntil(this._onDestroy), tick() // prevents expression has changed error
        ).subscribe((width) => this._width = width);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    dragstart() {
        this.table.startResizing();
    }
    /**
     * @param {?} event
     * @param {?} handle
     * @return {?}
     */
    drag(event, handle) {
        // get the current mouse position
        const /** @type {?} */ mouseX = event.pageX - pageXOffset;
        // position of the drag handle
        const { left, width } = handle.getBoundingClientRect();
        // determine how much the mouse has moved since the last update
        const /** @type {?} */ movement = mouseX - (left + (width / 2));
        // perform resizing
        this.table.resizeColumn(this, movement);
    }
    /**
     * @return {?}
     */
    dragend() {
        this.table.endResizing();
    }
}
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
ResizableTableColumnComponent.ctorParameters = () => [
    { type: ResizableTableService },
    { type: ElementRef }
];
ResizableTableColumnComponent.propDecorators = {
    disabled: [{ type: Input }],
    width: [{ type: HostBinding, args: ['style.width',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJsZS90YWJsZS1jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTbEUsTUFBTTs7Ozs7SUFrQkosWUFBbUIsS0FBNEIsRUFBVSxXQUF1QjtRQUE3RCxVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO3dCQWhCbkQsS0FBSzs7OzswQkFjYixJQUFJLE9BQU8sRUFBUTtLQUU2Qzs7Ozs7SUFickYsSUFBZ0MsS0FBSztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztLQUNyRTs7OztJQUVELElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzNJOzs7O0lBU0QsY0FBYztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7S0FDbkQ7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNuQixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzdCLG9CQUFvQixFQUFFLEVBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQzFCLElBQUksRUFBRTtTQUNQLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO0tBQ3JEOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM1Qjs7OztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzVCOzs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBaUIsRUFBRSxNQUFzQjs7UUFHNUMsdUJBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDOztRQUd6QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztRQUd2RCx1QkFBTSxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRy9DLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN6Qzs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzFCOzs7WUFsRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLGtRQUFzRDtnQkFDdEQsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSwyQkFBMkI7aUJBQ25DO2FBQ0Y7Ozs7WUFSUSxxQkFBcUI7WUFKVixVQUFVOzs7dUJBZTNCLEtBQUs7b0JBR0wsV0FBVyxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vaW5kZXgnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUtdGFibGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1t1eFJlc2l6YWJsZVRhYmxlQ29sdW1uXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXNpemFibGUtdGFibGUtY29sdW1uLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAndXgtcmVzaXphYmxlLXRhYmxlLWNvbHVtbidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIHBlcmNlbnRhZ2Ugd2lkdGggb2YgdGhlIGNvbHVtbiAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ2V0IHdpZHRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGFibGUucmVzaXppbmcgPyBgJHt0aGlzLl93aWR0aH1weGAgOiBgJHt0aGlzLl93aWR0aH0lYDtcbiAgfVxuXG4gIGdldCBtaW5XaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIDogcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkubWluV2lkdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcblxuICAvKiogRW5zdXJlIG9ic2VydmFibGVzIGdldCBkZXN0cm95ZWQgY29ycmVjdGx5ICovXG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBSZXNpemFibGVUYWJsZVNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIGdldENvbHVtbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGFibGUuc2l6ZXMucGlwZShcbiAgICAgIG1hcChzaXplcyA9PiBzaXplcy5nZXQodGhpcykpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxuICAgICAgdGljaygpIC8vIHByZXZlbnRzIGV4cHJlc3Npb24gaGFzIGNoYW5nZWQgZXJyb3JcbiAgICApLnN1YnNjcmliZSgod2lkdGg6IG51bWJlcikgPT4gdGhpcy5fd2lkdGggPSB3aWR0aCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgZHJhZ3N0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMudGFibGUuc3RhcnRSZXNpemluZygpO1xuICB9XG5cbiAgZHJhZyhldmVudDogTW91c2VFdmVudCwgaGFuZGxlOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xuXG4gICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgY29uc3QgbW91c2VYID0gZXZlbnQucGFnZVggLSBwYWdlWE9mZnNldDtcblxuICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBkcmFnIGhhbmRsZVxuICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IGhhbmRsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIGRldGVybWluZSBob3cgbXVjaCB0aGUgbW91c2UgaGFzIG1vdmVkIHNpbmNlIHRoZSBsYXN0IHVwZGF0ZVxuICAgIGNvbnN0IG1vdmVtZW50ID0gbW91c2VYIC0gKGxlZnQgKyAod2lkdGggLyAyKSk7XG5cbiAgICAvLyBwZXJmb3JtIHJlc2l6aW5nXG4gICAgdGhpcy50YWJsZS5yZXNpemVDb2x1bW4odGhpcywgbW92ZW1lbnQpO1xuICB9XG5cbiAgZHJhZ2VuZCgpOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLmVuZFJlc2l6aW5nKCk7XG4gIH1cblxufSJdfQ==