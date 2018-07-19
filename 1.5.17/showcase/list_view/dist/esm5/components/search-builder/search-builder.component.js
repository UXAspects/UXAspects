/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { SearchBuilderService } from './search-builder.service';
var SearchBuilderComponent = (function () {
    /**
     * Register the default search builder components
     */
    function SearchBuilderComponent(_searchBuilderService) {
        var _this = this;
        this._searchBuilderService = _searchBuilderService;
        this.queryChange = new EventEmitter();
        this.valid = new EventEmitter(true);
        // watch for any query changes
        this._querySubscription = _searchBuilderService.queryChange.subscribe(function (query) { return _this.queryChange.emit(query); });
        // watch for any changes to the validation
        this._validSubscription = _searchBuilderService.validationChange.pipe(distinctUntilChanged()).subscribe(function (valid) { return _this.valid.emit(valid); });
    }
    Object.defineProperty(SearchBuilderComponent.prototype, "components", {
        set: /**
         * @param {?} components
         * @return {?}
         */
        function (components) {
            this._searchBuilderService.registerComponents(components);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBuilderComponent.prototype, "query", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchBuilderService.getQuery();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._searchBuilderService.setQuery(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove any subscriptions and cleanup
     */
    /**
     * Remove any subscriptions and cleanup
     * @return {?}
     */
    SearchBuilderComponent.prototype.ngOnDestroy = /**
     * Remove any subscriptions and cleanup
     * @return {?}
     */
    function () {
        this._querySubscription.unsubscribe();
        this._validSubscription.unsubscribe();
    };
    SearchBuilderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-builder',
                    template: "<ng-content></ng-content>",
                    providers: [SearchBuilderService]
                },] },
    ];
    /** @nocollapse */
    SearchBuilderComponent.ctorParameters = function () { return [
        { type: SearchBuilderService, },
    ]; };
    SearchBuilderComponent.propDecorators = {
        "components": [{ type: Input },],
        "query": [{ type: Input },],
        "queryChange": [{ type: Output },],
        "valid": [{ type: Output },],
    };
    return SearchBuilderComponent;
}());
export { SearchBuilderComponent };
function SearchBuilderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchBuilderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchBuilderComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SearchBuilderComponent.propDecorators;
    /** @type {?} */
    SearchBuilderComponent.prototype.queryChange;
    /** @type {?} */
    SearchBuilderComponent.prototype.valid;
    /** @type {?} */
    SearchBuilderComponent.prototype._querySubscription;
    /** @type {?} */
    SearchBuilderComponent.prototype._validSubscription;
    /** @type {?} */
    SearchBuilderComponent.prototype._searchBuilderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXRELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQTZCOUQ7O09BRUc7SUFDSCxnQ0FBb0IscUJBQTJDO1FBQS9ELGlCQU9DO1FBUG1CLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7MkJBVEwsSUFBSSxZQUFZLEVBQXNCO3FCQUN2RCxJQUFJLFlBQVksQ0FBVSxJQUFJLENBQUM7O1FBV3RFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQzs7UUFHN0csSUFBSSxDQUFDLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztLQUMxSTswQkE3QkcsOENBQVU7Ozs7O2tCQUFDLFVBQThDO1lBQzNELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7MEJBSXhELHlDQUFLOzs7O1FBSVQ7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzlDOzs7OztrQkFOUyxLQUF5QjtZQUNqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQXlCN0M7O09BRUc7Ozs7O0lBQ0gsNENBQVc7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdkM7O2dCQTdDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7aUJBQ2xDOzs7O2dCQU5RLG9CQUFvQjs7OytCQVMxQixLQUFLOzBCQUtMLEtBQUs7Z0NBU0wsTUFBTTswQkFDTixNQUFNOztpQ0E3QlQ7O1NBWWEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb21wb25lbnQtZGVmaW5pdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlclF1ZXJ5IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3F1ZXJ5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLWJ1aWxkZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LXNlYXJjaC1idWlsZGVyJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgcHJvdmlkZXJzOiBbU2VhcmNoQnVpbGRlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb21wb25lbnRzKGNvbXBvbmVudHM6IFNlYXJjaEJ1aWxkZXJDb21wb25lbnREZWZpbml0aW9uW10pIHtcbiAgICB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5yZWdpc3RlckNvbXBvbmVudHMoY29tcG9uZW50cyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcXVlcnkodmFsdWU6IFNlYXJjaEJ1aWxkZXJRdWVyeSkge1xuICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnNldFF1ZXJ5KHZhbHVlKTtcbiAgfVxuXG4gIGdldCBxdWVyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UuZ2V0UXVlcnkoKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBxdWVyeUNoYW5nZTogRXZlbnRFbWl0dGVyPFNlYXJjaEJ1aWxkZXJRdWVyeT4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaEJ1aWxkZXJRdWVyeT4oKTtcbiAgQE91dHB1dCgpIHZhbGlkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KHRydWUpO1xuXG4gIHByaXZhdGUgX3F1ZXJ5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX3ZhbGlkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIHRoZSBkZWZhdWx0IHNlYXJjaCBidWlsZGVyIGNvbXBvbmVudHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyU2VydmljZSkge1xuXG4gICAgLy8gd2F0Y2ggZm9yIGFueSBxdWVyeSBjaGFuZ2VzXG4gICAgdGhpcy5fcXVlcnlTdWJzY3JpcHRpb24gPSBfc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlDaGFuZ2Uuc3Vic2NyaWJlKHF1ZXJ5ID0+IHRoaXMucXVlcnlDaGFuZ2UuZW1pdChxdWVyeSkpO1xuXG4gICAgLy8gd2F0Y2ggZm9yIGFueSBjaGFuZ2VzIHRvIHRoZSB2YWxpZGF0aW9uXG4gICAgdGhpcy5fdmFsaWRTdWJzY3JpcHRpb24gPSBfc2VhcmNoQnVpbGRlclNlcnZpY2UudmFsaWRhdGlvbkNoYW5nZS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSh2YWxpZCA9PiB0aGlzLnZhbGlkLmVtaXQodmFsaWQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW55IHN1YnNjcmlwdGlvbnMgYW5kIGNsZWFudXBcbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3F1ZXJ5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdmFsaWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=