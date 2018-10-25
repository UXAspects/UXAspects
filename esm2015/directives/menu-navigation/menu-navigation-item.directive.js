/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MenuNavigationService } from './menu-navigation.service';
export class MenuNavigationItemDirective {
    /**
     * @param {?} service
     * @param {?} _elementRef
     */
    constructor(service, _elementRef) {
        this._elementRef = _elementRef;
        this.activated = new EventEmitter();
        this._subscription = service.active$.pipe(filter(item => item === this))
            .subscribe(() => this.setActive());
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbWVudS1uYXZpZ2F0aW9uL21lbnUtbmF2aWdhdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLbEUsTUFBTTs7Ozs7SUFNRixZQUFZLE9BQThCLEVBQVUsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7eUJBSnJELElBQUksWUFBWSxFQUFRO1FBSzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO2FBQ25FLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztLQUMxQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7O0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7OztZQXJCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjthQUNyQzs7OztZQUpRLHFCQUFxQjtZQUhWLFVBQVU7Ozt3QkFVekIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tZW51LW5hdmlnYXRpb24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4TWVudU5hdmlnYXRpb25JdGVtXSdcbn0pXG5leHBvcnQgY2xhc3MgTWVudU5hdmlnYXRpb25JdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBPdXRwdXQoKSBhY3RpdmF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2U6IE1lbnVOYXZpZ2F0aW9uU2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBzZXJ2aWNlLmFjdGl2ZSQucGlwZShmaWx0ZXIoaXRlbSA9PiBpdGVtID09PSB0aGlzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRBY3RpdmUoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkLmVtaXQoKTtcbiAgICB9XG59Il19