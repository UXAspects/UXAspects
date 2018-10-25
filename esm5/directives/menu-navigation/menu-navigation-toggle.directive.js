/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
var MenuNavigationToggleDirective = /** @class */ (function () {
    function MenuNavigationToggleDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.menuPosition = 'bottom';
        this.menuOpenChange = new EventEmitter();
        this.keyEnter = new EventEmitter();
    }
    Object.defineProperty(MenuNavigationToggleDirective.prototype, "menuOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._menuOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._menuOpen = value;
            this.menuOpenChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.isKeyMatch(event.which)) {
            // Open the menu
            this.menuOpen = true;
            // Allow the menu to init, then send the event to give it focus
            setTimeout(function () { return _this.keyEnter.emit(); });
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    MenuNavigationToggleDirective.prototype.isKeyMatch = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        switch (key) {
            case ENTER:
            case SPACE:
                return true;
            case UP_ARROW:
                return this.menuPosition === 'top';
            case DOWN_ARROW:
                return this.menuPosition === 'bottom';
            case LEFT_ARROW:
                return this.menuPosition === 'left';
            case RIGHT_ARROW:
                return this.menuPosition === 'right';
        }
        return false;
    };
    MenuNavigationToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxMenuNavigationToggle]',
                    exportAs: 'uxMenuNavigationToggle'
                },] }
    ];
    /** @nocollapse */
    MenuNavigationToggleDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MenuNavigationToggleDirective.propDecorators = {
        menuOpen: [{ type: Input }],
        menuPosition: [{ type: Input }],
        menuOpenChange: [{ type: Output }],
        keyEnter: [{ type: Output }],
        keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return MenuNavigationToggleDirective;
}());
export { MenuNavigationToggleDirective };
function MenuNavigationToggleDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MenuNavigationToggleDirective.prototype.menuPosition;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype.menuOpenChange;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype.keyEnter;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype._menuOpen;
    /** @type {?} */
    MenuNavigationToggleDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vbWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BHLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUE2QjdGLHVDQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs0QkFWUyxRQUFROzhCQUczQyxJQUFJLFlBQVksRUFBVzt3QkFHakMsSUFBSSxZQUFZLEVBQVE7S0FJYTtJQXJCaEQsc0JBQ0ksbURBQVE7Ozs7UUFEWjtZQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCOzs7OztRQUVELFVBQWEsS0FBYztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQzs7O09BTEE7Ozs7SUFvQkQsNkNBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDMUM7Ozs7O0lBR0Qsc0RBQWM7Ozs7SUFEZCxVQUNlLEtBQW9CO1FBRG5DLGlCQWNDO1FBWEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUcvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs7WUFHckIsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUM7WUFFdkMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtLQUNKOzs7OztJQUVPLGtEQUFVOzs7O2NBQUMsR0FBVztRQUMxQixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztZQUVoQixLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDO1lBRXZDLEtBQUssVUFBVTtnQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLENBQUM7WUFFMUMsS0FBSyxVQUFVO2dCQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sQ0FBQztZQUV4QyxLQUFLLFdBQVc7Z0JBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQzs7O2dCQXBFcEIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ3JDOzs7O2dCQUxtQixVQUFVOzs7MkJBUXpCLEtBQUs7K0JBVUwsS0FBSztpQ0FHTCxNQUFNOzJCQUdOLE1BQU07aUNBV04sWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7d0NBcEN2Qzs7U0FPYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4TWVudU5hdmlnYXRpb25Ub2dnbGVdJyxcbiAgICBleHBvcnRBczogJ3V4TWVudU5hdmlnYXRpb25Ub2dnbGUnXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1lbnVPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVudU9wZW47XG4gICAgfVxuXG4gICAgc2V0IG1lbnVPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX21lbnVPcGVuID0gdmFsdWU7XG4gICAgICAgIHRoaXMubWVudU9wZW5DaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBtZW51UG9zaXRpb246ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnID0gJ2JvdHRvbSc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBtZW51T3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIGtleUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBfbWVudU9wZW46IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBrZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLmlzS2V5TWF0Y2goZXZlbnQud2hpY2gpKSB7XG5cbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIG1lbnVcbiAgICAgICAgICAgIHRoaXMubWVudU9wZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBBbGxvdyB0aGUgbWVudSB0byBpbml0LCB0aGVuIHNlbmQgdGhlIGV2ZW50IHRvIGdpdmUgaXQgZm9jdXNcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5rZXlFbnRlci5lbWl0KCkpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5TWF0Y2goa2V5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnVQb3NpdGlvbiA9PT0gJ3RvcCc7XG5cbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51UG9zaXRpb24gPT09ICdib3R0b20nO1xuXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudVBvc2l0aW9uID09PSAnbGVmdCc7XG5cbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudVBvc2l0aW9uID09PSAncmlnaHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iXX0=