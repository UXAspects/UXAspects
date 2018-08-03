/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { MenuNavigationService } from './menu-navigation.service';
var MenuNavigationItemDirective = /** @class */ (function () {
    function MenuNavigationItemDirective(service, _elementRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this.activated = new EventEmitter();
        this._subscription = service.active$.subscribe(function (next) {
            if (next === _this) {
                _this.setActive();
            }
        });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbWVudS1uYXZpZ2F0aW9uL21lbnUtbmF2aWdhdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFXOUQscUNBQVksT0FBOEIsRUFBVSxXQUF1QjtRQUEzRSxpQkFNQztRQU5tRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTt5QkFKckQsSUFBSSxZQUFZLEVBQUU7UUFLcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtTQUNKLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsaURBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELCtDQUFTOzs7SUFBVDtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7O2dCQXhCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtpQkFDckM7Ozs7Z0JBSlEscUJBQXFCO2dCQUZWLFVBQVU7Ozs0QkFTekIsTUFBTTs7c0NBVFg7O1NBT2EsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBNZW51TmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL21lbnUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhNZW51TmF2aWdhdGlvbkl0ZW1dJ1xufSlcbmV4cG9ydCBjbGFzcyBNZW51TmF2aWdhdGlvbkl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQE91dHB1dCgpIGFjdGl2YXRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3Ioc2VydmljZTogTWVudU5hdmlnYXRpb25TZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHNlcnZpY2UuYWN0aXZlJC5zdWJzY3JpYmUoKG5leHQpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXh0ID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkLmVtaXQoKTtcbiAgICB9XG59Il19