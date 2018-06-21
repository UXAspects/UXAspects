/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HoverActionService } from './hover-action.service';
var HoverActionContainerDirective = (function () {
    function HoverActionContainerDirective(_elementRef, _hoverActionService) {
        var _this = this;
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 0;
        this.active = false;
        // register the container element with the service
        this._hoverActionService.setContainer(this);
        // apply a class based on the active state of the container and it's actions
        this.active$ = this._hoverActionService.active.subscribe(function (active) { return _this.active = active; });
    }
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.active$.unsubscribe();
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.setFocusState(true);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.setFocusState(false);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onHover = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.setHoverState(true);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onLeave = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.setHoverState(false);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.next = /**
     * @return {?}
     */
    function () {
        this._hoverActionService.next();
    };
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
    HoverActionContainerDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: HoverActionService, },
    ]; };
    HoverActionContainerDirective.propDecorators = {
        "tabindex": [{ type: Input },],
        "focus": [{ type: HostListener, args: ['click',] },],
        "onFocus": [{ type: HostListener, args: ['focus',] },],
        "onBlur": [{ type: HostListener, args: ['blur',] },],
        "onHover": [{ type: HostListener, args: ['mouseenter',] },],
        "onLeave": [{ type: HostListener, args: ['mouseleave',] },],
        "next": [{ type: HostListener, args: ['keydown.arrowright',] },],
    };
    return HoverActionContainerDirective;
}());
export { HoverActionContainerDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItYWN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9ob3Zlci1hY3Rpb24vaG92ZXItYWN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBaUJ4RCx1Q0FBb0IsV0FBdUIsRUFBVSxtQkFBdUM7UUFBNUYsaUJBTUM7UUFObUIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO3dCQUxoRSxDQUFDO3NCQUNYLEtBQUs7O1FBTW5CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBRzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0tBQzVGOzs7O0lBRUQsbURBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUVzQiw2Q0FBSzs7OztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7SUFHcEIsK0NBQU87Ozs7UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFHM0IsOENBQU07Ozs7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7SUFHdEIsK0NBQU87Ozs7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFHckIsK0NBQU87Ozs7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7SUFHZCw0Q0FBSTs7OztRQUNwQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7OztnQkFoRHZDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDL0IsSUFBSSxFQUFFO3dCQUNGLHVDQUF1QyxFQUFFLFFBQVE7d0JBQ2pELFlBQVksRUFBRSxVQUFVO3FCQUMzQjtpQkFDSjs7OztnQkFYbUIsVUFBVTtnQkFFckIsa0JBQWtCOzs7NkJBWXRCLEtBQUs7MEJBaUJMLFlBQVksU0FBQyxPQUFPOzRCQUlwQixZQUFZLFNBQUMsT0FBTzsyQkFJcEIsWUFBWSxTQUFDLE1BQU07NEJBSW5CLFlBQVksU0FBQyxZQUFZOzRCQUl6QixZQUFZLFNBQUMsWUFBWTt5QkFJekIsWUFBWSxTQUFDLG9CQUFvQjs7d0NBbkR0Qzs7U0FZYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgSG92ZXJBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9ob3Zlci1hY3Rpb24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4SG92ZXJBY3Rpb25Db250YWluZXJdJyxcbiAgICBwcm92aWRlcnM6IFtIb3ZlckFjdGlvblNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5ob3Zlci1hY3Rpb24tY29udGFpbmVyLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAgICAgJ1t0YWJpbmRleF0nOiAndGFiaW5kZXgnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBIb3ZlckFjdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgYWN0aXZlJDogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfaG92ZXJBY3Rpb25TZXJ2aWNlOiBIb3ZlckFjdGlvblNlcnZpY2UpIHtcbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGNvbnRhaW5lciBlbGVtZW50IHdpdGggdGhlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLnNldENvbnRhaW5lcih0aGlzKTtcblxuICAgICAgICAvLyBhcHBseSBhIGNsYXNzIGJhc2VkIG9uIHRoZSBhY3RpdmUgc3RhdGUgb2YgdGhlIGNvbnRhaW5lciBhbmQgaXQncyBhY3Rpb25zXG4gICAgICAgIHRoaXMuYWN0aXZlJCA9IHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5hY3RpdmUuc3Vic2NyaWJlKGFjdGl2ZSA9PiB0aGlzLmFjdGl2ZSA9IGFjdGl2ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlJC51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJykgb25Gb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLnNldEZvY3VzU3RhdGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignYmx1cicpIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLnNldEZvY3VzU3RhdGUoZmFsc2UpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBvbkhvdmVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ob3ZlckFjdGlvblNlcnZpY2Uuc2V0SG92ZXJTdGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25MZWF2ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faG92ZXJBY3Rpb25TZXJ2aWNlLnNldEhvdmVyU3RhdGUoZmFsc2UpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dyaWdodCcpIG5leHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hvdmVyQWN0aW9uU2VydmljZS5uZXh0KCk7XG4gICAgfVxufSJdfQ==