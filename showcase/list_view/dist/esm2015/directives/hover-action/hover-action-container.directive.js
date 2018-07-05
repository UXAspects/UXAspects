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
            },] },
];
/** @nocollapse */
HoverActionContainerDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: HoverActionService, },
];
HoverActionContainerDirective.propDecorators = {
    "tabindex": [{ type: Input },],
    "focus": [{ type: HostListener, args: ['click',] },],
    "onFocus": [{ type: HostListener, args: ['focus',] },],
    "onBlur": [{ type: HostListener, args: ['blur',] },],
    "onHover": [{ type: HostListener, args: ['mouseenter',] },],
    "onLeave": [{ type: HostListener, args: ['mouseleave',] },],
    "next": [{ type: HostListener, args: ['keydown.arrowright',] },],
};
function HoverActionContainerDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HoverActionContainerDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HoverActionContainerDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    HoverActionContainerDirective.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItYWN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9ob3Zlci1hY3Rpb24vaG92ZXItYWN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFVNUQsTUFBTTs7Ozs7SUFPRixZQUFvQixXQUF1QixFQUFVLG1CQUF1QztRQUF4RSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBb0I7d0JBTGhFLENBQUM7c0JBQ1gsS0FBSzs7UUFNbkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztLQUM1Rjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzlCOzs7O0lBRXNCLEtBQUs7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7O0lBR3BCLE9BQU87UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFHM0IsTUFBTTtRQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUd0QixPQUFPO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7O0lBR3JCLE9BQU87UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7SUFHZCxJQUFJO1FBQ3BDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7OztZQWhEdkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUMvQixJQUFJLEVBQUU7b0JBQ0YsdUNBQXVDLEVBQUUsUUFBUTtvQkFDakQsWUFBWSxFQUFFLFVBQVU7aUJBQzNCO2FBQ0o7Ozs7WUFYbUIsVUFBVTtZQUVyQixrQkFBa0I7Ozt5QkFZdEIsS0FBSztzQkFpQkwsWUFBWSxTQUFDLE9BQU87d0JBSXBCLFlBQVksU0FBQyxPQUFPO3VCQUlwQixZQUFZLFNBQUMsTUFBTTt3QkFJbkIsWUFBWSxTQUFDLFlBQVk7d0JBSXpCLFlBQVksU0FBQyxZQUFZO3FCQUl6QixZQUFZLFNBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEhvdmVyQWN0aW9uU2VydmljZSB9IGZyb20gJy4vaG92ZXItYWN0aW9uLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eEhvdmVyQWN0aW9uQ29udGFpbmVyXScsXG4gICAgcHJvdmlkZXJzOiBbSG92ZXJBY3Rpb25TZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuaG92ZXItYWN0aW9uLWNvbnRhaW5lci1hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgICAgICdbdGFiaW5kZXhdJzogJ3RhYmluZGV4J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSG92ZXJBY3Rpb25Db250YWluZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gICAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGFjdGl2ZSQ6IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2hvdmVyQWN0aW9uU2VydmljZTogSG92ZXJBY3Rpb25TZXJ2aWNlKSB7XG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBjb250YWluZXIgZWxlbWVudCB3aXRoIHRoZSBzZXJ2aWNlXG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5zZXRDb250YWluZXIodGhpcyk7XG5cbiAgICAgICAgLy8gYXBwbHkgYSBjbGFzcyBiYXNlZCBvbiB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoZSBjb250YWluZXIgYW5kIGl0J3MgYWN0aW9uc1xuICAgICAgICB0aGlzLmFjdGl2ZSQgPSB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2UuYWN0aXZlLnN1YnNjcmliZShhY3RpdmUgPT4gdGhpcy5hY3RpdmUgPSBhY3RpdmUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZSQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5zZXRGb2N1c1N0YXRlKHRydWUpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInKSBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5zZXRGb2N1c1N0YXRlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgb25Ib3ZlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLnNldEhvdmVyU3RhdGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9uTGVhdmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5zZXRIb3ZlclN0YXRlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93cmlnaHQnKSBuZXh0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2UubmV4dCgpO1xuICAgIH1cbn0iXX0=