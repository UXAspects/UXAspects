/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { TabsetService } from '../tabset.service';
var /** @type {?} */ uniqueTabId = 0;
var TabComponent = /** @class */ (function () {
    function TabComponent(_tabset) {
        var _this = this;
        this._tabset = _tabset;
        this.id = "ux-tab-" + ++uniqueTabId;
        this.disabled = false;
        this.select = new EventEmitter();
        this.deselect = new EventEmitter();
        this.active$ = this._tabset.active$.pipe(map(function (active) { return active === _this; }));
        _tabset.add(this);
        this._subscription = this.active$.subscribe(function (active) { return active ? _this.select.emit() : _this.deselect.emit(); });
    }
    Object.defineProperty(TabComponent.prototype, "active", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._tabset.select(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TabComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._tabset.remove(this);
        this._subscription.unsubscribe();
    };
    TabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-tab',
                    template: "<div role=\"tabpanel\"\n     class=\"tab-pane\"\n     [class.active]=\"active$ | async\"\n     [id]=\"id + '-panel'\"\n     [attr.aria-labelledby]=\"id\"\n     [attr.aria-hidden]=\"!(active$ | async)\">\n  <ng-content></ng-content>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return [
        { type: TabsetService }
    ]; };
    TabComponent.propDecorators = {
        id: [{ type: Input }],
        disabled: [{ type: Input }],
        heading: [{ type: Input }],
        customClass: [{ type: Input }],
        select: [{ type: Output }],
        deselect: [{ type: Output }],
        active: [{ type: Input }]
    };
    return TabComponent;
}());
export { TabComponent };
function TabComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TabComponent.prototype.id;
    /** @type {?} */
    TabComponent.prototype.disabled;
    /** @type {?} */
    TabComponent.prototype.heading;
    /** @type {?} */
    TabComponent.prototype.customClass;
    /** @type {?} */
    TabComponent.prototype.select;
    /** @type {?} */
    TabComponent.prototype.deselect;
    /** @type {?} */
    TabComponent.prototype.headingRef;
    /** @type {?} */
    TabComponent.prototype.active$;
    /** @type {?} */
    TabComponent.prototype._subscription;
    /** @type {?} */
    TabComponent.prototype._tabset;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYnNldC90YWIvdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUd4SCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELHFCQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7O0lBNEJoQixzQkFBb0IsT0FBc0I7UUFBMUMsaUJBSUM7UUFKbUIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtrQkFuQnBCLFlBQVUsRUFBRSxXQUFhO3dCQUNsQixLQUFLO3NCQUlmLElBQUksWUFBWSxFQUFRO3dCQUN0QixJQUFJLFlBQVksRUFBUTt1QkFTZCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxLQUFLLEtBQUksRUFBZixDQUFlLENBQUMsQ0FBQztRQUtwRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWxELENBQWtELENBQUMsQ0FBQztLQUM3RztJQWZELHNCQUFhLGdDQUFNOzs7OztRQUFuQixVQUFvQixLQUFjO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7U0FDSjs7O09BQUE7Ozs7SUFhRCxrQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOztnQkFuQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxRQUFRO29CQUNsQiwyUEFBbUM7b0JBQ25DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDs7OztnQkFSUSxhQUFhOzs7cUJBV2pCLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUNMLEtBQUs7eUJBRUwsTUFBTTsyQkFDTixNQUFNO3lCQUVOLEtBQUs7O3VCQXZCVjs7U0FhYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRhYnNldFNlcnZpY2UgfSBmcm9tICcuLi90YWJzZXQuc2VydmljZSc7XG5cbmxldCB1bmlxdWVUYWJJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtdGFiJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGFiLmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGB1eC10YWItJHsrK3VuaXF1ZVRhYklkfWA7XG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBoZWFkaW5nOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIGRlc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgQElucHV0KCkgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYnNldC5zZWxlY3QodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoZWFkaW5nUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIGFjdGl2ZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl90YWJzZXQuYWN0aXZlJC5waXBlKG1hcChhY3RpdmUgPT4gYWN0aXZlID09PSB0aGlzKSk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RhYnNldDogVGFic2V0U2VydmljZSkge1xuICAgICAgICBfdGFic2V0LmFkZCh0aGlzKTtcblxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLmFjdGl2ZSQuc3Vic2NyaWJlKGFjdGl2ZSA9PiBhY3RpdmUgPyB0aGlzLnNlbGVjdC5lbWl0KCkgOiB0aGlzLmRlc2VsZWN0LmVtaXQoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RhYnNldC5yZW1vdmUodGhpcyk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxufSJdfQ==