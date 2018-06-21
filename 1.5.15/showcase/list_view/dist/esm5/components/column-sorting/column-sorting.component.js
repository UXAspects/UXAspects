/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var ColumnSortingComponent = (function () {
    function ColumnSortingComponent() {
        this.stateChange = new EventEmitter();
        this.columnSortingState = ColumnSortingState;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    ColumnSortingComponent.prototype.initParent = /**
     * @param {?} parent
     * @return {?}
     */
    function (parent) {
        var _this = this;
        this._parent = parent;
        // watch for any events
        this._parent.events.subscribe(function (event) {
            var /** @type {?} */ idx = event.findIndex(function (column) { return column.key === _this.key; });
            if (idx == -1) {
                _this.state = ColumnSortingState.NoSort;
            }
            // only store the number if we have 2 or more columns being sorted
            if (event.length > 1) {
                _this.orderNumber = idx === -1 ? null : idx + 1;
            }
            else {
                _this.orderNumber = null;
            }
            _this.stateChange.emit(_this.state);
        });
    };
    /**
     * @return {?}
     */
    ColumnSortingComponent.prototype.changeState = /**
     * @return {?}
     */
    function () {
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
    };
    ColumnSortingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-column-sorting',
                    template: "<div class=\"ux-column-sorting\">\n    <i class=\"ux-column-sorting-icon hpe-icon\" \n        [class.hpe-ascend]=\"state === columnSortingState.Ascending\" \n        [class.hpe-descend]=\"state === columnSortingState.Descending\" \n        [class.column-sorting-icon-hidden]=\"state === columnSortingState.NoSort\"></i>\n    <p class=\"ux-column-sorting-number\">{{ orderNumber }}</p>\n</div>",
                    exportAs: 'ux-column-sorting'
                },] },
    ];
    /** @nocollapse */
    ColumnSortingComponent.propDecorators = {
        "state": [{ type: Input },],
        "key": [{ type: Input },],
        "orderNumber": [{ type: Input },],
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
    ColumnSortingComponent.prototype.orderNumber;
    /** @type {?} */
    ColumnSortingComponent.prototype.stateChange;
    /** @type {?} */
    ColumnSortingComponent.prototype._parent;
    /** @type {?} */
    ColumnSortingComponent.prototype.columnSortingState;
}
/** @enum {number} */
var ColumnSortingState = {
    Ascending: 0,
    Descending: 1,
    NoSort: 2,
};
export { ColumnSortingState };
ColumnSortingState[ColumnSortingState.Ascending] = "Ascending";
ColumnSortingState[ColumnSortingState.Descending] = "Descending";
ColumnSortingState[ColumnSortingState.NoSort] = "NoSort";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7MkJBa0JULElBQUksWUFBWSxFQUFzQjtrQ0FHM0Usa0JBQWtCOzs7Ozs7SUFFdkMsMkNBQVU7Ozs7SUFBVixVQUFXLE1BQThCO1FBQXpDLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7UUFHdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUUvQixxQkFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLEtBQUssS0FBSSxDQUFDLEdBQUcsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1lBRTdELEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osS0FBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7YUFDMUM7O1lBR0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNsRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBRUQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRXJDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsNENBQVc7OztJQUFYO1FBRUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1NBQzlDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztTQUMxQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7U0FDN0M7O1FBR0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBRTFEOztnQkExREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSwwWUFNUDtvQkFDSCxRQUFRLEVBQUUsbUJBQW1CO2lCQUNoQzs7OzswQkFHSSxLQUFLO3dCQUNMLEtBQUs7Z0NBQ0wsS0FBSztnQ0FDTCxNQUFNOztpQ0FuQlg7O1NBY2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uU29ydGluZ0RpcmVjdGl2ZSwgQ29sdW1uU29ydGluZ09yZGVyIH0gZnJvbSAnLi9jb2x1bW4tc29ydGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1jb2x1bW4tc29ydGluZycsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidXgtY29sdW1uLXNvcnRpbmdcIj5cbiAgICA8aSBjbGFzcz1cInV4LWNvbHVtbi1zb3J0aW5nLWljb24gaHBlLWljb25cIiBcbiAgICAgICAgW2NsYXNzLmhwZS1hc2NlbmRdPVwic3RhdGUgPT09IGNvbHVtblNvcnRpbmdTdGF0ZS5Bc2NlbmRpbmdcIiBcbiAgICAgICAgW2NsYXNzLmhwZS1kZXNjZW5kXT1cInN0YXRlID09PSBjb2x1bW5Tb3J0aW5nU3RhdGUuRGVzY2VuZGluZ1wiIFxuICAgICAgICBbY2xhc3MuY29sdW1uLXNvcnRpbmctaWNvbi1oaWRkZW5dPVwic3RhdGUgPT09IGNvbHVtblNvcnRpbmdTdGF0ZS5Ob1NvcnRcIj48L2k+XG4gICAgPHAgY2xhc3M9XCJ1eC1jb2x1bW4tc29ydGluZy1udW1iZXJcIj57eyBvcmRlck51bWJlciB9fTwvcD5cbjwvZGl2PmAsXG4gICAgZXhwb3J0QXM6ICd1eC1jb2x1bW4tc29ydGluZydcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uU29ydGluZ0NvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBzdGF0ZTogQ29sdW1uU29ydGluZ1N0YXRlO1xuICAgIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG9yZGVyTnVtYmVyOiBudW1iZXI7XG4gICAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q29sdW1uU29ydGluZ1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Q29sdW1uU29ydGluZ1N0YXRlPigpO1xuXG4gICAgcHJpdmF0ZSBfcGFyZW50OiBDb2x1bW5Tb3J0aW5nRGlyZWN0aXZlO1xuICAgIGNvbHVtblNvcnRpbmdTdGF0ZSA9IENvbHVtblNvcnRpbmdTdGF0ZTtcblxuICAgIGluaXRQYXJlbnQocGFyZW50OiBDb2x1bW5Tb3J0aW5nRGlyZWN0aXZlKSB7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblxuICAgICAgICAvLyB3YXRjaCBmb3IgYW55IGV2ZW50c1xuICAgICAgICB0aGlzLl9wYXJlbnQuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG5cbiAgICAgICAgICAgIGxldCBpZHggPSBldmVudC5maW5kSW5kZXgoY29sdW1uID0+IGNvbHVtbi5rZXkgPT09IHRoaXMua2V5KTtcblxuICAgICAgICAgICAgaWYgKGlkeCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb2x1bW5Tb3J0aW5nU3RhdGUuTm9Tb3J0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvbmx5IHN0b3JlIHRoZSBudW1iZXIgaWYgd2UgaGF2ZSAyIG9yIG1vcmUgY29sdW1ucyBiZWluZyBzb3J0ZWRcbiAgICAgICAgICAgIGlmIChldmVudC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlck51bWJlciA9IGlkeCA9PT0gLTEgPyBudWxsIDogaWR4ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlck51bWJlciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UuZW1pdCh0aGlzLnN0YXRlKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VTdGF0ZSgpOiBDb2x1bW5Tb3J0aW5nT3JkZXJbXSB7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IENvbHVtblNvcnRpbmdTdGF0ZS5Bc2NlbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb2x1bW5Tb3J0aW5nU3RhdGUuRGVzY2VuZGluZztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBDb2x1bW5Tb3J0aW5nU3RhdGUuRGVzY2VuZGluZykge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbHVtblNvcnRpbmdTdGF0ZS5Ob1NvcnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlLkFzY2VuZGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluZm9ybSBwYXJlbnRcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudC50b2dnbGVDb2x1bW4odGhpcy5rZXksIHRoaXMuc3RhdGUpO1xuXG4gICAgfVxufVxuXG5leHBvcnQgZW51bSBDb2x1bW5Tb3J0aW5nU3RhdGUge1xuICAgIEFzY2VuZGluZyxcbiAgICBEZXNjZW5kaW5nLFxuICAgIE5vU29ydFxufSJdfQ==