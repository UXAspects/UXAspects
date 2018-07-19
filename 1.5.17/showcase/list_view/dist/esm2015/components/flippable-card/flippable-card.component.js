/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
    /**
     * @param {?} event
     * @return {?}
     */
    // IE uses different naming
    onKeyDown(event) {
        if (this.trigger !== 'manual') {
            this.toggleFlipped();
            event.preventDefault();
        }
    }
}
FlippableCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-flippable-card',
                template: `<div class="ux-flipper"
     [class.ux-flip-card]="flipped"
     [style.width.px]="width"
     [style.height.px]="height">

    <div class="ux-flippable-card-front"
         [style.width.px]="width"
         [style.height.px]="height"
         [attr.aria-hidden]="flipped">

        <ng-content select="ux-flippable-card-front"></ng-content>
    </div>

    <div class="ux-flippable-card-back"
         [style.width.px]="width"
         [style.height.px]="height"
         [attr.aria-hidden]="!flipped">

        <ng-content select="ux-flippable-card-back"></ng-content>
    </div>
</div>`,
                host: {
                    'tabindex': '0',
                    '[class.horizontal]': 'direction === "horizontal"',
                    '[class.vertical]': 'direction === "vertical"'
                },
                exportAs: 'ux-flippable-card'
            },] },
];
/** @nocollapse */
FlippableCardComponent.ctorParameters = () => [];
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
/** @nocollapse */
FlippableCardFrontDirective.ctorParameters = () => [];
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
/** @nocollapse */
FlippableCardBackDirective.ctorParameters = () => [];
function FlippableCardBackDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FlippableCardBackDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FlippableCardBackDirective.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxpcHBhYmxlLWNhcmQvZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFnQ2hHLE1BQU07O3lCQUU4QyxZQUFZO3VCQUNYLE9BQU87cUJBQy9CLEdBQUc7c0JBQ0YsR0FBRzt1QkFDRCxLQUFLOzZCQUNnQixJQUFJLFlBQVksRUFBVzs7Ozs7O0lBRTVFLFVBQVUsQ0FBQyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7OztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDOzs7O0lBR0QsWUFBWTs7UUFHUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCOzs7OztJQUlMLFVBQVU7O1FBRU4sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7Ozs7O0lBSUwsU0FBUztRQUNMLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCOzs7Ozs7O0lBTUwsU0FBUyxDQUFDLEtBQW9CO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCOzs7O1lBL0VSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JQO2dCQUNILElBQUksRUFBRTtvQkFDRixVQUFVLEVBQUUsR0FBRztvQkFDZixvQkFBb0IsRUFBRSw0QkFBNEI7b0JBQ2xELGtCQUFrQixFQUFFLDBCQUEwQjtpQkFDakQ7Z0JBQ0QsUUFBUSxFQUFFLG1CQUFtQjthQUNoQzs7Ozs7MEJBR0ksS0FBSzt3QkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLE1BQU07NkJBV04sWUFBWSxTQUFDLE9BQU87MkJBU3BCLFlBQVksU0FBQyxZQUFZOzBCQVF6QixZQUFZLFNBQUMsWUFBWTswQkFPekIsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUN4QyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQ3hDLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVloRCxNQUFNOzs7WUFITCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjthQUN0Qzs7Ozs7Ozs7Ozs7OztBQU1ELE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2FBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxpcHBhYmxlLWNhcmQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LWZsaXBwZXJcIlxuICAgICBbY2xhc3MudXgtZmxpcC1jYXJkXT1cImZsaXBwZWRcIlxuICAgICBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIlxuICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LWZsaXBwYWJsZS1jYXJkLWZyb250XCJcbiAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiXG4gICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhlaWdodFwiXG4gICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJmbGlwcGVkXCI+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwidXgtZmxpcHBhYmxlLWNhcmQtZnJvbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtZmxpcHBhYmxlLWNhcmQtYmFja1wiXG4gICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIlxuICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJoZWlnaHRcIlxuICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIWZsaXBwZWRcIj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJ1eC1mbGlwcGFibGUtY2FyZC1iYWNrXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgICBob3N0OiB7XG4gICAgICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAgICAgJ1tjbGFzcy5ob3Jpem9udGFsXSc6ICdkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAgICAgJ1tjbGFzcy52ZXJ0aWNhbF0nOiAnZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInXG4gICAgfSxcbiAgICBleHBvcnRBczogJ3V4LWZsaXBwYWJsZS1jYXJkJ1xufSlcbmV4cG9ydCBjbGFzcyBGbGlwcGFibGVDYXJkQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcbiAgICBASW5wdXQoKSB0cmlnZ2VyOiAnY2xpY2snIHwgJ2hvdmVyJyB8ICdtYW51YWwnID0gJ2hvdmVyJztcbiAgICBASW5wdXQoKSB3aWR0aDogbnVtYmVyID0gMjgwO1xuICAgIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyID0gMjAwO1xuICAgIEBJbnB1dCgpIGZsaXBwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgZmxpcHBlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgc2V0RmxpcHBlZChzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmZsaXBwZWQgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5mbGlwcGVkQ2hhbmdlLmVtaXQodGhpcy5mbGlwcGVkKTtcbiAgICB9XG5cbiAgICB0b2dnbGVGbGlwcGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEZsaXBwZWQoIXRoaXMuZmxpcHBlZCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAgIGNsaWNrVHJpZ2dlcigpOiB2b2lkIHtcblxuICAgICAgICAvLyBhZGQgb3IgcmVtb3ZlIHRoZSBjbGFzcyBkZXBlbmRpbmcgb24gd2hldGhlciBvciBub3QgdGhlIGNhcmQgaGFzIGJlZW4gZmxpcHBlZFxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZsaXBwZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICAgIGhvdmVyRW50ZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHRoZSB0cmlnZ2VyIGlzIGhvdmVyIHRoZW4gYmVnaW4gdG8gZmxpcFxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZsaXBwZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgICBob3ZlckV4aXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmxpcHBlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnNwYWNlJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnNwYWNlYmFyJywgWyckZXZlbnQnXSkgLy8gSUUgdXNlcyBkaWZmZXJlbnQgbmFtaW5nXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZsaXBwZWQoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxpcHBhYmxlLWNhcmQtZnJvbnQnXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRGcm9udERpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZC1iYWNrJ1xufSlcbmV4cG9ydCBjbGFzcyBGbGlwcGFibGVDYXJkQmFja0RpcmVjdGl2ZSB7IH0iXX0=