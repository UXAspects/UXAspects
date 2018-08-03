/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { ScrollIntoViewService } from './scroll-into-view.service';
export class ScrollIntoViewIfDirective {
    /**
     * @param {?} _element
     * @param {?} _scrollIntoViewService
     */
    constructor(_element, _scrollIntoViewService) {
        this._element = _element;
        this._scrollIntoViewService = _scrollIntoViewService;
        this.condition = false;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.condition) {
            setTimeout(() => this._scrollIntoViewService.scrollIntoView(this._element.nativeElement, this.scrollParent));
        }
    }
}
ScrollIntoViewIfDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxScrollIntoViewIf]',
                providers: [ScrollIntoViewService]
            },] }
];
/** @nocollapse */
ScrollIntoViewIfDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ScrollIntoViewService }
];
ScrollIntoViewIfDirective.propDecorators = {
    condition: [{ type: Input, args: ['uxScrollIntoViewIf',] }],
    scrollParent: [{ type: Input }]
};
function ScrollIntoViewIfDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ScrollIntoViewIfDirective.prototype.condition;
    /** @type {?} */
    ScrollIntoViewIfDirective.prototype.scrollParent;
    /** @type {?} */
    ScrollIntoViewIfDirective.prototype._element;
    /** @type {?} */
    ScrollIntoViewIfDirective.prototype._scrollIntoViewService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy1pZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLWludG8tdmlldy1pZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU1uRSxNQUFNOzs7OztJQUtGLFlBQW9CLFFBQW9CLEVBQVUsc0JBQTZDO1FBQTNFLGFBQVEsR0FBUixRQUFRLENBQVk7UUFBVSwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO3lCQUh0RCxLQUFLO0tBR3FEOzs7O0lBRW5HLFdBQVc7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUNoSDtLQUNKOzs7WUFmSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7YUFDcEM7Ozs7WUFOa0IsVUFBVTtZQUNyQixxQkFBcUI7Ozt3QkFRekIsS0FBSyxTQUFDLG9CQUFvQjsyQkFDMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2Nyb2xsSW50b1ZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9zY3JvbGwtaW50by12aWV3LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFNjcm9sbEludG9WaWV3SWZdJyxcbiAgICBwcm92aWRlcnM6IFtTY3JvbGxJbnRvVmlld1NlcnZpY2VdXG4gfSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxJbnRvVmlld0lmRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgndXhTY3JvbGxJbnRvVmlld0lmJykgY29uZGl0aW9uID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2Nyb2xsUGFyZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3Njcm9sbEludG9WaWV3U2VydmljZTogU2Nyb2xsSW50b1ZpZXdTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmRpdGlvbikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zY3JvbGxJbnRvVmlld1NlcnZpY2Uuc2Nyb2xsSW50b1ZpZXcodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCB0aGlzLnNjcm9sbFBhcmVudCkpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==