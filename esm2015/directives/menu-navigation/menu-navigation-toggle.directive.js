/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
export class MenuNavigationToggleDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.menuPosition = 'bottom';
        this.menuOpenChange = new EventEmitter();
        this.keyEnter = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get menuOpen() {
        return this._menuOpen;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set menuOpen(value) {
        this._menuOpen = value;
        this.menuOpenChange.emit(value);
    }
    /**
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydownHandler(event) {
        if (this.isKeyMatch(event.which)) {
            // Open the menu
            this.menuOpen = true;
            // Allow the menu to init, then send the event to give it focus
            setTimeout(() => this.keyEnter.emit());
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    isKeyMatch(key) {
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
    }
}
MenuNavigationToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxMenuNavigationToggle]',
                exportAs: 'uxMenuNavigationToggle'
            },] }
];
/** @nocollapse */
MenuNavigationToggleDirective.ctorParameters = () => [
    { type: ElementRef }
];
MenuNavigationToggleDirective.propDecorators = {
    menuOpen: [{ type: Input }],
    menuPosition: [{ type: Input }],
    menuOpenChange: [{ type: Output }],
    keyEnter: [{ type: Output }],
    keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vbWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BHLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU1qRyxNQUFNOzs7O0lBdUJGLFlBQW9CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZOzRCQVZTLFFBQVE7OEJBRzNDLElBQUksWUFBWSxFQUFXO3dCQUdqQyxJQUFJLFlBQVksRUFBUTtLQUlhOzs7O0lBckJoRCxJQUNJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DOzs7O0lBZUQsS0FBSztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzFDOzs7OztJQUdELGNBQWMsQ0FBQyxLQUFvQjtRQUUvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOztZQUdyQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRXZDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7S0FDSjs7Ozs7SUFFTyxVQUFVLENBQUMsR0FBVztRQUMxQixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztZQUVoQixLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDO1lBRXZDLEtBQUssVUFBVTtnQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLENBQUM7WUFFMUMsS0FBSyxVQUFVO2dCQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sQ0FBQztZQUV4QyxLQUFLLFdBQVc7Z0JBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQzs7OztZQXBFcEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRSx3QkFBd0I7YUFDckM7Ozs7WUFMbUIsVUFBVTs7O3VCQVF6QixLQUFLOzJCQVVMLEtBQUs7NkJBR0wsTUFBTTt1QkFHTixNQUFNOzZCQVdOLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4TWVudU5hdmlnYXRpb25Ub2dnbGVdJyxcbiAgICBleHBvcnRBczogJ3V4TWVudU5hdmlnYXRpb25Ub2dnbGUnXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1lbnVPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVudU9wZW47XG4gICAgfVxuXG4gICAgc2V0IG1lbnVPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX21lbnVPcGVuID0gdmFsdWU7XG4gICAgICAgIHRoaXMubWVudU9wZW5DaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBtZW51UG9zaXRpb246ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnID0gJ2JvdHRvbSc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBtZW51T3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIGtleUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBfbWVudU9wZW46IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBrZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLmlzS2V5TWF0Y2goZXZlbnQud2hpY2gpKSB7XG5cbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIG1lbnVcbiAgICAgICAgICAgIHRoaXMubWVudU9wZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBBbGxvdyB0aGUgbWVudSB0byBpbml0LCB0aGVuIHNlbmQgdGhlIGV2ZW50IHRvIGdpdmUgaXQgZm9jdXNcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5rZXlFbnRlci5lbWl0KCkpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzS2V5TWF0Y2goa2V5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnVQb3NpdGlvbiA9PT0gJ3RvcCc7XG5cbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51UG9zaXRpb24gPT09ICdib3R0b20nO1xuXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudVBvc2l0aW9uID09PSAnbGVmdCc7XG5cbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudVBvc2l0aW9uID09PSAncmlnaHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iXX0=