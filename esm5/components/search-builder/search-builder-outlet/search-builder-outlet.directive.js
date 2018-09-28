/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';
var SearchBuilderOutletDirective = /** @class */ (function () {
    function SearchBuilderOutletDirective(_viewContainerRef, _componentFactoryResolver, _searchBuilderService, _searchBuilderFocusService) {
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderFocusService = _searchBuilderFocusService;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    SearchBuilderOutletDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // get the class from the type
        var /** @type {?} */ componentDefinition = this._searchBuilderService.getComponent(this.outlet);
        // create the component factory
        var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentDefinition.component);
        // create the component instance
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        // combine the predefined config with any dynmaic config
        var /** @type {?} */ config = Object.assign({}, componentDefinition.config, this.context.config || {});
        // set the context and config property on the component instance
        this._componentRef.instance.context = this.context;
        this._componentRef.instance.config = config;
        this._searchBuilderFocusService.focus$
            .pipe(distinctUntilChanged(), delay(0), takeUntil(this._onDestroy))
            .subscribe(function (focus) {
            _this._componentRef.instance.focus = (focus.groupId === _this.groupId && focus.index === _this.index);
        });
    };
    /**
     * @return {?}
     */
    SearchBuilderOutletDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    SearchBuilderOutletDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxSearchBuilderOutlet]'
                },] }
    ];
    /** @nocollapse */
    SearchBuilderOutletDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: SearchBuilderService },
        { type: SearchBuilderFocusService }
    ]; };
    SearchBuilderOutletDirective.propDecorators = {
        outlet: [{ type: Input, args: ['uxSearchBuilderOutlet',] }],
        context: [{ type: Input, args: ['uxSearchBuilderOutletContext',] }],
        groupId: [{ type: Input, args: ['uxSearchBuilderOutletGroupId',] }],
        index: [{ type: Input, args: ['uxSearchBuilderOutletIndex',] }]
    };
    return SearchBuilderOutletDirective;
}());
export { SearchBuilderOutletDirective };
function SearchBuilderOutletDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderOutletDirective.prototype.outlet;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype.context;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype.groupId;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype.index;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._componentRef;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._onDestroy;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._viewContainerRef;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._componentFactoryResolver;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._searchBuilderService;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._searchBuilderFocusService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItb3V0bGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLW91dGxldC9zZWFyY2gtYnVpbGRlci1vdXRsZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQWdCLFNBQVMsRUFBRSxLQUFLLEVBQXFCLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlILE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFnQjdELHNDQUNZLG1CQUNBLDJCQUNBLHVCQUNBO1FBSEEsc0JBQWlCLEdBQWpCLGlCQUFpQjtRQUNqQiw4QkFBeUIsR0FBekIseUJBQXlCO1FBQ3pCLDBCQUFxQixHQUFyQixxQkFBcUI7UUFDckIsK0JBQTBCLEdBQTFCLDBCQUEwQjswQkFOakIsSUFBSSxPQUFPLEVBQVE7S0FPbkM7Ozs7SUFFTCwrQ0FBUTs7O0lBQVI7UUFBQSxpQkF1QkM7O1FBcEJHLHFCQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUdqRixxQkFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsdUJBQXVCLENBQXNCLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUdwSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7UUFHOUUscUJBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQzs7UUFHeEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUU1QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTTthQUNqQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNsRSxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ1osS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RHLENBQUMsQ0FBQztLQUNWOzs7O0lBRUQsa0RBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOztnQkFoREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3RDOzs7O2dCQVRxRixnQkFBZ0I7Z0JBQTdGLHdCQUF3QjtnQkFJeEIsb0JBQW9CO2dCQURwQix5QkFBeUI7Ozt5QkFTN0IsS0FBSyxTQUFDLHVCQUF1QjswQkFDN0IsS0FBSyxTQUFDLDhCQUE4QjswQkFDcEMsS0FBSyxTQUFDLDhCQUE4Qjt3QkFDcEMsS0FBSyxTQUFDLDRCQUE0Qjs7dUNBZnZDOztTQVVhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVsYXksIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gtYnVpbGRlci1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi4vc2VhcmNoLWNvbXBvbmVudHMvYmFzZS1zZWFyY2guY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhTZWFyY2hCdWlsZGVyT3V0bGV0XSdcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlck91dGxldERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgndXhTZWFyY2hCdWlsZGVyT3V0bGV0Jykgb3V0bGV0OiBzdHJpbmc7XG4gICAgQElucHV0KCd1eFNlYXJjaEJ1aWxkZXJPdXRsZXRDb250ZXh0JykgY29udGV4dDogYW55O1xuICAgIEBJbnB1dCgndXhTZWFyY2hCdWlsZGVyT3V0bGV0R3JvdXBJZCcpIGdyb3VwSWQ6IHN0cmluZztcbiAgICBASW5wdXQoJ3V4U2VhcmNoQnVpbGRlck91dGxldEluZGV4JykgaW5kZXg6IG51bWJlcjtcblxuICAgIHByaXZhdGUgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPEJhc2VTZWFyY2hDb21wb25lbnQ+O1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoQnVpbGRlckZvY3VzU2VydmljZTogU2VhcmNoQnVpbGRlckZvY3VzU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGNsYXNzIGZyb20gdGhlIHR5cGVcbiAgICAgICAgY29uc3QgY29tcG9uZW50RGVmaW5pdGlvbiA9IHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLmdldENvbXBvbmVudCh0aGlzLm91dGxldCk7XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBjb21wb25lbnQgZmFjdG9yeVxuICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PEJhc2VTZWFyY2hDb21wb25lbnQ+KGNvbXBvbmVudERlZmluaXRpb24uY29tcG9uZW50KTtcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvLyBjb21iaW5lIHRoZSBwcmVkZWZpbmVkIGNvbmZpZyB3aXRoIGFueSBkeW5tYWljIGNvbmZpZ1xuICAgICAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb21wb25lbnREZWZpbml0aW9uLmNvbmZpZywgdGhpcy5jb250ZXh0LmNvbmZpZyB8fCB7fSk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBjb250ZXh0IGFuZCBjb25maWcgcHJvcGVydHkgb24gdGhlIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UuY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbmZpZyA9IGNvbmZpZztcblxuICAgICAgICB0aGlzLl9zZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlLmZvY3VzJFxuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgZGVsYXkoMCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmb2N1cyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlLmZvY3VzID0gKGZvY3VzLmdyb3VwSWQgPT09IHRoaXMuZ3JvdXBJZCAmJiBmb2N1cy5pbmRleCA9PT0gdGhpcy5pbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxufVxuIl19