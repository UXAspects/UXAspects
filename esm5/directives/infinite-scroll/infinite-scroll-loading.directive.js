/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
var InfiniteScrollLoadingDirective = /** @class */ (function () {
    function InfiniteScrollLoadingDirective(_templateRef, _viewContainer) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this._visible = false;
    }
    Object.defineProperty(InfiniteScrollLoadingDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._visible) {
                if (value) {
                    this._viewContainer.createEmbeddedView(this._templateRef);
                }
                else {
                    this._viewContainer.clear();
                }
            }
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    InfiniteScrollLoadingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxInfiniteScrollLoading]'
                },] }
    ];
    /** @nocollapse */
    InfiniteScrollLoadingDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    InfiniteScrollLoadingDirective.propDecorators = {
        visible: [{ type: Input, args: ['uxInfiniteScrollLoading',] }]
    };
    return InfiniteScrollLoadingDirective;
}());
export { InfiniteScrollLoadingDirective };
function InfiniteScrollLoadingDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    InfiniteScrollLoadingDirective.prototype._visible;
    /** @type {?} */
    InfiniteScrollLoadingDirective.prototype._templateRef;
    /** @type {?} */
    InfiniteScrollLoadingDirective.prototype._viewContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLWxvYWRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZmluaXRlLXNjcm9sbC1sb2FkaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztJQXlCNUUsd0NBQ1ksY0FDQTtRQURBLGlCQUFZLEdBQVosWUFBWTtRQUNaLG1CQUFjLEdBQWQsY0FBYzt3QkFKRSxLQUFLO0tBSWdCO0lBcEJqRCxzQkFDSSxtREFBTzs7OztRQURYO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDN0Q7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDL0I7YUFDSjtZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3pCOzs7T0FYQTs7Z0JBUkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3hDOzs7O2dCQUowQixXQUFXO2dCQUFFLGdCQUFnQjs7OzBCQU9uRCxLQUFLLFNBQUMseUJBQXlCOzt5Q0FQcEM7O1NBS2EsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhJbmZpbml0ZVNjcm9sbExvYWRpbmddJ1xufSlcbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbExvYWRpbmdEaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCd1eEluZmluaXRlU2Nyb2xsTG9hZGluZycpXG4gICAgZ2V0IHZpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cbiAgICBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX3RlbXBsYXRlUmVmKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7IH1cbn1cbiJdfQ==