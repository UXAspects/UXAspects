/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { MenuNavigationService } from './menu-navigation.service';
export class MenuNavigationItemDirective {
    /**
     * @param {?} service
     * @param {?} _elementRef
     */
    constructor(service, _elementRef) {
        this._elementRef = _elementRef;
        this.activated = new EventEmitter();
        this._subscription = service.active$.subscribe((next) => {
            if (next === this) {
                this.setActive();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    setActive() {
        this._elementRef.nativeElement.focus();
        this.activated.emit();
    }
}
MenuNavigationItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxMenuNavigationItem]'
            },] }
];
/** @nocollapse */
MenuNavigationItemDirective.ctorParameters = () => [
    { type: MenuNavigationService },
    { type: ElementRef }
];
MenuNavigationItemDirective.propDecorators = {
    activated: [{ type: Output }]
};
function MenuNavigationItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MenuNavigationItemDirective.prototype.activated;
    /** @type {?} */
    MenuNavigationItemDirective.prototype._subscription;
    /** @type {?} */
    MenuNavigationItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbWVudS1uYXZpZ2F0aW9uL21lbnUtbmF2aWdhdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUtsRSxNQUFNOzs7OztJQU1GLFlBQVksT0FBOEIsRUFBVSxXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTt5QkFKckQsSUFBSSxZQUFZLEVBQUU7UUFLcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEI7U0FDSixDQUFDLENBQUM7S0FDTjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7O0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7OztZQXhCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjthQUNyQzs7OztZQUpRLHFCQUFxQjtZQUZWLFVBQVU7Ozt3QkFTekIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tZW51LW5hdmlnYXRpb24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4TWVudU5hdmlnYXRpb25JdGVtXSdcbn0pXG5leHBvcnQgY2xhc3MgTWVudU5hdmlnYXRpb25JdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBPdXRwdXQoKSBhY3RpdmF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2U6IE1lbnVOYXZpZ2F0aW9uU2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBzZXJ2aWNlLmFjdGl2ZSQuc3Vic2NyaWJlKChuZXh0KSA9PiB7XG4gICAgICAgICAgICBpZiAobmV4dCA9PT0gdGhpcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZC5lbWl0KCk7XG4gICAgfVxufSJdfQ==