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
export class FlippableCardFrontDirective {
}
FlippableCardFrontDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-flippable-card-front'
            },] }
];
export class FlippableCardBackDirective {
}
FlippableCardBackDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-flippable-card-back'
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxpcHBhYmxlLWNhcmQvZmxpcHBhYmxlLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZaEcsTUFBTTs7eUJBRThDLFlBQVk7dUJBQ1gsT0FBTztxQkFDL0IsR0FBRztzQkFDRixHQUFHO3VCQUNELEtBQUs7NkJBQ2dCLElBQUksWUFBWSxFQUFXOzs7Ozs7SUFFNUUsVUFBVSxDQUFDLEtBQWM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEM7Ozs7SUFHRCxZQUFZOztRQUdSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7S0FDSjs7OztJQUdELFVBQVU7O1FBRU4sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7S0FDSjs7OztJQUdELFNBQVM7UUFDTCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtLQUNKOzs7OztJQUtELFNBQVMsQ0FBQyxLQUFvQjtRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtLQUNKOzs7WUE1REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLHdvQkFBOEM7Z0JBQzlDLElBQUksRUFBRTtvQkFDRixVQUFVLEVBQUUsR0FBRztvQkFDZixvQkFBb0IsRUFBRSw0QkFBNEI7b0JBQ2xELGtCQUFrQixFQUFFLDBCQUEwQjtpQkFDakQ7Z0JBQ0QsUUFBUSxFQUFFLG1CQUFtQjthQUNoQzs7O3dCQUdJLEtBQUs7c0JBQ0wsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSzs0QkFDTCxNQUFNOzJCQVdOLFlBQVksU0FBQyxPQUFPO3lCQVNwQixZQUFZLFNBQUMsWUFBWTt3QkFRekIsWUFBWSxTQUFDLFlBQVk7d0JBT3pCLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FDeEMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUN4QyxZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZaEQsTUFBTTs7O1lBSEwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7YUFDdEM7O0FBTUQsTUFBTTs7O1lBSEwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7YUFDckMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZsaXBwYWJsZS1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAgICAgJ1tjbGFzcy5ob3Jpem9udGFsXSc6ICdkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAgICAgJ1tjbGFzcy52ZXJ0aWNhbF0nOiAnZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCInXG4gICAgfSxcbiAgICBleHBvcnRBczogJ3V4LWZsaXBwYWJsZS1jYXJkJ1xufSlcbmV4cG9ydCBjbGFzcyBGbGlwcGFibGVDYXJkQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcbiAgICBASW5wdXQoKSB0cmlnZ2VyOiAnY2xpY2snIHwgJ2hvdmVyJyB8ICdtYW51YWwnID0gJ2hvdmVyJztcbiAgICBASW5wdXQoKSB3aWR0aDogbnVtYmVyID0gMjgwO1xuICAgIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyID0gMjAwO1xuICAgIEBJbnB1dCgpIGZsaXBwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgZmxpcHBlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgc2V0RmxpcHBlZChzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmZsaXBwZWQgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5mbGlwcGVkQ2hhbmdlLmVtaXQodGhpcy5mbGlwcGVkKTtcbiAgICB9XG5cbiAgICB0b2dnbGVGbGlwcGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEZsaXBwZWQoIXRoaXMuZmxpcHBlZCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAgIGNsaWNrVHJpZ2dlcigpOiB2b2lkIHtcblxuICAgICAgICAvLyBhZGQgb3IgcmVtb3ZlIHRoZSBjbGFzcyBkZXBlbmRpbmcgb24gd2hldGhlciBvciBub3QgdGhlIGNhcmQgaGFzIGJlZW4gZmxpcHBlZFxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZsaXBwZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICAgIGhvdmVyRW50ZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHRoZSB0cmlnZ2VyIGlzIGhvdmVyIHRoZW4gYmVnaW4gdG8gZmxpcFxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZsaXBwZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgICBob3ZlckV4aXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmxpcHBlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnNwYWNlJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnNwYWNlYmFyJywgWyckZXZlbnQnXSkgLy8gSUUgdXNlcyBkaWZmZXJlbnQgbmFtaW5nXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZsaXBwZWQoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxpcHBhYmxlLWNhcmQtZnJvbnQnXG59KVxuZXhwb3J0IGNsYXNzIEZsaXBwYWJsZUNhcmRGcm9udERpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbGlwcGFibGUtY2FyZC1iYWNrJ1xufSlcbmV4cG9ydCBjbGFzcyBGbGlwcGFibGVDYXJkQmFja0RpcmVjdGl2ZSB7IH0iXX0=