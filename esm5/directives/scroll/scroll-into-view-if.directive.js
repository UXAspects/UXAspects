/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { ScrollIntoViewService } from './scroll-into-view.service';
var ScrollIntoViewIfDirective = /** @class */ (function () {
    function ScrollIntoViewIfDirective(_element, _scrollIntoViewService) {
        this._element = _element;
        this._scrollIntoViewService = _scrollIntoViewService;
        this.condition = false;
    }
    /**
     * @return {?}
     */
    ScrollIntoViewIfDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.condition) {
            setTimeout(function () { return _this._scrollIntoViewService.scrollIntoView(_this._element.nativeElement, _this.scrollParent); });
        }
    };
    ScrollIntoViewIfDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxScrollIntoViewIf]',
                    providers: [ScrollIntoViewService]
                },] }
    ];
    /** @nocollapse */
    ScrollIntoViewIfDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ScrollIntoViewService }
    ]; };
    ScrollIntoViewIfDirective.propDecorators = {
        condition: [{ type: Input, args: ['uxScrollIntoViewIf',] }],
        scrollParent: [{ type: Input }]
    };
    return ScrollIntoViewIfDirective;
}());
export { ScrollIntoViewIfDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy1pZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zY3JvbGwvc2Nyb2xsLWludG8tdmlldy1pZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUFXL0QsbUNBQW9CLFFBQW9CLEVBQVUsc0JBQTZDO1FBQTNFLGFBQVEsR0FBUixRQUFRLENBQVk7UUFBVSwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO3lCQUh0RCxLQUFLO0tBR3FEOzs7O0lBRW5HLCtDQUFXOzs7SUFBWDtRQUFBLGlCQUlDO1FBSEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsRUFBMUYsQ0FBMEYsQ0FBQyxDQUFDO1NBQ2hIO0tBQ0o7O2dCQWZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDcEM7Ozs7Z0JBTmtCLFVBQVU7Z0JBQ3JCLHFCQUFxQjs7OzRCQVF6QixLQUFLLFNBQUMsb0JBQW9COytCQUMxQixLQUFLOztvQ0FWVjs7U0FPYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcm9sbEludG9WaWV3U2VydmljZSB9IGZyb20gJy4vc2Nyb2xsLWludG8tdmlldy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhTY3JvbGxJbnRvVmlld0lmXScsXG4gICAgcHJvdmlkZXJzOiBbU2Nyb2xsSW50b1ZpZXdTZXJ2aWNlXVxuIH0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsSW50b1ZpZXdJZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoJ3V4U2Nyb2xsSW50b1ZpZXdJZicpIGNvbmRpdGlvbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNjcm9sbFBhcmVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF9zY3JvbGxJbnRvVmlld1NlcnZpY2U6IFNjcm9sbEludG9WaWV3U2VydmljZSkge31cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICBpZiAodGhpcy5jb25kaXRpb24pIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2Nyb2xsSW50b1ZpZXdTZXJ2aWNlLnNjcm9sbEludG9WaWV3KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5zY3JvbGxQYXJlbnQpKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=