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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxpcHBhYmxlLWNhcmQvZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozt5QkFzQjVDLFlBQVk7dUJBQ1gsT0FBTztxQkFDL0IsR0FBRztzQkFDRixHQUFHO3VCQUNELEtBQUs7NkJBQ2dCLElBQUksWUFBWSxFQUFXOzs7Ozs7SUFFNUUsMkNBQVU7Ozs7SUFBVixVQUFXLEtBQWM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsOENBQWE7OztJQUFiO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQzs7OztJQUVzQiw2Q0FBWTs7Ozs7UUFHL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4Qjs7Ozs7SUFHdUIsMkNBQVU7Ozs7O1FBRWxDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCOzs7OztJQUd1QiwwQ0FBUzs7OztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjs7O2dCQXREUixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDZlQVNQO29CQUNILElBQUksRUFBRTt3QkFDRixvQkFBb0IsRUFBRSw0QkFBNEI7d0JBQ2xELGtCQUFrQixFQUFFLDBCQUEwQjtxQkFDakQ7b0JBQ0QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDaEM7Ozs7OzhCQUdJLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSztrQ0FDTCxNQUFNO2lDQVdOLFlBQVksU0FBQyxPQUFPOytCQVFwQixZQUFZLFNBQUMsWUFBWTs4QkFPekIsWUFBWSxTQUFDLFlBQVk7O2lDQXJEOUI7O1NBb0JhLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkF5Q2xDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUseUJBQXlCO2lCQUN0Qzs7OztzQ0EvREQ7O1NBZ0VhLDJCQUEyQjs7Ozs7Ozs7Ozs7Ozs7Z0JBRXZDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2lCQUNyQzs7OztxQ0FwRUQ7O1NBcUVhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZsaXBwYWJsZS1jYXJkJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ1eC1mbGlwcGVyXCIgW2NsYXNzLnV4LWZsaXAtY2FyZF09XCJmbGlwcGVkXCIgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJoZWlnaHRcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1mbGlwcGFibGUtY2FyZC1mcm9udFwiIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiaGVpZ2h0XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInV4LWZsaXBwYWJsZS1jYXJkLWZyb250XCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LWZsaXBwYWJsZS1jYXJkLWJhY2tcIiBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJ1eC1mbGlwcGFibGUtY2FyZC1iYWNrXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuaG9yaXpvbnRhbF0nOiAnZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgICAgICdbY2xhc3MudmVydGljYWxdJzogJ2RpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJ1xuICAgIH0sXG4gICAgZXhwb3J0QXM6ICd1eC1mbGlwcGFibGUtY2FyZCdcbn0pXG5leHBvcnQgY2xhc3MgRmxpcHBhYmxlQ2FyZENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG4gICAgQElucHV0KCkgdHJpZ2dlcjogJ2NsaWNrJyB8ICdob3ZlcicgfCAnbWFudWFsJyA9ICdob3Zlcic7XG4gICAgQElucHV0KCkgd2lkdGg6IG51bWJlciA9IDI4MDtcbiAgICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlciA9IDIwMDtcbiAgICBASW5wdXQoKSBmbGlwcGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIGZsaXBwZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIHNldEZsaXBwZWQoc3RhdGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5mbGlwcGVkID0gc3RhdGU7XG4gICAgICAgIHRoaXMuZmxpcHBlZENoYW5nZS5lbWl0KHRoaXMuZmxpcHBlZCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRmxpcHBlZCgpIHtcbiAgICAgICAgdGhpcy5zZXRGbGlwcGVkKCF0aGlzLmZsaXBwZWQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgY2xpY2tUcmlnZ2VyKCkge1xuXG4gICAgICAgIC8vIGFkZCBvciByZW1vdmUgdGhlIGNsYXNzIGRlcGVuZGluZyBvbiB3aGV0aGVyIG9yIG5vdCB0aGUgY2FyZCBoYXMgYmVlbiBmbGlwcGVkXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRmxpcHBlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIGhvdmVyRW50ZXIoKSB7XG4gICAgICAgIC8vIGlmIHRoZSB0cmlnZ2VyIGlzIGhvdmVyIHRoZW4gYmVnaW4gdG8gZmxpcFxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZsaXBwZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgaG92ZXJFeGl0KCkge1xuICAgICAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZsaXBwZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxpcHBhYmxlLWNhcmQtZnJvbnQnXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRGcm9udERpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZC1iYWNrJ1xufSlcbmV4cG9ydCBjbGFzcyBGbGlwcGFibGVDYXJkQmFja0RpcmVjdGl2ZSB7IH1cbiJdfQ==