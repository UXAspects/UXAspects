/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HoverActionService } from './hover-action.service';
export class HoverActionDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _hoverActionService
     */
    constructor(_elementRef, _hoverActionService) {
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 1;
        this.active = false;
        this.focused = false;
        // register the action
        this._hoverActionService.register(this);
        // watch for changes to the activeness of the container
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._hoverActionService.unregister(this);
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
        this.focused = true;
        this._hoverActionService.updateVisibility();
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.focused = false;
        this._hoverActionService.updateVisibility();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    previous(event) {
        event.stopPropagation();
        this._hoverActionService.previous();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    next(event) {
        event.stopPropagation();
        this._hoverActionService.next();
    }
}
HoverActionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxHoverAction]',
                host: {
                    '[class.hover-action-active]': 'active',
                    '[class.hover-action-focused]': 'focused',
                    '[tabindex]': 'tabindex'
                }
            },] }
];
/** @nocollapse */
HoverActionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: HoverActionService }
];
HoverActionDirective.propDecorators = {
    tabindex: [{ type: Input }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    previous: [{ type: HostListener, args: ['keydown.arrowleft', ['$event'],] }],
    next: [{ type: HostListener, args: ['keydown.arrowright', ['$event'],] }]
};
function HoverActionDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    HoverActionDirective.prototype.tabindex;
    /** @type {?} */
    HoverActionDirective.prototype.active;
    /** @type {?} */
    HoverActionDirective.prototype.focused;
    /** @type {?} */
    HoverActionDirective.prototype.active$;
    /** @type {?} */
    HoverActionDirective.prototype._elementRef;
    /** @type {?} */
    HoverActionDirective.prototype._hoverActionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItYWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2hvdmVyLWFjdGlvbi9ob3Zlci1hY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBVzVELE1BQU07Ozs7O0lBUUYsWUFBb0IsV0FBdUIsRUFBVSxtQkFBdUM7UUFBeEUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO3dCQU5oRSxDQUFDO3NCQUNYLEtBQUs7dUJBQ0osS0FBSzs7UUFPcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7S0FDNUY7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzlCOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzFDOzs7O0lBRXNCLE9BQU87UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDL0M7Ozs7SUFFcUIsTUFBTTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMvQzs7Ozs7SUFFOEMsUUFBUSxDQUFDLEtBQWlCO1FBQ3JFLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDdkM7Ozs7O0lBRStDLElBQUksQ0FBQyxLQUFpQjtRQUNsRSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO0tBQ25DOzs7WUFwREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTtvQkFDRiw2QkFBNkIsRUFBRSxRQUFRO29CQUN2Qyw4QkFBOEIsRUFBRSxTQUFTO29CQUN6QyxZQUFZLEVBQUUsVUFBVTtpQkFDM0I7YUFDSjs7OztZQVhtQixVQUFVO1lBQ3JCLGtCQUFrQjs7O3VCQWF0QixLQUFLO3NCQXdCTCxZQUFZLFNBQUMsT0FBTztxQkFLcEIsWUFBWSxTQUFDLE1BQU07dUJBS25CLFlBQVksU0FBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzttQkFLNUMsWUFBWSxTQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvdmVyQWN0aW9uU2VydmljZSB9IGZyb20gJy4vaG92ZXItYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eEhvdmVyQWN0aW9uXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLmhvdmVyLWFjdGlvbi1hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgICAgICdbY2xhc3MuaG92ZXItYWN0aW9uLWZvY3VzZWRdJzogJ2ZvY3VzZWQnLFxuICAgICAgICAnW3RhYmluZGV4XSc6ICd0YWJpbmRleCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEhvdmVyQWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAxO1xuICAgIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgYWN0aXZlJDogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfaG92ZXJBY3Rpb25TZXJ2aWNlOiBIb3ZlckFjdGlvblNlcnZpY2UpIHtcblxuICAgICAgICAvLyByZWdpc3RlciB0aGUgYWN0aW9uXG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5yZWdpc3Rlcih0aGlzKTtcblxuICAgICAgICAvLyB3YXRjaCBmb3IgY2hhbmdlcyB0byB0aGUgYWN0aXZlbmVzcyBvZiB0aGUgY29udGFpbmVyXG4gICAgICAgIHRoaXMuYWN0aXZlJCA9IHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5hY3RpdmUuc3Vic2NyaWJlKGFjdGl2ZSA9PiB0aGlzLmFjdGl2ZSA9IGFjdGl2ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS51bnJlZ2lzdGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmFjdGl2ZSQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKSBvbkZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2UudXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInKSBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2UudXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dsZWZ0JywgWyckZXZlbnQnXSkgcHJldmlvdXMoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICAgICBcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLnByZXZpb3VzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd3JpZ2h0JywgWyckZXZlbnQnXSkgbmV4dChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLm5leHQoKTtcbiAgICB9XG59Il19