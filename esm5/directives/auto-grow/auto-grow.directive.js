/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
var AutoGrowDirective = /** @class */ (function () {
    function AutoGrowDirective(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        // ensure this is a textarea or else throw error
        if (_elementRef.nativeElement.tagName.toLowerCase() !== 'textarea') {
            throw new Error('uxAutoGrow directive can only be used on <textarea> elements.');
        }
    }
    /**
     * @return {?}
     */
    AutoGrowDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.update();
    };
    /**
     * @return {?}
     */
    AutoGrowDirective.prototype.update = /**
     * @return {?}
     */
    function () {
        // perform sizing
        this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'hidden');
        this._renderer.setStyle(this._elementRef.nativeElement, 'height', 'auto');
        // get the new total height and element height
        var scrollHeight = this._elementRef.nativeElement.scrollHeight;
        var maxHeight = getComputedStyle(this._elementRef.nativeElement).maxHeight;
        // determine what the maximum allowed height is
        var /** @type {?} */ maximum = !isNaN(parseFloat(maxHeight)) ? parseFloat(maxHeight) : Infinity;
        // if there is a max height specifed we want to show the scrollbars
        if (maximum < scrollHeight) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'auto');
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', maximum + 'px');
        }
        else {
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', scrollHeight + 'px');
        }
    };
    AutoGrowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxAutoGrow]'
                },] }
    ];
    /** @nocollapse */
    AutoGrowDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AutoGrowDirective.propDecorators = {
        update: [{ type: HostListener, args: ['input',] }]
    };
    return AutoGrowDirective;
}());
export { AutoGrowDirective };
function AutoGrowDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    AutoGrowDirective.prototype._elementRef;
    /** @type {?} */
    AutoGrowDirective.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1ncm93LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2F1dG8tZ3Jvdy9hdXRvLWdyb3cuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFPNUYsMkJBQW9CLFdBQXVCLEVBQVUsU0FBb0I7UUFBckQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXOztRQUV2RSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztTQUNsRjtLQUNGOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2Y7Ozs7SUFHRCxrQ0FBTTs7O0lBRE47O1FBSUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzs7UUFHbEUsSUFBQSwwREFBWSxDQUFvQztRQUNoRCxJQUFBLHNFQUFTLENBQXNEOztRQUd2RSxxQkFBTSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOztRQUdqRixFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNuRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztTQUN4RjtLQUNGOztnQkFyQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO2lCQUN6Qjs7OztnQkFKa0MsVUFBVTtnQkFBZ0IsU0FBUzs7O3lCQWtCbkUsWUFBWSxTQUFDLE9BQU87OzRCQWxCdkI7O1NBS2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhBdXRvR3Jvd10nXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Hcm93RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIC8vIGVuc3VyZSB0aGlzIGlzIGEgdGV4dGFyZWEgb3IgZWxzZSB0aHJvdyBlcnJvclxuICAgIGlmIChfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ3RleHRhcmVhJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1eEF1dG9Hcm93IGRpcmVjdGl2ZSBjYW4gb25seSBiZSB1c2VkIG9uIDx0ZXh0YXJlYT4gZWxlbWVudHMuJyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcpXG4gIHVwZGF0ZSgpOiB2b2lkIHtcblxuICAgIC8vIHBlcmZvcm0gc2l6aW5nXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3dZJywgJ2hpZGRlbicpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAvLyBnZXQgdGhlIG5ldyB0b3RhbCBoZWlnaHQgYW5kIGVsZW1lbnQgaGVpZ2h0XG4gICAgY29uc3QgeyBzY3JvbGxIZWlnaHQgfSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCB7IG1heEhlaWdodCB9ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgLy8gZGV0ZXJtaW5lIHdoYXQgdGhlIG1heGltdW0gYWxsb3dlZCBoZWlnaHQgaXNcbiAgICBjb25zdCBtYXhpbXVtID0gIWlzTmFOKHBhcnNlRmxvYXQobWF4SGVpZ2h0KSkgPyBwYXJzZUZsb2F0KG1heEhlaWdodCkgOiBJbmZpbml0eTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIGEgbWF4IGhlaWdodCBzcGVjaWZlZCB3ZSB3YW50IHRvIHNob3cgdGhlIHNjcm9sbGJhcnNcbiAgICBpZiAobWF4aW11bSA8IHNjcm9sbEhlaWdodCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3dZJywgJ2F1dG8nKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIG1heGltdW0gKyAncHgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0Jywgc2Nyb2xsSGVpZ2h0ICsgJ3B4Jyk7XG4gICAgfVxuICB9XG5cbn0iXX0=