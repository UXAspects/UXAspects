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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBYXZFLE1BQU07OzJCQUt3RCxJQUFJLFlBQVksRUFBc0I7a0NBRzNFLGtCQUFrQjs7Ozs7O0lBRXZDLFVBQVUsQ0FBQyxNQUE4QjtRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7UUFHdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFFL0IscUJBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTdELEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7YUFDMUM7O1lBR0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNsRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRXJDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsV0FBVztRQUVQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztTQUM5QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7U0FDMUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1NBQzdDOztRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUUxRDs7O1lBMURKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7OztPQU1QO2dCQUNILFFBQVEsRUFBRSxtQkFBbUI7YUFDaEM7Ozs7c0JBR0ksS0FBSztvQkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtblNvcnRpbmdEaXJlY3RpdmUsIENvbHVtblNvcnRpbmdPcmRlciB9IGZyb20gJy4vY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtY29sdW1uLXNvcnRpbmcnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LWNvbHVtbi1zb3J0aW5nXCI+XG4gICAgPGkgY2xhc3M9XCJ1eC1jb2x1bW4tc29ydGluZy1pY29uIGhwZS1pY29uXCIgXG4gICAgICAgIFtjbGFzcy5ocGUtYXNjZW5kXT1cInN0YXRlID09PSBjb2x1bW5Tb3J0aW5nU3RhdGUuQXNjZW5kaW5nXCIgXG4gICAgICAgIFtjbGFzcy5ocGUtZGVzY2VuZF09XCJzdGF0ZSA9PT0gY29sdW1uU29ydGluZ1N0YXRlLkRlc2NlbmRpbmdcIiBcbiAgICAgICAgW2NsYXNzLmNvbHVtbi1zb3J0aW5nLWljb24taGlkZGVuXT1cInN0YXRlID09PSBjb2x1bW5Tb3J0aW5nU3RhdGUuTm9Tb3J0XCI+PC9pPlxuICAgIDxwIGNsYXNzPVwidXgtY29sdW1uLXNvcnRpbmctbnVtYmVyXCI+e3sgb3JkZXJOdW1iZXIgfX08L3A+XG48L2Rpdj5gLFxuICAgIGV4cG9ydEFzOiAndXgtY29sdW1uLXNvcnRpbmcnXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtblNvcnRpbmdDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgc3RhdGU6IENvbHVtblNvcnRpbmdTdGF0ZTtcbiAgICBASW5wdXQoKSBrZXk6IHN0cmluZztcbiAgICBASW5wdXQoKSBvcmRlck51bWJlcjogbnVtYmVyO1xuICAgIEBPdXRwdXQoKSBzdGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPENvbHVtblNvcnRpbmdTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPENvbHVtblNvcnRpbmdTdGF0ZT4oKTtcblxuICAgIHByaXZhdGUgX3BhcmVudDogQ29sdW1uU29ydGluZ0RpcmVjdGl2ZTtcbiAgICBjb2x1bW5Tb3J0aW5nU3RhdGUgPSBDb2x1bW5Tb3J0aW5nU3RhdGU7XG5cbiAgICBpbml0UGFyZW50KHBhcmVudDogQ29sdW1uU29ydGluZ0RpcmVjdGl2ZSkge1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIGFueSBldmVudHNcbiAgICAgICAgdGhpcy5fcGFyZW50LmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICBsZXQgaWR4ID0gZXZlbnQuZmluZEluZGV4KGNvbHVtbiA9PiBjb2x1bW4ua2V5ID09PSB0aGlzLmtleSk7XG5cbiAgICAgICAgICAgIGlmIChpZHggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlLk5vU29ydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb25seSBzdG9yZSB0aGUgbnVtYmVyIGlmIHdlIGhhdmUgMiBvciBtb3JlIGNvbHVtbnMgYmVpbmcgc29ydGVkXG4gICAgICAgICAgICBpZiAoZXZlbnQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJOdW1iZXIgPSBpZHggPT09IC0xID8gbnVsbCA6IGlkeCArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJOdW1iZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlLmVtaXQodGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlU3RhdGUoKTogQ29sdW1uU29ydGluZ09yZGVyW10ge1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBDb2x1bW5Tb3J0aW5nU3RhdGUuQXNjZW5kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29sdW1uU29ydGluZ1N0YXRlLkRlc2NlbmRpbmc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gQ29sdW1uU29ydGluZ1N0YXRlLkRlc2NlbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb2x1bW5Tb3J0aW5nU3RhdGUuTm9Tb3J0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbHVtblNvcnRpbmdTdGF0ZS5Bc2NlbmRpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbmZvcm0gcGFyZW50XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQudG9nZ2xlQ29sdW1uKHRoaXMua2V5LCB0aGlzLnN0YXRlKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gQ29sdW1uU29ydGluZ1N0YXRlIHtcbiAgICBBc2NlbmRpbmcsXG4gICAgRGVzY2VuZGluZyxcbiAgICBOb1NvcnRcbn0iXX0=