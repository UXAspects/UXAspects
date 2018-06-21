/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Directive, HostListener, Output, EventEmitter } from '@angular/core';
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
    FlippableCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-flippable-card',
                    template: "<div class=\"ux-flipper\" [class.ux-flip-card]=\"flipped\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n\n    <div class=\"ux-flippable-card-front\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n        <ng-content select=\"ux-flippable-card-front\"></ng-content>\n    </div>\n\n    <div class=\"ux-flippable-card-back\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n        <ng-content select=\"ux-flippable-card-back\"></ng-content>\n    </div>\n</div>",
                    host: {
                        '[class.horizontal]': 'direction === "horizontal"',
                        '[class.vertical]': 'direction === "vertical"'
                    },
                    exportAs: 'ux-flippable-card'
                },] },
    ];
    /** @nocollapse */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxpcHBhYmxlLWNhcmQvZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozt5QkFzQjVDLFlBQVk7dUJBQ1gsT0FBTztxQkFDL0IsR0FBRztzQkFDRixHQUFHO3VCQUNELEtBQUs7NkJBQ2dCLElBQUksWUFBWSxFQUFXOzs7Ozs7SUFFNUUsMkNBQVU7Ozs7SUFBVixVQUFXLEtBQWM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsOENBQWE7OztJQUFiO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQzs7OztJQUVzQiw2Q0FBWTs7Ozs7UUFHL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4Qjs7Ozs7SUFHdUIsMkNBQVU7Ozs7O1FBRWxDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCOzs7OztJQUd1QiwwQ0FBUzs7OztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjs7O2dCQXREUixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDZlQVNQO29CQUNILElBQUksRUFBRTt3QkFDRixvQkFBb0IsRUFBRSw0QkFBNEI7d0JBQ2xELGtCQUFrQixFQUFFLDBCQUEwQjtxQkFDakQ7b0JBQ0QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDaEM7Ozs7OEJBR0ksS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLO2tDQUNMLE1BQU07aUNBV04sWUFBWSxTQUFDLE9BQU87K0JBUXBCLFlBQVksU0FBQyxZQUFZOzhCQU96QixZQUFZLFNBQUMsWUFBWTs7aUNBckQ5Qjs7U0FvQmEsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQXlDbEMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3RDOztzQ0EvREQ7O1NBZ0VhLDJCQUEyQjs7Ozs7Ozs7Ozs7Ozs7Z0JBRXZDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2lCQUNyQzs7cUNBcEVEOztTQXFFYSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidXgtZmxpcHBlclwiIFtjbGFzcy51eC1mbGlwLWNhcmRdPVwiZmxpcHBlZFwiIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiaGVpZ2h0XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtZmxpcHBhYmxlLWNhcmQtZnJvbnRcIiBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJ1eC1mbGlwcGFibGUtY2FyZC1mcm9udFwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1mbGlwcGFibGUtY2FyZC1iYWNrXCIgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJoZWlnaHRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwidXgtZmxpcHBhYmxlLWNhcmQtYmFja1wiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLmhvcml6b250YWxdJzogJ2RpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxuICAgICAgICAnW2NsYXNzLnZlcnRpY2FsXSc6ICdkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIidcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAndXgtZmxpcHBhYmxlLWNhcmQnXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICAgIEBJbnB1dCgpIHRyaWdnZXI6ICdjbGljaycgfCAnaG92ZXInIHwgJ21hbnVhbCcgPSAnaG92ZXInO1xuICAgIEBJbnB1dCgpIHdpZHRoOiBudW1iZXIgPSAyODA7XG4gICAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXIgPSAyMDA7XG4gICAgQElucHV0KCkgZmxpcHBlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBmbGlwcGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBzZXRGbGlwcGVkKHN0YXRlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZmxpcHBlZCA9IHN0YXRlO1xuICAgICAgICB0aGlzLmZsaXBwZWRDaGFuZ2UuZW1pdCh0aGlzLmZsaXBwZWQpO1xuICAgIH1cblxuICAgIHRvZ2dsZUZsaXBwZWQoKSB7XG4gICAgICAgIHRoaXMuc2V0RmxpcHBlZCghdGhpcy5mbGlwcGVkKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpIGNsaWNrVHJpZ2dlcigpIHtcblxuICAgICAgICAvLyBhZGQgb3IgcmVtb3ZlIHRoZSBjbGFzcyBkZXBlbmRpbmcgb24gd2hldGhlciBvciBub3QgdGhlIGNhcmQgaGFzIGJlZW4gZmxpcHBlZFxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZsaXBwZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBob3ZlckVudGVyKCkge1xuICAgICAgICAvLyBpZiB0aGUgdHJpZ2dlciBpcyBob3ZlciB0aGVuIGJlZ2luIHRvIGZsaXBcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgdGhpcy5zZXRGbGlwcGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIGhvdmVyRXhpdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgdGhpcy5zZXRGbGlwcGVkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3V4LWZsaXBwYWJsZS1jYXJkLWZyb250J1xufSlcbmV4cG9ydCBjbGFzcyBGbGlwcGFibGVDYXJkRnJvbnREaXJlY3RpdmUgeyB9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxpcHBhYmxlLWNhcmQtYmFjaydcbn0pXG5leHBvcnQgY2xhc3MgRmxpcHBhYmxlQ2FyZEJhY2tEaXJlY3RpdmUgeyB9XG4iXX0=