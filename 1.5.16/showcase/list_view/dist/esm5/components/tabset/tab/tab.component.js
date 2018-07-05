/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { TabsetService } from '../tabset.service';
var /** @type {?} */ uniqueTabId = 0;
var TabComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return [
        { type: TabsetService, },
    ]; };
    TabComponent.propDecorators = {
        "id": [{ type: Input },],
        "disabled": [{ type: Input },],
        "heading": [{ type: Input },],
        "customClass": [{ type: Input },],
        "select": [{ type: Output },],
        "deselect": [{ type: Output },],
        "active": [{ type: Input },],
    };
    return TabComponent;
}());
export { TabComponent };
function TabComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TabComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TabComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TabComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYnNldC90YWIvdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUd4SCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELHFCQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7O0lBbUNoQixzQkFBb0IsT0FBc0I7UUFBMUMsaUJBSUM7UUFKbUIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtrQkFuQnBCLFlBQVUsRUFBRSxXQUFhO3dCQUNsQixLQUFLO3NCQUlmLElBQUksWUFBWSxFQUFRO3dCQUN0QixJQUFJLFlBQVksRUFBUTt1QkFTZCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxLQUFLLEtBQUksRUFBZixDQUFlLENBQUMsQ0FBQztRQUtwRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFsRCxDQUFrRCxDQUFDLENBQUM7S0FDN0c7MEJBZlksZ0NBQU07Ozs7O2tCQUFDLEtBQWM7WUFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3Qjs7Ozs7Ozs7SUFjTCxrQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOztnQkExQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxRQUFRO29CQUNsQixRQUFRLEVBQUUsaVBBT1A7b0JBQ0gsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQWZRLGFBQWE7Ozt1QkFrQmpCLEtBQUs7NkJBQ0wsS0FBSzs0QkFDTCxLQUFLO2dDQUNMLEtBQUs7MkJBRUwsTUFBTTs2QkFDTixNQUFNOzJCQUVOLEtBQUs7O3VCQTlCVjs7U0FvQmEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUYWJzZXRTZXJ2aWNlIH0gZnJvbSAnLi4vdGFic2V0LnNlcnZpY2UnO1xuXG5sZXQgdW5pcXVlVGFiSWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXRhYicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgIGNsYXNzPVwidGFiLXBhbmVcIlxuICAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZSQgfCBhc3luY1wiXG4gICAgIFtpZF09XCJpZCArICctcGFuZWwnXCJcbiAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkXCJcbiAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIShhY3RpdmUkIHwgYXN5bmMpXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgdXgtdGFiLSR7Kyt1bmlxdWVUYWJJZH1gO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaGVhZGluZzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBkZXNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIEBJbnB1dCgpIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJzZXQuc2VsZWN0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGVhZGluZ1JlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBhY3RpdmUkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5fdGFic2V0LmFjdGl2ZSQucGlwZShtYXAoYWN0aXZlID0+IGFjdGl2ZSA9PT0gdGhpcykpO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJzZXQ6IFRhYnNldFNlcnZpY2UpIHtcbiAgICAgICAgX3RhYnNldC5hZGQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5hY3RpdmUkLnN1YnNjcmliZShhY3RpdmUgPT4gYWN0aXZlID8gdGhpcy5zZWxlY3QuZW1pdCgpIDogdGhpcy5kZXNlbGVjdC5lbWl0KCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJzZXQucmVtb3ZlKHRoaXMpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbn0iXX0=