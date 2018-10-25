/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MenuNavigationService } from './menu-navigation.service';
var MenuNavigationItemDirective = /** @class */ (function () {
    function MenuNavigationItemDirective(service, _elementRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this.activated = new EventEmitter();
        this._subscription = service.active$.pipe(filter(function (item) { return item === _this; }))
            .subscribe(function () { return _this.setActive(); });
    }
    /**
     * @return {?}
     */
    MenuNavigationItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    MenuNavigationItemDirective.prototype.setActive = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
        this.activated.emit();
    };
    MenuNavigationItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxMenuNavigationItem]'
                },] }
    ];
    /** @nocollapse */
    MenuNavigationItemDirective.ctorParameters = function () { return [
        { type: MenuNavigationService },
        { type: ElementRef }
    ]; };
    MenuNavigationItemDirective.propDecorators = {
        activated: [{ type: Output }]
    };
    return MenuNavigationItemDirective;
}());
export { MenuNavigationItemDirective };
function MenuNavigationItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MenuNavigationItemDirective.prototype.activated;
    /** @type {?} */
    MenuNavigationItemDirective.prototype._subscription;
    /** @type {?} */
    MenuNavigationItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbWVudS1uYXZpZ2F0aW9uL21lbnUtbmF2aWdhdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBVzlELHFDQUFZLE9BQThCLEVBQVUsV0FBdUI7UUFBM0UsaUJBR0M7UUFIbUQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7eUJBSnJELElBQUksWUFBWSxFQUFRO1FBSzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLEtBQUksRUFBYixDQUFhLENBQUMsQ0FBQzthQUNuRSxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0tBQzFDOzs7O0lBRUQsaURBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELCtDQUFTOzs7SUFBVDtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7O2dCQXJCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtpQkFDckM7Ozs7Z0JBSlEscUJBQXFCO2dCQUhWLFVBQVU7Ozs0QkFVekIsTUFBTTs7c0NBVlg7O1NBUWEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBNZW51TmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL21lbnUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhNZW51TmF2aWdhdGlvbkl0ZW1dJ1xufSlcbmV4cG9ydCBjbGFzcyBNZW51TmF2aWdhdGlvbkl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQE91dHB1dCgpIGFjdGl2YXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3Ioc2VydmljZTogTWVudU5hdmlnYXRpb25TZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHNlcnZpY2UuYWN0aXZlJC5waXBlKGZpbHRlcihpdGVtID0+IGl0ZW0gPT09IHRoaXMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldEFjdGl2ZSgpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQuZW1pdCgpO1xuICAgIH1cbn0iXX0=