/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Directive, HostListener, Output, EventEmitter } from '@angular/core';
export class FlippableCardComponent {
    constructor() {
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
    setFlipped(state) {
        this.flipped = state;
        this.flippedChange.emit(this.flipped);
    }
    /**
     * @return {?}
     */
    toggleFlipped() {
        this.setFlipped(!this.flipped);
    }
    /**
     * @return {?}
     */
    clickTrigger() {
        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    }
    /**
     * @return {?}
     */
    hoverEnter() {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    }
    /**
     * @return {?}
     */
    hoverExit() {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    }
}
FlippableCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-flippable-card',
                template: `<div class="ux-flipper" [class.ux-flip-card]="flipped" [style.width.px]="width" [style.height.px]="height">

    <div class="ux-flippable-card-front" [style.width.px]="width" [style.height.px]="height">
        <ng-content select="ux-flippable-card-front"></ng-content>
    </div>

    <div class="ux-flippable-card-back" [style.width.px]="width" [style.height.px]="height">
        <ng-content select="ux-flippable-card-back"></ng-content>
    </div>
</div>`,
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
export class FlippableCardFrontDirective {
}
FlippableCardFrontDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-flippable-card-front'
            },] },
];
function FlippableCardFrontDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FlippableCardFrontDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FlippableCardFrontDirective.ctorParameters;
}
export class FlippableCardBackDirective {
}
FlippableCardBackDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-flippable-card-back'
            },] },
];
function FlippableCardBackDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FlippableCardBackDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FlippableCardBackDirective.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxpcHBhYmxlLWNhcmQvZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFvQmhHLE1BQU07O3lCQUU4QyxZQUFZO3VCQUNYLE9BQU87cUJBQy9CLEdBQUc7c0JBQ0YsR0FBRzt1QkFDRCxLQUFLOzZCQUNnQixJQUFJLFlBQVksRUFBVzs7Ozs7O0lBRTVFLFVBQVUsQ0FBQyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7OztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDOzs7O0lBRXNCLFlBQVk7O1FBRy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7Ozs7O0lBR3VCLFVBQVU7O1FBRWxDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCOzs7OztJQUd1QixTQUFTO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCOzs7O1lBdERSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7OztPQVNQO2dCQUNILElBQUksRUFBRTtvQkFDRixvQkFBb0IsRUFBRSw0QkFBNEI7b0JBQ2xELGtCQUFrQixFQUFFLDBCQUEwQjtpQkFDakQ7Z0JBQ0QsUUFBUSxFQUFFLG1CQUFtQjthQUNoQzs7OzswQkFHSSxLQUFLO3dCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsTUFBTTs2QkFXTixZQUFZLFNBQUMsT0FBTzsyQkFRcEIsWUFBWSxTQUFDLFlBQVk7MEJBT3pCLFlBQVksU0FBQyxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVzlCLE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2FBQ3RDOzs7Ozs7Ozs7OztBQU1ELE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2FBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxpcHBhYmxlLWNhcmQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LWZsaXBwZXJcIiBbY2xhc3MudXgtZmxpcC1jYXJkXT1cImZsaXBwZWRcIiBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LWZsaXBwYWJsZS1jYXJkLWZyb250XCIgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJoZWlnaHRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwidXgtZmxpcHBhYmxlLWNhcmQtZnJvbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtZmxpcHBhYmxlLWNhcmQtYmFja1wiIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiaGVpZ2h0XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInV4LWZsaXBwYWJsZS1jYXJkLWJhY2tcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5ob3Jpem9udGFsXSc6ICdkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAgICAgJ1tjbGFzcy52ZXJ0aWNhbF0nOiAnZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInXG4gICAgfSxcbiAgICBleHBvcnRBczogJ3V4LWZsaXBwYWJsZS1jYXJkJ1xufSlcbmV4cG9ydCBjbGFzcyBGbGlwcGFibGVDYXJkQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcbiAgICBASW5wdXQoKSB0cmlnZ2VyOiAnY2xpY2snIHwgJ2hvdmVyJyB8ICdtYW51YWwnID0gJ2hvdmVyJztcbiAgICBASW5wdXQoKSB3aWR0aDogbnVtYmVyID0gMjgwO1xuICAgIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyID0gMjAwO1xuICAgIEBJbnB1dCgpIGZsaXBwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgZmxpcHBlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgc2V0RmxpcHBlZChzdGF0ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmZsaXBwZWQgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5mbGlwcGVkQ2hhbmdlLmVtaXQodGhpcy5mbGlwcGVkKTtcbiAgICB9XG5cbiAgICB0b2dnbGVGbGlwcGVkKCkge1xuICAgICAgICB0aGlzLnNldEZsaXBwZWQoIXRoaXMuZmxpcHBlZCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBjbGlja1RyaWdnZXIoKSB7XG5cbiAgICAgICAgLy8gYWRkIG9yIHJlbW92ZSB0aGUgY2xhc3MgZGVwZW5kaW5nIG9uIHdoZXRoZXIgb3Igbm90IHRoZSBjYXJkIGhhcyBiZWVuIGZsaXBwZWRcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVGbGlwcGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgaG92ZXJFbnRlcigpIHtcbiAgICAgICAgLy8gaWYgdGhlIHRyaWdnZXIgaXMgaG92ZXIgdGhlbiBiZWdpbiB0byBmbGlwXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmxpcHBlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBob3ZlckV4aXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmxpcHBlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZC1mcm9udCdcbn0pXG5leHBvcnQgY2xhc3MgRmxpcHBhYmxlQ2FyZEZyb250RGlyZWN0aXZlIHsgfVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3V4LWZsaXBwYWJsZS1jYXJkLWJhY2snXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRCYWNrRGlyZWN0aXZlIHsgfVxuIl19