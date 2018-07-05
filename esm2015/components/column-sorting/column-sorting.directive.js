/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ColumnSortingComponent, ColumnSortingState } from './column-sorting.component';
import { Directive, QueryList, ContentChildren, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class ColumnSortingDirective {
    constructor() {
        this.events = new Subject();
        this.order = [];
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.components.forEach(component => component.initParent(this));
    }
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    toggleColumn(key, state) {
        if (this.singleSort) {
            if (state === ColumnSortingState.NoSort) {
                this.order = [];
            }
            else {
                this.order = [{ key: key, state: state }];
            }
        }
        else {
            // reorder columns here
            let /** @type {?} */ idx = this.order.findIndex(column => column.key === key);
            // if wasnt previously selected add to list
            if (idx === -1) {
                this.order.push({ key: key, state: state });
            }
            else if (state === ColumnSortingState.Ascending || state === ColumnSortingState.Descending) {
                this.order.splice(idx, 1);
                this.order.push({ key: key, state: state });
            }
            else {
                this.order.splice(idx, 1);
            }
        }
        this.events.next(this.order);
        // return the order
        return this.order;
    }
}
ColumnSortingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxColumnSorting]'
            },] },
];
/** @nocollapse */
ColumnSortingDirective.ctorParameters = () => [];
ColumnSortingDirective.propDecorators = {
    "singleSort": [{ type: Input },],
    "components": [{ type: ContentChildren, args: [ColumnSortingComponent,] },],
};
function ColumnSortingDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ColumnSortingDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ColumnSortingDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ColumnSortingDirective.propDecorators;
    /** @type {?} */
    ColumnSortingDirective.prototype.singleSort;
    /** @type {?} */
    ColumnSortingDirective.prototype.components;
    /** @type {?} */
    ColumnSortingDirective.prototype.events;
    /** @type {?} */
    ColumnSortingDirective.prototype.order;
}
/**
 * @record
 */
export function ColumnSortingOrder() { }
function ColumnSortingOrder_tsickle_Closure_declarations() {
    /** @type {?} */
    ColumnSortingOrder.prototype.key;
    /** @type {?} */
    ColumnSortingOrder.prototype.state;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RixPQUFPLEVBQUUsU0FBUyxFQUFRLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLdkMsTUFBTTs7c0JBS3NDLElBQUksT0FBTyxFQUF3QjtxQkFDN0MsRUFBRTs7Ozs7SUFFaEMsZUFBZTtRQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDcEU7Ozs7OztJQUVELFlBQVksQ0FBQyxHQUFXLEVBQUUsS0FBeUI7UUFFL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ25CO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUMzQztTQUNKO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRUoscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDOztZQUc3RCxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUM5QztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssa0JBQWtCLENBQUMsU0FBUyxJQUFJLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUM5QztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNKO1FBRUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUV6Qjs7O1lBMUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2FBQ2hDOzs7OzsyQkFHSSxLQUFLOzJCQUNMLGVBQWUsU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW5Tb3J0aW5nQ29tcG9uZW50LCBDb2x1bW5Tb3J0aW5nU3RhdGUgfSBmcm9tICcuL2NvbHVtbi1zb3J0aW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4Q29sdW1uU29ydGluZ10nXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtblNvcnRpbmdEaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCkgc2luZ2xlU29ydDogYm9vbGVhbjtcbiAgICBAQ29udGVudENoaWxkcmVuKENvbHVtblNvcnRpbmdDb21wb25lbnQpIGNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxDb2x1bW5Tb3J0aW5nQ29tcG9uZW50PjtcblxuICAgIGV2ZW50czogU3ViamVjdDxDb2x1bW5Tb3J0aW5nT3JkZXJbXT4gPSBuZXcgU3ViamVjdDxDb2x1bW5Tb3J0aW5nT3JkZXJbXT4oKTtcbiAgICBvcmRlcjogQ29sdW1uU29ydGluZ09yZGVyW10gPSBbXTtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goY29tcG9uZW50ID0+IGNvbXBvbmVudC5pbml0UGFyZW50KHRoaXMpKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb2x1bW4oa2V5OiBzdHJpbmcsIHN0YXRlOiBDb2x1bW5Tb3J0aW5nU3RhdGUpIHtcblxuICAgICAgICBpZiAodGhpcy5zaW5nbGVTb3J0KSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IENvbHVtblNvcnRpbmdTdGF0ZS5Ob1NvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyID0gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXIgPSBbe2tleToga2V5LCBzdGF0ZTogc3RhdGV9XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHJlb3JkZXIgY29sdW1ucyBoZXJlXG4gICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5vcmRlci5maW5kSW5kZXgoY29sdW1uID0+IGNvbHVtbi5rZXkgPT09IGtleSk7XG5cbiAgICAgICAgICAgIC8vIGlmIHdhc250IHByZXZpb3VzbHkgc2VsZWN0ZWQgYWRkIHRvIGxpc3RcbiAgICAgICAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlci5wdXNoKHsga2V5OiBrZXksIHN0YXRlOiBzdGF0ZX0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQ29sdW1uU29ydGluZ1N0YXRlLkFzY2VuZGluZyB8fCBzdGF0ZSA9PT0gQ29sdW1uU29ydGluZ1N0YXRlLkRlc2NlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXIucHVzaCh7IGtleToga2V5LCBzdGF0ZTogc3RhdGV9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlci5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHRoaXMub3JkZXIpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBvcmRlclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3JkZXI7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uU29ydGluZ09yZGVyIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzdGF0ZTogQ29sdW1uU29ydGluZ1N0YXRlOyBcbn0iXX0=