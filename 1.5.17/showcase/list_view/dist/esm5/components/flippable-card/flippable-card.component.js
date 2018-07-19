/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
var FlippableCardComponent = (function () {
    function FlippableCardComponent() {
        this.direction = 'horizontal';
        this.trigger = 'hover';
        this.width = 280;
        this.height = 200;
        this.flipped = false;
        this.flippedChange = new EventEmitter();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    FlippableCardComponent.prototype.setFlipped = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.flipped = state;
        this.flippedChange.emit(this.flipped);
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.toggleFlipped = /**
     * @return {?}
     */
    function () {
        this.setFlipped(!this.flipped);
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.clickTrigger = /**
     * @return {?}
     */
    function () {
        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.hoverEnter = /**
     * @return {?}
     */
    function () {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.hoverExit = /**
     * @return {?}
     */
    function () {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    // IE uses different naming
    FlippableCardComponent.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    // IE uses different naming
    function (event) {
        if (this.trigger !== 'manual') {
            this.toggleFlipped();
            event.preventDefault();
        }
    };
    FlippableCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-flippable-card',
                    template: "<div class=\"ux-flipper\"\n     [class.ux-flip-card]=\"flipped\"\n     [style.width.px]=\"width\"\n     [style.height.px]=\"height\">\n\n    <div class=\"ux-flippable-card-front\"\n         [style.width.px]=\"width\"\n         [style.height.px]=\"height\"\n         [attr.aria-hidden]=\"flipped\">\n\n        <ng-content select=\"ux-flippable-card-front\"></ng-content>\n    </div>\n\n    <div class=\"ux-flippable-card-back\"\n         [style.width.px]=\"width\"\n         [style.height.px]=\"height\"\n         [attr.aria-hidden]=\"!flipped\">\n\n        <ng-content select=\"ux-flippable-card-back\"></ng-content>\n    </div>\n</div>",
                    host: {
                        'tabindex': '0',
                        '[class.horizontal]': 'direction === "horizontal"',
                        '[class.vertical]': 'direction === "vertical"'
                    },
                    exportAs: 'ux-flippable-card'
                },] },
    ];
    /** @nocollapse */
    FlippableCardComponent.ctorParameters = function () { return []; };
    FlippableCardComponent.propDecorators = {
        "direction": [{ type: Input },],
        "trigger": [{ type: Input },],
        "width": [{ type: Input },],
        "height": [{ type: Input },],
        "flipped": [{ type: Input },],
        "flippedChange": [{ type: Output },],
        "clickTrigger": [{ type: HostListener, args: ['click',] },],
        "hoverEnter": [{ type: HostListener, args: ['mouseenter',] },],
        "hoverExit": [{ type: HostListener, args: ['mouseleave',] },],
        "onKeyDown": [{ type: HostListener, args: ['keydown.enter', ['$event'],] }, { type: HostListener, args: ['keydown.space', ['$event'],] }, { type: HostListener, args: ['keydown.spacebar', ['$event'],] },],
    };
    return FlippableCardComponent;
}());
export { FlippableCardComponent };
function FlippableCardComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FlippableCardComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FlippableCardComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FlippableCardComponent.propDecorators;
    /** @type {?} */
    FlippableCardComponent.prototype.direction;
    /** @type {?} */
    FlippableCardComponent.prototype.trigger;
    /** @type {?} */
    FlippableCardComponent.prototype.width;
    /** @type {?} */
    FlippableCardComponent.prototype.height;
    /** @type {?} */
    FlippableCardComponent.prototype.flipped;
    /** @type {?} */
    FlippableCardComponent.prototype.flippedChange;
}
var FlippableCardFrontDirective = (function () {
    function FlippableCardFrontDirective() {
    }
    FlippableCardFrontDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-flippable-card-front'
                },] },
    ];
    /** @nocollapse */
    FlippableCardFrontDirective.ctorParameters = function () { return []; };
    return FlippableCardFrontDirective;
}());
export { FlippableCardFrontDirective };
function FlippableCardFrontDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FlippableCardFrontDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FlippableCardFrontDirective.ctorParameters;
}
var FlippableCardBackDirective = (function () {
    function FlippableCardBackDirective() {
    }
    FlippableCardBackDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-flippable-card-back'
                },] },
    ];
    /** @nocollapse */
    FlippableCardBackDirective.ctorParameters = function () { return []; };
    return FlippableCardBackDirective;
}());
export { FlippableCardBackDirective };
function FlippableCardBackDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FlippableCardBackDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FlippableCardBackDirective.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxpcHBhYmxlLWNhcmQvZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozt5QkFrQzVDLFlBQVk7dUJBQ1gsT0FBTztxQkFDL0IsR0FBRztzQkFDRixHQUFHO3VCQUNELEtBQUs7NkJBQ2dCLElBQUksWUFBWSxFQUFXOzs7Ozs7SUFFNUUsMkNBQVU7Ozs7SUFBVixVQUFXLEtBQWM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsOENBQWE7OztJQUFiO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQzs7OztJQUdELDZDQUFZOzs7OztRQUdSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7Ozs7O0lBSUwsMkNBQVU7Ozs7O1FBRU4sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7Ozs7O0lBSUwsMENBQVM7Ozs7UUFDTCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjs7Ozs7OztJQU1MLDBDQUFTOzs7OztjQUFDLEtBQW9CO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCOzs7Z0JBL0VSLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsOG5CQW9CUDtvQkFDSCxJQUFJLEVBQUU7d0JBQ0YsVUFBVSxFQUFFLEdBQUc7d0JBQ2Ysb0JBQW9CLEVBQUUsNEJBQTRCO3dCQUNsRCxrQkFBa0IsRUFBRSwwQkFBMEI7cUJBQ2pEO29CQUNELFFBQVEsRUFBRSxtQkFBbUI7aUJBQ2hDOzs7Ozs4QkFHSSxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7a0NBQ0wsTUFBTTtpQ0FXTixZQUFZLFNBQUMsT0FBTzsrQkFTcEIsWUFBWSxTQUFDLFlBQVk7OEJBUXpCLFlBQVksU0FBQyxZQUFZOzhCQU96QixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQ3hDLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FDeEMsWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDOztpQ0E1RWhEOztTQWdDYSxzQkFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBcURsQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtpQkFDdEM7Ozs7c0NBdkZEOztTQXdGYSwyQkFBMkI7Ozs7Ozs7Ozs7Ozs7O2dCQUV2QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtpQkFDckM7Ozs7cUNBNUZEOztTQTZGYSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidXgtZmxpcHBlclwiXG4gICAgIFtjbGFzcy51eC1mbGlwLWNhcmRdPVwiZmxpcHBlZFwiXG4gICAgIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiXG4gICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaGVpZ2h0XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtZmxpcHBhYmxlLWNhcmQtZnJvbnRcIlxuICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCJcbiAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaGVpZ2h0XCJcbiAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cImZsaXBwZWRcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJ1eC1mbGlwcGFibGUtY2FyZC1mcm9udFwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1mbGlwcGFibGUtY2FyZC1iYWNrXCJcbiAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiXG4gICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiXG4gICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhZmxpcHBlZFwiPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInV4LWZsaXBwYWJsZS1jYXJkLWJhY2tcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ3RhYmluZGV4JzogJzAnLFxuICAgICAgICAnW2NsYXNzLmhvcml6b250YWxdJzogJ2RpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxuICAgICAgICAnW2NsYXNzLnZlcnRpY2FsXSc6ICdkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIidcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAndXgtZmxpcHBhYmxlLWNhcmQnXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICAgIEBJbnB1dCgpIHRyaWdnZXI6ICdjbGljaycgfCAnaG92ZXInIHwgJ21hbnVhbCcgPSAnaG92ZXInO1xuICAgIEBJbnB1dCgpIHdpZHRoOiBudW1iZXIgPSAyODA7XG4gICAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXIgPSAyMDA7XG4gICAgQElucHV0KCkgZmxpcHBlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBmbGlwcGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBzZXRGbGlwcGVkKHN0YXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmxpcHBlZCA9IHN0YXRlO1xuICAgICAgICB0aGlzLmZsaXBwZWRDaGFuZ2UuZW1pdCh0aGlzLmZsaXBwZWQpO1xuICAgIH1cblxuICAgIHRvZ2dsZUZsaXBwZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0RmxpcHBlZCghdGhpcy5mbGlwcGVkKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgY2xpY2tUcmlnZ2VyKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGFkZCBvciByZW1vdmUgdGhlIGNsYXNzIGRlcGVuZGluZyBvbiB3aGV0aGVyIG9yIG5vdCB0aGUgY2FyZCBoYXMgYmVlbiBmbGlwcGVkXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRmxpcHBlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gICAgaG92ZXJFbnRlcigpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgdGhlIHRyaWdnZXIgaXMgaG92ZXIgdGhlbiBiZWdpbiB0byBmbGlwXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmxpcHBlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICAgIGhvdmVyRXhpdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgdGhpcy5zZXRGbGlwcGVkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2UnLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2ViYXInLCBbJyRldmVudCddKSAvLyBJRSB1c2VzIGRpZmZlcmVudCBuYW1pbmdcbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciAhPT0gJ21hbnVhbCcpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRmxpcHBlZCgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZC1mcm9udCdcbn0pXG5leHBvcnQgY2xhc3MgRmxpcHBhYmxlQ2FyZEZyb250RGlyZWN0aXZlIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3V4LWZsaXBwYWJsZS1jYXJkLWJhY2snXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRCYWNrRGlyZWN0aXZlIHsgfSJdfQ==