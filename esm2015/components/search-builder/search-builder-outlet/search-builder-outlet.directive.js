/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';
export class SearchBuilderOutletDirective {
    /**
     * @param {?} _viewContainerRef
     * @param {?} _componentFactoryResolver
     * @param {?} _searchBuilderService
     * @param {?} _searchBuilderFocusService
     */
    constructor(_viewContainerRef, _componentFactoryResolver, _searchBuilderService, _searchBuilderFocusService) {
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderFocusService = _searchBuilderFocusService;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // get the class from the type
        const /** @type {?} */ componentDefinition = this._searchBuilderService.getComponent(this.outlet);
        // create the component factory
        const /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentDefinition.component);
        // create the component instance
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        // combine the predefined config with any dynmaic config
        const /** @type {?} */ config = Object.assign({}, componentDefinition.config, this.context.config || {});
        // set the context and config property on the component instance
        this._componentRef.instance.context = this.context;
        this._componentRef.instance.config = config;
        this._searchBuilderFocusService.focus$
            .pipe(distinctUntilChanged(), delay(0), takeUntil(this._onDestroy))
            .subscribe(focus => {
            this._componentRef.instance.focus = (focus.groupId === this.groupId && focus.index === this.index);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
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
    { type: SearchBuilderService },
    { type: SearchBuilderFocusService }
];
SearchBuilderOutletDirective.propDecorators = {
    outlet: [{ type: Input, args: ['uxSearchBuilderOutlet',] }],
    context: [{ type: Input, args: ['uxSearchBuilderOutletContext',] }],
    groupId: [{ type: Input, args: ['uxSearchBuilderOutletGroupId',] }],
    index: [{ type: Input, args: ['uxSearchBuilderOutletIndex',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItb3V0bGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1idWlsZGVyLW91dGxldC9zZWFyY2gtYnVpbGRlci1vdXRsZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQWdCLFNBQVMsRUFBRSxLQUFLLEVBQXFCLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlILE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU1qRSxNQUFNOzs7Ozs7O0lBVUYsWUFDWSxtQkFDQSwyQkFDQSx1QkFDQTtRQUhBLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsOEJBQXlCLEdBQXpCLHlCQUF5QjtRQUN6QiwwQkFBcUIsR0FBckIscUJBQXFCO1FBQ3JCLCtCQUEwQixHQUExQiwwQkFBMEI7MEJBTmpCLElBQUksT0FBTyxFQUFRO0tBT25DOzs7O0lBRUwsUUFBUTs7UUFHSix1QkFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHakYsdUJBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF1QixDQUFzQixtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFHcEksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7O1FBRzlFLHVCQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7O1FBR3hGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFNUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU07YUFDakMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RHLENBQUMsQ0FBQztLQUNWOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7O1lBaERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2FBQ3RDOzs7O1lBVHFGLGdCQUFnQjtZQUE3Rix3QkFBd0I7WUFJeEIsb0JBQW9CO1lBRHBCLHlCQUF5Qjs7O3FCQVM3QixLQUFLLFNBQUMsdUJBQXVCO3NCQUM3QixLQUFLLFNBQUMsOEJBQThCO3NCQUNwQyxLQUFLLFNBQUMsOEJBQThCO29CQUNwQyxLQUFLLFNBQUMsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWxheSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckZvY3VzU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC1idWlsZGVyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gtYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VTZWFyY2hDb21wb25lbnQgfSBmcm9tICcuLi9zZWFyY2gtY29tcG9uZW50cy9iYXNlLXNlYXJjaC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFNlYXJjaEJ1aWxkZXJPdXRsZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hCdWlsZGVyT3V0bGV0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCd1eFNlYXJjaEJ1aWxkZXJPdXRsZXQnKSBvdXRsZXQ6IHN0cmluZztcbiAgICBASW5wdXQoJ3V4U2VhcmNoQnVpbGRlck91dGxldENvbnRleHQnKSBjb250ZXh0OiBhbnk7XG4gICAgQElucHV0KCd1eFNlYXJjaEJ1aWxkZXJPdXRsZXRHcm91cElkJykgZ3JvdXBJZDogc3RyaW5nO1xuICAgIEBJbnB1dCgndXhTZWFyY2hCdWlsZGVyT3V0bGV0SW5kZXgnKSBpbmRleDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8QmFzZVNlYXJjaENvbXBvbmVudD47XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoQnVpbGRlclNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY2xhc3MgZnJvbSB0aGUgdHlwZVxuICAgICAgICBjb25zdCBjb21wb25lbnREZWZpbml0aW9uID0gdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UuZ2V0Q29tcG9uZW50KHRoaXMub3V0bGV0KTtcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGNvbXBvbmVudCBmYWN0b3J5XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8QmFzZVNlYXJjaENvbXBvbmVudD4oY29tcG9uZW50RGVmaW5pdGlvbi5jb21wb25lbnQpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8vIGNvbWJpbmUgdGhlIHByZWRlZmluZWQgY29uZmlnIHdpdGggYW55IGR5bm1haWMgY29uZmlnXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbXBvbmVudERlZmluaXRpb24uY29uZmlnLCB0aGlzLmNvbnRleHQuY29uZmlnIHx8IHt9KTtcblxuICAgICAgICAvLyBzZXQgdGhlIGNvbnRleHQgYW5kIGNvbmZpZyBwcm9wZXJ0eSBvbiB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZS5jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UuY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2UuZm9jdXMkXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBkZWxheSgwKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGZvY3VzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UuZm9jdXMgPSAoZm9jdXMuZ3JvdXBJZCA9PT0gdGhpcy5ncm91cElkICYmIGZvY3VzLmluZGV4ID09PSB0aGlzLmluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG59XG4iXX0=