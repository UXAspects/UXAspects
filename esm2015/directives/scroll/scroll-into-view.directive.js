/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
export class ScrollIntoViewDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        /**
         * Allow a condition around whether or not this should scroll into view
         */
        this.uxScrollIntoView = true;
        /**
         * Allow user to provide the browser supported options
         */
        this.scrollIntoViewOptions = true;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.uxScrollIntoView) {
            this._elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
        }
    }
}
ScrollIntoViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxScrollIntoView]'
            },] },
];
/** @nocollapse */
ScrollIntoViewDirective.ctorParameters = () => [
    { type: ElementRef, },
];
ScrollIntoViewDirective.propDecorators = {
    "uxScrollIntoView": [{ type: Input },],
    "scrollIntoViewOptions": [{ type: Input },],
};
function ScrollIntoViewDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ScrollIntoViewDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ScrollIntoViewDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ScrollIntoViewDirective.propDecorators;
    /**
     * Allow a condition around whether or not this should scroll into view
     * @type {?}
     */
    ScrollIntoViewDirective.prototype.uxScrollIntoView;
    /**
     * Allow user to provide the browser supported options
     * @type {?}
     */
    ScrollIntoViewDirective.prototype.scrollIntoViewOptions;
    /** @type {?} */
    ScrollIntoViewDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLWludG8tdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLNUUsTUFBTTs7OztJQVFGLFlBQW9CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZOzs7O2dDQUxOLElBQUk7Ozs7cUNBR3lCLElBQUk7S0FFdEI7Ozs7SUFFaEQsZUFBZTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzdFO0tBQ0o7OztZQWpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7OztZQUprQyxVQUFVOzs7aUNBUXhDLEtBQUs7c0NBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhTY3JvbGxJbnRvVmlld10nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbEludG9WaWV3RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICAvKiogQWxsb3cgYSBjb25kaXRpb24gYXJvdW5kIHdoZXRoZXIgb3Igbm90IHRoaXMgc2hvdWxkIHNjcm9sbCBpbnRvIHZpZXcgKi9cbiAgICBASW5wdXQoKSB1eFNjcm9sbEludG9WaWV3OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBBbGxvdyB1c2VyIHRvIHByb3ZpZGUgdGhlIGJyb3dzZXIgc3VwcG9ydGVkIG9wdGlvbnMgKi9cbiAgICBASW5wdXQoKSBzY3JvbGxJbnRvVmlld09wdGlvbnM6IFNjcm9sbEludG9WaWV3T3B0aW9ucyB8IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnV4U2Nyb2xsSW50b1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldyh0aGlzLnNjcm9sbEludG9WaWV3T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59Il19