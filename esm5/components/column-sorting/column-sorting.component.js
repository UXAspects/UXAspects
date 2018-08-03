/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ColumnSortingDirective, ColumnSortingState } from './column-sorting.directive';
var ColumnSortingComponent = /** @class */ (function () {
    function ColumnSortingComponent(_columnSorter) {
        var _this = this;
        this._columnSorter = _columnSorter;
        this.stateChange = new EventEmitter();
        this.columnSortingState = ColumnSortingState;
        this._onDestroy = new Subject();
        this._columnSorter.events.pipe(takeUntil(this._onDestroy)).subscribe(function (event) {
            // if we are sorting this column then find the matching data
            var /** @type {?} */ columnIdx = event.findIndex(function (_column) { return _column.key === _this.key; });
            // if we are not sorting this column then mark it as NoSort
            if (columnIdx === -1) {
                _this.state = ColumnSortingState.NoSort;
            }
            // only store the number if we have 2 or more columns being sorted
            // only store the number if we have 2 or more columns being sorted
            _this.order = event.length < 2 || columnIdx === -1 ? null : columnIdx + 1;
            // Emit the latest change
            // Emit the latest change
            _this.stateChange.emit(_this.state);
        });
    }
    /**
     * @return {?}
     */
    ColumnSortingComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    ColumnSortingComponent.prototype.changeState = /**
     * @return {?}
     */
    function () {
        switch (this.state) {
            case ColumnSortingState.Ascending:
                this.state = ColumnSortingState.Descending;
                break;
            case ColumnSortingState.Descending:
                this.state = ColumnSortingState.NoSort;
                break;
            default:
                this.state = ColumnSortingState.Ascending;
        }
        // inform parent
        return this._columnSorter.toggleColumn({ key: this.key, state: this.state });
    };
    ColumnSortingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-column-sorting',
                    template: "<div class=\"ux-column-sorting\">\n\n    <i class=\"ux-column-sorting-icon hpe-icon\"\n       [class.hpe-ascend]=\"state === columnSortingState.Ascending\"\n       [class.hpe-descend]=\"state === columnSortingState.Descending\"\n       [class.column-sorting-icon-hidden]=\"state === columnSortingState.NoSort\">\n    </i>\n\n    <p class=\"ux-column-sorting-number\" aria-hidden=\"true\">{{ order }}</p>\n</div>",
                    exportAs: 'ux-column-sorting'
                }] }
    ];
    /** @nocollapse */
    ColumnSortingComponent.ctorParameters = function () { return [
        { type: ColumnSortingDirective }
    ]; };
    ColumnSortingComponent.propDecorators = {
        state: [{ type: Input }],
        key: [{ type: Input }],
        stateChange: [{ type: Output }]
    };
    return ColumnSortingComponent;
}());
export { ColumnSortingComponent };
function ColumnSortingComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ColumnSortingComponent.prototype.state;
    /** @type {?} */
    ColumnSortingComponent.prototype.key;
    /** @type {?} */
    ColumnSortingComponent.prototype.stateChange;
    /** @type {?} */
    ColumnSortingComponent.prototype.order;
    /** @type {?} */
    ColumnSortingComponent.prototype.columnSortingState;
    /** @type {?} */
    ColumnSortingComponent.prototype._onDestroy;
    /** @type {?} */
    ColumnSortingComponent.prototype._columnSorter;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxzQkFBc0IsRUFBc0Isa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUFrQnhHLGdDQUFvQixhQUFxQztRQUF6RCxpQkFpQkM7UUFqQm1CLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjsyQkFQakMsSUFBSSxZQUFZLEVBQXNCO2tDQUd6QyxrQkFBa0I7MEJBRWxCLElBQUksT0FBTyxFQUFRO1FBR3BDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSzs7WUFHdEUscUJBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxLQUFLLEtBQUksQ0FBQyxHQUFHLEVBQXhCLENBQXdCLENBQUMsQ0FBQzs7WUFHdkUsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7YUFDMUM7O1lBR0QsQUFEQSxrRUFBa0U7WUFDbEUsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzs7WUFHekUsQUFEQSx5QkFBeUI7WUFDekIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsNENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7O0lBRUQsNENBQVc7OztJQUFYO1FBRUksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFakIsS0FBSyxrQkFBa0IsQ0FBQyxTQUFTO2dCQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztnQkFDM0MsS0FBSyxDQUFDO1lBRVYsS0FBSyxrQkFBa0IsQ0FBQyxVQUFVO2dCQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztnQkFDdkMsS0FBSyxDQUFDO1lBRVY7Z0JBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7U0FDakQ7O1FBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2hGOztnQkExREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLHVhQUE4QztvQkFDOUMsUUFBUSxFQUFFLG1CQUFtQjtpQkFDaEM7Ozs7Z0JBTlEsc0JBQXNCOzs7d0JBUzFCLEtBQUs7c0JBQ0wsS0FBSzs4QkFDTCxNQUFNOztpQ0FkWDs7U0FVYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IENvbHVtblNvcnRpbmdEaXJlY3RpdmUsIENvbHVtblNvcnRpbmdPcmRlciwgQ29sdW1uU29ydGluZ1N0YXRlIH0gZnJvbSAnLi9jb2x1bW4tc29ydGluZy5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWNvbHVtbi1zb3J0aW5nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29sdW1uLXNvcnRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICAgIGV4cG9ydEFzOiAndXgtY29sdW1uLXNvcnRpbmcnXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtblNvcnRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc3RhdGU6IENvbHVtblNvcnRpbmdTdGF0ZTtcbiAgICBASW5wdXQoKSBrZXk6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENvbHVtblNvcnRpbmdTdGF0ZT4oKTtcblxuICAgIG9yZGVyOiBudW1iZXI7XG4gICAgY29sdW1uU29ydGluZ1N0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlO1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbHVtblNvcnRlcjogQ29sdW1uU29ydGluZ0RpcmVjdGl2ZSkge1xuICAgICAgICB0aGlzLl9jb2x1bW5Tb3J0ZXIuZXZlbnRzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShldmVudCA9PiB7XG5cbiAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBzb3J0aW5nIHRoaXMgY29sdW1uIHRoZW4gZmluZCB0aGUgbWF0Y2hpbmcgZGF0YVxuICAgICAgICAgICAgY29uc3QgY29sdW1uSWR4ID0gZXZlbnQuZmluZEluZGV4KF9jb2x1bW4gPT4gX2NvbHVtbi5rZXkgPT09IHRoaXMua2V5KTtcblxuICAgICAgICAgICAgLy8gaWYgd2UgYXJlIG5vdCBzb3J0aW5nIHRoaXMgY29sdW1uIHRoZW4gbWFyayBpdCBhcyBOb1NvcnRcbiAgICAgICAgICAgIGlmIChjb2x1bW5JZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbHVtblNvcnRpbmdTdGF0ZS5Ob1NvcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9ubHkgc3RvcmUgdGhlIG51bWJlciBpZiB3ZSBoYXZlIDIgb3IgbW9yZSBjb2x1bW5zIGJlaW5nIHNvcnRlZFxuICAgICAgICAgICAgdGhpcy5vcmRlciA9IGV2ZW50Lmxlbmd0aCA8IDIgfHwgY29sdW1uSWR4ID09PSAtMSA/IG51bGwgOiBjb2x1bW5JZHggKyAxO1xuXG4gICAgICAgICAgICAvLyBFbWl0IHRoZSBsYXRlc3QgY2hhbmdlXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlLmVtaXQodGhpcy5zdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VTdGF0ZSgpOiBDb2x1bW5Tb3J0aW5nT3JkZXJbXSB7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgQ29sdW1uU29ydGluZ1N0YXRlLkFzY2VuZGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlLkRlc2NlbmRpbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQ29sdW1uU29ydGluZ1N0YXRlLkRlc2NlbmRpbmc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbHVtblNvcnRpbmdTdGF0ZS5Ob1NvcnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbHVtblNvcnRpbmdTdGF0ZS5Bc2NlbmRpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbmZvcm0gcGFyZW50XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5Tb3J0ZXIudG9nZ2xlQ29sdW1uKHsga2V5OiB0aGlzLmtleSwgc3RhdGU6IHRoaXMuc3RhdGUgfSk7XG4gICAgfVxufSJdfQ==