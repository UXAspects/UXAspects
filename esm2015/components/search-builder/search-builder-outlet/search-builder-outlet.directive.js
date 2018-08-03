/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
export class SearchBuilderOutletDirective {
    /**
     * @param {?} _viewContainerRef
     * @param {?} _componentFactoryResolver
     * @param {?} _searchBuilderService
     */
    constructor(_viewContainerRef, _componentFactoryResolver, _searchBuilderService) {
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._searchBuilderService = _searchBuilderService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // get the class from the type
        const /** @type {?} */ componentDefinition = this._searchBuilderService.getComponent(this.uxSearchBuilderOutlet);
        // create the component factory
        const /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentDefinition.component);
        // create the component instance
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        // combine the predefined config with any dynmaic config
        const /** @type {?} */ config = Object.assign({}, componentDefinition.config, this.uxSearchBuilderOutletContext.config || {});
        // set the context and config property on the component instance
        this._componentRef.instance.context = this.uxSearchBuilderOutletContext;
        this._componentRef.instance.config = config;
    }
}
SearchBuilderOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxSearchBuilderOutlet]'
            },] }
];
/** @nocollapse */
SearchBuilderOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: SearchBuilderService }
];
SearchBuilderOutletDirective.propDecorators = {
    uxSearchBuilderOutlet: [{ type: Input }],
    uxSearchBuilderOutletContext: [{ type: Input }]
};
function SearchBuilderOutletDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderOutletDirective.prototype.uxSearchBuilderOutlet;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype.uxSearchBuilderOutletContext;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._componentRef;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._viewContainerRef;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._componentFactoryResolver;
    /** @type {?} */
    SearchBuilderOutletDirective.prototype._searchBuilderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItb3V0bGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLW91dGxldC9zZWFyY2gtYnVpbGRlci1vdXRsZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQWdCLFNBQVMsRUFBRSxLQUFLLEVBQVUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLakUsTUFBTTs7Ozs7O0lBT0YsWUFDWSxtQkFDQSwyQkFDQTtRQUZBLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsOEJBQXlCLEdBQXpCLHlCQUF5QjtRQUN6QiwwQkFBcUIsR0FBckIscUJBQXFCO0tBQzVCOzs7O0lBRUwsUUFBUTs7UUFHSix1QkFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOztRQUdoRyx1QkFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBRy9HLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztRQUc5RSx1QkFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7O1FBRzdHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUM7UUFDeEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUMvQzs7O1lBakNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2FBQ3RDOzs7O1lBTDBFLGdCQUFnQjtZQUFsRix3QkFBd0I7WUFDeEIsb0JBQW9COzs7b0NBT3hCLEtBQUs7MkNBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4U2VhcmNoQnVpbGRlck91dGxldF0nXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJPdXRsZXREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgdXhTZWFyY2hCdWlsZGVyT3V0bGV0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgdXhTZWFyY2hCdWlsZGVyT3V0bGV0Q29udGV4dDogYW55O1xuXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoQnVpbGRlclNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY2xhc3MgZnJvbSB0aGUgdHlwZVxuICAgICAgICBjb25zdCBjb21wb25lbnREZWZpbml0aW9uID0gdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UuZ2V0Q29tcG9uZW50KHRoaXMudXhTZWFyY2hCdWlsZGVyT3V0bGV0KTtcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGNvbXBvbmVudCBmYWN0b3J5XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50RGVmaW5pdGlvbi5jb21wb25lbnQpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8vIGNvbWJpbmUgdGhlIHByZWRlZmluZWQgY29uZmlnIHdpdGggYW55IGR5bm1haWMgY29uZmlnXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbXBvbmVudERlZmluaXRpb24uY29uZmlnLCB0aGlzLnV4U2VhcmNoQnVpbGRlck91dGxldENvbnRleHQuY29uZmlnIHx8IHt9KTtcblxuICAgICAgICAvLyBzZXQgdGhlIGNvbnRleHQgYW5kIGNvbmZpZyBwcm9wZXJ0eSBvbiB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZS5jb250ZXh0ID0gdGhpcy51eFNlYXJjaEJ1aWxkZXJPdXRsZXRDb250ZXh0O1xuICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UuY29uZmlnID0gY29uZmlnO1xuICAgIH1cbn1cbiJdfQ==