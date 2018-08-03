/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
export class LayoutSwitcherItemDirective {
    /**
     * @param {?} _templateRef
     * @param {?} _viewContainerRef
     */
    constructor(_templateRef, _viewContainerRef) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    getLayout() {
        return this._templateRef;
    }
    /**
     * @return {?}
     */
    getConfig() {
        return this._config;
    }
    /**
     * @return {?}
     */
    activate() {
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
    /**
     * @return {?}
     */
    deactivate() {
        let /** @type {?} */ index = this._viewContainerRef.indexOf(this._embeddedView);
        this._viewContainerRef.remove(index);
        this._embeddedView = null;
    }
}
LayoutSwitcherItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxLayoutSwitcherItem]'
            },] }
];
/** @nocollapse */
LayoutSwitcherItemDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
LayoutSwitcherItemDirective.propDecorators = {
    _config: [{ type: Input, args: ['uxLayoutSwitcherItem',] }]
};
function LayoutSwitcherItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    LayoutSwitcherItemDirective.prototype._config;
    /** @type {?} */
    LayoutSwitcherItemDirective.prototype._embeddedView;
    /** @type {?} */
    LayoutSwitcherItemDirective.prototype._templateRef;
    /** @type {?} */
    LayoutSwitcherItemDirective.prototype._viewContainerRef;
}
/**
 * @record
 */
export function LayoutSwitcherItem() { }
function LayoutSwitcherItem_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    LayoutSwitcherItem.prototype.group;
    /** @type {?|undefined} */
    LayoutSwitcherItem.prototype.minWidth;
    /** @type {?|undefined} */
    LayoutSwitcherItem.prototype.maxWidth;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXN3aXRjaGVyLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbGF5b3V0LXN3aXRjaGVyL2xheW91dC1zd2l0Y2hlci1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBbUIsS0FBSyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtqRyxNQUFNOzs7OztJQU1GLFlBQW9CLFlBQThCLEVBQVUsaUJBQW1DO1FBQTNFLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7S0FBSzs7OztJQUVwRyxTQUFTO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDNUI7Ozs7SUFFRCxTQUFTO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdkI7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3JGOzs7O0lBRUQsVUFBVTtRQUNOLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0tBQzdCOzs7WUEzQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7YUFDckM7Ozs7WUFKMkMsV0FBVztZQUFFLGdCQUFnQjs7O3NCQU9wRSxLQUFLLFNBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbWJlZGRlZFZpZXdSZWYsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eExheW91dFN3aXRjaGVySXRlbV0nXG59KVxuZXhwb3J0IGNsYXNzIExheW91dFN3aXRjaGVySXRlbURpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoJ3V4TGF5b3V0U3dpdGNoZXJJdGVtJykgcHJpdmF0ZSBfY29uZmlnOiBMYXlvdXRTd2l0Y2hlckl0ZW07XG5cbiAgICBwcml2YXRlIF9lbWJlZGRlZFZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxuXG4gICAgZ2V0TGF5b3V0KCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVSZWY7XG4gICAgfVxuXG4gICAgZ2V0Q29uZmlnKCk6IExheW91dFN3aXRjaGVySXRlbSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2VtYmVkZGVkVmlldyA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX3RlbXBsYXRlUmVmKTtcbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlKCk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy5fZW1iZWRkZWRWaWV3KTtcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUoaW5kZXgpO1xuICAgICAgICB0aGlzLl9lbWJlZGRlZFZpZXcgPSBudWxsO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExheW91dFN3aXRjaGVySXRlbSB7XG4gICAgZ3JvdXA/OiBzdHJpbmc7XG4gICAgbWluV2lkdGg/OiBudW1iZXI7XG4gICAgbWF4V2lkdGg/OiBudW1iZXI7XG59Il19