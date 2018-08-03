/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HoverActionService } from './hover-action.service';
export class HoverActionContainerDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _hoverActionService
     */
    constructor(_elementRef, _hoverActionService) {
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 0;
        this.active = false;
        // register the container element with the service
        this._hoverActionService.setContainer(this);
        // apply a class based on the active state of the container and it's actions
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.active$.unsubscribe();
    }
    /**
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this._hoverActionService.setFocusState(true);
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._hoverActionService.setFocusState(false);
    }
    /**
     * @return {?}
     */
    onHover() {
        this._hoverActionService.setHoverState(true);
    }
    /**
     * @return {?}
     */
    onLeave() {
        this._hoverActionService.setHoverState(false);
    }
    /**
     * @return {?}
     */
    next() {
        this._hoverActionService.next();
    }
}
HoverActionContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxHoverActionContainer]',
                providers: [HoverActionService],
                host: {
                    '[class.hover-action-container-active]': 'active',
                    '[tabindex]': 'tabindex'
                }
            },] }
];
/** @nocollapse */
HoverActionContainerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: HoverActionService }
];
HoverActionContainerDirective.propDecorators = {
    tabindex: [{ type: Input }],
    focus: [{ type: HostListener, args: ['click',] }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    onHover: [{ type: HostListener, args: ['mouseenter',] }],
    onLeave: [{ type: HostListener, args: ['mouseleave',] }],
    next: [{ type: HostListener, args: ['keydown.arrowright',] }]
};
function HoverActionContainerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    HoverActionContainerDirective.prototype.tabindex;
    /** @type {?} */
    HoverActionContainerDirective.prototype.active;
    /** @type {?} */
    HoverActionContainerDirective.prototype.active$;
    /** @type {?} */
    HoverActionContainerDirective.prototype._elementRef;
    /** @type {?} */
    HoverActionContainerDirective.prototype._hoverActionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItYWN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9ob3Zlci1hY3Rpb24vaG92ZXItYWN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFVNUQsTUFBTTs7Ozs7SUFPRixZQUFvQixXQUF1QixFQUFVLG1CQUF1QztRQUF4RSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBb0I7d0JBTGhFLENBQUM7c0JBQ1gsS0FBSzs7UUFNbkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7S0FDNUY7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUVzQixLQUFLO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzFDOzs7O0lBRXNCLE9BQU87UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoRDs7OztJQUVxQixNQUFNO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakQ7Ozs7SUFFMkIsT0FBTztRQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRTJCLE9BQU87UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqRDs7OztJQUVtQyxJQUFJO1FBQ3BDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQzs7O1lBakRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDL0IsSUFBSSxFQUFFO29CQUNGLHVDQUF1QyxFQUFFLFFBQVE7b0JBQ2pELFlBQVksRUFBRSxVQUFVO2lCQUMzQjthQUNKOzs7O1lBWG1CLFVBQVU7WUFFckIsa0JBQWtCOzs7dUJBWXRCLEtBQUs7b0JBaUJMLFlBQVksU0FBQyxPQUFPO3NCQUlwQixZQUFZLFNBQUMsT0FBTztxQkFJcEIsWUFBWSxTQUFDLE1BQU07c0JBSW5CLFlBQVksU0FBQyxZQUFZO3NCQUl6QixZQUFZLFNBQUMsWUFBWTttQkFJekIsWUFBWSxTQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBIb3ZlckFjdGlvblNlcnZpY2UgfSBmcm9tICcuL2hvdmVyLWFjdGlvbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhIb3ZlckFjdGlvbkNvbnRhaW5lcl0nLFxuICAgIHByb3ZpZGVyczogW0hvdmVyQWN0aW9uU2VydmljZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLmhvdmVyLWFjdGlvbi1jb250YWluZXItYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICAgICAnW3RhYmluZGV4XSc6ICd0YWJpbmRleCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEhvdmVyQWN0aW9uQ29udGFpbmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuICAgIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBhY3RpdmUkOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9ob3ZlckFjdGlvblNlcnZpY2U6IEhvdmVyQWN0aW9uU2VydmljZSkge1xuICAgICAgICAvLyByZWdpc3RlciB0aGUgY29udGFpbmVyIGVsZW1lbnQgd2l0aCB0aGUgc2VydmljZVxuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2Uuc2V0Q29udGFpbmVyKHRoaXMpO1xuXG4gICAgICAgIC8vIGFwcGx5IGEgY2xhc3MgYmFzZWQgb24gdGhlIGFjdGl2ZSBzdGF0ZSBvZiB0aGUgY29udGFpbmVyIGFuZCBpdCdzIGFjdGlvbnNcbiAgICAgICAgdGhpcy5hY3RpdmUkID0gdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLmFjdGl2ZS5zdWJzY3JpYmUoYWN0aXZlID0+IHRoaXMuYWN0aXZlID0gYWN0aXZlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmUkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKSBvbkZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2Uuc2V0Rm9jdXNTdGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdibHVyJykgb25CbHVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2Uuc2V0Rm9jdXNTdGF0ZShmYWxzZSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIG9uSG92ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5zZXRIb3ZlclN0YXRlKHRydWUpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBvbkxlYXZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2Uuc2V0SG92ZXJTdGF0ZShmYWxzZSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd3JpZ2h0JykgbmV4dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLm5leHQoKTtcbiAgICB9XG59Il19