/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ColumnSortingDirective, ColumnSortingState } from './column-sorting.directive';
var ColumnSortingComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    ColumnSortingComponent.ctorParameters = function () { return [
        { type: ColumnSortingDirective, },
    ]; };
    ColumnSortingComponent.propDecorators = {
        "state": [{ type: Input },],
        "key": [{ type: Input },],
        "stateChange": [{ type: Output },],
    };
    return ColumnSortingComponent;
}());
export { ColumnSortingComponent };
function ColumnSortingComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ColumnSortingComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ColumnSortingComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ColumnSortingComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxzQkFBc0IsRUFBc0Isa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUEyQnhHLGdDQUFvQixhQUFxQztRQUF6RCxpQkFpQkM7UUFqQm1CLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjsyQkFQakMsSUFBSSxZQUFZLEVBQXNCO2tDQUd6QyxrQkFBa0I7MEJBRWxCLElBQUksT0FBTyxFQUFRO1FBR3BDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSzs7WUFHdEUscUJBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxLQUFLLEtBQUksQ0FBQyxHQUFHLEVBQXhCLENBQXdCLENBQUMsQ0FBQzs7WUFHdkUsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7YUFDMUM7O1lBR0QsQUFEQSxrRUFBa0U7WUFDbEUsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7O1lBR3pFLEFBREEseUJBQXlCO1lBQ3pCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELDRDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUVELDRDQUFXOzs7SUFBWDtRQUVJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWpCLEtBQUssa0JBQWtCLENBQUMsU0FBUztnQkFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7Z0JBQzNDLEtBQUssQ0FBQztZQUVWLEtBQUssa0JBQWtCLENBQUMsVUFBVTtnQkFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQztZQUVWO2dCQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1NBQ2pEOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUNoRjs7Z0JBbkVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsNlpBU1A7b0JBQ0gsUUFBUSxFQUFFLG1CQUFtQjtpQkFDaEM7Ozs7Z0JBZlEsc0JBQXNCOzs7MEJBa0IxQixLQUFLO3dCQUNMLEtBQUs7Z0NBQ0wsTUFBTTs7aUNBdkJYOztTQW1CYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IENvbHVtblNvcnRpbmdEaXJlY3RpdmUsIENvbHVtblNvcnRpbmdPcmRlciwgQ29sdW1uU29ydGluZ1N0YXRlIH0gZnJvbSAnLi9jb2x1bW4tc29ydGluZy5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWNvbHVtbi1zb3J0aW5nJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ1eC1jb2x1bW4tc29ydGluZ1wiPlxuXG4gICAgPGkgY2xhc3M9XCJ1eC1jb2x1bW4tc29ydGluZy1pY29uIGhwZS1pY29uXCJcbiAgICAgICBbY2xhc3MuaHBlLWFzY2VuZF09XCJzdGF0ZSA9PT0gY29sdW1uU29ydGluZ1N0YXRlLkFzY2VuZGluZ1wiXG4gICAgICAgW2NsYXNzLmhwZS1kZXNjZW5kXT1cInN0YXRlID09PSBjb2x1bW5Tb3J0aW5nU3RhdGUuRGVzY2VuZGluZ1wiXG4gICAgICAgW2NsYXNzLmNvbHVtbi1zb3J0aW5nLWljb24taGlkZGVuXT1cInN0YXRlID09PSBjb2x1bW5Tb3J0aW5nU3RhdGUuTm9Tb3J0XCI+XG4gICAgPC9pPlxuXG4gICAgPHAgY2xhc3M9XCJ1eC1jb2x1bW4tc29ydGluZy1udW1iZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57eyBvcmRlciB9fTwvcD5cbjwvZGl2PmAsXG4gICAgZXhwb3J0QXM6ICd1eC1jb2x1bW4tc29ydGluZydcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uU29ydGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzdGF0ZTogQ29sdW1uU29ydGluZ1N0YXRlO1xuICAgIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q29sdW1uU29ydGluZ1N0YXRlPigpO1xuXG4gICAgb3JkZXI6IG51bWJlcjtcbiAgICBjb2x1bW5Tb3J0aW5nU3RhdGUgPSBDb2x1bW5Tb3J0aW5nU3RhdGU7XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29sdW1uU29ydGVyOiBDb2x1bW5Tb3J0aW5nRGlyZWN0aXZlKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtblNvcnRlci5ldmVudHMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgLy8gaWYgd2UgYXJlIHNvcnRpbmcgdGhpcyBjb2x1bW4gdGhlbiBmaW5kIHRoZSBtYXRjaGluZyBkYXRhXG4gICAgICAgICAgICBjb25zdCBjb2x1bW5JZHggPSBldmVudC5maW5kSW5kZXgoX2NvbHVtbiA9PiBfY29sdW1uLmtleSA9PT0gdGhpcy5rZXkpO1xuXG4gICAgICAgICAgICAvLyBpZiB3ZSBhcmUgbm90IHNvcnRpbmcgdGhpcyBjb2x1bW4gdGhlbiBtYXJrIGl0IGFzIE5vU29ydFxuICAgICAgICAgICAgaWYgKGNvbHVtbklkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlLk5vU29ydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb25seSBzdG9yZSB0aGUgbnVtYmVyIGlmIHdlIGhhdmUgMiBvciBtb3JlIGNvbHVtbnMgYmVpbmcgc29ydGVkXG4gICAgICAgICAgICB0aGlzLm9yZGVyID0gZXZlbnQubGVuZ3RoIDwgMiB8fCBjb2x1bW5JZHggPT09IC0xID8gbnVsbCA6IGNvbHVtbklkeCArIDE7XG5cbiAgICAgICAgICAgIC8vIEVtaXQgdGhlIGxhdGVzdCBjaGFuZ2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UuZW1pdCh0aGlzLnN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGNoYW5nZVN0YXRlKCk6IENvbHVtblNvcnRpbmdPcmRlcltdIHtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcblxuICAgICAgICAgICAgY2FzZSBDb2x1bW5Tb3J0aW5nU3RhdGUuQXNjZW5kaW5nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb2x1bW5Tb3J0aW5nU3RhdGUuRGVzY2VuZGluZztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBDb2x1bW5Tb3J0aW5nU3RhdGUuRGVzY2VuZGluZzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlLk5vU29ydDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlLkFzY2VuZGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluZm9ybSBwYXJlbnRcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtblNvcnRlci50b2dnbGVDb2x1bW4oeyBrZXk6IHRoaXMua2V5LCBzdGF0ZTogdGhpcy5zdGF0ZSB9KTtcbiAgICB9XG59Il19