/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class ColumnSortingComponent {
    constructor() {
        this.stateChange = new EventEmitter();
        this.columnSortingState = ColumnSortingState;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    initParent(parent) {
        this._parent = parent;
        // watch for any events
        this._parent.events.subscribe(event => {
            let /** @type {?} */ idx = event.findIndex(column => column.key === this.key);
            if (idx == -1) {
                this.state = ColumnSortingState.NoSort;
            }
            // only store the number if we have 2 or more columns being sorted
            if (event.length > 1) {
                this.orderNumber = idx === -1 ? null : idx + 1;
            }
            else {
                this.orderNumber = null;
            }
            this.stateChange.emit(this.state);
        });
    }
    /**
     * @return {?}
     */
    changeState() {
        if (this.state === ColumnSortingState.Ascending) {
            this.state = ColumnSortingState.Descending;
        }
        else if (this.state === ColumnSortingState.Descending) {
            this.state = ColumnSortingState.NoSort;
        }
        else {
            this.state = ColumnSortingState.Ascending;
        }
        // inform parent
        return this._parent.toggleColumn(this.key, this.state);
    }
}
ColumnSortingComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-column-sorting',
                template: `<div class="ux-column-sorting">
    <i class="ux-column-sorting-icon hpe-icon" 
        [class.hpe-ascend]="state === columnSortingState.Ascending" 
        [class.hpe-descend]="state === columnSortingState.Descending" 
        [class.column-sorting-icon-hidden]="state === columnSortingState.NoSort"></i>
    <p class="ux-column-sorting-number">{{ orderNumber }}</p>
</div>`,
                exportAs: 'ux-column-sorting'
            },] },
];
/** @nocollapse */
ColumnSortingComponent.ctorParameters = () => [];
ColumnSortingComponent.propDecorators = {
    "state": [{ type: Input },],
    "key": [{ type: Input },],
    "orderNumber": [{ type: Input },],
    "stateChange": [{ type: Output },],
};
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
    ColumnSortingComponent.prototype.orderNumber;
    /** @type {?} */
    ColumnSortingComponent.prototype.stateChange;
    /** @type {?} */
    ColumnSortingComponent.prototype._parent;
    /** @type {?} */
    ColumnSortingComponent.prototype.columnSortingState;
}
/** @enum {number} */
const ColumnSortingState = {
    Ascending: 0,
    Descending: 1,
    NoSort: 2,
};
export { ColumnSortingState };
ColumnSortingState[ColumnSortingState.Ascending] = "Ascending";
ColumnSortingState[ColumnSortingState.Descending] = "Descending";
ColumnSortingState[ColumnSortingState.NoSort] = "NoSort";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBYXZFLE1BQU07OzJCQUt3RCxJQUFJLFlBQVksRUFBc0I7a0NBRzNFLGtCQUFrQjs7Ozs7O0lBRXZDLFVBQVUsQ0FBQyxNQUE4QjtRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7UUFHdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFFL0IscUJBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTdELEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7YUFDMUM7O1lBR0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNsRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRXJDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsV0FBVztRQUVQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztTQUM5QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7U0FDMUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1NBQzdDOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUUxRDs7O1lBMURKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7OztPQU1QO2dCQUNILFFBQVEsRUFBRSxtQkFBbUI7YUFDaEM7Ozs7O3NCQUdJLEtBQUs7b0JBQ0wsS0FBSzs0QkFDTCxLQUFLOzRCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW5Tb3J0aW5nRGlyZWN0aXZlLCBDb2x1bW5Tb3J0aW5nT3JkZXIgfSBmcm9tICcuL2NvbHVtbi1zb3J0aW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWNvbHVtbi1zb3J0aW5nJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ1eC1jb2x1bW4tc29ydGluZ1wiPlxuICAgIDxpIGNsYXNzPVwidXgtY29sdW1uLXNvcnRpbmctaWNvbiBocGUtaWNvblwiIFxuICAgICAgICBbY2xhc3MuaHBlLWFzY2VuZF09XCJzdGF0ZSA9PT0gY29sdW1uU29ydGluZ1N0YXRlLkFzY2VuZGluZ1wiIFxuICAgICAgICBbY2xhc3MuaHBlLWRlc2NlbmRdPVwic3RhdGUgPT09IGNvbHVtblNvcnRpbmdTdGF0ZS5EZXNjZW5kaW5nXCIgXG4gICAgICAgIFtjbGFzcy5jb2x1bW4tc29ydGluZy1pY29uLWhpZGRlbl09XCJzdGF0ZSA9PT0gY29sdW1uU29ydGluZ1N0YXRlLk5vU29ydFwiPjwvaT5cbiAgICA8cCBjbGFzcz1cInV4LWNvbHVtbi1zb3J0aW5nLW51bWJlclwiPnt7IG9yZGVyTnVtYmVyIH19PC9wPlxuPC9kaXY+YCxcbiAgICBleHBvcnRBczogJ3V4LWNvbHVtbi1zb3J0aW5nJ1xufSlcbmV4cG9ydCBjbGFzcyBDb2x1bW5Tb3J0aW5nQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIHN0YXRlOiBDb2x1bW5Tb3J0aW5nU3RhdGU7XG4gICAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gICAgQElucHV0KCkgb3JkZXJOdW1iZXI6IG51bWJlcjtcbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDb2x1bW5Tb3J0aW5nU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxDb2x1bW5Tb3J0aW5nU3RhdGU+KCk7XG5cbiAgICBwcml2YXRlIF9wYXJlbnQ6IENvbHVtblNvcnRpbmdEaXJlY3RpdmU7XG4gICAgY29sdW1uU29ydGluZ1N0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlO1xuXG4gICAgaW5pdFBhcmVudChwYXJlbnQ6IENvbHVtblNvcnRpbmdEaXJlY3RpdmUpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXG4gICAgICAgIC8vIHdhdGNoIGZvciBhbnkgZXZlbnRzXG4gICAgICAgIHRoaXMuX3BhcmVudC5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgbGV0IGlkeCA9IGV2ZW50LmZpbmRJbmRleChjb2x1bW4gPT4gY29sdW1uLmtleSA9PT0gdGhpcy5rZXkpO1xuXG4gICAgICAgICAgICBpZiAoaWR4ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbHVtblNvcnRpbmdTdGF0ZS5Ob1NvcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9ubHkgc3RvcmUgdGhlIG51bWJlciBpZiB3ZSBoYXZlIDIgb3IgbW9yZSBjb2x1bW5zIGJlaW5nIHNvcnRlZFxuICAgICAgICAgICAgaWYgKGV2ZW50Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyTnVtYmVyID0gaWR4ID09PSAtMSA/IG51bGwgOiBpZHggKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyTnVtYmVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZS5lbWl0KHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZVN0YXRlKCk6IENvbHVtblNvcnRpbmdPcmRlcltdIHtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gQ29sdW1uU29ydGluZ1N0YXRlLkFzY2VuZGluZykge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbHVtblNvcnRpbmdTdGF0ZS5EZXNjZW5kaW5nO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IENvbHVtblNvcnRpbmdTdGF0ZS5EZXNjZW5kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlLk5vU29ydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb2x1bW5Tb3J0aW5nU3RhdGUuQXNjZW5kaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5mb3JtIHBhcmVudFxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LnRvZ2dsZUNvbHVtbih0aGlzLmtleSwgdGhpcy5zdGF0ZSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIENvbHVtblNvcnRpbmdTdGF0ZSB7XG4gICAgQXNjZW5kaW5nLFxuICAgIERlc2NlbmRpbmcsXG4gICAgTm9Tb3J0XG59Il19