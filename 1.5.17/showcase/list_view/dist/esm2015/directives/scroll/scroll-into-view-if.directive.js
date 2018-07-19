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
            },] },
];
/** @nocollapse */
ScrollIntoViewIfDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: ScrollIntoViewService, },
];
ScrollIntoViewIfDirective.propDecorators = {
    "condition": [{ type: Input, args: ['uxScrollIntoViewIf',] },],
    "scrollParent": [{ type: Input },],
};
function ScrollIntoViewIfDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ScrollIntoViewIfDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ScrollIntoViewIfDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ScrollIntoViewIfDirective.propDecorators;
    /** @type {?} */
    ScrollIntoViewIfDirective.prototype.condition;
    /** @type {?} */
    ScrollIntoViewIfDirective.prototype.scrollParent;
    /** @type {?} */
    ScrollIntoViewIfDirective.prototype._element;
    /** @type {?} */
    ScrollIntoViewIfDirective.prototype._scrollIntoViewService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy1pZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLWludG8tdmlldy1pZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU1uRSxNQUFNOzs7OztJQUtGLFlBQW9CLFFBQW9CLEVBQVUsc0JBQTZDO1FBQTNFLGFBQVEsR0FBUixRQUFRLENBQVk7UUFBVSwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO3lCQUh0RCxLQUFLO0tBR3FEOzs7O0lBRW5HLFdBQVc7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQ2hIO0tBQ0o7OztZQWZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzthQUNwQzs7OztZQU5rQixVQUFVO1lBQ3JCLHFCQUFxQjs7OzBCQVF6QixLQUFLLFNBQUMsb0JBQW9COzZCQUMxQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY3JvbGxJbnRvVmlld1NlcnZpY2UgfSBmcm9tICcuL3Njcm9sbC1pbnRvLXZpZXcuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4U2Nyb2xsSW50b1ZpZXdJZl0nLFxuICAgIHByb3ZpZGVyczogW1Njcm9sbEludG9WaWV3U2VydmljZV1cbiB9KVxuZXhwb3J0IGNsYXNzIFNjcm9sbEludG9WaWV3SWZEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCd1eFNjcm9sbEludG9WaWV3SWYnKSBjb25kaXRpb24gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzY3JvbGxQYXJlbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfc2Nyb2xsSW50b1ZpZXdTZXJ2aWNlOiBTY3JvbGxJbnRvVmlld1NlcnZpY2UpIHt9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3Njcm9sbEludG9WaWV3U2VydmljZS5zY3JvbGxJbnRvVmlldyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuc2Nyb2xsUGFyZW50KSk7XG4gICAgICAgIH1cbiAgICB9XG59Il19