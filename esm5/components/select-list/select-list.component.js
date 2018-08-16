/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SelectListService } from './select-list.service';
var SelectListComponent = /** @class */ (function () {
    function SelectListComponent(_selectList) {
        var _this = this;
        this._selectList = _selectList;
        this.selectedChange = new EventEmitter();
        this._onDestroy = new Subject();
        // any time the selection changes emit the latest value
        _selectList.selected$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy))
            .subscribe(function (selected) { return _this.selectedChange.emit(selected); });
    }
    Object.defineProperty(SelectListComponent.prototype, "multiple", {
        set: /**
         * @param {?} multiple
         * @return {?}
         */
        function (multiple) { this._selectList.multiple = multiple; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectListComponent.prototype, "selected", {
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) { this._selectList.selected$.next(items); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._selectList.initialise(this.items);
    };
    /**
     * @return {?}
     */
    SelectListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    SelectListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-select-list',
                    template: "<ng-content></ng-content>",
                    providers: [SelectListService],
                    host: {
                        role: 'list'
                    }
                }] }
    ];
    /** @nocollapse */
    SelectListComponent.ctorParameters = function () { return [
        { type: SelectListService }
    ]; };
    SelectListComponent.propDecorators = {
        multiple: [{ type: Input }],
        selected: [{ type: Input }],
        selectedChange: [{ type: Output }],
        items: [{ type: ContentChildren, args: [SelectListItemComponent,] }]
    };
    return SelectListComponent;
}());
export { SelectListComponent };
function SelectListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectListComponent.prototype.selectedChange;
    /** @type {?} */
    SelectListComponent.prototype.items;
    /** @type {?} */
    SelectListComponent.prototype._onDestroy;
    /** @type {?} */
    SelectListComponent.prototype._selectList;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2VsZWN0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQW9CdEQsNkJBQW9CLFdBQThCO1FBQWxELGlCQUlDO1FBSm1CLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjs4QkFOdkIsSUFBSSxZQUFZLEVBQVM7MEJBSS9CLElBQUksT0FBTyxFQUFROztRQUlwQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDekUsU0FBUyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztLQUNsRTtJQVpELHNCQUFhLHlDQUFROzs7OztRQUFyQixVQUFzQixRQUFpQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFFOzs7T0FBQTtJQUNsRixzQkFBYSx5Q0FBUTs7Ozs7UUFBckIsVUFBc0IsS0FBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzs7T0FBQTs7OztJQWEvRSw2Q0FBZTs7O0lBQWY7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0M7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7O2dCQS9CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIscUNBQTJDO29CQUMzQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDOUIsSUFBSSxFQUFFO3dCQUNGLElBQUksRUFBRSxNQUFNO3FCQUNmO2lCQUNKOzs7O2dCQVRRLGlCQUFpQjs7OzJCQVlyQixLQUFLOzJCQUNMLEtBQUs7aUNBQ0wsTUFBTTt3QkFFTixlQUFlLFNBQUMsdUJBQXVCOzs4QkFwQjVDOztTQWNhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTZWxlY3RMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWxpc3QtaXRlbS9zZWxlY3QtbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RMaXN0U2VydmljZSB9IGZyb20gJy4vc2VsZWN0LWxpc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtc2VsZWN0LWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbU2VsZWN0TGlzdFNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ2xpc3QnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNldCBtdWx0aXBsZShtdWx0aXBsZTogYm9vbGVhbikgeyB0aGlzLl9zZWxlY3RMaXN0Lm11bHRpcGxlID0gbXVsdGlwbGU7IH1cbiAgICBASW5wdXQoKSBzZXQgc2VsZWN0ZWQoaXRlbXM6IGFueVtdKSB7IHRoaXMuX3NlbGVjdExpc3Quc2VsZWN0ZWQkLm5leHQoaXRlbXMpOyB9XG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQpIGl0ZW1zOiBRdWVyeUxpc3Q8U2VsZWN0TGlzdEl0ZW1Db21wb25lbnQ+O1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdExpc3Q6IFNlbGVjdExpc3RTZXJ2aWNlKSB7XG4gICAgICAgIC8vIGFueSB0aW1lIHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBlbWl0IHRoZSBsYXRlc3QgdmFsdWVcbiAgICAgICAgX3NlbGVjdExpc3Quc2VsZWN0ZWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHNlbGVjdGVkID0+IHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0TGlzdC5pbml0aWFsaXNlKHRoaXMuaXRlbXMpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG59Il19