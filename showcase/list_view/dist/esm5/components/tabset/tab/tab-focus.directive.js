/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TabsetService } from '../tabset.service';
import { TabComponent } from './tab.component';
var TabFocusDirective = (function () {
    function TabFocusDirective(_tabset, _elementRef) {
        this._tabset = _tabset;
        this._elementRef = _elementRef;
    }
    /**
     * @return {?}
     */
    TabFocusDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this._tabset.highlighted$.pipe(filter(function () { return _this._tabset.focused$.value === true; }), filter(function () { return _this._tabset.highlighted$.value === _this.uxTabFocus; })).subscribe(function () { return _this._elementRef.nativeElement.focus(); });
    };
    /**
     * @return {?}
     */
    TabFocusDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    TabFocusDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTabFocus]'
                },] },
    ];
    /** @nocollapse */
    TabFocusDirective.ctorParameters = function () { return [
        { type: TabsetService, },
        { type: ElementRef, },
    ]; };
    TabFocusDirective.propDecorators = {
        "uxTabFocus": [{ type: Input },],
    };
    return TabFocusDirective;
}());
export { TabFocusDirective };
function TabFocusDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TabFocusDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TabFocusDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TabFocusDirective.propDecorators;
    /** @type {?} */
    TabFocusDirective.prototype.uxTabFocus;
    /** @type {?} */
    TabFocusDirective.prototype._subscription;
    /** @type {?} */
    TabFocusDirective.prototype._tabset;
    /** @type {?} */
    TabFocusDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYnNldC90YWIvdGFiLWZvY3VzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFXM0MsMkJBQW9CLE9BQXNCLEVBQVUsV0FBdUI7UUFBdkQsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0tBQUs7Ozs7SUFFaEYsb0NBQVE7OztJQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDL0MsTUFBTSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFwQyxDQUFvQyxDQUFDLEVBQ2xELE1BQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxVQUFVLEVBQW5ELENBQW1ELENBQUMsQ0FDcEUsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxFQUF0QyxDQUFzQyxDQUFDLENBQUM7S0FDN0Q7Ozs7SUFFRCx1Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOztnQkFwQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO2lCQUMzQjs7OztnQkFMUSxhQUFhO2dCQUhGLFVBQVU7OzsrQkFXekIsS0FBSzs7NEJBWFY7O1NBU2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRhYnNldFNlcnZpY2UgfSBmcm9tICcuLi90YWJzZXQuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRhYkZvY3VzXSdcbn0pXG5leHBvcnQgY2xhc3MgVGFiRm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB1eFRhYkZvY3VzOiBUYWJDb21wb25lbnQ7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RhYnNldDogVGFic2V0U2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fdGFic2V0LmhpZ2hsaWdodGVkJC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuX3RhYnNldC5mb2N1c2VkJC52YWx1ZSA9PT0gdHJ1ZSksXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5fdGFic2V0LmhpZ2hsaWdodGVkJC52YWx1ZSA9PT0gdGhpcy51eFRhYkZvY3VzKSxcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG59Il19