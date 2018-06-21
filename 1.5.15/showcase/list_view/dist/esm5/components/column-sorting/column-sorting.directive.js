/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ColumnSortingComponent, ColumnSortingState } from './column-sorting.component';
import { Directive, QueryList, ContentChildren, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var ColumnSortingDirective = (function () {
    function ColumnSortingDirective() {
        this.events = new Subject();
        this.order = [];
    }
    /**
     * @return {?}
     */
    ColumnSortingDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.components.forEach(function (component) { return component.initParent(_this); });
    };
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    ColumnSortingDirective.prototype.toggleColumn = /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    function (key, state) {
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
            var /** @type {?} */ idx = this.order.findIndex(function (column) { return column.key === key; });
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
    };
    ColumnSortingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxColumnSorting]'
                },] },
    ];
    /** @nocollapse */
    ColumnSortingDirective.propDecorators = {
        "singleSort": [{ type: Input },],
        "components": [{ type: ContentChildren, args: [ColumnSortingComponent,] },],
    };
    return ColumnSortingDirective;
}());
export { ColumnSortingDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sdW1uLXNvcnRpbmcvY29sdW1uLXNvcnRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RixPQUFPLEVBQUUsU0FBUyxFQUFRLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7OztzQkFVSyxJQUFJLE9BQU8sRUFBd0I7cUJBQzdDLEVBQUU7Ozs7O0lBRWhDLGdEQUFlOzs7SUFBZjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7S0FDcEU7Ozs7OztJQUVELDZDQUFZOzs7OztJQUFaLFVBQWEsR0FBVyxFQUFFLEtBQXlCO1FBRS9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNuQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDM0M7U0FDSjtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVKLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFsQixDQUFrQixDQUFDLENBQUM7O1lBRzdELEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQzlDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxTQUFTLElBQUksS0FBSyxLQUFLLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQzlDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7UUFFRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBRTdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBRXpCOztnQkExQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7aUJBQ2hDOzs7OytCQUdJLEtBQUs7K0JBQ0wsZUFBZSxTQUFDLHNCQUFzQjs7aUNBVjNDOztTQU9hLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtblNvcnRpbmdDb21wb25lbnQsIENvbHVtblNvcnRpbmdTdGF0ZSB9IGZyb20gJy4vY29sdW1uLXNvcnRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGRyZW4sIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhDb2x1bW5Tb3J0aW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uU29ydGluZ0RpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoKSBzaW5nbGVTb3J0OiBib29sZWFuO1xuICAgIEBDb250ZW50Q2hpbGRyZW4oQ29sdW1uU29ydGluZ0NvbXBvbmVudCkgY29tcG9uZW50czogUXVlcnlMaXN0PENvbHVtblNvcnRpbmdDb21wb25lbnQ+O1xuXG4gICAgZXZlbnRzOiBTdWJqZWN0PENvbHVtblNvcnRpbmdPcmRlcltdPiA9IG5ldyBTdWJqZWN0PENvbHVtblNvcnRpbmdPcmRlcltdPigpO1xuICAgIG9yZGVyOiBDb2x1bW5Tb3J0aW5nT3JkZXJbXSA9IFtdO1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4gY29tcG9uZW50LmluaXRQYXJlbnQodGhpcykpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbHVtbihrZXk6IHN0cmluZywgc3RhdGU6IENvbHVtblNvcnRpbmdTdGF0ZSkge1xuXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZVNvcnQpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gQ29sdW1uU29ydGluZ1N0YXRlLk5vU29ydCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXIgPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlciA9IFt7a2V5OiBrZXksIHN0YXRlOiBzdGF0ZX1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcmVvcmRlciBjb2x1bW5zIGhlcmVcbiAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLm9yZGVyLmZpbmRJbmRleChjb2x1bW4gPT4gY29sdW1uLmtleSA9PT0ga2V5KTtcblxuICAgICAgICAgICAgLy8gaWYgd2FzbnQgcHJldmlvdXNseSBzZWxlY3RlZCBhZGQgdG8gbGlzdFxuICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyLnB1c2goeyBrZXk6IGtleSwgc3RhdGU6IHN0YXRlfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBDb2x1bW5Tb3J0aW5nU3RhdGUuQXNjZW5kaW5nIHx8IHN0YXRlID09PSBDb2x1bW5Tb3J0aW5nU3RhdGUuRGVzY2VuZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXIuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlci5wdXNoKHsga2V5OiBrZXksIHN0YXRlOiBzdGF0ZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQodGhpcy5vcmRlcik7XG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIG9yZGVyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcmRlcjtcblxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5Tb3J0aW5nT3JkZXIge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHN0YXRlOiBDb2x1bW5Tb3J0aW5nU3RhdGU7IFxufSJdfQ==