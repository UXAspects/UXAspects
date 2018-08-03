/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
var InfiniteScrollLoadButtonDirective = /** @class */ (function () {
    function InfiniteScrollLoadButtonDirective(_element, _template, _viewContainer, _renderer) {
        this._element = _element;
        this._template = _template;
        this._viewContainer = _viewContainer;
        this._renderer = _renderer;
        this._visible = false;
        this._load = new Subject();
        this.load = /** @type {?} */ (this._load.asObservable());
    }
    Object.defineProperty(InfiniteScrollLoadButtonDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._visible) {
                if (value) {
                    this._viewContainer.createEmbeddedView(this._template);
                    // Template content follows the elementRef, which is a comment.
                    var /** @type {?} */ clickTarget = this.getNextElementSibling(this._template.elementRef.nativeElement);
                    this._renderer.listen(clickTarget, 'click', this.onClick.bind(this));
                }
                else {
                    this._viewContainer.clear();
                }
            }
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    InfiniteScrollLoadButtonDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._load.next(event);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    InfiniteScrollLoadButtonDirective.prototype.getNextElementSibling = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ next = element;
        while (next = next.nextSibling) {
            if (next.nodeType === 1) {
                return next;
            }
        }
        return null;
    };
    InfiniteScrollLoadButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxInfiniteScrollLoadButton]'
                },] }
    ];
    /** @nocollapse */
    InfiniteScrollLoadButtonDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: TemplateRef },
        { type: ViewContainerRef },
        { type: Renderer2 }
    ]; };
    InfiniteScrollLoadButtonDirective.propDecorators = {
        visible: [{ type: Input, args: ['uxInfiniteScrollLoadButton',] }],
        load: [{ type: Output }]
    };
    return InfiniteScrollLoadButtonDirective;
}());
export { InfiniteScrollLoadButtonDirective };
function InfiniteScrollLoadButtonDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype.load;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._visible;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._load;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._element;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._template;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._viewContainer;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLWxvYWQtYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmZpbml0ZS1zY3JvbGwtbG9hZC1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0csT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7O0lBZ0NuQywyQ0FDWSxVQUNBLFdBQ0EsZ0JBQ0E7UUFIQSxhQUFRLEdBQVIsUUFBUTtRQUNSLGNBQVMsR0FBVCxTQUFTO1FBQ1QsbUJBQWMsR0FBZCxjQUFjO1FBQ2QsY0FBUyxHQUFULFNBQVM7d0JBUE8sS0FBSztxQkFDakIsSUFBSSxPQUFPLEVBQUU7UUFRekIsSUFBSSxDQUFDLElBQUkscUJBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQXVCLENBQUEsQ0FBQztLQUM5RDtJQWhDRCxzQkFDSSxzREFBTzs7OztRQURYO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7b0JBR3ZELHFCQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3hGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDeEU7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDL0I7YUFDSjtZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3pCOzs7T0FmQTs7Ozs7SUErQk8sbURBQU87Ozs7Y0FBQyxLQUFpQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0lBR25CLGlFQUFxQjs7OztjQUFDLE9BQVk7UUFDdEMscUJBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUNuQixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7OztnQkFsRG5CLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsOEJBQThCO2lCQUMzQzs7OztnQkFObUIsVUFBVTtnQkFBNEIsV0FBVztnQkFBRSxnQkFBZ0I7Z0JBQXhDLFNBQVM7OzswQkFTbkQsS0FBSyxTQUFDLDRCQUE0Qjt1QkFvQmxDLE1BQU07OzRDQTdCWDs7U0FPYSxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4SW5maW5pdGVTY3JvbGxMb2FkQnV0dG9uXSdcbn0pXG5leHBvcnQgY2xhc3MgSW5maW5pdGVTY3JvbGxMb2FkQnV0dG9uRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgndXhJbmZpbml0ZVNjcm9sbExvYWRCdXR0b24nKVxuICAgIGdldCB2aXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG4gICAgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90ZW1wbGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUZW1wbGF0ZSBjb250ZW50IGZvbGxvd3MgdGhlIGVsZW1lbnRSZWYsIHdoaWNoIGlzIGEgY29tbWVudC5cbiAgICAgICAgICAgICAgICBjb25zdCBjbGlja1RhcmdldCA9IHRoaXMuZ2V0TmV4dEVsZW1lbnRTaWJsaW5nKHRoaXMuX3RlbXBsYXRlLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKGNsaWNrVGFyZ2V0LCAnY2xpY2snLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgbG9hZDogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbG9hZCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICAgICAgICB0aGlzLmxvYWQgPSB0aGlzLl9sb2FkLmFzT2JzZXJ2YWJsZSgpIGFzIE9ic2VydmFibGU8RXZlbnQ+O1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLl9sb2FkLm5leHQoZXZlbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV4dEVsZW1lbnRTaWJsaW5nKGVsZW1lbnQ6IGFueSk6IEVsZW1lbnQge1xuICAgICAgICB2YXIgbmV4dCA9IGVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChuZXh0ID0gbmV4dC5uZXh0U2libGluZykge1xuICAgICAgICAgICAgaWYgKG5leHQubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iXX0=