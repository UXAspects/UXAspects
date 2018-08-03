/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
var FlippableCardComponent = /** @class */ (function () {
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
    FlippableCardComponent.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
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
                }] }
    ];
    FlippableCardComponent.propDecorators = {
        direction: [{ type: Input }],
        trigger: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        flipped: [{ type: Input }],
        flippedChange: [{ type: Output }],
        clickTrigger: [{ type: HostListener, args: ['click',] }],
        hoverEnter: [{ type: HostListener, args: ['mouseenter',] }],
        hoverExit: [{ type: HostListener, args: ['mouseleave',] }],
        onKeyDown: [{ type: HostListener, args: ['keydown.enter', ['$event'],] }, { type: HostListener, args: ['keydown.space', ['$event'],] }, { type: HostListener, args: ['keydown.spacebar', ['$event'],] }]
    };
    return FlippableCardComponent;
}());
export { FlippableCardComponent };
function FlippableCardComponent_tsickle_Closure_declarations() {
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
var FlippableCardFrontDirective = /** @class */ (function () {
    function FlippableCardFrontDirective() {
    }
    FlippableCardFrontDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-flippable-card-front'
                },] }
    ];
    return FlippableCardFrontDirective;
}());
export { FlippableCardFrontDirective };
var FlippableCardBackDirective = /** @class */ (function () {
    function FlippableCardBackDirective() {
    }
    FlippableCardBackDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ux-flippable-card-back'
                },] }
    ];
    return FlippableCardBackDirective;
}());
export { FlippableCardBackDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxpcHBhYmxlLWNhcmQvZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozt5QkFjNUMsWUFBWTt1QkFDWCxPQUFPO3FCQUMvQixHQUFHO3NCQUNGLEdBQUc7dUJBQ0QsS0FBSzs2QkFDZ0IsSUFBSSxZQUFZLEVBQVc7Ozs7OztJQUU1RSwyQ0FBVTs7OztJQUFWLFVBQVcsS0FBYztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7Ozs7SUFFRCw4Q0FBYTs7O0lBQWI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDOzs7O0lBR0QsNkNBQVk7OztJQURaOztRQUlJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7S0FDSjs7OztJQUdELDJDQUFVOzs7SUFEVjs7UUFHSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtLQUNKOzs7O0lBR0QsMENBQVM7OztJQURUO1FBRUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7S0FDSjs7Ozs7SUFLRCwwQ0FBUzs7OztJQUhULFVBR1UsS0FBb0I7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7S0FDSjs7Z0JBNURKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3Qix3b0JBQThDO29CQUM5QyxJQUFJLEVBQUU7d0JBQ0YsVUFBVSxFQUFFLEdBQUc7d0JBQ2Ysb0JBQW9CLEVBQUUsNEJBQTRCO3dCQUNsRCxrQkFBa0IsRUFBRSwwQkFBMEI7cUJBQ2pEO29CQUNELFFBQVEsRUFBRSxtQkFBbUI7aUJBQ2hDOzs7NEJBR0ksS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO2dDQUNMLE1BQU07K0JBV04sWUFBWSxTQUFDLE9BQU87NkJBU3BCLFlBQVksU0FBQyxZQUFZOzRCQVF6QixZQUFZLFNBQUMsWUFBWTs0QkFPekIsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUN4QyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQ3hDLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7aUNBeERoRDs7U0FZYSxzQkFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBcURsQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtpQkFDdEM7O3NDQW5FRDs7U0FvRWEsMkJBQTJCOzs7OztnQkFFdkMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx3QkFBd0I7aUJBQ3JDOztxQ0F4RUQ7O1NBeUVhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZsaXBwYWJsZS1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ3RhYmluZGV4JzogJzAnLFxuICAgICAgICAnW2NsYXNzLmhvcml6b250YWxdJzogJ2RpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxuICAgICAgICAnW2NsYXNzLnZlcnRpY2FsXSc6ICdkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIidcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAndXgtZmxpcHBhYmxlLWNhcmQnXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICAgIEBJbnB1dCgpIHRyaWdnZXI6ICdjbGljaycgfCAnaG92ZXInIHwgJ21hbnVhbCcgPSAnaG92ZXInO1xuICAgIEBJbnB1dCgpIHdpZHRoOiBudW1iZXIgPSAyODA7XG4gICAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXIgPSAyMDA7XG4gICAgQElucHV0KCkgZmxpcHBlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBmbGlwcGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBzZXRGbGlwcGVkKHN0YXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmxpcHBlZCA9IHN0YXRlO1xuICAgICAgICB0aGlzLmZsaXBwZWRDaGFuZ2UuZW1pdCh0aGlzLmZsaXBwZWQpO1xuICAgIH1cblxuICAgIHRvZ2dsZUZsaXBwZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0RmxpcHBlZCghdGhpcy5mbGlwcGVkKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgY2xpY2tUcmlnZ2VyKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGFkZCBvciByZW1vdmUgdGhlIGNsYXNzIGRlcGVuZGluZyBvbiB3aGV0aGVyIG9yIG5vdCB0aGUgY2FyZCBoYXMgYmVlbiBmbGlwcGVkXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRmxpcHBlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gICAgaG92ZXJFbnRlcigpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgdGhlIHRyaWdnZXIgaXMgaG92ZXIgdGhlbiBiZWdpbiB0byBmbGlwXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmxpcHBlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICAgIGhvdmVyRXhpdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgdGhpcy5zZXRGbGlwcGVkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2UnLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2ViYXInLCBbJyRldmVudCddKSAvLyBJRSB1c2VzIGRpZmZlcmVudCBuYW1pbmdcbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciAhPT0gJ21hbnVhbCcpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRmxpcHBlZCgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZC1mcm9udCdcbn0pXG5leHBvcnQgY2xhc3MgRmxpcHBhYmxlQ2FyZEZyb250RGlyZWN0aXZlIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3V4LWZsaXBwYWJsZS1jYXJkLWJhY2snXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRCYWNrRGlyZWN0aXZlIHsgfSJdfQ==